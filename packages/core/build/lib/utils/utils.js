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
var utils_exports = {};
__export(utils_exports, {
  defineConfig: () => defineConfig,
  getEnvDefine: () => getEnvDefine,
  getPackageJson: () => getPackageJson,
  getPkgLog: () => getPkgLog,
  getUserConfig: () => getUserConfig,
  readFromCache: () => readFromCache,
  toUnixPath: () => toUnixPath,
  writeToCache: () => writeToCache
});
module.exports = __toCommonJS(utils_exports);
var import_chalk = __toESM(require("chalk"));
var import_path = __toESM(require("path"));
var import_fast_glob = __toESM(require("fast-glob"));
var import_fs_extra = __toESM(require("fs-extra"));
var import_node = require("esbuild-register/dist/node");
var import_constant = require("../constant");
let previousColor = "";
function randomColor() {
  const colors = [
    "red",
    "green",
    "yellow",
    "blue",
    "magenta",
    "cyan",
    "gray",
    "redBright",
    "greenBright",
    "yellowBright",
    "blueBright",
    "magentaBright",
    "cyanBright"
  ];
  let color = previousColor;
  while (color === previousColor) {
    const randomIndex = Math.floor(Math.random() * colors.length);
    color = colors[randomIndex];
  }
  previousColor = color;
  return import_chalk.default[color];
}
const getPkgLog = (pkgName) => {
  const pkgColor = randomColor();
  const pkgStr = import_chalk.default.bold(pkgColor(pkgName));
  const pkgLog = (msg, ...optionalParams) => console.log(`${pkgStr}: ${msg}`, ...optionalParams);
  return pkgLog;
};
function toUnixPath(filepath) {
  return filepath.replace(/\\/g, "/");
}
function getPackageJson(cwd) {
  return require(import_path.default.join(cwd, "package.json"));
}
function defineConfig(config) {
  return config;
}
function getUserConfig(cwd) {
  const config = defineConfig({
    modifyTsupConfig: (config2) => config2,
    modifyViteConfig: (config2) => config2
  });
  const buildConfigs = import_fast_glob.default.sync(["build.config.js", "build.config.ts"], { cwd });
  if (buildConfigs.length > 1) {
    throw new Error(`Multiple build configs found: ${buildConfigs.join(", ")}`);
  }
  if (buildConfigs.length === 1) {
    const { unregister } = (0, import_node.register)({});
    const userConfig = require(import_path.default.join(cwd, buildConfigs[0]));
    unregister();
    Object.assign(config, userConfig.default || userConfig);
  }
  return config;
}
const CACHE_DIR = import_path.default.join(import_constant.NODE_MODULES, ".cache", "nocobase");
function writeToCache(key, data) {
  const cachePath = import_path.default.join(CACHE_DIR, `${key}.json`);
  import_fs_extra.default.ensureDirSync(import_path.default.dirname(cachePath));
  import_fs_extra.default.writeJsonSync(cachePath, data, { spaces: 2 });
}
function readFromCache(key) {
  const cachePath = import_path.default.join(CACHE_DIR, `${key}.json`);
  if (import_fs_extra.default.existsSync(cachePath)) {
    return import_fs_extra.default.readJsonSync(cachePath);
  }
  return {};
}
function getEnvDefine() {
  return {
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "production"),
    "process.env.__TEST__": false,
    "process.env.__E2E__": process.env.__E2E__ ? true : false,
    "process.env.APP_ENV": process.env.APP_ENV
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  defineConfig,
  getEnvDefine,
  getPackageJson,
  getPkgLog,
  getUserConfig,
  readFromCache,
  toUnixPath,
  writeToCache
});
