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
var add_duration_unit_exports = {};
__export(add_duration_unit_exports, {
  default: () => add_duration_unit_default
});
module.exports = __toCommonJS(add_duration_unit_exports);
var import_server = require("@nocobase/server");
const UnitOptions = [6048e5, 864e5, 36e5, 6e4, 1e3];
function getNumberOption(v) {
  return UnitOptions.find((item) => !(v % item));
}
class add_duration_unit_default extends import_server.Migration {
  appVersion = "<1.7.0";
  async up() {
    const { db } = this.context;
    const NodeRepo = db.getRepository("flow_nodes");
    await db.sequelize.transaction(async (transaction) => {
      const nodes = await NodeRepo.find({
        filter: {
          type: "delay"
        },
        transaction
      });
      await nodes.reduce(
        (promise, node) => promise.then(async () => {
          if (node.config.unit) {
            return;
          }
          if (!node.config.duration) {
            return;
          }
          const unit = getNumberOption(node.config.duration);
          const duration = node.config.duration / unit;
          node.set("config", { ...node.config, duration, unit });
          node.changed("config", true);
          await node.save({
            silent: true,
            transaction
          });
        }),
        Promise.resolve()
      );
    });
  }
}
