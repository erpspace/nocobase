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
var buildEsm_exports = {};
__export(buildEsm_exports, {
  buildEsm: () => buildEsm
});
module.exports = __toCommonJS(buildEsm_exports);
var import_path = __toESM(require("path"));
var import_utils = require("./utils");
var import_fast_glob = __toESM(require("fast-glob"));
var import_core = require("@rspack/core");
const clientExt = ".{ts,tsx,js,jsx}";
function getSingleEntry(file, cwd) {
  return import_fast_glob.default.sync([`${file}${clientExt}`], { cwd, absolute: true, onlyFiles: true })?.[0]?.replaceAll(/\\/g, "/");
}
async function buildEsm(cwd, userConfig, sourcemap = false, log) {
  log("build esm");
  const indexEntry = getSingleEntry("src/index", cwd);
  const outDir = import_path.default.resolve(cwd, "es");
  await build(cwd, indexEntry, outDir, userConfig, sourcemap, log);
  const clientEntry = getSingleEntry("src/client/index", cwd) || getSingleEntry("src/client", cwd);
  const clientOutDir = import_path.default.resolve(cwd, "es/client");
  if (clientEntry) {
    await build(cwd, clientEntry, clientOutDir, userConfig, sourcemap, log);
  }
  const pkg = require(import_path.default.join(cwd, "package.json"));
  if (pkg.name === "@nocobase/test") {
    const e2eEntry = getSingleEntry("src/e2e/index", cwd);
    const e2eOutDir = import_path.default.resolve(cwd, "es/e2e");
    await build(cwd, e2eEntry, e2eOutDir, userConfig, sourcemap, log);
    const webEntry = getSingleEntry("src/web/index", cwd);
    const webOutDir = import_path.default.resolve(cwd, "es/web");
    await build(cwd, webEntry, webOutDir, userConfig, sourcemap, log);
  }
}
function build(cwd, entry, outDir, userConfig, sourcemap = false, log) {
  const cwdWin = cwd.replaceAll(/\\/g, "/");
  const cwdUnix = cwd.replaceAll(/\//g, "\\");
  const external = function(id) {
    if (id.startsWith(".") || id.startsWith(cwdUnix) || id.startsWith(cwdWin)) {
      return false;
    }
    return true;
  };
  return (0, import_core.rspack)({
    entry: {
      index: entry
    },
    output: {
      path: outDir,
      library: {
        type: "module"
      },
      clean: true
    },
    target: ["node16"],
    mode: process.env.NODE_ENV === "production" ? "production" : "development",
    resolve: {
      tsConfig: import_path.default.join(process.cwd(), "tsconfig.json"),
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".less", ".css"]
    },
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [
            { loader: "style-loader" },
            { loader: "css-loader" },
            { loader: require.resolve("less-loader") },
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: {
                    "postcss-preset-env": {
                      browsers: ["last 2 versions", "> 1%", "cover 99.5%", "not dead"]
                    },
                    autoprefixer: {}
                  }
                }
              }
            }
          ],
          type: "javascript/auto"
        },
        {
          test: /\.css$/,
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: {
                    "postcss-preset-env": {
                      browsers: ["last 2 versions", "> 1%", "cover 99.5%", "not dead"]
                    },
                    autoprefixer: {}
                  }
                }
              }
            }
          ],
          type: "javascript/auto"
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          type: "asset"
        },
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: ["@svgr/webpack"]
        },
        {
          test: /\.jsx$/,
          exclude: /[\\/]node_modules[\\/]/,
          loader: "builtin:swc-loader",
          options: {
            sourceMap: true,
            jsc: {
              parser: {
                syntax: "ecmascript",
                jsx: true
              },
              target: "es5"
            }
          }
        },
        {
          test: /\.tsx$/,
          exclude: /[\\/]node_modules[\\/]/,
          loader: "builtin:swc-loader",
          options: {
            sourceMap: true,
            jsc: {
              parser: {
                syntax: "typescript",
                tsx: true
              },
              target: "es5"
            }
          }
        },
        {
          test: /\.ts$/,
          exclude: /[\\/]node_modules[\\/]/,
          loader: "builtin:swc-loader",
          options: {
            sourceMap: true,
            jsc: {
              parser: {
                syntax: "typescript"
              },
              target: "es5"
            }
          }
        }
      ]
    },
    externals: [
      function({ request }, callback) {
        if (external(request)) {
          return callback(null, true);
        }
        callback();
      }
    ],
    plugins: [new import_core.rspack.DefinePlugin((0, import_utils.getEnvDefine)())],
    stats: "errors-warnings"
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  buildEsm
});
