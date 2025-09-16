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
var tarPlugin_exports = {};
__export(tarPlugin_exports, {
  tarPlugin: () => tarPlugin
});
module.exports = __toCommonJS(tarPlugin_exports);
var import_path = __toESM(require("path"));
var import_tar = require("tar");
var import_fast_glob = __toESM(require("fast-glob"));
var import_fs_extra = __toESM(require("fs-extra"));
var import_constant = require("./constant");
function tarPlugin(cwd, log) {
  log("tar package");
  const pkg = require(import_path.default.join(cwd, "package.json"));
  const npmIgnore = import_path.default.join(cwd, ".npmignore");
  let files = pkg.files || [];
  if (import_fs_extra.default.existsSync(npmIgnore)) {
    files = import_fs_extra.default.readFileSync(npmIgnore, "utf-8").split("\n").filter((item) => item.trim()).map((item) => item.startsWith("/") ? `.${item}` : item).map((item) => `!${item}`);
    files.push("**/*");
  }
  files.push(...import_constant.tarIncludesFiles);
  files = files.map((item) => item !== "**/*" && import_fs_extra.default.existsSync(import_path.default.join(cwd, item.replace("!", ""))) && import_fs_extra.default.statSync(import_path.default.join(cwd, item.replace("!", ""))).isDirectory() ? `${item}/**/*` : item);
  const tarball = import_path.default.join(import_constant.TAR_OUTPUT_DIR, `${pkg.name}-${pkg.version}.tgz`);
  const tarFiles = import_fast_glob.default.sync(files, { cwd });
  import_fs_extra.default.mkdirpSync(import_path.default.dirname(tarball));
  import_fs_extra.default.rmSync(tarball, { force: true });
  return (0, import_tar.create)({ gzip: true, file: tarball, cwd }, tarFiles);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  tarPlugin
});
