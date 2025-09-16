var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var pluginRspackCommercialLoader_exports = {};
__export(pluginRspackCommercialLoader_exports, {
  default: () => myLoader
});
module.exports = __toCommonJS(pluginRspackCommercialLoader_exports);
function myLoader(source) {
  const options = this.getOptions();
  if (!options?.isCommercial) {
    return source;
  }
  const isEntry = this.resourcePath.match(/client\/index\.(ts|tsx)/) && !this.resourcePath.includes("plugin-commercial");
  if (isEntry) {
    const regex = /export\s+default\s+([a-zA-Z_0-9]+)\s*;?/;
    const match = source.match(regex);
    if (match) {
      source = source.replace(regex, ``);
      const moduleName = match[1];
      source = `
        import { withCommercial } from '@nocobase/plugin-commercial/client';
        ${source}
        export default withCommercial(${moduleName});
        `;
      console.log(`Insert commercial client code success`);
    } else {
      console.error(`Insert commercial client code fail`);
    }
    return source;
  }
  return source;
}
