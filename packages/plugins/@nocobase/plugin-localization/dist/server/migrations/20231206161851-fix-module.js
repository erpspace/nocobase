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
var fix_module_exports = {};
__export(fix_module_exports, {
  default: () => FixModuleMigration,
  getSchemaUid: () => getSchemaUid,
  getTextsFromMenu: () => getTextsFromMenu
});
module.exports = __toCommonJS(fix_module_exports);
var import_database = require("@nocobase/database");
var import_server = require("@nocobase/server");
var import_constants = require("../constants");
var import_utils = require("../utils");
const NAMESPACE_MENUS = `${import_constants.NAMESPACE_PREFIX}menus`;
const getTextsFromDB = async (db) => {
  const result = {};
  const collections = Array.from(db.collections.values());
  for (const collection of collections) {
    const fields = Array.from(collection.fields.values()).filter((field) => {
      var _a;
      return (_a = field.options) == null ? void 0 : _a.translation;
    }).map((field) => field.name);
    if (!fields.length) {
      continue;
    }
    const repo = db.getRepository(collection.name);
    const records = await repo.find({ fields });
    records.forEach((record) => {
      const texts = (0, import_utils.getTextsFromDBRecord)(fields, record);
      texts.forEach((text) => result[text] = "");
    });
  }
  return result;
};
const getSchemaUid = async (db, migrate = false) => {
  if (migrate) {
    const systemSettings = await db.getRepository("systemSettings").findOne();
    const options = (systemSettings == null ? void 0 : systemSettings.options) || {};
    const { adminSchemaUid, mobileSchemaUid } = options;
    return { adminSchemaUid, mobileSchemaUid };
  }
  return { adminSchemaUid: "nocobase-admin-menu", mobileSchemaUid: "nocobase-mobile-container" };
};
const getTextsFromMenu = async (db, migrate = false) => {
  var _a, _b, _c, _d;
  const result = {};
  const { adminSchemaUid, mobileSchemaUid } = await getSchemaUid(db, migrate);
  const repo = db.getRepository("uiSchemas");
  if (adminSchemaUid) {
    const schema = await repo.getProperties(adminSchemaUid);
    const extractTitle = (schema2) => {
      if (schema2 == null ? void 0 : schema2.properties) {
        Object.values(schema2.properties).forEach((item) => {
          if (item.title) {
            result[item.title] = "";
          }
          extractTitle(item);
        });
      }
    };
    extractTitle(schema);
  }
  if (mobileSchemaUid) {
    const schema = await repo.getProperties(mobileSchemaUid);
    if ((_b = (_a = schema == null ? void 0 : schema["properties"]) == null ? void 0 : _a.tabBar) == null ? void 0 : _b.properties) {
      Object.values((_d = (_c = schema["properties"]) == null ? void 0 : _c.tabBar) == null ? void 0 : _d.properties).forEach((item) => {
        var _a2;
        const title = (_a2 = item["x-component-props"]) == null ? void 0 : _a2.title;
        if (title) {
          result[title] = "";
        }
      });
    }
  }
  return result;
};
class FixModuleMigration extends import_server.Migration {
  appVersion = "<0.17.0-alpha.3";
  async up() {
    const result = await this.app.version.satisfies("<=0.17.0-alpha.4");
    if (!result) {
      return;
    }
    const resources = await this.app.localeManager.getCacheResources("zh-CN");
    const menus = await getTextsFromMenu(this.context.db, true);
    const collections = await getTextsFromDB(this.context.db);
    const db = this.context.db;
    await db.getCollection("localizationTexts").sync();
    await db.sequelize.transaction(async (t) => {
      const menuTexts = Object.keys(menus);
      await db.getModel("localizationTexts").update(
        {
          module: `resources.${NAMESPACE_MENUS}`
        },
        {
          where: {
            text: {
              [import_database.Op.in]: menuTexts
            }
          },
          transaction: t
        }
      );
      const collectionTexts = Object.keys(collections);
      await db.getModel("localizationTexts").update(
        {
          module: `resources.${import_constants.NAMESPACE_COLLECTIONS}`
        },
        {
          where: {
            text: {
              [import_database.Op.in]: collectionTexts
            }
          },
          transaction: t
        }
      );
      for (const [module2, resource] of Object.entries(resources)) {
        if (module2 === "client") {
          continue;
        }
        const texts = Object.keys(resource);
        await db.getModel("localizationTexts").update(
          {
            module: `resources.${module2}`
          },
          {
            where: {
              text: {
                [import_database.Op.in]: texts
              }
            },
            transaction: t
          }
        );
      }
    });
  }
  async down() {
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getSchemaUid,
  getTextsFromMenu
});
