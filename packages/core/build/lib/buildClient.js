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
var buildClient_exports = {};
__export(buildClient_exports, {
  buildClient: () => buildClient,
  buildLocale: () => buildLocale
});
module.exports = __toCommonJS(buildClient_exports);
var import_plugin_react = __toESM(require("@vitejs/plugin-react"));
var import_fast_glob = __toESM(require("fast-glob"));
var import_fs_extra = __toESM(require("fs-extra"));
var import_path = __toESM(require("path"));
var import_tsup = require("tsup");
var import_vite = require("vite");
var import_vite_plugin_lib_inject_css = require("vite-plugin-lib-inject-css");
var import_constant = require("./constant");
var import_utils = require("./utils");
async function buildClient(cwd, userConfig, sourcemap = false, log) {
  log("build client");
  const cwdWin = cwd.replaceAll(/\\/g, "/");
  const cwdUnix = cwd.replaceAll(/\//g, "\\");
  const external = function(id) {
    if (id.startsWith(".") || id.startsWith(cwdUnix) || id.startsWith(cwdWin)) {
      return false;
    }
    return true;
  };
  await buildClientEsm(cwd, userConfig, sourcemap, external, log);
  await buildClientLib(cwd, userConfig, sourcemap, external, log);
  await buildLocale(cwd, userConfig, log);
}
function buildClientEsm(cwd, userConfig, sourcemap, external, log) {
  log("build client esm");
  const entry = import_path.default.join(cwd, "src/index.ts").replaceAll(/\\/g, "/");
  const outDir = import_path.default.resolve(cwd, "es");
  return (0, import_vite.build)(
    userConfig.modifyViteConfig({
      mode: process.env.NODE_ENV || "production",
      define: (0, import_utils.getEnvDefine)(),
      build: {
        minify: process.env.NODE_ENV === "production",
        outDir,
        cssCodeSplit: true,
        emptyOutDir: true,
        sourcemap,
        lib: {
          entry,
          formats: ["es"],
          fileName: "index"
        },
        target: ["es2015", "edge88", "firefox78", "chrome87", "safari14"],
        rollupOptions: {
          cache: true,
          treeshake: true,
          external
        }
      },
      plugins: [(0, import_plugin_react.default)(), (0, import_vite_plugin_lib_inject_css.libInjectCss)()]
    })
  );
}
async function buildClientLib(cwd, userConfig, sourcemap, external, log) {
  log("build client lib");
  const outDir = import_path.default.resolve(cwd, "lib");
  const esDir = import_path.default.resolve(cwd, "es");
  const entry = import_path.default.join(esDir, "index.ts");
  import_fs_extra.default.removeSync(entry);
  import_fs_extra.default.linkSync(import_path.default.join(cwd, "es/index.mjs"), entry);
  await (0, import_vite.build)(
    userConfig.modifyViteConfig({
      mode: process.env.NODE_ENV || "production",
      esbuild: {
        format: "cjs"
      },
      build: {
        outDir,
        minify: process.env.NODE_ENV === "production",
        sourcemap,
        lib: {
          entry: import_path.default.join(cwd, "es/index.ts"),
          formats: ["cjs"],
          fileName: "index"
        },
        rollupOptions: {
          external
        }
      }
    })
  );
  import_fs_extra.default.removeSync(entry);
  const css = import_fast_glob.default.sync("*.css", { cwd: esDir, absolute: true });
  css.forEach((file) => {
    import_fs_extra.default.copySync(file, import_path.default.join(outDir, import_path.default.basename(file)));
  });
}
function buildLocale(cwd, userConfig, log) {
  log("build client locale");
  const entry = import_fast_glob.default.globSync(["src/locale/**", ...import_constant.globExcludeFiles], { cwd, absolute: true });
  const outDir = import_path.default.resolve(cwd, "lib", "locale");
  return (0, import_tsup.build)(
    userConfig.modifyTsupConfig({
      entry,
      splitting: false,
      clean: false,
      bundle: false,
      silent: true,
      treeshake: false,
      target: "node16",
      keepNames: true,
      outDir,
      format: "cjs",
      skipNodeModulesBundle: true
    })
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  buildClient,
  buildLocale
});
