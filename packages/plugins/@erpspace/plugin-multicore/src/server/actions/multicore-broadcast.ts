import { Context } from '@nocobase/actions';

export async function broadcastMessage(ctx: Context) {
  const { app } = ctx;
  const { type, data, targetInstance } = ctx.request.body as { type: string; data: any; targetInstance?: string };
  
  try {
    // Access the multicore plugin instance
    const multicorePlugin = app.getPlugin('@erpspace/plugin-multicore');
    
    if (!multicorePlugin) {
      ctx.throw(500, 'Multicore plugin not loaded');
    }
    
    const wsManager = multicorePlugin.getWebSocketManager();
    
    if (!wsManager) {
      ctx.throw(500, 'WebSocket manager not initialized in multicore plugin');
    }
    
    await wsManager.broadcast(type, data, targetInstance);
    
    ctx.body = {
      status: 'ok',
      message: `Message of type "${type}" broadcasted.`
    };
  } catch (error) {
    console.error('[Multicore] Error broadcasting message:', error);
    ctx.throw(500, `Failed to broadcast message: ${error.message}`);
  }
}