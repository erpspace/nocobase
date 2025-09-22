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
export declare const defaultOptions: MulticorePluginOptions;
export declare function buildRedisUrl(options: MulticorePluginOptions): string;
