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
var constant_exports = {};
__export(constant_exports, {
  CJS_EXCLUDE_PACKAGES: () => CJS_EXCLUDE_PACKAGES,
  CORE_APP: () => CORE_APP,
  CORE_CLIENT: () => CORE_CLIENT,
  ESM_PACKAGES: () => ESM_PACKAGES,
  EsbuildSupportExts: () => EsbuildSupportExts,
  NODE_MODULES: () => NODE_MODULES,
  PACKAGES_PATH: () => PACKAGES_PATH,
  PLUGINS_DIR: () => PLUGINS_DIR,
  PLUGIN_COMMERCIAL: () => PLUGIN_COMMERCIAL,
  PRESETS_DIR: () => PRESETS_DIR,
  ROOT_PATH: () => ROOT_PATH,
  TAR_OUTPUT_DIR: () => TAR_OUTPUT_DIR,
  getCjsPackages: () => getCjsPackages,
  getPluginPackages: () => getPluginPackages,
  getPresetsPackages: () => getPresetsPackages,
  globExcludeFiles: () => globExcludeFiles,
  tarIncludesFiles: () => tarIncludesFiles
});
module.exports = __toCommonJS(constant_exports);
var import_path = __toESM(require("path"));
const globExcludeFiles = [
  "!src/**/__tests__",
  "!src/**/__benchmarks__",
  "!src/**/__test__",
  "!src/**/__e2e__",
  "!src/**/demos",
  "!src/**/fixtures",
  "!src/**/*.mdx",
  "!src/**/*.md",
  "!src/**/*.+(test|e2e|spec).+(js|jsx|ts|tsx)"
];
const EsbuildSupportExts = [
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".json",
  ".css",
  ".less",
  ".sass",
  ".scss",
  ".styl",
  ".txt",
  ".data"
];
const ROOT_PATH = import_path.default.join(__dirname, "../../../../");
const NODE_MODULES = import_path.default.join(ROOT_PATH, "node_modules");
const PACKAGES_PATH = import_path.default.join(ROOT_PATH, "packages");
const PLUGINS_DIR = ["plugins", "samples", "pro-plugins"].concat((process.env.PLUGINS_DIRS || "").split(",")).filter(Boolean).map((name) => import_path.default.join(PACKAGES_PATH, name));
const PRESETS_DIR = import_path.default.join(PACKAGES_PATH, "presets");
const PLUGIN_COMMERCIAL = "@nocobase/plugin-commercial";
const getPluginPackages = (packages) => packages.filter((item) => PLUGINS_DIR.some((pluginDir) => item.location.startsWith(pluginDir))).sort((a, b) => {
  return a.name === PLUGIN_COMMERCIAL ? -1 : 1;
});
const getPresetsPackages = (packages) => packages.filter((item) => item.location.startsWith(PRESETS_DIR));
const CORE_APP = import_path.default.join(PACKAGES_PATH, "core/app");
const CORE_CLIENT = import_path.default.join(PACKAGES_PATH, "core/client");
const ESM_PACKAGES = ["@nocobase/test"];
const CJS_EXCLUDE_PACKAGES = [
  import_path.default.join(PACKAGES_PATH, "core/build"),
  import_path.default.join(PACKAGES_PATH, "core/cli"),
  CORE_CLIENT
];
const getCjsPackages = (packages) => packages.filter((item) => !PLUGINS_DIR.some((dir) => item.location.startsWith(dir))).filter((item) => !item.location.startsWith(PRESETS_DIR)).filter((item) => !ESM_PACKAGES.includes(item.name)).filter((item) => !CJS_EXCLUDE_PACKAGES.includes(item.location));
const tarIncludesFiles = ["package.json", "README.md", "LICENSE", "dist", "!node_modules"];
const TAR_OUTPUT_DIR = process.env.TAR_PATH ? process.env.TAR_PATH : import_path.default.join(ROOT_PATH, "storage", "tar");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CJS_EXCLUDE_PACKAGES,
  CORE_APP,
  CORE_CLIENT,
  ESM_PACKAGES,
  EsbuildSupportExts,
  NODE_MODULES,
  PACKAGES_PATH,
  PLUGINS_DIR,
  PLUGIN_COMMERCIAL,
  PRESETS_DIR,
  ROOT_PATH,
  TAR_OUTPUT_DIR,
  getCjsPackages,
  getPluginPackages,
  getPresetsPackages,
  globExcludeFiles,
  tarIncludesFiles
});
