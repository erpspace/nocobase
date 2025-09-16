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
var addlicense_exports = {};
__export(addlicense_exports, {
  addLicense: () => addLicense
});
module.exports = __toCommonJS(addlicense_exports);
var import_fast_glob = __toESM(require("fast-glob"));
var import_fs_extra = __toESM(require("fs-extra"));
const commercialLicense = `
/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This program is offered under a commercial license.
 * For more information, see <https://www.nocobase.com/agreement>
 */
`.trim();
const openSourceLicense = `
/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
`.trim();
function getLicenseText(packageDir) {
  return packageDir.includes("/pro-plugins") ? commercialLicense : openSourceLicense;
}
function addLicenseToFile(filePath, licenseText) {
  const data = import_fs_extra.default.readFileSync(filePath, "utf8");
  const newData = licenseText + "\n\n" + data;
  import_fs_extra.default.writeFileSync(filePath, newData, "utf8");
}
async function addLicense(cwd, log) {
  const stream = import_fast_glob.default.globStream("**/*.{js,jsx,ts,tsx}", { cwd, ignore: ["node_modules", "**/*.d.ts"], absolute: true, onlyFiles: true });
  const licenseText = getLicenseText(cwd);
  for await (const filePath of stream) {
    addLicenseToFile(filePath, licenseText);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addLicense
});
