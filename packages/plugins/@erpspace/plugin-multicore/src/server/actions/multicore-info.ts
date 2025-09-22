/**
 * API action for getting multicore instance information
 */

import { Context } from '@nocobase/actions';

export async function getMulticoreInfo(ctx: Context) {
  const { app } = ctx;
  
  try {
    // Get the multicore plugin
    const multicorePlugin = app.getPlugin('@erpspace/plugin-multicore');
    
    if (!multicorePlugin) {
      return ctx.throw(404, 'Multicore plugin not found');
    }

    // Get instance information
    const instanceInfo = await multicorePlugin.getInstanceInfo();
    
    // Get additional system information
    const systemInfo = {
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      cpuUsage: process.cpuUsage(),
      pid: process.pid,
      appName: app.name,
      appVersion: await app.version.get(),
      instanceId: app.instanceId
    };

    ctx.body = {
      success: true,
      data: {
        ...instanceInfo,
        system: systemInfo,
        timestamp: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error('[Multicore] Error getting instance info:', error);
    ctx.throw(500, 'Failed to get multicore information');
  }
}
