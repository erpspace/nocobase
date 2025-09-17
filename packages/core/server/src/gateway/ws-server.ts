/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Gateway, IncomingRequest } from '../gateway';
import WebSocket, { WebSocketServer as WSS } from 'ws';
import { nanoid } from 'nanoid';
import { IncomingMessage } from 'http';
import { AppSupervisor } from '../app-supervisor';
import { applyErrorWithArgs, getErrorWithCode } from './errors';
import lodash from 'lodash';
import { Logger } from '@nocobase/logger';
import EventEmitter from 'events';
import { parse } from 'url';

// Import cluster mode components
let ClusterModeManager: any = null;
let RedisWebSocketManager: any = null;
try {
  const clusterMode = require('../cluster-mode/cluster-mode-manager');
  ClusterModeManager = clusterMode.ClusterModeManager;
  const redisWS = require('../cluster-mode/redis-websocket-manager');
  RedisWebSocketManager = redisWS.RedisWebSocketManager;
} catch (error) {
  // Cluster mode components not available
}

declare class WebSocketWithId extends WebSocket {
  id: string;
}

interface WebSocketClient {
  ws: WebSocketWithId;
  tags: Set<string>;
  url: string;
  headers: any;
  app?: string;
  id: string;
}

function getPayloadByErrorCode(code, options) {
  const error = getErrorWithCode(code);
  return lodash.omit(applyErrorWithArgs(error, options), ['status', 'maintaining']);
}

export class WSServer extends EventEmitter {
  wss: WebSocket.Server;
  webSocketClients = new Map<string, WebSocketClient>();
  logger: Logger;
  private redisWSManager: any = null;

  constructor() {
    super();
    this.wss = new WSS({ noServer: true });
    
    // Initialize Redis WebSocket manager if cluster mode is enabled
    this.initializeRedisWSManager();

    this.wss.on('connection', (ws: WebSocketWithId, request: IncomingMessage) => {
      const client = this.addNewConnection(ws, request);

      console.log(`new client connected ${ws.id}`);

      ws.on('error', () => {
        this.removeConnection(ws.id);
      });

      ws.on('close', () => {
        this.removeConnection(ws.id);
      });

      ws.on('message', (message) => {
        if (message.toString() === 'ping') {
          return;
        }

        this.emit('message', {
          client,
          message,
        });
      });
    });

    Gateway.getInstance().on('appSelectorChanged', () => {
      this.loopThroughConnections(async (client) => {
        const handleAppName = await Gateway.getInstance().getRequestHandleAppName({
          url: client.url,
          headers: client.headers,
        });

        for (const tag of client.tags) {
          if (tag.startsWith('app#')) {
            client.tags.delete(tag);
          }
        }

        client.tags.add(`app#${handleAppName}`);

        AppSupervisor.getInstance().bootStrapApp(handleAppName);
      });
    });

    AppSupervisor.getInstance().on('appError', async ({ appName, error }) => {
      let message = error.message;

      if (error.cause) {
        message = `${message}: ${error.cause.message}`;
      }

      this.sendToConnectionsByTag('app', appName, {
        type: 'notification',
        payload: {
          message,
          type: 'error',
        },
      });
    });

    AppSupervisor.getInstance().on('appMaintainingMessageChanged', async ({ appName, message, command, status }) => {
      const app = await AppSupervisor.getInstance().getApp(appName, {
        withOutBootStrap: true,
      });

      const payload = getPayloadByErrorCode(status, {
        app,
        message,
        command,
      });

      this.sendToConnectionsByTag('app', appName, {
        type: 'maintaining',
        payload,
      });
    });

    AppSupervisor.getInstance().on('appStatusChanged', async ({ appName, status, options }) => {
      const app = await AppSupervisor.getInstance().getApp(appName, {
        withOutBootStrap: true,
      });

      const payload = getPayloadByErrorCode(status, { app, appName });
      this.sendToConnectionsByTag('app', appName, {
        type: 'maintaining',
        payload: {
          ...payload,
          ...options,
        },
      });
    });

    AppSupervisor.getInstance().on('afterAppAdded', (app) => {
      this.bindAppWSEvents(app);
    });

    this.on('message', async ({ client, message }) => {
      const app = await AppSupervisor.getInstance().getApp(client.app);

      if (!app) {
        return;
      }

      const parsedMessage = JSON.parse(message.toString());

      if (!parsedMessage.type) {
        return;
      }

      const eventName = `ws:message:${parsedMessage.type}`;

      app.emit(eventName, {
        clientId: client.id,
        tags: [...client.tags],
        payload: parsedMessage.payload,
      });
    });
  }

