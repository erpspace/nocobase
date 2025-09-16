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
var buildCjs_exports = {};
__export(buildCjs_exports, {
  buildCjs: () => buildCjs
});
module.exports = __toCommonJS(buildCjs_exports);
var import_tsup = require("tsup");
var import_fast_glob = __toESM(require("fast-glob"));
var import_path = __toESM(require("path"));
var import_chalk = __toESM(require("chalk"));
var import_constant = require("./constant");
function buildCjs(cwd, userConfig, sourcemap = false, log) {
  log("build cjs");
  const entry = import_fast_glob.default.globSync(["src/**", ...import_constant.globExcludeFiles], { cwd, absolute: true });
  const outDir = import_path.default.join(cwd, "lib");
  const otherExts = Array.from(new Set(entry.map((item) => import_path.default.extname(item)).filter((item) => !import_constant.EsbuildSupportExts.includes(item))));
  if (otherExts.length) {
    log("%s will not be processed, only be copied to the lib directory.", import_chalk.default.yellow(otherExts.join(",")));
  }
  return (0, import_tsup.build)(userConfig.modifyTsupConfig({
    entry,
    splitting: false,
    clean: true,
    bundle: false,
    silent: true,
    sourcemap,
    treeshake: false,
    target: "node16",
    keepNames: true,
    outDir,
    loader: {
      ...otherExts.reduce((prev, cur) => ({ ...prev, [cur]: "copy" }), {}),
      ".json": "copy"
    },
    format: "cjs",
    skipNodeModulesBundle: true
  }));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  buildCjs
});
