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
var attachment_exports = {};
__export(attachment_exports, {
  attachment: () => attachment,
  mockAttachment: () => mockAttachment
});
module.exports = __toCommonJS(attachment_exports);
var import_faker = require("@faker-js/faker");
var import_utils = require("@nocobase/utils");
var import_lodash = __toESM(require("lodash"));
function mockAttachment() {
  return {
    title: import_faker.faker.word.words(),
    filename: `${import_faker.faker.word.words()}.png`,
    extname: ".png",
    path: "",
    size: 3938,
    url: import_faker.faker.image.url(),
    mimetype: "image/png",
    meta: {},
    storageId: 1
  };
}
const attachment = {
  options: (options) => ({
    type: "belongsToMany",
    target: "attachments",
    through: options.through || `t_${(0, import_utils.uid)()}`,
    foreignKey: options.foreignKey || `f_${(0, import_utils.uid)()}`,
    otherKey: options.otherKey || `f_${(0, import_utils.uid)()}`,
    targetKey: options.targetKey || "id",
    sourceKey: options.sourceKey || "id",
    // name,
    uiSchema: {
      type: "array",
      // title,
      "x-component": "Upload.Attachment"
    }
  }),
  mock: (options) => {
    var _a, _b;
    return ((_b = (_a = options == null ? void 0 : options.uiSchema) == null ? void 0 : _a["x-component-props"]) == null ? void 0 : _b.multiple) ? import_lodash.default.range(import_faker.faker.number.int({ min: 1, max: 5 })).map(() => mockAttachment()) : mockAttachment();
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  attachment,
  mockAttachment
});
