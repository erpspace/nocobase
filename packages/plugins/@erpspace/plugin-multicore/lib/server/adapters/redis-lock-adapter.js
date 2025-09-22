"use strict";
/**
 * Redis Lock Adapter for NocoBase Multicore Plugin
 * Implements ILockAdapter using Redis for distributed locking
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
exports.RedisLockAdapter = exports.LockAbortError = exports.LockAcquireError = void 0;
var ioredis_1 = require("ioredis");
var crypto_1 = require("crypto");
var LockAcquireError = /** @class */ (function (_super) {
    __extends(LockAcquireError, _super);
    function LockAcquireError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = 'LockAcquireError';
        return _this;
    }
    return LockAcquireError;
}(Error));
exports.LockAcquireError = LockAcquireError;
var LockAbortError = /** @class */ (function (_super) {
    __extends(LockAbortError, _super);
    function LockAbortError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = 'LockAbortError';
        return _this;
    }
    return LockAbortError;
}(Error));
exports.LockAbortError = LockAbortError;
var RedisLockAdapter = /** @class */ (function () {
    function RedisLockAdapter(redisUrl) {
        if (redisUrl === void 0) { redisUrl = 'redis://localhost:6379'; }
        this.connected = false;
        this.redis = new ioredis_1.Redis(redisUrl, {
            maxRetriesPerRequest: 3,
            lazyConnect: true,
        });
        this.setupEventHandlers();
    }
    RedisLockAdapter.prototype.setupEventHandlers = function () {
        this.redis.on('connect', function () {
            console.log('[Multicore] Redis Lock adapter connected');
        });
        this.redis.on('error', function (error) {
            console.error('[Multicore] Redis Lock adapter error', error);
        });
    };
    RedisLockAdapter.prototype.connect = function () {
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
                        console.log('[Multicore] Redis Lock adapter connected');
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error('[Multicore] Failed to connect Redis Lock adapter', error_1);
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    RedisLockAdapter.prototype.close = function () {
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
                        console.log('[Multicore] Redis Lock adapter closed');
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.error('[Multicore] Error closing Redis Lock adapter', error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    RedisLockAdapter.prototype.acquire = function (key, ttl) {
        if (ttl === void 0) { ttl = 5000; }
        return __awaiter(this, void 0, void 0, function () {
            var lockValue, lockKey, startTime, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lockValue = (0, crypto_1.randomUUID)();
                        lockKey = "nocobase:lock:".concat(key);
                        startTime = Date.now();
                        _a.label = 1;
                    case 1:
                        if (!(Date.now() - startTime < ttl)) return [3 /*break*/, 7];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.redis.set(lockKey, lockValue, 'PX', ttl, 'NX')];
                    case 3:
                        result = _a.sent();
                        if (result === 'OK') {
                            console.log("[Multicore] Acquired lock for key: ".concat(key), { lockValue: lockValue, ttl: ttl });
                            return [2 /*return*/, lockValue];
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        error_3 = _a.sent();
                        console.error("[Multicore] Error acquiring lock for key: ".concat(key), error_3);
                        throw new LockAcquireError("Failed to acquire lock for key: ".concat(key));
                    case 5: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 7: throw new LockAcquireError("Failed to acquire lock for key: ".concat(key, " within ").concat(ttl, "ms"));
                }
            });
        });
    };
    RedisLockAdapter.prototype.release = function (key, lockValue) {
        return __awaiter(this, void 0, void 0, function () {
            var lockKey, script, result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lockKey = "nocobase:lock:".concat(key);
                        script = "\n      if redis.call(\"get\",KEYS[1]) == ARGV[1] then\n        return redis.call(\"del\",KEYS[1])\n      else\n        return 0\n      end\n    ";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.redis.eval(script, 1, lockKey, lockValue)];
                    case 2:
                        result = _a.sent();
                        if (result === 1) {
                            console.log("[Multicore] Released lock: ".concat(lockKey));
                        }
                        else {
                            console.warn("[Multicore] Lock was not released (may have expired): ".concat(lockKey));
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        console.error("[Multicore] Error releasing lock: ".concat(lockKey), error_4);
                        throw error_4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    RedisLockAdapter.prototype.exists = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var lockKey, result, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lockKey = "nocobase:lock:".concat(key);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.redis.exists(lockKey)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result === 1];
                    case 3:
                        error_5 = _a.sent();
                        console.error("[Multicore] Error checking if lock exists for key: ".concat(key), error_5);
                        throw error_5;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    RedisLockAdapter.prototype.getTtl = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var lockKey, ttl, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lockKey = "nocobase:lock:".concat(key);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.redis.pttl(lockKey)];
                    case 2:
                        ttl = _a.sent();
                        return [2 /*return*/, ttl > 0 ? ttl : 0];
                    case 3:
                        error_6 = _a.sent();
                        console.error("[Multicore] Error getting lock TTL for key: ".concat(key), error_6);
                        throw error_6;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    RedisLockAdapter.prototype.extend = function (key, lockValue, newTtl) {
        return __awaiter(this, void 0, void 0, function () {
            var lockKey, script, result, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lockKey = "nocobase:lock:".concat(key);
                        script = "\n      if redis.call(\"get\",KEYS[1]) == ARGV[1] then\n        return redis.call(\"pexpire\",KEYS[1],ARGV[2])\n      else\n        return 0\n      end\n    ";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.redis.eval(script, 1, lockKey, lockValue, newTtl)];
                    case 2:
                        result = _a.sent();
                        if (result) {
                            console.log("[Multicore] Extended lock TTL for key: ".concat(key), { newTtl: newTtl });
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/, false];
                    case 3:
                        error_7 = _a.sent();
                        console.error("[Multicore] Error extending lock TTL for key: ".concat(key), error_7);
                        throw error_7;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    RedisLockAdapter.prototype.runExclusive = function (key, fn, ttl) {
        return __awaiter(this, void 0, void 0, function () {
            var lockValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.acquire(key, ttl)];
                    case 1:
                        lockValue = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, , 4, 6]);
                        return [4 /*yield*/, fn()];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4: return [4 /*yield*/, this.release(key, lockValue)];
                    case 5:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    RedisLockAdapter.prototype.tryAcquire = function (key, timeout) {
        if (timeout === void 0) { timeout = 1000; }
        return __awaiter(this, void 0, void 0, function () {
            var lockValue, lockKey, startTime, result, error_8;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lockValue = (0, crypto_1.randomUUID)();
                        lockKey = "nocobase:lock:".concat(key);
                        startTime = Date.now();
                        _a.label = 1;
                    case 1:
                        if (!(Date.now() - startTime < timeout)) return [3 /*break*/, 7];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.redis.set(lockKey, lockValue, 'PX', timeout, 'NX')];
                    case 3:
                        result = _a.sent();
                        if (result === 'OK') {
                            console.log("[Multicore] Acquired lock for key: ".concat(key), { lockValue: lockValue, timeout: timeout });
                            return [2 /*return*/, {
                                    acquire: function (ttl) { return __awaiter(_this, void 0, void 0, function () {
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, function () { return __awaiter(_this, void 0, void 0, function () {
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0: return [4 /*yield*/, this.release(key, lockValue)];
                                                            case 1:
                                                                _a.sent();
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                }); }];
                                        });
                                    }); },
                                    runExclusive: function (fn, ttl) { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    _a.trys.push([0, , 2, 4]);
                                                    return [4 /*yield*/, fn()];
                                                case 1: return [2 /*return*/, _a.sent()];
                                                case 2: return [4 /*yield*/, this.release(key, lockValue)];
                                                case 3:
                                                    _a.sent();
                                                    return [7 /*endfinally*/];
                                                case 4: return [2 /*return*/];
                                            }
                                        });
                                    }); }
                                }];
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        error_8 = _a.sent();
                        console.error("[Multicore] Error acquiring lock for key: ".concat(key), error_8);
                        throw new LockAcquireError("Failed to acquire lock for key: ".concat(key));
                    case 5: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 7: throw new LockAcquireError("Failed to acquire lock for key: ".concat(key, " within ").concat(timeout, "ms"));
                }
            });
        });
    };
    return RedisLockAdapter;
}());
exports.RedisLockAdapter = RedisLockAdapter;
//# sourceMappingURL=redis-lock-adapter.js.map