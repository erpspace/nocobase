/**
 * Configuration for @erpspace/plugin-multicore
 */

export interface MulticorePluginOptions {
  redisUrl?: string;
  redisHost?: string;
  redisPort?: number;
  redisPassword?: string;
  redisDb?: number;
  enableWebSocketManager?: boolean;
  cacheTtl?: number;
  keyPrefix?: string;
}

export const defaultOptions: MulticorePluginOptions = {
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  redisHost: process.env.REDIS_HOST || 'localhost',
  redisPort: parseInt(process.env.REDIS_PORT || '6379'),
  redisPassword: process.env.REDIS_PASSWORD,
  redisDb: parseInt(process.env.REDIS_DB || '0'),
  enableWebSocketManager: true,
  cacheTtl: 3600, // 1 hour
  keyPrefix: 'nocobase:multicore'
};

export function buildRedisUrl(options: MulticorePluginOptions): string {
  if (options.redisUrl) {
    return options.redisUrl;
  }

  let url = 'redis://';
  
  if (options.redisPassword) {
    url += `:${options.redisPassword}@`;
  }
  
  url += `${options.redisHost}:${options.redisPort}`;
  
  if (options.redisDb) {
    url += `/${options.redisDb}`;
  }
  
  return url;
}
