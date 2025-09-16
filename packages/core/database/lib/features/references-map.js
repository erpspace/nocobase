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
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
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
var references_map_exports = {};
__export(references_map_exports, {
  buildReference: () => buildReference,
  default: () => references_map_default
});
module.exports = __toCommonJS(references_map_exports);
const DEFAULT_ON_DELETE = "NO ACTION";
function buildReference(options) {
  const { sourceCollectionName, sourceField, targetField, targetCollectionName, onDelete, priority } = options;
  return {
    sourceCollectionName,
    sourceField,
    targetField,
    targetCollectionName,
    onDelete: (onDelete || DEFAULT_ON_DELETE).toUpperCase(),
    priority: assignPriority(priority, onDelete)
  };
}
__name(buildReference, "buildReference");
function assignPriority(priority, onDelete) {
  if (priority) {
    return priority;
  }
  return onDelete ? "user" : "default";
}
__name(assignPriority, "assignPriority");
const PRIORITY_MAP = {
  default: 1,
  user: 2
};
const _ReferencesMap = class _ReferencesMap {
  constructor(db) {
    this.db = db;
  }
  map = /* @__PURE__ */ new Map();
  addReference(reference) {
    const existReference = this.existReference(reference);
    if (existReference && existReference.onDelete !== reference.onDelete) {
      const existPriority = PRIORITY_MAP[existReference.priority];
      const newPriority = PRIORITY_MAP[reference.priority];
      if (newPriority > existPriority) {
        existReference.onDelete = reference.onDelete;
        existReference.priority = reference.priority;
      } else if (newPriority === existPriority && newPriority === PRIORITY_MAP["user"]) {
        if (existReference.onDelete === "SET NULL" && reference.onDelete === "CASCADE") {
          existReference.onDelete = reference.onDelete;
        } else {
          this.db.logger.warn(
            `On Delete Conflict, exist reference ${JSON.stringify(existReference)}, new reference ${JSON.stringify(
              reference
            )}`
          );
          return;
        }
      }
    }
    if (!existReference) {
      this.map.set(reference.targetCollectionName, [
        ...this.map.get(reference.targetCollectionName) || [],
        reference
      ]);
    }
  }
  getReferences(collectionName) {
    return this.map.get(collectionName);
  }
  existReference(reference) {
    const references = this.map.get(reference.targetCollectionName);
    if (!references) {
      return null;
    }
    const keys = Object.keys(reference).filter((k) => k !== "onDelete" && k !== "priority");
    return references.find((ref) => keys.every((key) => ref[key] === reference[key]));
  }
  removeReference(reference) {
    const references = this.map.get(reference.targetCollectionName);
    if (!references) {
      return;
    }
    const keys = ["sourceCollectionName", "sourceField", "targetField", "targetCollectionName"];
    this.map.set(
      reference.targetCollectionName,
      references.filter((ref) => !keys.every((key) => ref[key] === reference[key]))
    );
  }
};
__name(_ReferencesMap, "ReferencesMap");
let ReferencesMap = _ReferencesMap;
var references_map_default = ReferencesMap;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  buildReference
});
