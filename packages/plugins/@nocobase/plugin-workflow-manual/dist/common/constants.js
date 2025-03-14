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
var constants_exports = {};
__export(constants_exports, {
  MANUAL_TASK_TYPE: () => MANUAL_TASK_TYPE,
  NAMESPACE: () => NAMESPACE,
  TASK_STATUS: () => TASK_STATUS,
  TaskStatusOptions: () => TaskStatusOptions,
  TaskStatusOptionsMap: () => TaskStatusOptionsMap
});
module.exports = __toCommonJS(constants_exports);
const NAMESPACE = "workflow-manual";
const MANUAL_TASK_TYPE = "manual";
const TASK_STATUS = {
  PENDING: 0,
  RESOLVED: 1,
  REJECTED: -1
};
const TaskStatusOptions = [
  {
    value: TASK_STATUS.PENDING,
    label: `{{t("Pending", { ns: "workflow" })}}`,
    color: "gold"
  },
  {
    value: TASK_STATUS.RESOLVED,
    label: `{{t("Resolved", { ns: "workflow" })}}`,
    color: "green"
  },
  {
    value: TASK_STATUS.REJECTED,
    label: `{{t("Rejected", { ns: "workflow" })}}`,
    color: "red"
  }
];
const TaskStatusOptionsMap = TaskStatusOptions.reduce(
  (map, item) => Object.assign(map, { [item.value]: item }),
  {}
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MANUAL_TASK_TYPE,
  NAMESPACE,
  TASK_STATUS,
  TaskStatusOptions,
  TaskStatusOptionsMap
});
