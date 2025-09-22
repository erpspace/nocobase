/**
 * API action for broadcasting messages across instances
 */

import { Context } from '@nocobase/actions';

export async function broadcastMessage(ctx: Context) {
  const { app } = ctx;
  const { type, data, targetInstance } = ctx.request.body;
  
  try {
    // Get the multicore plugin
    const multicorePlugin = app.getPlugin('@erpspace/plugin-multicore');
    
    if (!multicorePlugin) {
      return ctx.throw(404, 'Multicore plugin not found');
    }

    const wsManager = multicorePlugin.getWebSocketManager();
    
    if (!wsManager) {
      return ctx.throw(500, 'WebSocket manager not available');
    }

    if (!type) {
      return ctx.throw(400, 'Message type is required');
    }

    const message = {
      type,
      data: data || {},
      targetApp: app.name
    };

    if (targetInstance) {
      // Send to specific instance
      await wsManager.sendToInstance(targetInstance, message);
      ctx.body = {
        success: true,
        message: `Message sent to instance ${targetInstance}`,
        data: { type, targetInstance }
      };
    } else {
      // Broadcast to all instances
      await wsManager.broadcast(message);
      ctx.body = {
        success: true,
        message: 'Message broadcasted to all instances',
        data: { type }
      };
    }
  } catch (error) {
    console.error('[Multicore] Error broadcasting message:', error);
    ctx.throw(500, 'Failed to broadcast message');
  }
}
