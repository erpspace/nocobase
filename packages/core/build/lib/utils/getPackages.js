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
var getPackages_exports = {};
__export(getPackages_exports, {
  getPackages: () => getPackages,
  sortPackages: () => sortPackages
});
module.exports = __toCommonJS(getPackages_exports);
var import_topo = __toESM(require("@hapi/topo"));
var import_fast_glob = __toESM(require("fast-glob"));
var import_path = __toESM(require("path"));
var import_constant = require("../constant");
var import_project = require("@lerna/project");
var import_utils = require("./utils");
function getPackagesPath(pkgs) {
  const allPackageJson = import_fast_glob.default.sync(["*/*/package.json", "*/*/*/package.json"], {
    cwd: import_constant.PACKAGES_PATH,
    absolute: true,
    onlyFiles: true
  });
  if (pkgs.length === 0) {
    return allPackageJson.map(import_utils.toUnixPath).map((item) => import_path.default.dirname(item));
  }
  const allPackageInfo = allPackageJson.map((packageJsonPath) => ({ name: require(packageJsonPath).name, path: import_path.default.dirname((0, import_utils.toUnixPath)(packageJsonPath)) })).reduce((acc, cur) => {
    acc[cur.name] = cur.path;
    return acc;
  }, {});
  const allPackagePaths = Object.values(allPackageInfo);
  const pkgNames = pkgs.filter((item) => allPackageInfo[item]);
  const relativePaths = pkgNames.length ? pkgs.filter((item) => !pkgNames.includes(item)) : pkgs;
  const pkgPaths = pkgs.map((item) => allPackageInfo[item]);
  const absPaths = allPackagePaths.filter((absPath) => relativePaths.some((relativePath) => absPath.endsWith(relativePath)));
  const dirPaths = import_fast_glob.default.sync(pkgs, { onlyDirectories: true, absolute: true, cwd: import_constant.ROOT_PATH });
  const dirMatchPaths = allPackagePaths.filter((pkgPath) => dirPaths.some((dirPath) => pkgPath.startsWith(dirPath)));
  return [.../* @__PURE__ */ new Set([...pkgPaths, ...absPaths, ...dirMatchPaths])];
}
function getPackages(pkgs) {
  const packagePaths = getPackagesPath(pkgs);
  const packages = (0, import_project.getPackagesSync)(import_constant.ROOT_PATH).filter((pkg) => packagePaths.includes((0, import_utils.toUnixPath)(pkg.location)));
  return sortPackages(packages);
}
function sortPackages(packages) {
  const sorter = new import_topo.default.Sorter();
  for (const pkg of packages) {
    const pkgJson = require(`${pkg.location}/package.json`);
    const after = Object.keys({ ...pkgJson.dependencies, ...pkgJson.devDependencies, ...pkgJson.peerDependencies });
    sorter.add(pkg, { after, group: pkg.name });
  }
  return sorter.nodes;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getPackages,
  sortPackages
});
