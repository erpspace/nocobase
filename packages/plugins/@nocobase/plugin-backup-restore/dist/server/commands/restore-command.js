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
var restore_command_exports = {};
__export(restore_command_exports, {
  default: () => addRestoreCommand
});
module.exports = __toCommonJS(restore_command_exports);
var import_server = require("@nocobase/server");
var import_restorer = require("../restorer");
/* istanbul ignore file -- @preserve */
function addRestoreCommand(app) {
  app.command("restore").ipc().argument("<string>", "restore file path").option("-a, --app <appName>", "sub app name if you want to restore into a sub app").option("-f, --force", "force restore").option(
    "-g, --groups <groups>",
    "groups to restore",
    (value, previous) => {
      return previous.concat([value]);
    },
    []
  ).action(async (restoreFilePath, options) => {
    if (!options.force) {
      app.log.warn("This action will overwrite your current data, please make sure you have a backup\u2757\uFE0F\u2757\uFE0F");
      return;
    }
    let importApp = app;
    if (options.app) {
      if (!await app.db.getCollection("applications").repository.findOne({
        filter: { name: options.app }
      })) {
        await app.db.getCollection("applications").repository.create({
          values: {
            name: options.app
          }
        });
      }
      const subApp = await import_server.AppSupervisor.getInstance().getApp(options.app);
      if (!subApp) {
        app.log.error(`app ${options.app} not found`);
        await app.stop();
        return;
      }
      importApp = subApp;
    }
    const groups = new Set(options.groups);
    groups.add("required");
    const restorer = new import_restorer.Restorer(importApp, {
      backUpFilePath: restoreFilePath
    });
    await restorer.restore({
      groups
    });
    await app.upgrade();
  });
}
