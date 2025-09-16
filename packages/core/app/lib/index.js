/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var import_server = require("@nocobase/server");
var import_config = require("./config");
async function initializeGateway() {
  await (0, import_server.runPluginStaticImports)();
  const config = await (0, import_config.getConfig)();
  await import_server.Gateway.getInstance().run({
    mainAppOptions: config
  });
}
__name(initializeGateway, "initializeGateway");
initializeGateway();