  private initializeRedisWSManager() {
    if (ClusterModeManager?.isEnabled() && RedisWebSocketManager) {
      this.redisWSManager = new RedisWebSocketManager(process.env.INSTANCE_ID || nanoid());
      
      // Set up event handlers for Redis WebSocket manager
      this.redisWSManager.on('clientConnected', (data: any) => {
        // Handle client connected on another instance
        console.log(`Client connected on another instance: ${data.clientId}`);
      });

      this.redisWSManager.on('clientDisconnected', (data: any) => {
        // Handle client disconnected on another instance
        console.log(`Client disconnected on another instance: ${data.clientId}`);
      });

      this.redisWSManager.on('websocketMessage', (data: any) => {
        // Handle WebSocket message from another instance
        this.handleCrossInstanceMessage(data);
      });

      this.redisWSManager.on('broadcastMessage', (data: any) => {
        // Handle broadcast message from another instance
        this.handleCrossInstanceBroadcast(data);
      });
    }
  }

  async start() {
    if (this.redisWSManager) {
      await this.redisWSManager.connect();
    }
  }

  async stop() {
    if (this.redisWSManager) {
      await this.redisWSManager.close();
    }
  }

  private handleCrossInstanceMessage(data: any) {
    const { app, message, targetClientId, targetTags } = data;
    
    if (targetClientId) {
      // Send to specific client
      const client = this.webSocketClients.get(targetClientId);
      if (client) {
        client.ws.send(JSON.stringify(message));
      }
    } else if (targetTags) {
      // Send to clients with specific tags
      for (const [clientId, client] of this.webSocketClients) {
        const hasMatchingTag = targetTags.some((tag: string) => client.tags.has(tag));
        if (hasMatchingTag) {
          client.ws.send(JSON.stringify(message));
        }
      }
    }
  }

  private handleCrossInstanceBroadcast(data: any) {
    const { app, message, targetTags } = data;
    
    // Broadcast to all clients or clients with specific tags
    for (const [clientId, client] of this.webSocketClients) {
      if (!targetTags || targetTags.some((tag: string) => client.tags.has(tag))) {
        client.ws.send(JSON.stringify(message));
      }
    }
  }

  bindAppWSEvents(app) {
    if (app.listenerCount('ws:setTag') > 0) {
      return;
    }

    app.on('ws:setTag', ({ clientId, tagKey, tagValue }) => {
      this.setClientTag(clientId, tagKey, tagValue);
    });

    app.on('ws:removeTag', ({ clientId, tagKey }) => {
      this.removeClientTag(clientId, tagKey);
    });

    app.on('ws:sendToTag', ({ tagKey, tagValue, message }) => {
      this.sendToConnectionsByTags(
        [
          { tagName: tagKey, tagValue },
          { tagName: 'app', tagValue: app.name },
        ],
        message,
      );
    });

    app.on('ws:sendToClient', ({ clientId, message }) => {
      this.sendToClient(clientId, message);
    });

    app.on('ws:sendToCurrentApp', ({ message }) => {
      this.sendToConnectionsByTag('app', app.name, message);
    });

    app.on('ws:sendToTags', ({ tags, message }) => {
      this.sendToConnectionsByTags(tags, message);
    });

    app.on('ws:authorized', ({ clientId, userId }) => {
      this.sendToClient(clientId, { type: 'authorized' });
    });
  }

  addNewConnection(ws: WebSocketWithId, request: IncomingMessage) {
    const id = nanoid();
    ws.id = id;

    const client: WebSocketClient = {
      ws,
      tags: new Set<string>(),
      url: request.url,
      headers: request.headers,
      id,
    };

    this.webSocketClients.set(id, client);

    this.setClientApp(client);

    // Sync with Redis if cluster mode is enabled
    if (this.redisWSManager) {
      this.redisWSManager.addConnection({
        id: client.id,
        tags: client.tags,
        url: client.url,
        headers: client.headers,
        app: client.app || 'main',
        timestamp: Date.now(),
      }).catch((error: any) => {
        console.error('Failed to sync client connection to Redis:', error);
      });
    }

    return client;
  }

