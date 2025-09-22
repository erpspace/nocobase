"use strict";
/**
 * Redis WebSocket Manager for NocoBase Multicore Plugin
 * Manages WebSocket connections across multiple instances using Redis
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.RedisWebSocketManager = void 0;
var ioredis_1 = require("ioredis");
var events_1 = require("events");
var RedisWebSocketManager = /** @class */ (function (_super) {
    __extends(RedisWebSocketManager, _super);
    function RedisWebSocketManager(instanceId, redisUrl) {
        if (redisUrl === void 0) { redisUrl = 'redis://localhost:6379'; }
        var _this = _super.call(this) || this;
        _this.connected = false;
        _this.instanceId = instanceId;
        _this.redis = new ioredis_1.Redis(redisUrl, {
            maxRetriesPerRequest: 3,
            lazyConnect: true,
        });
        _this.subscriber = new ioredis_1.Redis(redisUrl, {
            maxRetriesPerRequest: 3,
            lazyConnect: true,
        });
        _this.setupEventHandlers();
        return _this;
    }
    RedisWebSocketManager.prototype.setupEventHandlers = function () {
        var _this = this;
        this.redis.on('connect', function () {
            console.log('[Multicore] Redis WebSocket publisher connected');
        });
        this.redis.on('error', function (error) {
            console.error('[Multicore] Redis WebSocket publisher error', error);
        });
        this.subscriber.on('connect', function () {
            console.log('[Multicore] Redis WebSocket subscriber connected');
        });
        this.subscriber.on('error', function (error) {
            console.error('[Multicore] Redis WebSocket subscriber error', error);
        });
        // Listen for WebSocket messages
        this.subscriber.on('message', function (channel, message) {
            if (channel.startsWith('nocobase:websocket:')) {
                try {
                    var parsedMessage = JSON.parse(message);
                    // Don't process messages from our own instance
                    if (parsedMessage.instanceId !== _this.instanceId) {
                        _this.emit('message', parsedMessage);
                    }
                }
                catch (error) {
                    console.error('[Multicore] Error parsing WebSocket message:', error);
                }
            }
        });
    };
    RedisWebSocketManager.prototype.connect = function () {
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
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, Promise.all([
                                this.redis.connect(),
                                this.subscriber.connect()
                            ])];
                    case 2:
                        _a.sent();
                        // Subscribe to WebSocket messages
                        return [4 /*yield*/, this.subscriber.subscribe('nocobase:websocket:*')];
                    case 3:
                        // Subscribe to WebSocket messages
                        _a.sent();
                        this.connected = true;
                        console.log('[Multicore] Redis WebSocket manager connected');
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.error('[Multicore] Failed to connect Redis WebSocket manager', error_1);
                        throw error_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    RedisWebSocketManager.prototype.close = function () {
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
                        console.log('[Multicore] Redis WebSocket manager closed');
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.error('[Multicore] Error closing Redis WebSocket manager', error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    RedisWebSocketManager.prototype.isConnected = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.connected && this.redis.status === 'ready' && this.subscriber.status === 'ready'];
            });
        });
    };
    RedisWebSocketManager.prototype.broadcast = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var messageWithInstance, messageStr, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        messageWithInstance = __assign(__assign({}, message), { instanceId: this.instanceId, timestamp: Date.now() });
                        messageStr = JSON.stringify(messageWithInstance);
                        return [4 /*yield*/, this.redis.publish('nocobase:websocket:broadcast', messageStr)];
                    case 1:
                        _a.sent();
                        console.log("[Multicore] Broadcasted WebSocket message: ".concat(message.type));
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        console.error('[Multicore] Error broadcasting WebSocket message:', error_3);
                        throw error_3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RedisWebSocketManager.prototype.sendToInstance = function (targetInstanceId, message) {
        return __awaiter(this, void 0, void 0, function () {
            var messageWithInstance, messageStr, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        messageWithInstance = __assign(__assign({}, message), { instanceId: this.instanceId, targetInstanceId: targetInstanceId, timestamp: Date.now() });
                        messageStr = JSON.stringify(messageWithInstance);
                        return [4 /*yield*/, this.redis.publish("nocobase:websocket:instance:".concat(targetInstanceId), messageStr)];
                    case 1:
                        _a.sent();
                        console.log("[Multicore] Sent WebSocket message to instance ".concat(targetInstanceId, ": ").concat(message.type));
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        console.error('[Multicore] Error sending WebSocket message to instance:', error_4);
                        throw error_4;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RedisWebSocketManager.prototype.addClient = function (clientId, clientInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var clientKey, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        clientKey = "nocobase:websocket:clients:".concat(this.instanceId);
                        return [4 /*yield*/, this.redis.hset(clientKey, clientId, JSON.stringify(__assign(__assign({}, clientInfo), { instanceId: this.instanceId, connectedAt: Date.now() })))];
                    case 1:
                        _a.sent();
                        console.log("[Multicore] Added WebSocket client: ".concat(clientId));
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        console.error('[Multicore] Error adding WebSocket client:', error_5);
                        throw error_5;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RedisWebSocketManager.prototype.removeClient = function (clientId) {
        return __awaiter(this, void 0, void 0, function () {
            var clientKey, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        clientKey = "nocobase:websocket:clients:".concat(this.instanceId);
                        return [4 /*yield*/, this.redis.hdel(clientKey, clientId)];
                    case 1:
                        _a.sent();
                        console.log("[Multicore] Removed WebSocket client: ".concat(clientId));
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        console.error('[Multicore] Error removing WebSocket client:', error_6);
                        throw error_6;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RedisWebSocketManager.prototype.getClients = function () {
        return __awaiter(this, void 0, void 0, function () {
            var clientKey, clients, clientMap, _i, _a, _b, clientId, clientData, error_7;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        clientKey = "nocobase:websocket:clients:".concat(this.instanceId);
                        return [4 /*yield*/, this.redis.hgetall(clientKey)];
                    case 1:
                        clients = _c.sent();
                        clientMap = new Map();
                        for (_i = 0, _a = Object.entries(clients); _i < _a.length; _i++) {
                            _b = _a[_i], clientId = _b[0], clientData = _b[1];
                            try {
                                clientMap.set(clientId, JSON.parse(clientData));
                            }
                            catch (error) {
                                console.error("[Multicore] Error parsing client data for ".concat(clientId, ":"), error);
                            }
                        }
                        return [2 /*return*/, clientMap];
                    case 2:
                        error_7 = _c.sent();
                        console.error('[Multicore] Error getting WebSocket clients:', error_7);
                        throw error_7;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RedisWebSocketManager.prototype.getAllInstances = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pattern, keys, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        pattern = 'nocobase:websocket:clients:*';
                        return [4 /*yield*/, this.redis.keys(pattern)];
                    case 1:
                        keys = _a.sent();
                        return [2 /*return*/, keys.map(function (key) { return key.replace('nocobase:websocket:clients:', ''); })];
                    case 2:
                        error_8 = _a.sent();
                        console.error('[Multicore] Error getting all instances:', error_8);
                        throw error_8;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return RedisWebSocketManager;
}(events_1.EventEmitter));
exports.RedisWebSocketManager = RedisWebSocketManager;
//# sourceMappingURL=redis-websocket-manager.js.map