/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var cluster_mode_exports = {};
__export(cluster_mode_exports, {
  ClusterModeManager: () => import_cluster_mode_manager.ClusterModeManager,
  RedisEventQueueAdapter: () => import_redis_event_queue_adapter.RedisEventQueueAdapter,
  RedisPubSubAdapter: () => import_redis_pub_sub_adapter.RedisPubSubAdapter
});
module.exports = __toCommonJS(cluster_mode_exports);
var import_cluster_mode_manager = require("./cluster-mode-manager");
var import_redis_pub_sub_adapter = require("./redis-pub-sub-adapter");
var import_redis_event_queue_adapter = require("./redis-event-queue-adapter");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ClusterModeManager,
  RedisEventQueueAdapter,
  RedisPubSubAdapter
});
