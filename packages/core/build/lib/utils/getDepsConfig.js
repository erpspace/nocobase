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
var getDepsConfig_exports = {};
__export(getDepsConfig_exports, {
  getDepPkgPath: () => getDepPkgPath,
  getDepsConfig: () => getDepsConfig,
  getRltExternalsFromDeps: () => getRltExternalsFromDeps,
  winPath: () => winPath
});
module.exports = __toCommonJS(getDepsConfig_exports);
var import_path = __toESM(require("path"));
function winPath(path2) {
  const isExtendedLengthPath = /^\\\\\?\\/.test(path2);
  if (isExtendedLengthPath) {
    return path2;
  }
  return path2.replace(/\\/g, "/");
}
function getRltExternalsFromDeps(depExternals, current) {
  return Object.entries(depExternals).reduce(
    (r, [dep, target]) => {
      if (dep !== current.name) {
        r[dep] = winPath(
          import_path.default.relative(current.outputDir, import_path.default.dirname(target))
        );
      }
      return r;
    },
    {}
  );
}
function getDepPkgPath(dep, cwd) {
  try {
    return require.resolve(`${dep}/package.json`, { paths: [cwd] });
  } catch {
    const mainFile = require.resolve(`${dep}`, { paths: cwd ? [cwd] : void 0 });
    const packageDir = mainFile.slice(0, mainFile.indexOf(dep.replace("/", import_path.default.sep)) + dep.length);
    return import_path.default.join(packageDir, "package.json");
  }
}
function getDepsConfig(cwd, outDir, depsName, external) {
  const pkgExternals = external.reduce((r, dep) => ({ ...r, [dep]: dep }), {});
  const depExternals = {};
  const deps = depsName.reduce((acc, packageName) => {
    const depEntryPath = require.resolve(packageName, { paths: [cwd] });
    const depPkgPath = getDepPkgPath(packageName, cwd);
    const depPkg = require(depPkgPath);
    const depDir = import_path.default.dirname(depPkgPath);
    const outputDir = import_path.default.join(outDir, packageName);
    const mainFile = import_path.default.join(outputDir, depEntryPath.replace(depDir, ""));
    acc[depEntryPath] = {
      nccConfig: {
        minify: true,
        target: "es5",
        quiet: true,
        externals: {}
      },
      depDir,
      pkg: depPkg,
      outputDir,
      mainFile
    };
    return acc;
  }, {});
  Object.values(deps).forEach((depConfig) => {
    const rltDepExternals = getRltExternalsFromDeps(depExternals, {
      name: depConfig.pkg.name,
      outputDir: depConfig.outputDir
    });
    depConfig.nccConfig.externals = {
      ...pkgExternals,
      ...rltDepExternals
    };
  });
  return deps;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getDepPkgPath,
  getDepsConfig,
  getRltExternalsFromDeps,
  winPath
});
