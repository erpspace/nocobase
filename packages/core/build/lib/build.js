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
var build_exports = {};
__export(build_exports, {
  build: () => build,
  buildPackage: () => buildPackage,
  buildPackages: () => buildPackages
});
module.exports = __toCommonJS(build_exports);
var import_execa = __toESM(require("execa"));
var import_chalk = __toESM(require("chalk"));
var import_path = __toESM(require("path"));
var import_constant = require("./constant");
var import_buildClient = require("./buildClient");
var import_buildCjs = require("./buildCjs");
var import_buildPlugin = require("./buildPlugin");
var import_buildDeclaration = require("./buildDeclaration");
var import_utils = require("./utils");
var import_getPackages = require("./utils/getPackages");
var import_tarPlugin = require("./tarPlugin");
var import_buildEsm = require("./buildEsm");
var import_addlicense = require("./utils/addlicense");
const BUILD_ERROR = "build-error";
async function build(pkgs) {
  const isDev = process.argv.includes("--development");
  process.env.NODE_ENV = isDev ? "development" : "production";
  let packages = (0, import_getPackages.getPackages)(pkgs);
  const cachePkg = (0, import_utils.readFromCache)(BUILD_ERROR);
  if (process.argv.includes("--retry") && cachePkg?.pkg) {
    packages = packages.slice(packages.findIndex((item) => item.name === cachePkg.pkg));
  }
  if (packages.length === 0) {
    let msg = "";
    if (pkgs.length) {
      msg = `'${pkgs.join(", ")}' did not match any packages`;
    } else {
      msg = "No package matched";
    }
    console.warn(import_chalk.default.yellow(`[@nocobase/build]: ${msg}`));
    return;
  }
  const pluginPackages = (0, import_constant.getPluginPackages)(packages);
  const cjsPackages = (0, import_constant.getCjsPackages)(packages);
  const presetsPackages = (0, import_constant.getPresetsPackages)(packages);
  await buildPackages(cjsPackages, "lib", import_buildCjs.buildCjs);
  const clientCore = packages.find((item) => item.location === import_constant.CORE_CLIENT);
  if (clientCore) {
    await buildPackage(clientCore, "es", import_buildClient.buildClient);
  }
  const esmPackages = packages.filter((pkg) => import_constant.ESM_PACKAGES.includes(pkg.name));
  await buildPackages(esmPackages, "lib", import_buildCjs.buildCjs);
  await buildPackages(esmPackages, "es", import_buildEsm.buildEsm);
  await buildPackages(pluginPackages, "dist", import_buildPlugin.buildPlugin);
  await buildPackages(presetsPackages, "lib", import_buildCjs.buildCjs);
  const appClient = packages.find((item) => item.location === import_constant.CORE_APP);
  if (appClient) {
    await runScript(["umi", "build"], import_constant.ROOT_PATH, {
      APP_ROOT: import_path.default.join(import_constant.CORE_APP, "client"),
      ANALYZE: process.env.BUILD_ANALYZE === "true" ? "1" : void 0
    });
  }
  (0, import_utils.writeToCache)(BUILD_ERROR, {});
}
async function buildPackages(packages, targetDir, doBuildPackage) {
  for await (const pkg of packages) {
    (0, import_utils.writeToCache)(BUILD_ERROR, { pkg: pkg.name });
    await buildPackage(pkg, targetDir, doBuildPackage);
  }
}
async function buildPackage(pkg, targetDir, doBuildPackage) {
  const sourcemap = process.argv.includes("--sourcemap");
  const noDeclaration = process.argv.includes("--no-dts");
  const hasTar = process.argv.includes("--tar");
  const onlyTar = process.argv.includes("--only-tar");
  const log = (0, import_utils.getPkgLog)(pkg.name);
  const packageJson = (0, import_utils.getPackageJson)(pkg.location);
  if (onlyTar) {
    await (0, import_tarPlugin.tarPlugin)(pkg.location, log);
    return;
  }
  log(`${import_chalk.default.bold((0, import_utils.toUnixPath)(pkg.location.replace(import_constant.PACKAGES_PATH, "").slice(1)))} build start`);
  const userConfig = (0, import_utils.getUserConfig)(pkg.location);
  if (packageJson?.scripts?.prebuild) {
    log("prebuild");
    await runScript(["prebuild"], pkg.location);
    await packageJson.prebuild(pkg.location);
  }
  if (userConfig.beforeBuild) {
    log("beforeBuild");
    await userConfig.beforeBuild(log);
  }
  await doBuildPackage(pkg.location, userConfig, sourcemap, log);
  if (!noDeclaration) {
    log("build declaration");
    await (0, import_buildDeclaration.buildDeclaration)(pkg.location, targetDir);
  }
  if (packageJson?.scripts?.postbuild) {
    log("postbuild");
    await runScript(["postbuild"], pkg.location);
  }
  if (userConfig.afterBuild) {
    log("afterBuild");
    await userConfig.afterBuild(log);
  }
  await (0, import_addlicense.addLicense)(import_path.default.join(pkg.location, targetDir), log);
  if (hasTar) {
    await (0, import_tarPlugin.tarPlugin)(pkg.location, log);
  }
}
function runScript(args, cwd, envs = {}) {
  return (0, import_execa.default)("yarn", args, {
    cwd,
    stdio: "inherit",
    env: {
      ...process.env,
      ...envs,
      sourcemap: process.argv.includes("--sourcemap") ? "sourcemap" : void 0,
      NODE_ENV: process.env.NODE_ENV || "production"
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  build,
  buildPackage,
  buildPackages
});