  setClientTag(clientId: string, tagKey: string, tagValue: string) {
    const client = this.webSocketClients.get(clientId);
    if (!client) {
      return;
    }
    client.tags.add(`${tagKey}#${tagValue}`);
    console.log(`client tags: ${Array.from(client.tags)}`);
  }

  removeClientTag(clientId: string, tagKey: string) {
    const client = this.webSocketClients.get(clientId);
    // remove all tags with the given tagKey
    client.tags.forEach((tag) => {
      if (tag.startsWith(`${tagKey}#`)) {
        client.tags.delete(tag);
      }
    });
  }

  async setClientApp(client: WebSocketClient) {
    const req: IncomingRequest = {
      url: client.url,
      headers: client.headers,
    };

    const handleAppName = await Gateway.getInstance().getRequestHandleAppName(req);

    client.app = handleAppName;
    console.log(`client tags: app#${handleAppName}`);
    client.tags.add(`app#${handleAppName}`);

    const hasApp = AppSupervisor.getInstance().hasApp(handleAppName);

    if (!hasApp) {
      AppSupervisor.getInstance().bootStrapApp(handleAppName);
    }
  }

  removeConnection(id: string) {
    console.log(`client disconnected ${id}`);
    const client = this.webSocketClients.get(id);
    this.webSocketClients.delete(id);

    // Sync with Redis if cluster mode is enabled
    if (this.redisWSManager && client) {
      this.redisWSManager.removeConnection(id, client.app || 'main').catch((error: any) => {
        console.error('Failed to sync client disconnection to Redis:', error);
      });
    }
  }

  sendMessageToConnection(client: WebSocketClient, sendMessage: object) {
    client.ws.send(JSON.stringify(sendMessage));
  }

  sendToConnectionsByTag(tagName: string, tagValue: string, sendMessage: object) {
    this.sendToConnectionsByTags([{ tagName, tagValue }], sendMessage);
  }

  // Enhanced methods for cluster mode
  async sendToClient(clientId: string, message: object) {
    const client = this.webSocketClients.get(clientId);
    if (client) {
      // Send to local client
      client.ws.send(JSON.stringify(message));
    } else if (this.redisWSManager) {
      // Send to client on another instance
      await this.redisWSManager.sendToClient('main', clientId, message);
    }
  }

  async sendToClientsByTag(tagKey: string, tagValue: string, message: object) {
    // Send to local clients
    this.sendToConnectionsByTag(tagKey, tagValue, message);

    // Send to clients on other instances
    if (this.redisWSManager) {
      await this.redisWSManager.sendToClientsByTag('main', tagKey, tagValue, message);
    }
  }

  async broadcastToApp(app: string, message: object) {
    // Send to local clients
    for (const [clientId, client] of this.webSocketClients) {
      if (client.app === app) {
        client.ws.send(JSON.stringify(message));
      }
    }

    // Send to clients on other instances
    if (this.redisWSManager) {
      await this.redisWSManager.broadcastToApp(app, message);
    }
  }

  /**
   * Send message to clients that match all the given tag conditions
   * @param tags Array of tag conditions, each condition is an object with tagName and tagValue
   * @param sendMessage Message to be sent
   */
  sendToConnectionsByTags(tags: Array<{ tagName: string; tagValue: string }>, sendMessage: object) {
    this.loopThroughConnections((client: WebSocketClient) => {
      const allTagsMatch = tags.every(({ tagName, tagValue }) => client.tags.has(`${tagName}#${tagValue}`));

      if (allTagsMatch) {
        this.sendMessageToConnection(client, sendMessage);
      }
    });
  }


  sendToAppUser(appName: string, userId: string, message: object) {
    this.sendToConnectionsByTags(
      [
        { tagName: 'userId', tagValue: `${userId}` },
        { tagName: 'app', tagValue: appName },
      ],
      message,
    );
  }

  loopThroughConnections(callback: (client: WebSocketClient) => void) {
    this.webSocketClients.forEach((client) => {
      callback(client);
    });
  }

  close() {
    this.wss.close();
  }
}
