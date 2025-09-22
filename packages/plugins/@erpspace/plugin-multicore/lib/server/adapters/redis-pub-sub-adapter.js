"use strict";
/**
 * Redis PubSub Adapter for NocoBase Multicore Plugin
 * Implements IPubSubAdapter using Redis for inter-instance communication
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
exports.RedisPubSubAdapter = void 0;
var ioredis_1 = require("ioredis");
var RedisPubSubAdapter = /** @class */ (function () {
    function RedisPubSubAdapter(redisUrl) {
        if (redisUrl === void 0) { redisUrl = 'redis://localhost:6379'; }
        this.connected = false;
        this.redis = new ioredis_1.Redis(redisUrl, {
            maxRetriesPerRequest: 3,
            lazyConnect: true,
        });
        this.subscriber = new ioredis_1.Redis(redisUrl, {
            maxRetriesPerRequest: 3,
            lazyConnect: true,
        });
        this.setupEventHandlers();
    }
    RedisPubSubAdapter.prototype.setupEventHandlers = function () {
        this.redis.on('connect', function () {
            console.log('[Multicore] Redis PubSub publisher connected');
        });
        this.redis.on('error', function (error) {
            console.error('[Multicore] Redis PubSub publisher error', error);
        });
        this.subscriber.on('connect', function () {
            console.log('[Multicore] Redis PubSub subscriber connected');
        });
        this.subscriber.on('error', function (error) {
            console.error('[Multicore] Redis PubSub subscriber error', error);
        });
    };
    RedisPubSubAdapter.prototype.connect = function () {
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
                        return [4 /*yield*/, Promise.all([
                                this.redis.connect(),
                                this.subscriber.connect()
                            ])];
                    case 2:
                        _a.sent();
                        this.connected = true;
                        console.log('[Multicore] Redis PubSub adapter connected');
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error('[Multicore] Failed to connect Redis PubSub adapter', error_1);
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    RedisPubSubAdapter.prototype.close = function () {
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
                        return [4 /*yield*/, Promise.all([
                                this.redis.quit(),
                                this.subscriber.quit()
                            ])];
                    case 2:
                        _a.sent();
                        this.connected = false;
                        console.log('[Multicore] Redis PubSub adapter closed');
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.error('[Multicore] Error closing Redis PubSub adapter', error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    RedisPubSubAdapter.prototype.isConnected = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.connected && this.redis.status === 'ready' && this.subscriber.status === 'ready'];
            });
        });
    };
    RedisPubSubAdapter.prototype.publish = function (channel, message) {
        return __awaiter(this, void 0, void 0, function () {
            var messageStr, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        messageStr = typeof message === 'string' ? message : JSON.stringify(message);
                        return [4 /*yield*/, this.redis.publish(channel, messageStr)];
                    case 1:
                        _a.sent();
                        console.log("[Multicore] Published message to channel: ".concat(channel));
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        console.error("[Multicore] Error publishing to channel ".concat(channel, ":"), error_3);
                        throw error_3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RedisPubSubAdapter.prototype.subscribe = function (channel, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.subscriber.subscribe(channel)];
                    case 1:
                        _a.sent();
                        this.subscriber.on('message', function (receivedChannel, message) {
                            if (receivedChannel === channel) {
                                try {
                                    var parsedMessage = void 0;
                                    try {
                                        parsedMessage = JSON.parse(message);
                                    }
                                    catch (_a) {
                                        parsedMessage = message;
                                    }
                                    callback(parsedMessage);
                                }
                                catch (error) {
                                    console.error("[Multicore] Error processing message from channel ".concat(channel, ":"), error);
                                }
                            }
                        });
                        console.log("[Multicore] Subscribed to channel: ".concat(channel));
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        console.error("[Multicore] Error subscribing to channel ".concat(channel, ":"), error_4);
                        throw error_4;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RedisPubSubAdapter.prototype.unsubscribe = function (channel) {
        return __awaiter(this, void 0, void 0, function () {
            var error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.subscriber.unsubscribe(channel)];
                    case 1:
                        _a.sent();
                        console.log("[Multicore] Unsubscribed from channel: ".concat(channel));
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        console.error("[Multicore] Error unsubscribing from channel ".concat(channel, ":"), error_5);
                        throw error_5;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return RedisPubSubAdapter;
}());
exports.RedisPubSubAdapter = RedisPubSubAdapter;
//# sourceMappingURL=redis-pub-sub-adapter.js.map