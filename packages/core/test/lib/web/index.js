/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
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
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var web_exports = {};
__export(web_exports, {
  CommonSchemaComponent: () => CommonSchemaComponent,
  addXReadPrettyToEachLayer: () => addXReadPrettyToEachLayer,
  getApp: () => getApp,
  getAppComponent: () => getAppComponent,
  getAppComponentWithSchemaSettings: () => getAppComponentWithSchemaSettings,
  getReadPrettyAppComponent: () => getReadPrettyAppComponent,
  getReadPrettyAppComponentWithSchemaSettings: () => getReadPrettyAppComponentWithSchemaSettings,
  mockApi: () => mockApi,
  mockAppApi: () => mockAppApi,
  setSchemaWithSettings: () => setSchemaWithSettings,
  withSchema: () => withSchema
});
module.exports = __toCommonJS(web_exports);
var import_react = require("@formily/react");
var import_axios_mock_adapter = __toESM(require("axios-mock-adapter"));
var import_lodash = require("lodash");
var import_react2 = __toESM(require("react"));
var import_client = require("@nocobase/client");
var import_lodash2 = __toESM(require("lodash"));
var import_dataSource2 = __toESM(require("./dataSource2.json"));
var import_dataSourceMainCollections = __toESM(require("./dataSourceMainCollections.json"));
var import_dataSourceMainData = __toESM(require("./dataSourceMainData.json"));
__reExport(web_exports, require("./utils"), module.exports);
const defaultApis = {
  "uiSchemas:patch": { data: { result: "ok" } },
  "uiSchemas:batchPatch": { data: { result: "ok" } },
  "uiSchemas:saveAsTemplate": { data: { result: "ok" } },
  "users:update": { data: { result: "ok" } },
  "roles:update": { data: { result: "ok" } },
  ...import_dataSourceMainData.default
};
function getProcessMockData(apis, key) {
  if (typeof apis[key] === "function") {
    return apis[key];
  }
  return (config) => {
    var _a, _b;
    if (!apis[key]) return [404, { data: { message: "mock data not found" } }];
    if (((_a = config == null ? void 0 : config.params) == null ? void 0 : _a.pageSize) || ((_b = config == null ? void 0 : config.params) == null ? void 0 : _b.page)) {
      const { data, meta } = apis[key];
      const pageSize = config.params.pageSize || (meta == null ? void 0 : meta.pageSize) || 20;
      const page = config.params.page || (meta == null ? void 0 : meta.page) || 1;
      return [
        200,
        {
          data: data.slice(pageSize * (page - 1), pageSize * page),
          meta: {
            ...meta,
            page,
            pageSize,
            count: data.length,
            totalPage: Math.ceil(data.length / pageSize)
          }
        }
      ];
    }
    return [200, apis[key]];
  };
}
__name(getProcessMockData, "getProcessMockData");
const mockApi = /* @__PURE__ */ __name((axiosInstance, apis = {}, delayResponse) => {
  const mock = new import_axios_mock_adapter.default(axiosInstance, { delayResponse });
  Object.keys(apis).forEach((key) => {
    mock.onAny(key).reply(getProcessMockData(apis, key));
  });
  return (apis2 = {}) => {
    Object.keys(apis2).forEach((key) => {
      mock.onAny(key).reply(getProcessMockData(apis2, key));
    });
  };
}, "mockApi");
const mockAppApi = /* @__PURE__ */ __name((app, apis = {}, delayResponse) => {
  const mock = mockApi(app.apiClient.axios, apis, delayResponse);
  return mock;
}, "mockAppApi");
const ShowFormData = (0, import_react.observer)(({ children }) => {
  const form = (0, import_react.useForm)();
  return /* @__PURE__ */ import_react2.default.createElement(import_react2.default.Fragment, null, /* @__PURE__ */ import_react2.default.createElement("pre", { style: { marginBottom: 20 }, "data-testid": "form-data" }, JSON.stringify(form.values, null, 2)), children);
});
const getApp = /* @__PURE__ */ __name((options) => {
  const {
    appOptions = {},
    schemaSettings,
    providers,
    disableAcl = true,
    apis: optionsApis = {},
    enableMultipleDataSource,
    designable,
    delayResponse
  } = options;
  const app = appOptions instanceof import_client.Application ? appOptions : new import_client.Application({
    ...appOptions,
    disableAcl: appOptions.disableAcl || disableAcl,
    designable: appOptions.designable || designable
  });
  if (providers) {
    app.addProviders(providers);
  }
  if (schemaSettings) {
    app.schemaSettingsManager.add(schemaSettings);
  }
  app.addComponents({ CommonSchemaComponent, ShowFormData });
  app.pluginManager.add(import_client.AntdSchemaComponentPlugin);
  app.pluginManager.add(import_client.SchemaSettingsPlugin);
  app.pluginManager.add(import_client.CollectionPlugin, { config: { enableRemoteDataSource: false } });
  const apis = Object.assign({}, defaultApis, optionsApis);
  app.getCollectionManager().addCollections(import_dataSourceMainCollections.default);
  if (enableMultipleDataSource) {
    app.dataSourceManager.addDataSource(import_client.LocalDataSource, import_dataSource2.default);
  }
  mockAppApi(app, apis, delayResponse);
  const App = app.getRootComponent();
  return {
    App,
    app
  };
}, "getApp");
const getAppComponent = /* @__PURE__ */ __name((options) => {
  const {
    schema: optionsSchema = {},
    Component,
    value,
    props,
    onChange,
    noWrapperSchema,
    enableUserListDataBlock,
    ...otherOptions
  } = options;
  if (noWrapperSchema) {
    const { App: App2 } = getApp(options);
    return App2;
  }
  const schema = {
    type: "object",
    name: "test",
    default: value,
    "x-component": Component,
    "x-component-props": {
      onChange,
      ...props
    },
    ...optionsSchema
  };
  if (!schema.name) {
    schema.name = "test";
  }
  if (!schema["x-uid"]) {
    schema["x-uid"] = "test";
  }
  if (!schema.type) {
    schema.type = "void";
  }
  const TestDemo = /* @__PURE__ */ __name(() => {
    if (!enableUserListDataBlock) {
      return /* @__PURE__ */ import_react2.default.createElement(import_client.SchemaComponent, { schema });
    }
    return /* @__PURE__ */ import_react2.default.createElement(import_client.DataBlockProvider, { collection: "users", action: "list" }, /* @__PURE__ */ import_react2.default.createElement(import_client.SchemaComponent, { schema }));
  }, "TestDemo");
  const { App } = getApp({
    ...otherOptions,
    providers: [TestDemo]
  });
  return App;
}, "getAppComponent");
function addXReadPrettyToEachLayer(obj = {}) {
  obj["x-read-pretty"] = true;
  import_lodash2.default.forOwn(obj, (value, key) => {
    if (import_lodash2.default.isObject(value)) {
      addXReadPrettyToEachLayer(value);
    }
  });
  return obj;
}
__name(addXReadPrettyToEachLayer, "addXReadPrettyToEachLayer");
const getReadPrettyAppComponent = /* @__PURE__ */ __name((options) => {
  return getAppComponent({ ...options, schema: addXReadPrettyToEachLayer(options.schema) });
}, "getReadPrettyAppComponent");
function setSchemaWithSettings(options) {
  const { Component, settingPath } = options;
  const SINGLE_SETTINGS_NAME = "testSettings";
  const testSettings = new import_client.SchemaSettings({
    name: SINGLE_SETTINGS_NAME,
    items: [
      {
        name: "test",
        Component
      }
    ]
  });
  if (!options.schema) {
    options.schema = {};
  }
  if (settingPath) {
    const schema = (0, import_lodash.get)(options.schema, settingPath);
    schema["x-settings"] = SINGLE_SETTINGS_NAME;
  } else {
    options.schema["x-settings"] = SINGLE_SETTINGS_NAME;
  }
  if (!options.appOptions) {
    options.appOptions = {};
  }
  if (options.appOptions instanceof import_client.Application) {
    options.appOptions.schemaSettingsManager.add(testSettings);
  } else {
    if (!options.appOptions.schemaSettings) {
      options.appOptions.schemaSettings = [];
    }
    options.appOptions.schemaSettings.push(testSettings);
  }
}
__name(setSchemaWithSettings, "setSchemaWithSettings");
const getAppComponentWithSchemaSettings = /* @__PURE__ */ __name((options) => {
  setSchemaWithSettings(options);
  const App = getAppComponent(options);
  return App;
}, "getAppComponentWithSchemaSettings");
const getReadPrettyAppComponentWithSchemaSettings = /* @__PURE__ */ __name((options) => {
  setSchemaWithSettings(options);
  (0, import_lodash.set)(options.schema, "x-read-pretty", true);
  const App = getAppComponent(options);
  return App;
}, "getReadPrettyAppComponentWithSchemaSettings");
function withSchema(Component, name) {
  const ComponentValue = (0, import_react.observer)((props) => {
    const schema = (0, import_react.useFieldSchema)();
    const schemaValue = (0, import_lodash.pick)(schema.toJSON(), [
      "title",
      "description",
      "enum",
      "x-component-props",
      "x-decorator-props",
      "x-linkage-rules"
    ]);
    return /* @__PURE__ */ import_react2.default.createElement(import_react2.default.Fragment, null, /* @__PURE__ */ import_react2.default.createElement("pre", { "data-testid": name ? `test-schema-${name}` : `test-schema` }, JSON.stringify(schemaValue, void 0, 2)), /* @__PURE__ */ import_react2.default.createElement(Component, { ...props }));
  });
  ComponentValue.displayName = `withSchema(${Component.displayName || Component.name})`;
  return ComponentValue;
}
__name(withSchema, "withSchema");
const CommonSchemaComponent = withSchema(/* @__PURE__ */ __name(function CommonSchemaComponent2(props) {
  return /* @__PURE__ */ import_react2.default.createElement(import_react2.default.Fragment, null, props.children);
}, "CommonSchemaComponent"));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CommonSchemaComponent,
  addXReadPrettyToEachLayer,
  getApp,
  getAppComponent,
  getAppComponentWithSchemaSettings,
  getReadPrettyAppComponent,
  getReadPrettyAppComponentWithSchemaSettings,
  mockApi,
  mockAppApi,
  setSchemaWithSettings,
  withSchema,
  ...require("./utils")
});
