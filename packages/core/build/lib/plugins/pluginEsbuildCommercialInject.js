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
var pluginEsbuildCommercialInject_exports = {};
__export(pluginEsbuildCommercialInject_exports, {
  default: () => pluginEsbuildCommercialInject_default
});
module.exports = __toCommonJS(pluginEsbuildCommercialInject_exports);
var import_node_fs = __toESM(require("node:fs"));
const pluginEsbuildCommercialInject = {
  name: "plugin-esbuild-commercial-inject",
  setup(build) {
    build.onLoad({ filter: /src\/server\/index\.ts$/ }, async (args) => {
      let source = import_node_fs.default.readFileSync(args.path, "utf8");
      const regex = /export\s*\{\s*default\s*\}\s*from\s*(?:'([^']*)'|"([^"]*)");?/;
      const regex2 = /export\s+default\s+([a-zA-Z_0-9]+)\s*;?/;
      const match = source.match(regex);
      const match2 = source.match(regex2);
      if (match) {
        source = source.replace(regex, ``);
        const moduleName = match[1] || match[2];
        source = `
import { withCommercial } from '@nocobase/plugin-commercial/server';
import _plugin from '${moduleName}';
export default withCommercial(_plugin);
${source}
`;
        console.log(`Insert commercial server code success`);
      } else if (match2) {
        source = source.replace(regex2, ``);
        const moduleName = match2[1] || match2[2];
        source = `
import { withCommercial } from '@nocobase/plugin-commercial/server';
${source}
export default withCommercial(${moduleName});
`;
        console.log(`Insert commercial server code success`);
      } else {
        console.error(`Insert commercial server code fail`);
      }
      return {
        contents: source,
        loader: "ts"
      };
    });
  }
};
var pluginEsbuildCommercialInject_default = pluginEsbuildCommercialInject;
