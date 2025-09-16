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
var template_exports = {};
__export(template_exports, {
  cleanSchema: () => cleanSchema,
  getNewFullBlock: () => getNewFullBlock,
  mergeSchema: () => mergeSchema
});
module.exports = __toCommonJS(template_exports);
var import_utils = require("@nocobase/utils");
var import_lodash = __toESM(require("lodash"));
async function getNewFullBlock(db, transaction, blockUid) {
  const repository = db.getRepository("uiSchemas");
  const block = await repository.getJsonSchema(blockUid, {
    includeAsyncNode: true,
    readFromCache: true,
    transaction
  });
  const templateId = block["x-template-root-uid"];
  if (!templateId) {
    return block;
  }
  const template = await repository.getJsonSchema(templateId, {
    includeAsyncNode: true,
    readFromCache: true,
    transaction
  });
  const newSchema = mergeSchema(template, block, import_lodash.default.cloneDeep(template));
  cleanSchema(newSchema, templateId);
  return newSchema;
}
function getNewObjectValue(itemsMap) {
  const remainingTemplateItems = { properties: {} };
  for (const [_uid, item] of itemsMap.entries()) {
    let current = remainingTemplateItems;
    for (const pathItem of item.path.slice(1)) {
      if (!current.properties) {
        current.properties = {};
      }
      if (!current.properties[pathItem.key]) {
        current.properties[pathItem.key] = {
          ...pathItem.schema,
          properties: {}
        };
      }
      current = current.properties[pathItem.key];
    }
    current.properties = current.properties || {};
    current.properties[item.key] = item.schema;
  }
  return remainingTemplateItems.properties;
}
const NestedGridComponents = ["Grid", "Grid.Row", "Grid.Col"];
function collectGridItems(schema, itemsMap, parentPath = [], schemaKey) {
  const properties = schema.properties || {};
  const component = schema["x-component"];
  if (NestedGridComponents.includes(component)) {
    parentPath = [
      ...parentPath,
      {
        schema,
        type: component,
        key: schemaKey || ""
      }
    ];
  }
  for (const [key, property] of Object.entries(properties)) {
    if (!property) continue;
    const propertyComponent = property["x-component"];
    if (NestedGridComponents.includes(propertyComponent)) {
      collectGridItems(property, itemsMap, parentPath, key);
    } else if (property["x-uid"]) {
      itemsMap.set(property["x-uid"], {
        schema: property,
        path: parentPath,
        key
      });
    }
  }
}
function mergeSchema(template, schema, rootTemplate) {
  if (template["properties"] && !schema["properties"]) {
    schema["properties"] = {};
  }
  return import_lodash.default.mergeWith(
    template,
    schema,
    (objectValue, sourceValue, keyName, object, source) => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      if (sourceValue == null) {
        return objectValue;
      }
      if (keyName === "default" && object["x-settings"] === "actionSettings:filter") {
        return sourceValue || objectValue;
      }
      if (import_lodash.default.isObject(sourceValue)) {
        if (import_lodash.default.isArray(sourceValue)) {
          return sourceValue || objectValue;
        }
        if (keyName === "properties") {
          const sourceKeys = Object.keys(sourceValue);
          let targetKeys = Object.keys(objectValue || {});
          if (NestedGridComponents.includes(source["x-component"]) && NestedGridComponents.includes(object["x-component"])) {
            const tItemsMap = /* @__PURE__ */ new Map();
            const sItemsMap = /* @__PURE__ */ new Map();
            collectGridItems(object, tItemsMap);
            collectGridItems(source, sItemsMap);
            for (const [uid2, sourceItem] of sItemsMap.entries()) {
              if (!sourceItem.schema["x-template-uid"]) continue;
              const templateItem = tItemsMap.get(sourceItem.schema["x-template-uid"]);
              if (templateItem) {
                const mergedSchema = mergeSchema(templateItem.schema || {}, sourceItem.schema, rootTemplate);
                sourceItem.path[sourceItem.path.length - 1].schema.properties[sourceItem.key] = mergedSchema;
                sourceItem.schema = mergedSchema;
                tItemsMap.delete(sourceItem.schema["x-template-uid"]);
              }
            }
            objectValue = getNewObjectValue(tItemsMap);
            object["properties"] = objectValue;
            targetKeys = Object.keys(objectValue);
          }
          if (object["x-component"] === "CollectionField") {
            for (const skey of sourceKeys) {
              const assFieldCom = (_a = sourceValue[skey]) == null ? void 0 : _a["x-component"];
              if ([
                "Action.Container",
                "AssociationField.Viewer",
                "AssociationField.Selector",
                "AssociationField.Nester",
                "AssociationField.SubTable"
              ].includes(assFieldCom)) {
                const tkey = targetKeys.find((k) => objectValue[k]["x-component"] === assFieldCom);
                if (tkey) {
                  sourceValue[skey]["x-template-uid"] = objectValue[tkey]["x-uid"];
                  sourceValue[skey] = mergeSchema(objectValue[tkey] || {}, sourceValue[skey], rootTemplate);
                  targetKeys = targetKeys.filter((k) => k !== tkey);
                }
              }
            }
          }
          if (/:configure.*Actions/.test(object["x-initializer"])) {
            for (const skey of sourceKeys) {
              if (object["x-initializer"] === "filterForm:configureActions") {
                const sourceUseComponentProps = (_b = sourceValue[skey]) == null ? void 0 : _b["x-use-component-props"];
                if (sourceUseComponentProps && ["useFilterBlockActionProps", "useResetBlockActionProps"].includes(sourceUseComponentProps)) {
                  const removedTargetKeys = import_lodash.default.remove(targetKeys, (key) => {
                    var _a2;
                    const targetUseComponentProps = (_a2 = objectValue[key]) == null ? void 0 : _a2["x-use-component-props"];
                    return sourceUseComponentProps === targetUseComponentProps;
                  });
                  if (removedTargetKeys.length > 0) {
                    sourceValue[skey]["x-template-uid"] = objectValue[removedTargetKeys[0]]["x-uid"];
                  }
                }
              }
              if (((_c = sourceValue[skey]) == null ? void 0 : _c["x-component"]) && ((_e = (_d = sourceValue[skey]) == null ? void 0 : _d["x-settings"]) == null ? void 0 : _e.includes("actionSettings"))) {
                const actionName = sourceValue[skey]["x-settings"].split(":")[1];
                const targetActionName = [
                  "bulkDelete",
                  "filter",
                  "refresh",
                  "delete",
                  "print",
                  "stepsFormNext",
                  "stepsFormPrevious",
                  "disassociate",
                  "MailSend",
                  "MailRefresh",
                  "MailAccountSetting",
                  "MailMarkAsRead",
                  "MailMarkAsUnRead"
                ].find((name) => name === actionName);
                if (targetActionName) {
                  const removedTargetKeys = import_lodash.default.remove(
                    targetKeys,
                    (key) => {
                      var _a2;
                      return ((_a2 = objectValue[key]) == null ? void 0 : _a2["x-settings"]) === `actionSettings:${targetActionName}`;
                    }
                  );
                  if (removedTargetKeys.length > 0) {
                    sourceValue[skey]["x-template-uid"] = objectValue[removedTargetKeys[0]]["x-uid"];
                  }
                }
              }
            }
          }
          for (const skey of sourceKeys) {
            if ((_f = object["x-initializer"]) == null ? void 0 : _f.includes(":configureColumns")) {
              if (sourceValue[skey]["x-component"] && sourceValue[skey]["x-settings"] === "fieldSettings:TableColumn") {
                const sourceColFieldSchema = Object.values(((_g = sourceValue[skey]) == null ? void 0 : _g["properties"]) || {})[0];
                const xColField = import_lodash.default.get(sourceColFieldSchema, "x-collection-field");
                if (xColField) {
                  let targetColFieldSchema = null;
                  const removedTargetKeys = import_lodash.default.remove(targetKeys, (key) => {
                    var _a2;
                    targetColFieldSchema = Object.values(((_a2 = objectValue[key]) == null ? void 0 : _a2["properties"]) || {})[0];
                    const targetColField = import_lodash.default.get(targetColFieldSchema, "x-collection-field");
                    return xColField === targetColField;
                  });
                  if (removedTargetKeys.length > 0) {
                    sourceValue[skey]["x-template-uid"] = objectValue[removedTargetKeys[0]]["x-uid"];
                    sourceColFieldSchema["x-template-uid"] = targetColFieldSchema == null ? void 0 : targetColFieldSchema["x-uid"];
                  }
                }
              }
              if ((_h = sourceValue[skey]["x-initializer"]) == null ? void 0 : _h.includes(":configureItemActions")) {
                const removedTargetKeys = import_lodash.default.remove(targetKeys, (key) => {
                  var _a2, _b2;
                  return (_b2 = (_a2 = objectValue[key]) == null ? void 0 : _a2["x-initializer"]) == null ? void 0 : _b2.includes(":configureItemActions");
                });
                if (removedTargetKeys.length > 0) {
                  sourceValue[skey]["x-template-uid"] = objectValue[removedTargetKeys[0]]["x-uid"];
                }
              }
            }
          }
          if (/:configureFields/.test(source["x-initializer"])) {
            const targetFieldsMap = /* @__PURE__ */ new Map();
            collectGridItems(object, targetFieldsMap);
            const targetFields = Array.from(targetFieldsMap.values());
            for (const skey of sourceKeys) {
              const sourceFieldsMap = /* @__PURE__ */ new Map();
              collectGridItems(sourceValue[skey], sourceFieldsMap);
              for (const [uid2, sourceItem] of sourceFieldsMap.entries()) {
                const xColField = import_lodash.default.get(sourceItem.schema, "x-collection-field");
                if (!xColField) continue;
                const targetItem = import_lodash.default.find(targetFields, (field) => field.schema["x-collection-field"] === xColField);
                if (targetItem) {
                  targetFieldsMap.delete(targetItem.schema["x-uid"]);
                  sourceItem.schema["x-template-uid"] = targetItem.schema["x-uid"];
                  sourceItem.schema = mergeSchema(targetItem.schema || {}, sourceItem.schema, rootTemplate);
                }
              }
              objectValue = getNewObjectValue(targetFieldsMap);
              object["properties"] = objectValue;
              targetKeys = Object.keys(objectValue);
            }
          }
          if (object["x-decorator"] === "DndContext") {
            for (const skey of sourceKeys) {
              const actionSettings = sourceValue[skey]["x-settings"];
              if (sourceValue[skey]["x-component"] && ["actionSettings:disassociate", "actionSettings:delete"].includes(actionSettings)) {
                const removedTargetKeys = import_lodash.default.remove(targetKeys, (key) => {
                  var _a2;
                  return ((_a2 = objectValue[key]) == null ? void 0 : _a2["x-settings"]) === actionSettings;
                });
                if (removedTargetKeys.length > 0) {
                  sourceValue[skey]["x-template-uid"] = objectValue[removedTargetKeys[0]]["x-uid"];
                }
              }
            }
          }
          const keys = import_lodash.default.union(targetKeys, sourceKeys);
          const newKeys = import_lodash.default.difference(targetKeys, sourceKeys);
          if (newKeys.length > 0) {
            const newProperties = import_lodash.default.cloneDeep(import_lodash.default.pick(objectValue, newKeys));
            const newSchemas = [];
            for (const key of newKeys) {
              const newSchema = convertTplBlock(newProperties[key]);
              newSchema["name"] = key;
              newSchemas.push(newSchema);
              source["properties"][key] = newSchema;
            }
          }
          const properties = {};
          for (let i = 0; i < keys.length; i++) {
            const k = keys[i];
            const sourceProperty = (sourceValue == null ? void 0 : sourceValue[k]) || {};
            if (import_lodash.default.get(objectValue, [k, "properties"])) {
              sourceProperty["properties"] = sourceProperty["properties"] || {};
            }
            properties[k] = mergeSchema((objectValue == null ? void 0 : objectValue[k]) || {}, sourceValue == null ? void 0 : sourceValue[k], rootTemplate);
            if (properties[k]["x-template-root-uid"] && properties[k]["x-template-root-uid"] === rootTemplate["x-uid"]) {
              properties[k] = mergeSchema(import_lodash.default.cloneDeep(rootTemplate), properties[k], rootTemplate);
            }
          }
          const parentIndexs = [];
          for (const key in properties) {
            if (properties[key]["x-index"]) {
              const xIndex = properties[key]["x-index"];
              if (parentIndexs.includes(xIndex)) {
                properties[key]["x-index"] = Math.max(...parentIndexs) + 1;
              }
              parentIndexs.push(properties[key]["x-index"]);
            }
          }
          return properties;
        }
        return mergeSchema(objectValue || {}, sourceValue || {}, rootTemplate);
      }
      return sourceValue;
    }
  );
}
function shouldDeleteNoComponentSchema(schema) {
  if (!schema["x-no-component"]) {
    return true;
  }
  const properties = schema == null ? void 0 : schema.properties;
  return properties && Object.values(properties).some((s) => s["x-component"] == null);
}
function cleanSchema(schema, templateId) {
  var _a, _b, _c;
  const properties = (schema == null ? void 0 : schema.properties) || {};
  for (const key of Object.keys(properties)) {
    if (schema.properties[key]["x-component"] == null && schema.properties[key]["x-template-id"] && !schema.properties[key]["x-template-root-uid"] && shouldDeleteNoComponentSchema(schema.properties[key])) {
      delete schema.properties[key];
      continue;
    }
    if (schema.properties[key]["x-template-root-uid"] && schema.properties[key]["x-template-root-uid"] !== templateId) {
      continue;
    }
    if (((_a = properties[key]) == null ? void 0 : _a["x-component-props"]) === null) {
      delete properties[key]["x-component-props"];
    }
    if (((_b = properties[key]) == null ? void 0 : _b["x-component"]) === "Grid.Row") {
      let hasProperties = false;
      const cols = Object.values(((_c = properties[key]) == null ? void 0 : _c["properties"]) || {});
      for (const col of cols) {
        if (col["x-component"] === "Grid.Col") {
          if (!import_lodash.default.isEmpty(col["properties"])) {
            hasProperties = true;
          }
        }
      }
      if (!hasProperties) {
        delete properties[key];
      }
    }
    cleanSchema(properties[key], templateId);
  }
  if (schema) {
    delete schema["x-template-root-uid"];
    delete schema["x-template-uid"];
    delete schema["x-block-template-key"];
    delete schema["x-virtual"];
    delete schema["x-template-version"];
  }
}
function convertTplBlock(tpl) {
  const newSchema = import_lodash.default.cloneDeep(tpl);
  const regeneratedUid = (schema) => {
    if (schema["x-uid"]) {
      schema["x-uid"] = (0, import_utils.uid)();
    }
    if (schema["properties"]) {
      for (const key in schema["properties"]) {
        regeneratedUid(schema["properties"][key]);
      }
    }
  };
  regeneratedUid(newSchema);
  return newSchema;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  cleanSchema,
  getNewFullBlock,
  mergeSchema
});
