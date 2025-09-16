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
var buildDeclaration_exports = {};
__export(buildDeclaration_exports, {
  buildDeclaration: () => buildDeclaration
});
module.exports = __toCommonJS(buildDeclaration_exports);
var import_gulp = __toESM(require("gulp"));
var import_gulp_typescript = __toESM(require("gulp-typescript"));
var import_path = __toESM(require("path"));
var import_constant = require("./constant");
const buildDeclaration = (cwd, targetDir) => {
  return new Promise((resolve, reject) => {
    const srcPath = import_path.default.join(cwd, "src");
    const targetPath = import_path.default.join(cwd, targetDir);
    const tsConfig = import_gulp_typescript.default.createProject(import_path.default.join(import_constant.ROOT_PATH, "tsconfig.json"));
    delete tsConfig.config.compilerOptions.paths;
    const patterns = [
      import_path.default.join(srcPath, "**/*.{ts,tsx}"),
      `!${import_path.default.join(srcPath, "**/fixtures{,/**}")}`,
      `!${import_path.default.join(srcPath, "**/demos{,/**}")}`,
      `!${import_path.default.join(srcPath, "**/__test__{,/**}")}`,
      `!${import_path.default.join(srcPath, "**/__tests__{,/**}")}`,
      `!${import_path.default.join(srcPath, "**/__benchmarks__{,/**}")}`,
      `!${import_path.default.join(srcPath, "**/__e2e__{,/**}")}`,
      `!${import_path.default.join(srcPath, "**/*.mdx")}`,
      `!${import_path.default.join(srcPath, "**/*.md")}`,
      `!${import_path.default.join(srcPath, "**/*.+(test|e2e|spec).+(js|jsx|ts|tsx)")}`,
      `!${import_path.default.join(srcPath, "**/tsconfig{,.*}.json")}`,
      `!${import_path.default.join(srcPath, ".umi{,-production,-test}{,/**}")}`
    ];
    import_gulp.default.src(patterns, { base: srcPath, allowEmpty: true }).pipe((0, import_gulp_typescript.default)(tsConfig.config.compilerOptions)).dts.pipe(import_gulp.default.dest(targetPath)).on("end", resolve).on("error", reject);
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  buildDeclaration
});
