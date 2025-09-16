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
var buildPlugin_exports = {};
__export(buildPlugin_exports, {
  buildPlugin: () => buildPlugin,
  buildPluginClient: () => buildPluginClient,
  buildPluginServer: () => buildPluginServer,
  buildProPluginServer: () => buildProPluginServer,
  buildServerDeps: () => buildServerDeps,
  deleteServerFiles: () => deleteServerFiles,
  writeExternalPackageVersion: () => writeExternalPackageVersion
});
module.exports = __toCommonJS(buildPlugin_exports);
var import_core = require("@rspack/core");
var import_ncc = __toESM(require("@vercel/ncc"));
var import_chalk = __toESM(require("chalk"));
var import_fast_glob = __toESM(require("fast-glob"));
var import_fs_extra = __toESM(require("fs-extra"));
var import_path = __toESM(require("path"));
var import_tsup = require("tsup");
var bundleRequire = __toESM(require("bundle-require"));
var import_constant = require("./constant");
var import_utils = require("./utils");
var import_buildPluginUtils = require("./utils/buildPluginUtils");
var import_getDepsConfig = require("./utils/getDepsConfig");
var import_rspack_plugin = require("@rsdoctor/rspack-plugin");
var import_obfuscationResult = require("./utils/obfuscationResult");
var import_pluginEsbuildCommercialInject = __toESM(require("./plugins/pluginEsbuildCommercialInject"));
const validExts = [".ts", ".tsx", ".js", ".jsx", ".mjs"];
const serverGlobalFiles = ["src/**", "!src/client/**", ...import_constant.globExcludeFiles];
const clientGlobalFiles = ["src/**", "!src/server/**", ...import_constant.globExcludeFiles];
const sourceGlobalFiles = [
  "src/**/*.{ts,js,tsx,jsx,mjs}",
  "!src/**/__tests__",
  "!src/**/__benchmarks__"
];
const external = [
  // nocobase
  "@nocobase/acl",
  "@nocobase/actions",
  "@nocobase/auth",
  "@nocobase/cache",
  "@nocobase/client",
  "@nocobase/database",
  "@nocobase/data-source-manager",
  "@nocobase/evaluators",
  "@nocobase/lock-manager",
  "@nocobase/logger",
  "@nocobase/resourcer",
  "@nocobase/telemetry",
  "@nocobase/sdk",
  "@nocobase/server",
  "@nocobase/test",
  "@nocobase/utils",
  "@nocobase/license-kit",
  // @nocobase/auth
  "jsonwebtoken",
  // @nocobase/cache
  "cache-manager",
  // @nocobase/database
  "sequelize",
  "umzug",
  "async-mutex",
  // @nocobase/evaluators
  "@formulajs/formulajs",
  "mathjs",
  // @nocobase/logger
  "winston",
  "winston-daily-rotate-file",
  // koa
  "koa",
  "@koa/cors",
  "@koa/router",
  "multer",
  "@koa/multer",
  "koa-bodyparser",
  "koa-static",
  "koa-send",
  // react
  "react",
  "react-dom",
  "react/jsx-runtime",
  // react-router
  "react-router",
  "react-router-dom",
  // antd
  "antd",
  "antd-style",
  "@ant-design/icons",
  "@ant-design/cssinjs",
  // i18next
  "i18next",
  "react-i18next",
  // dnd-kit 相关
  "@dnd-kit/core",
  "@dnd-kit/sortable",
  // formily 相关
  "@formily/antd-v5",
  "@formily/core",
  "@formily/react",
  "@formily/json-schema",
  "@formily/path",
  "@formily/validator",
  "@formily/shared",
  "@formily/reactive",
  "@formily/reactive-react",
  // utils
  "dayjs",
  "mysql2",
  "pg",
  "pg-hstore",
  "sqlite3",
  "supertest",
  "axios",
  "@emotion/css",
  "ahooks",
  "lodash",
  "china-division",
  "file-saver"
];
const pluginPrefix = (process.env.PLUGIN_PACKAGE_PREFIX || "@nocobase/plugin-,@nocobase/preset-,@nocobase/plugin-pro-").split(",");
const target_dir = "dist";
function deleteServerFiles(cwd, log) {
  log("delete server files");
  const files = import_fast_glob.default.globSync(["*"], {
    cwd: import_path.default.join(cwd, target_dir),
    absolute: true,
    deep: 1,
    onlyFiles: true
  });
  const dirs = import_fast_glob.default.globSync(["*", "!client", "!node_modules"], {
    cwd: import_path.default.join(cwd, target_dir),
    absolute: true,
    deep: 1,
    onlyDirectories: true
  });
  [...files, ...dirs].forEach((item) => {
    import_fs_extra.default.removeSync(item);
  });
}
function writeExternalPackageVersion(cwd, log) {
  log("write external version");
  const sourceFiles = import_fast_glob.default.globSync(sourceGlobalFiles, { cwd, absolute: true }).map((item) => import_fs_extra.default.readFileSync(item, "utf-8"));
  const sourcePackages = (0, import_buildPluginUtils.getSourcePackages)(sourceFiles);
  const excludePackages = (0, import_buildPluginUtils.getExcludePackages)(sourcePackages, external, pluginPrefix);
  const data = excludePackages.reduce((prev, packageName) => {
    const depPkgPath = (0, import_getDepsConfig.getDepPkgPath)(packageName, cwd);
    const depPkg = require(depPkgPath);
    prev[packageName] = depPkg.version;
    return prev;
  }, {});
  const externalVersionPath = import_path.default.join(cwd, target_dir, "externalVersion.js");
  import_fs_extra.default.writeFileSync(externalVersionPath, `module.exports = ${JSON.stringify(data, null, 2)};`);
}
async function buildServerDeps(cwd, serverFiles, log) {
  log("build plugin server dependencies");
  const outDir = import_path.default.join(cwd, target_dir, "node_modules");
  const serverFileSource = serverFiles.filter((item) => validExts.includes(import_path.default.extname(item))).map((item) => import_fs_extra.default.readFileSync(item, "utf-8"));
  const sourcePackages = (0, import_buildPluginUtils.getSourcePackages)(serverFileSource);
  const includePackages = (0, import_buildPluginUtils.getIncludePackages)(sourcePackages, external, pluginPrefix);
  const excludePackages = (0, import_buildPluginUtils.getExcludePackages)(sourcePackages, external, pluginPrefix);
  let tips = [];
  if (includePackages.length) {
    tips.push(
      `These packages ${import_chalk.default.yellow(includePackages.join(", "))} will be ${import_chalk.default.italic(
        "bundled"
      )} to dist/node_modules.`
    );
  }
  if (excludePackages.length) {
    tips.push(`These packages ${import_chalk.default.yellow(excludePackages.join(", "))} will be ${import_chalk.default.italic("exclude")}.`);
  }
  tips.push(
    `For more information, please refer to: ${import_chalk.default.blue("https://docs.nocobase.com/development/others/deps")}.`
  );
  log(tips.join(" "));
  if (!includePackages.length) return;
  const deps = (0, import_getDepsConfig.getDepsConfig)(cwd, outDir, includePackages, external);
  for (const dep of Object.keys(deps)) {
    const { outputDir, mainFile, pkg, nccConfig, depDir } = deps[dep];
    const outputPackageJson = import_path.default.join(outputDir, "package.json");
    if (import_fs_extra.default.existsSync(outputPackageJson)) {
      const outputPackage = require(outputPackageJson);
      if (outputPackage.version === pkg.version) {
        continue;
      }
    }
    await import_fs_extra.default.copy(depDir, outputDir, { errorOnExist: false });
    const deleteFiles = import_fast_glob.default.sync(
      [
        "./**/*.map",
        "./**/*.js.map",
        "./**/*.md",
        "./**/*.mjs",
        "./**/*.png",
        "./**/*.jpg",
        "./**/*.jpeg",
        "./**/*.gif",
        "./**/*/.bin",
        "./**/*/bin",
        "./**/*/LICENSE",
        "./**/*/tsconfig.json"
      ],
      { cwd: outputDir, absolute: true }
    );
    deleteFiles.forEach((file) => {
      import_fs_extra.default.unlinkSync(file);
    });
    await (0, import_ncc.default)(dep, nccConfig).then(
      ({ code, assets }) => {
        import_fs_extra.default.writeFileSync(mainFile, code, "utf-8");
        Object.entries(assets).forEach(([name, item]) => {
          import_fs_extra.default.writeFileSync(import_path.default.join(outputDir, name), item.source, {
            encoding: "utf-8",
            mode: item.permissions
          });
        });
        import_fs_extra.default.writeFileSync(
          outputPackageJson,
          JSON.stringify({
            ...pkg,
            _lastModified: (/* @__PURE__ */ new Date()).toISOString()
          }),
          "utf-8"
        );
      }
    );
  }
}
async function buildPluginServer(cwd, userConfig, sourcemap, log) {
  log("build plugin server source");
  const packageJson = (0, import_utils.getPackageJson)(cwd);
  const serverFiles = import_fast_glob.default.globSync(serverGlobalFiles, { cwd, absolute: true });
  (0, import_buildPluginUtils.buildCheck)({ cwd, packageJson, entry: "server", files: serverFiles, log });
  const otherExts = Array.from(
    new Set(serverFiles.map((item) => import_path.default.extname(item)).filter((item) => !import_constant.EsbuildSupportExts.includes(item)))
  );
  if (otherExts.length) {
    log("%s will not be processed, only be copied to the dist directory.", import_chalk.default.yellow(otherExts.join(",")));
  }
  deleteServerFiles(cwd, log);
  await (0, import_tsup.build)(
    userConfig.modifyTsupConfig({
      entry: serverFiles,
      splitting: false,
      clean: false,
      bundle: false,
      silent: true,
      treeshake: false,
      target: "node16",
      sourcemap,
      outDir: import_path.default.join(cwd, target_dir),
      format: "cjs",
      skipNodeModulesBundle: true,
      loader: {
        ...otherExts.reduce((prev, cur) => ({ ...prev, [cur]: "copy" }), {}),
        ".json": "copy"
      }
    })
  );
  await buildServerDeps(cwd, serverFiles, log);
}
async function buildProPluginServer(cwd, userConfig, sourcemap, log) {
  log("build pro plugin server source");
  const packageJson = (0, import_utils.getPackageJson)(cwd);
  const serverFiles = import_fast_glob.default.globSync(serverGlobalFiles, { cwd, absolute: true });
  (0, import_buildPluginUtils.buildCheck)({ cwd, packageJson, entry: "server", files: serverFiles, log });
  const otherExts = Array.from(
    new Set(serverFiles.map((item) => import_path.default.extname(item)).filter((item) => !import_constant.EsbuildSupportExts.includes(item)))
  );
  if (otherExts.length) {
    log("%s will not be processed, only be copied to the dist directory.", import_chalk.default.yellow(otherExts.join(",")));
  }
  deleteServerFiles(cwd, log);
  let tsconfig = bundleRequire.loadTsConfig(import_path.default.join(cwd, "tsconfig.json"));
  import_fs_extra.default.writeFileSync(import_path.default.join(cwd, "tsconfig.json"), JSON.stringify({
    ...tsconfig.data,
    compilerOptions: { ...tsconfig.data.compilerOptions, paths: [] }
  }, null, 2));
  tsconfig = bundleRequire.loadTsConfig(import_path.default.join(cwd, "tsconfig.json"));
  await (0, import_tsup.build)(
    userConfig.modifyTsupConfig({
      entry: serverFiles,
      splitting: false,
      clean: false,
      bundle: false,
      silent: true,
      treeshake: false,
      target: "node16",
      sourcemap,
      outDir: import_path.default.join(cwd, target_dir),
      format: "cjs",
      skipNodeModulesBundle: true,
      loader: {
        ...otherExts.reduce((prev, cur) => ({ ...prev, [cur]: "copy" }), {}),
        ".json": "copy"
      }
    })
  );
  const entryFile = import_path.default.join(cwd, "src/server/index.ts");
  if (!import_fs_extra.default.existsSync(entryFile)) {
    log("server entry file not found", entryFile);
    return;
  }
  const externalOptions = {
    external: [],
    noExternal: [],
    onSuccess: async () => {
    },
    esbuildPlugins: []
  };
  if (!cwd.includes(import_constant.PLUGIN_COMMERCIAL)) {
    externalOptions.external = [/^[./]/];
    externalOptions.noExternal = [entryFile, /@nocobase\/plugin-commercial\/server/, /dist\/server\/index\.js/];
    externalOptions.onSuccess = async () => {
      const serverFiles2 = [import_path.default.join(cwd, target_dir, "server", "index.js")];
      serverFiles2.forEach((file) => {
        (0, import_obfuscationResult.obfuscate)(file);
      });
    };
    externalOptions.esbuildPlugins = [import_pluginEsbuildCommercialInject.default];
  }
  await (0, import_tsup.build)(
    userConfig.modifyTsupConfig({
      entry: [entryFile],
      // minify: true,
      splitting: false,
      clean: false,
      bundle: true,
      silent: true,
      treeshake: false,
      target: "node16",
      sourcemap,
      outDir: import_path.default.join(cwd, target_dir, "server"),
      format: "cjs",
      skipNodeModulesBundle: true,
      tsconfig: tsconfig.path,
      loader: {
        ...otherExts.reduce((prev, cur) => ({ ...prev, [cur]: "copy" }), {}),
        ".json": "copy"
      },
      ...externalOptions
    })
  );
  import_fs_extra.default.removeSync(tsconfig.path);
  await buildServerDeps(cwd, serverFiles, log);
}
async function buildPluginClient(cwd, userConfig, sourcemap, log, isCommercial = false) {
  log("build plugin client");
  const packageJson = (0, import_utils.getPackageJson)(cwd);
  const clientFiles = import_fast_glob.default.globSync(clientGlobalFiles, { cwd, absolute: true });
  if (isCommercial) {
    const commercialFiles = import_fast_glob.default.globSync(clientGlobalFiles, { cwd: import_path.default.join(process.cwd(), "packages/pro-plugins", import_constant.PLUGIN_COMMERCIAL), absolute: true });
    clientFiles.push(...commercialFiles);
  }
  const clientFileSource = clientFiles.map((item) => import_fs_extra.default.readFileSync(item, "utf-8"));
  const sourcePackages = (0, import_buildPluginUtils.getPackagesFromFiles)(clientFileSource);
  const excludePackages = (0, import_buildPluginUtils.getExcludePackages)(sourcePackages, external, pluginPrefix);
  (0, import_buildPluginUtils.checkRequire)(clientFiles, log);
  (0, import_buildPluginUtils.buildCheck)({ cwd, packageJson, entry: "client", files: clientFiles, log });
  const outDir = import_path.default.join(cwd, target_dir, "client");
  const globals = excludePackages.reduce((prev, curr) => {
    if (curr.startsWith("@nocobase")) {
      prev[`${curr}/client`] = `${curr}/client`;
    }
    prev[curr] = curr;
    return prev;
  }, {});
  const entry = import_fast_glob.default.globSync("index.{ts,tsx,js,jsx}", { absolute: false, cwd: import_path.default.join(cwd, "src/client") });
  const outputFileName = "index.js";
  const compiler = (0, import_core.rspack)({
    mode: "production",
    // mode: "development",
    context: cwd,
    entry: "./src/client/" + entry[0],
    target: ["web", "es5"],
    output: {
      path: outDir,
      filename: outputFileName,
      chunkFilename: "[chunkhash].js",
      publicPath: `auto`,
      // will be generated by the custom plugin
      clean: true,
      library: {
        name: packageJson.name,
        type: "umd",
        umdNamedDefine: true
      }
    },
    amd: {},
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
          test: /\.(?:js|mjs|cjs|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              targets: "defaults",
              // presets: [['@babel/preset-env']],
              plugins: ["react-imported-component/babel"]
            }
          }
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
          use: [
            {
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
              loader: require.resolve("./plugins/pluginRspackCommercialLoader"),
              options: {
                isCommercial
              }
            }
          ]
        },
        {
          test: /\.ts$/,
          exclude: /[\\/]node_modules[\\/]/,
          use: [
            {
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
            },
            {
              loader: require.resolve("./plugins/pluginRspackCommercialLoader"),
              options: {
                isCommercial
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new import_core.rspack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("production"),
        "process.env.NODE_DEBUG": false
      }),
      {
        apply(compiler2) {
          compiler2.hooks.compilation.tap("CustomPublicPathPlugin", (compilation) => {
            compilation.hooks.runtimeModule.tap("CustomPublicPathPlugin", (module2) => {
              if (module2.name === "auto_public_path") {
                module2.source = {
                  source: `
__webpack_require__.p = (function() {
  var publicPath = window['__nocobase_public_path__'] || '/';
  // \u786E\u4FDD\u8DEF\u5F84\u4EE5 / \u7ED3\u5C3E
  if (!publicPath.endsWith('/')) {
    publicPath += '/';
  }
  return publicPath + 'static/plugins/${packageJson.name}/dist/client/';
})();`
                };
              }
            });
          });
        }
      },
      process.env.BUILD_ANALYZE === "true" && new import_rspack_plugin.RsdoctorRspackPlugin({
        // plugin options
        // supports: {
        //   generateTileGraph: true,
        // },
        mode: "brief"
      })
    ].filter(Boolean),
    node: {
      global: true
    },
    externals: {
      react: "React",
      lodash: "lodash",
      // 'react/jsx-runtime': 'jsxRuntime',
      ...globals
    },
    stats: "errors-warnings"
  });
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      const compilationErrors = stats?.compilation.errors;
      const infos = stats.toString({
        colors: true
      });
      if (err || compilationErrors?.length) {
        reject(err || infos);
        return;
      }
      console.log(infos);
      resolve(null);
    });
  });
}
async function buildPlugin(cwd, userConfig, sourcemap, log) {
  if (cwd.includes("/pro-plugins/") && import_fs_extra.default.existsSync(import_path.default.join(process.cwd(), "packages/pro-plugins/", import_constant.PLUGIN_COMMERCIAL))) {
    await buildPluginClient(cwd, userConfig, sourcemap, log, true);
    await buildProPluginServer(cwd, userConfig, sourcemap, log);
  } else {
    await buildPluginClient(cwd, userConfig, sourcemap, log);
    await buildPluginServer(cwd, userConfig, sourcemap, log);
  }
  writeExternalPackageVersion(cwd, log);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  buildPlugin,
  buildPluginClient,
  buildPluginServer,
  buildProPluginServer,
  buildServerDeps,
  deleteServerFiles,
  writeExternalPackageVersion
});
