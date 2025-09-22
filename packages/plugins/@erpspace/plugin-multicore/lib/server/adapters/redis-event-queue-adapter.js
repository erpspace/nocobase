"use strict";
/**
 * Redis EventQueue Adapter for NocoBase Multicore Plugin
 * Implements IEventQueueAdapter using Redis for distributed event queuing
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisEventQueueAdapter = void 0;
var ioredis_1 = require("ioredis");
var RedisEventQueueAdapter = /** @class */ (function () {
    function RedisEventQueueAdapter(redisUrl) {
        if (redisUrl === void 0) { redisUrl = 'redis://localhost:6379'; }
        this.connected = false;
        this.redis = new ioredis_1.Redis(redisUrl, {
            maxRetriesPerRequest: 3,
            lazyConnect: true,
        });
        this.setupEventHandlers();
    }
    RedisEventQueueAdapter.prototype.setupEventHandlers = function () {
        this.redis.on('connect', function () {
            console.log('[Multicore] Redis EventQueue connected');
        });
        this.redis.on('error', function (error) {
            console.error('[Multicore] Redis EventQueue error', error);
        });
    };
    RedisEventQueueAdapter.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.connected) {
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.redis.connect()];
                    case 2:
                        _a.sent();
                        this.connected = true;
                        console.log('[Multicore] Redis EventQueue adapter connected');
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error('[Multicore] Failed to connect Redis EventQueue adapter', error_1);
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    RedisEventQueueAdapter.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.connected) {
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.redis.quit()];
                    case 2:
                        _a.sent();
                        this.connected = false;
                        console.log('[Multicore] Redis EventQueue adapter closed');
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.error('[Multicore] Error closing Redis EventQueue adapter', error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    RedisEventQueueAdapter.prototype.isConnected = function () {
        return this.connected && this.redis.status === 'ready';
    };
    RedisEventQueueAdapter.prototype.push = function (channel, event) {
        return __awaiter(this, void 0, void 0, function () {
            var eventStr, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        eventStr = typeof event === 'string' ? event : JSON.stringify(event);
                        return [4 /*yield*/, this.redis.lpush("nocobase:queue:".concat(channel), eventStr)];
                    case 1:
                        _a.sent();
                        console.log("[Multicore] Pushed event to queue: ".concat(channel));
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        console.error("[Multicore] Error pushing event to queue ".concat(channel, ":"), error_3);
                        throw error_3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RedisEventQueueAdapter.prototype.pop = function (channel) {
        return __awaiter(this, void 0, void 0, function () {
            var result, eventStr, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.redis.brpop("nocobase:queue:".concat(channel), 1)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            eventStr = result[1];
                            try {
                                return [2 /*return*/, JSON.parse(eventStr)];
                            }
                            catch (_b) {
                                return [2 /*return*/, eventStr];
                            }
                        }
                        return [2 /*return*/, null];
                    case 2:
                        error_4 = _a.sent();
                        console.error("[Multicore] Error popping event from queue ".concat(channel, ":"), error_4);
                        throw error_4;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RedisEventQueueAdapter.prototype.length = function (channel) {
        return __awaiter(this, void 0, void 0, function () {
            var error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.redis.llen("nocobase:queue:".concat(channel))];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_5 = _a.sent();
                        console.error("[Multicore] Error getting queue length for ".concat(channel, ":"), error_5);
                        throw error_5;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RedisEventQueueAdapter.prototype.clear = function (channel) {
        return __awaiter(this, void 0, void 0, function () {
            var error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.redis.del("nocobase:queue:".concat(channel))];
                    case 1:
                        _a.sent();
                        console.log("[Multicore] Cleared queue: ".concat(channel));
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        console.error("[Multicore] Error clearing queue ".concat(channel, ":"), error_6);
                        throw error_6;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RedisEventQueueAdapter.prototype.subscribe = function (channel, event) {
        // Redis EventQueue adapter doesn't need explicit subscription
        // Events are processed by polling the queue
        console.log("[Multicore] Subscribed to queue: ".concat(channel));
    };
    RedisEventQueueAdapter.prototype.unsubscribe = function (channel) {
        // Redis EventQueue adapter doesn't need explicit unsubscription
        console.log("[Multicore] Unsubscribed from queue: ".concat(channel));
    };
    RedisEventQueueAdapter.prototype.publish = function (channel, message, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var messageWithOptions, messageStr, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        messageWithOptions = {
                            id: "msg_".concat(Date.now(), "_").concat(Math.random()),
                            content: message,
                            options: {
                                retried: options.retried || 0,
                                timestamp: options.timestamp || Date.now()
                            }
                        };
                        messageStr = JSON.stringify(messageWithOptions);
                        return [4 /*yield*/, this.redis.lpush("nocobase:queue:".concat(channel), messageStr)];
                    case 1:
                        _a.sent();
                        console.log("[Multicore] Published message to queue: ".concat(channel));
                        return [3 /*break*/, 3];
                    case 2:
                        error_7 = _a.sent();
                        console.error("[Multicore] Error publishing to queue ".concat(channel, ":"), error_7);
                        throw error_7;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return RedisEventQueueAdapter;
}());
exports.RedisEventQueueAdapter = RedisEventQueueAdapter;
//# sourceMappingURL=redis-event-queue-adapter.js.map