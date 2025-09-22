import { Context } from '@nocobase/actions';

export async function getMulticoreInfo(ctx: Context) {
  const { app } = ctx;
  
  try {
    // Access the multicore plugin instance
    const multicorePlugin = app.getPlugin('@erpspace/plugin-multicore');
    
    if (!multicorePlugin) {
      ctx.throw(500, 'Multicore plugin not loaded');
    }
    
    const info = await multicorePlugin.getInstanceInfo();
    ctx.body = {
      data: info
    };
  } catch (error) {
    console.error('[Multicore] Error getting multicore info:', error);
    ctx.throw(500, `Failed to get multicore info: ${error.message}`);
  }
}