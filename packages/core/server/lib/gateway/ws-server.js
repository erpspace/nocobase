/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var ws_server_exports = {};
__export(ws_server_exports, {
  WSServer: () => WSServer
});
module.exports = __toCommonJS(ws_server_exports);
var import_gateway = require("../gateway");
var import_ws = require("ws");
var import_nanoid = require("nanoid");
var import_app_supervisor = require("../app-supervisor");
var import_errors = require("./errors");
var import_lodash = __toESM(require("lodash"));
var import_events = __toESM(require("events"));
let ClusterModeManager = null;
let RedisWebSocketManager = null;
try {
  const clusterMode = require("../cluster-mode/cluster-mode-manager");
  ClusterModeManager = clusterMode.ClusterModeManager;
  const redisWS = require("../cluster-mode/redis-websocket-manager");
  RedisWebSocketManager = redisWS.RedisWebSocketManager;
} catch (error) {
}
function getPayloadByErrorCode(code, options) {
  const error = (0, import_errors.getErrorWithCode)(code);
  return import_lodash.default.omit((0, import_errors.applyErrorWithArgs)(error, options), ["status", "maintaining"]);
}
__name(getPayloadByErrorCode, "getPayloadByErrorCode");
const _WSServer = class _WSServer extends import_events.default {
  wss;
  webSocketClients = /* @__PURE__ */ new Map();
  logger;
  redisWSManager = null;
  constructor() {
    super();
    this.wss = new import_ws.WebSocketServer({ noServer: true });
    this.initializeRedisWSManager();
    this.wss.on("connection", (ws, request) => {
      const client = this.addNewConnection(ws, request);
      console.log(`new client connected ${ws.id}`);
      ws.on("error", () => {
        this.removeConnection(ws.id);
      });
      ws.on("close", () => {
        this.removeConnection(ws.id);
      });
      ws.on("message", (message) => {
        if (message.toString() === "ping") {
          return;
        }
        this.emit("message", {
          client,
          message
        });
      });
    });
    import_gateway.Gateway.getInstance().on("appSelectorChanged", () => {
      this.loopThroughConnections(async (client) => {
        const handleAppName = await import_gateway.Gateway.getInstance().getRequestHandleAppName({
          url: client.url,
          headers: client.headers
        });
        for (const tag of client.tags) {
          if (tag.startsWith("app#")) {
            client.tags.delete(tag);
          }
        }
        client.tags.add(`app#${handleAppName}`);
        import_app_supervisor.AppSupervisor.getInstance().bootStrapApp(handleAppName);
      });
    });
    import_app_supervisor.AppSupervisor.getInstance().on("appError", async ({ appName, error }) => {
      let message = error.message;
      if (error.cause) {
        message = `${message}: ${error.cause.message}`;
      }
      this.sendToConnectionsByTag("app", appName, {
        type: "notification",
        payload: {
          message,
          type: "error"
        }
      });
    });
    import_app_supervisor.AppSupervisor.getInstance().on("appMaintainingMessageChanged", async ({ appName, message, command, status }) => {
      const app = await import_app_supervisor.AppSupervisor.getInstance().getApp(appName, {
        withOutBootStrap: true
      });
      const payload = getPayloadByErrorCode(status, {
        app,
        message,
        command
      });
      this.sendToConnectionsByTag("app", appName, {
        type: "maintaining",
        payload
      });
    });
    import_app_supervisor.AppSupervisor.getInstance().on("appStatusChanged", async ({ appName, status, options }) => {
      const app = await import_app_supervisor.AppSupervisor.getInstance().getApp(appName, {
        withOutBootStrap: true
      });
      const payload = getPayloadByErrorCode(status, { app, appName });
      this.sendToConnectionsByTag("app", appName, {
        type: "maintaining",
        payload: {
          ...payload,
          ...options
        }
      });
    });
    import_app_supervisor.AppSupervisor.getInstance().on("afterAppAdded", (app) => {
      this.bindAppWSEvents(app);
    });
    this.on("message", async ({ client, message }) => {
      const app = await import_app_supervisor.AppSupervisor.getInstance().getApp(client.app);
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
        payload: parsedMessage.payload
      });
    });
  }
  initializeRedisWSManager() {
    if ((ClusterModeManager == null ? void 0 : ClusterModeManager.isEnabled()) && RedisWebSocketManager) {
      this.redisWSManager = new RedisWebSocketManager(process.env.INSTANCE_ID || (0, import_nanoid.nanoid)());
      this.redisWSManager.on("clientConnected", (data) => {
        console.log(`Client connected on another instance: ${data.clientId}`);
      });
      this.redisWSManager.on("clientDisconnected", (data) => {
        console.log(`Client disconnected on another instance: ${data.clientId}`);
      });
      this.redisWSManager.on("websocketMessage", (data) => {
        this.handleCrossInstanceMessage(data);
      });
      this.redisWSManager.on("broadcastMessage", (data) => {
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
  handleCrossInstanceMessage(data) {
    const { app, message, targetClientId, targetTags } = data;
    if (targetClientId) {
      const client = this.webSocketClients.get(targetClientId);
      if (client) {
        client.ws.send(JSON.stringify(message));
      }
    } else if (targetTags) {
      for (const [clientId, client] of this.webSocketClients) {
        const hasMatchingTag = targetTags.some((tag) => client.tags.has(tag));
        if (hasMatchingTag) {
          client.ws.send(JSON.stringify(message));
        }
      }
    }
  }
  handleCrossInstanceBroadcast(data) {
    const { app, message, targetTags } = data;
    for (const [clientId, client] of this.webSocketClients) {
      if (!targetTags || targetTags.some((tag) => client.tags.has(tag))) {
        client.ws.send(JSON.stringify(message));
      }
    }
  }
  bindAppWSEvents(app) {
    if (app.listenerCount("ws:setTag") > 0) {
      return;
    }
    app.on("ws:setTag", ({ clientId, tagKey, tagValue }) => {
      this.setClientTag(clientId, tagKey, tagValue);
    });
    app.on("ws:removeTag", ({ clientId, tagKey }) => {
      this.removeClientTag(clientId, tagKey);
    });
    app.on("ws:sendToTag", ({ tagKey, tagValue, message }) => {
      this.sendToConnectionsByTags(
        [
          { tagName: tagKey, tagValue },
          { tagName: "app", tagValue: app.name }
        ],
        message
      );
    });
    app.on("ws:sendToClient", ({ clientId, message }) => {
      this.sendToClient(clientId, message);
    });
    app.on("ws:sendToCurrentApp", ({ message }) => {
      this.sendToConnectionsByTag("app", app.name, message);
    });
    app.on("ws:sendToTags", ({ tags, message }) => {
      this.sendToConnectionsByTags(tags, message);
    });
    app.on("ws:authorized", ({ clientId, userId }) => {
      this.sendToClient(clientId, { type: "authorized" });
    });
  }
  addNewConnection(ws, request) {
    const id = (0, import_nanoid.nanoid)();
    ws.id = id;
    const client = {
      ws,
      tags: /* @__PURE__ */ new Set(),
      url: request.url,
      headers: request.headers,
      id
    };
    this.webSocketClients.set(id, client);
    this.setClientApp(client);
    if (this.redisWSManager) {
      this.redisWSManager.addConnection({
        id: client.id,
        tags: client.tags,
        url: client.url,
        headers: client.headers,
        app: client.app || "main",
        timestamp: Date.now()
      }).catch((error) => {
        console.error("Failed to sync client connection to Redis:", error);
      });
    }
    return client;
  }
  setClientTag(clientId, tagKey, tagValue) {
    const client = this.webSocketClients.get(clientId);
    if (!client) {
      return;
    }
    client.tags.add(`${tagKey}#${tagValue}`);
    console.log(`client tags: ${Array.from(client.tags)}`);
  }
  removeClientTag(clientId, tagKey) {
    const client = this.webSocketClients.get(clientId);
    client.tags.forEach((tag) => {
      if (tag.startsWith(`${tagKey}#`)) {
        client.tags.delete(tag);
      }
    });
  }
  async setClientApp(client) {
    const req = {
      url: client.url,
      headers: client.headers
    };
    const handleAppName = await import_gateway.Gateway.getInstance().getRequestHandleAppName(req);
    client.app = handleAppName;
    console.log(`client tags: app#${handleAppName}`);
    client.tags.add(`app#${handleAppName}`);
    const hasApp = import_app_supervisor.AppSupervisor.getInstance().hasApp(handleAppName);
    if (!hasApp) {
      import_app_supervisor.AppSupervisor.getInstance().bootStrapApp(handleAppName);
    }
  }
  removeConnection(id) {
    console.log(`client disconnected ${id}`);
    const client = this.webSocketClients.get(id);
    this.webSocketClients.delete(id);
    if (this.redisWSManager && client) {
      this.redisWSManager.removeConnection(id, client.app || "main").catch((error) => {
        console.error("Failed to sync client disconnection to Redis:", error);
      });
    }
  }
  sendMessageToConnection(client, sendMessage) {
    client.ws.send(JSON.stringify(sendMessage));
  }
  sendToConnectionsByTag(tagName, tagValue, sendMessage) {
    this.sendToConnectionsByTags([{ tagName, tagValue }], sendMessage);
  }
  // Enhanced methods for cluster mode
  async sendToClient(clientId, message) {
    const client = this.webSocketClients.get(clientId);
    if (client) {
      client.ws.send(JSON.stringify(message));
    } else if (this.redisWSManager) {
      await this.redisWSManager.sendToClient("main", clientId, message);
    }
  }
  async sendToClientsByTag(tagKey, tagValue, message) {
    this.sendToConnectionsByTag(tagKey, tagValue, message);
    if (this.redisWSManager) {
      await this.redisWSManager.sendToClientsByTag("main", tagKey, tagValue, message);
    }
  }
  async broadcastToApp(app, message) {
    for (const [clientId, client] of this.webSocketClients) {
      if (client.app === app) {
        client.ws.send(JSON.stringify(message));
      }
    }
    if (this.redisWSManager) {
      await this.redisWSManager.broadcastToApp(app, message);
    }
  }
  /**
   * Send message to clients that match all the given tag conditions
   * @param tags Array of tag conditions, each condition is an object with tagName and tagValue
   * @param sendMessage Message to be sent
   */
  sendToConnectionsByTags(tags, sendMessage) {
    this.loopThroughConnections((client) => {
      const allTagsMatch = tags.every(({ tagName, tagValue }) => client.tags.has(`${tagName}#${tagValue}`));
      if (allTagsMatch) {
        this.sendMessageToConnection(client, sendMessage);
      }
    });
  }
  sendToAppUser(appName, userId, message) {
    this.sendToConnectionsByTags(
      [
        { tagName: "userId", tagValue: `${userId}` },
        { tagName: "app", tagValue: appName }
      ],
      message
    );
  }
  loopThroughConnections(callback) {
    this.webSocketClients.forEach((client) => {
      callback(client);
    });
  }
  close() {
    this.wss.close();
  }
};
__name(_WSServer, "WSServer");
let WSServer = _WSServer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  WSServer
});
