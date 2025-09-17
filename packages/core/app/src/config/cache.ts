/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { CacheManagerOptions } from '@nocobase/cache';

// Import cluster mode manager
let ClusterModeManager: any = null;
try {
  ClusterModeManager = require('@nocobase/server/src/cluster-mode/cluster-mode-manager').ClusterModeManager;
} catch (error) {
  // Cluster mode manager not available, use fallback
}

export const cacheManager = {
  defaultStore: ClusterModeManager?.isEnabled() 
    ? 'redis' 
    : (process.env.CACHE_DEFAULT_STORE || 'memory'),
  stores: {
    memory: {
      store: 'memory',
      max: parseInt(process.env.CACHE_MEMORY_MAX) || 2000,
    },
    ...(process.env.CACHE_REDIS_URL || ClusterModeManager?.isEnabled()
      ? {
          redis: {
            url: process.env.CACHE_REDIS_URL || process.env.REDIS_URL || 'redis://localhost:6379',
            keyPrefix: ClusterModeManager?.isEnabled() 
              ? (ClusterModeManager.getRedisKeyPrefix() + 'cache:')
              : undefined,
          },
        }
      : {}),
  },
} as CacheManagerOptions;
