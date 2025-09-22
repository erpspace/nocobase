"use strict";
/**
 * Configuration for @erpspace/plugin-multicore
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildRedisUrl = exports.defaultOptions = void 0;
exports.defaultOptions = {
    redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
    redisHost: process.env.REDIS_HOST || 'localhost',
    redisPort: parseInt(process.env.REDIS_PORT || '6379'),
    redisPassword: process.env.REDIS_PASSWORD,
    redisDb: parseInt(process.env.REDIS_DB || '0'),
    enableWebSocketManager: true,
    cacheTtl: 3600,
    keyPrefix: 'nocobase:multicore'
};
function buildRedisUrl(options) {
    if (options.redisUrl) {
        return options.redisUrl;
    }
    var url = 'redis://';
    if (options.redisPassword) {
        url += ":".concat(options.redisPassword, "@");
    }
    url += "".concat(options.redisHost, ":").concat(options.redisPort);
    if (options.redisDb) {
        url += "/".concat(options.redisDb);
    }
    return url;
}
exports.buildRedisUrl = buildRedisUrl;
//# sourceMappingURL=config.js.map