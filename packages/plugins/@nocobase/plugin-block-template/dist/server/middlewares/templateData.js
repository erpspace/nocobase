/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var templateData_exports = {};
__export(templateData_exports, {
  templateDataMiddleware: () => templateDataMiddleware
});
module.exports = __toCommonJS(templateData_exports);
var import_lodash = __toESM(require("lodash"));
var import_template = require("../utils/template");
async function templateDataMiddleware(ctx, next) {
  await next();
  if (ctx.action.resourceName === "uiSchemas" && ["getProperties", "getJsonSchema", "getParentJsonSchema"].includes(ctx.action.actionName)) {
    const schema = ctx.body;
    const schemaRepository = ctx.db.getRepository("uiSchemas");
    const blockTemplateRepository = ctx.db.getRepository("blockTemplates");
    await convertTemplateRootRefToUid(schema, schemaRepository);
    await fillTemplateData(schema, schemaRepository, blockTemplateRepository).catch((e) => {
      ctx.logger.error(e);
    });
  }
}
async function convertTemplateRootRefToUid(schema, schemaRepository) {
  if (schema == null ? void 0 : schema["x-template-root-ref"]) {
    const rootParentUid = schema["x-template-root-ref"]["x-template-uid"];
    const rootParentSchema = await schemaRepository.getJsonSchema(rootParentUid, { readFromCache: true });
    const templateRootUid = import_lodash.default.get(rootParentSchema, schema["x-template-root-ref"]["x-path"]);
    if (templateRootUid) {
      schema["x-template-root-uid"] = templateRootUid;
    }
  }
}
async function fillTemplateData(schema, schemaRepository, blockTemplateRepository) {
  const [uids, keys] = collectBlockTemplateData(schema);
  if (uids.size > 0) {
    schema["x-template-schemas"] = {};
  }
  if (keys.size > 0) {
    schema["x-template-infos"] = {};
  }
  if (!schema["x-template-root-uid"] && schema["x-template-uid"]) {
    const template = await schemaRepository.getJsonSchema(schema["x-template-uid"], {
      includeAsyncNode: true,
      readFromCache: true
    });
    const newSchema = (0, import_template.mergeSchema)(template, schema, import_lodash.default.cloneDeep(template));
    (0, import_template.cleanSchema)(newSchema, schema["x-template-uid"]);
    import_lodash.default.merge(schema, newSchema);
  }
  const chunkSize = 5;
  const uidChunks = import_lodash.default.chunk(Array.from(uids), chunkSize);
  for (const uidChunk of uidChunks) {
    const batchResults = await Promise.all(
      uidChunk.map(
        (uid) => schemaRepository.getJsonSchema(uid, { readFromCache: true }).then((templateSchema) => [uid, templateSchema])
      )
    );
    for (const [uid, templateSchema] of batchResults) {
      schema["x-template-schemas"][uid] = templateSchema;
    }
  }
  const templates = await blockTemplateRepository.find({
    filter: {
      key: { $in: Array.from(keys) }
    }
  });
  for (const template of templates) {
    schema["x-template-infos"][template.key] = template;
  }
}
function collectBlockTemplateData(schema, data = [/* @__PURE__ */ new Set(), /* @__PURE__ */ new Set()]) {
  if (schema == null ? void 0 : schema["x-template-root-uid"]) {
    data[0].add(schema["x-template-root-uid"]);
  }
  if (schema == null ? void 0 : schema["x-block-template-key"]) {
    data[1].add(schema["x-block-template-key"]);
  }
  if (!(schema == null ? void 0 : schema.properties)) {
    return data;
  }
  for (const property of Object.values(schema.properties)) {
    collectBlockTemplateData(property, data);
  }
  return data;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  templateDataMiddleware
});
