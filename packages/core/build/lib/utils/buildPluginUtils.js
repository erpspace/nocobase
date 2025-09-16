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
var buildPluginUtils_exports = {};
__export(buildPluginUtils_exports, {
  buildCheck: () => buildCheck,
  checkDependencies: () => checkDependencies,
  checkEntryExists: () => checkEntryExists,
  checkFileSize: () => checkFileSize,
  checkRequire: () => checkRequire,
  formatFileSize: () => formatFileSize,
  getExcludePackages: () => getExcludePackages,
  getFileSize: () => getFileSize,
  getIncludePackages: () => getIncludePackages,
  getPackageJsonPackages: () => getPackageJsonPackages,
  getPackageNameFromString: () => getPackageNameFromString,
  getPackagesFromFiles: () => getPackagesFromFiles,
  getSourcePackages: () => getSourcePackages,
  isNotBuiltinModule: () => isNotBuiltinModule,
  isValidPackageName: () => isValidPackageName
});
module.exports = __toCommonJS(buildPluginUtils_exports);
var import_fs = __toESM(require("fs"));
var import_chalk = __toESM(require("chalk"));
var import_module = require("module");
var import_path = __toESM(require("path"));
const requireRegex = /require\s*\(['"`](.*?)['"`]\)/g;
const importRegex = /^import(?:['"\s]*([\w*${}\s,]+)from\s*)?['"\s]['"\s](.*[@\w_-]+)['"\s].*/gm;
function isNotBuiltinModule(packageName) {
  return !import_module.builtinModules.includes(packageName);
}
const isValidPackageName = (str) => {
  const pattern = /^(?:@[a-zA-Z0-9_-]+\/)?[a-zA-Z0-9_-]+$/;
  return pattern.test(str);
};
function getPackageNameFromString(str) {
  if (str.startsWith(".")) return null;
  const arr = str.split("/");
  let packageName;
  if (arr[0].startsWith("@")) {
    packageName = arr.slice(0, 2).join("/");
  } else {
    packageName = arr[0];
  }
  packageName = packageName.trim();
  return isValidPackageName(packageName) ? packageName : null;
}
function getPackagesFromFiles(files) {
  const packageNames = files.map((item) => [
    ...[...item.matchAll(importRegex)].map((item2) => item2[2]),
    ...[...item.matchAll(requireRegex)].map((item2) => item2[1])
  ]).flat().map(getPackageNameFromString).filter(Boolean).filter(isNotBuiltinModule);
  return [...new Set(packageNames)];
}
function getSourcePackages(fileSources) {
  return getPackagesFromFiles(fileSources);
}
function getIncludePackages(sourcePackages, external, pluginPrefix) {
  return sourcePackages.filter((packageName) => !external.includes(packageName)).filter((packageName) => !pluginPrefix.some((prefix) => packageName.startsWith(prefix)));
}
function getExcludePackages(sourcePackages, external, pluginPrefix) {
  const includePackages = getIncludePackages(sourcePackages, external, pluginPrefix);
  return sourcePackages.filter((packageName) => !includePackages.includes(packageName));
}
function getPackageJsonPackages(packageJson) {
  return [
    .../* @__PURE__ */ new Set([...Object.keys(packageJson.devDependencies || {}), ...Object.keys(packageJson.dependencies || {})])
  ];
}
function checkEntryExists(cwd, entry, log) {
  const srcDir = import_path.default.join(cwd, "src", entry);
  if (!import_fs.default.existsSync(srcDir)) {
    log("Missing %s. Please create it.", import_chalk.default.red(`src/${entry}`));
    process.exit(-1);
  }
  return srcDir;
}
function checkDependencies(packageJson, log) {
  const packages = Object.keys(packageJson.dependencies || {});
  if (!packages.length) return;
  log(
    "The build tool will package all dependencies into the dist directory, so you don't need to put them in %s. Instead, they should be placed in %s. For more information, please refer to: %s.",
    import_chalk.default.yellow(packages.join(", ")),
    import_chalk.default.yellow("dependencies"),
    import_chalk.default.yellow("devDependencies"),
    import_chalk.default.blue(import_chalk.default.blue("https://docs.nocobase.com/development/others/deps"))
  );
}
function getFileSize(filePath) {
  const stat = import_fs.default.statSync(filePath);
  return stat.size;
}
function formatFileSize(fileSize) {
  const kb = fileSize / 1024;
  return kb.toFixed(2) + " KB";
}
function buildCheck(options) {
  const { cwd, log, entry, files, packageJson } = options;
  checkEntryExists(cwd, entry, log);
  checkDependencies(packageJson, log);
}
function checkRequire(sourceFiles, log) {
  const requireArr = sourceFiles.map((filePath) => {
    const code = import_fs.default.readFileSync(filePath, "utf-8");
    return [...code.matchAll(requireRegex)].map((item) => ({
      filePath,
      code: item[0]
    }));
  }).flat();
  if (requireArr.length) {
    log("%s not allowed. Please use %s instead.", import_chalk.default.red("require()"), import_chalk.default.red("import"));
    requireArr.forEach((item, index) => {
      console.log("%s. %s in %s;", index + 1, import_chalk.default.red(item.code), import_chalk.default.red(item.filePath));
    });
    console.log("\n");
    process.exit(-1);
  }
}
function checkFileSize(outDir, log) {
  const files = import_fs.default.readdirSync(outDir);
  files.forEach((file) => {
    const fileSize = getFileSize(import_path.default.join(outDir, file));
    if (fileSize > 1024 * 1024) {
      log(`The %s size %s exceeds 1MB. You can use dynamic import \`import()\` for lazy loading content.`, import_chalk.default.red(file), import_chalk.default.red(formatFileSize(fileSize)));
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  buildCheck,
  checkDependencies,
  checkEntryExists,
  checkFileSize,
  checkRequire,
  formatFileSize,
  getExcludePackages,
  getFileSize,
  getIncludePackages,
  getPackageJsonPackages,
  getPackageNameFromString,
  getPackagesFromFiles,
  getSourcePackages,
  isNotBuiltinModule,
  isValidPackageName
});
