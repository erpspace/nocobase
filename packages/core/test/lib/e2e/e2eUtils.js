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
var e2eUtils_exports = {};
__export(e2eUtils_exports, {
  NocoMobilePage: () => NocoMobilePage,
  NocoPage: () => NocoPage,
  createBlockInPage: () => createBlockInPage,
  defineConfig: () => import_defineConfig.defineConfig,
  deleteRecords: () => deleteRecords,
  expectInitializerMenu: () => expectInitializerMenu,
  expectSettingsMenu: () => expectSettingsMenu,
  expectSupportedVariables: () => expectSupportedVariables,
  mockUserRecordsWithoutDepartments: () => mockUserRecordsWithoutDepartments,
  omitSomeFields: () => omitSomeFields,
  removeAllMobileRoutes: () => removeAllMobileRoutes,
  test: () => test
});
module.exports = __toCommonJS(e2eUtils_exports);
var import_faker = require("@faker-js/faker");
var import_shared = require("@formily/shared");
var import_test = require("@playwright/test");
var import_lodash = __toESM(require("lodash"));
var import_defineConfig = require("./defineConfig");
__reExport(e2eUtils_exports, require("@playwright/test"), module.exports);
function getPageMenuSchema({ pageSchemaUid, tabSchemaUid, tabSchemaName }) {
  return {
    type: "void",
    "x-component": "Page",
    properties: {
      [tabSchemaName]: {
        type: "void",
        "x-component": "Grid",
        "x-initializer": "page:addBlock",
        properties: {},
        "x-uid": tabSchemaUid,
        "x-async": true
      }
    },
    "x-uid": pageSchemaUid
  };
}
__name(getPageMenuSchema, "getPageMenuSchema");
function getPageMenuSchemaWithTabSchema({ tabSchema }) {
  if (!tabSchema) {
    return null;
  }
  return {
    type: "void",
    "x-component": "Page",
    properties: {
      [tabSchema.name]: tabSchema
    },
    "x-uid": (0, import_shared.uid)()
  };
}
__name(getPageMenuSchemaWithTabSchema, "getPageMenuSchemaWithTabSchema");
const PORT = process.env.APP_PORT || 2e4;
const APP_BASE_URL = process.env.APP_BASE_URL || `http://localhost:${PORT}`;
const _NocoPage = class _NocoPage {
  constructor(options, page) {
    this.options = options;
    this.page = page;
    this._waitForInit = this.init();
  }
  url;
  uid;
  desktopRouteId;
  collectionsName;
  _waitForInit;
  async init() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
    const waitList = [];
    if ((_b = (_a = this.options) == null ? void 0 : _a.collections) == null ? void 0 : _b.length) {
      const collections = omitSomeFields(this.options.collections);
      this.collectionsName = collections.map((item) => item.name);
      waitList.push(createCollections(collections));
    }
    waitList.push(
      createPage({
        type: (_c = this.options) == null ? void 0 : _c.type,
        name: (_d = this.options) == null ? void 0 : _d.name,
        pageSchema: (_e = this.options) == null ? void 0 : _e.pageSchema,
        tabSchema: (_f = this.options) == null ? void 0 : _f.tabSchema,
        url: (_g = this.options) == null ? void 0 : _g.url,
        keepUid: (_h = this.options) == null ? void 0 : _h.keepUid,
        pageUid: (_i = this.options) == null ? void 0 : _i.pageUid
      })
    );
    const result = await Promise.all(waitList);
    const { schemaUid, routeId } = result[result.length - 1] || {};
    this.uid = schemaUid;
    this.desktopRouteId = routeId;
    this.url = `${((_j = this.options) == null ? void 0 : _j.basePath) || "/admin/"}${this.uid || this.desktopRouteId}`;
  }
  async goto() {
    var _a;
    await this._waitForInit;
    await ((_a = this.page) == null ? void 0 : _a.goto(this.url));
  }
  async getUrl() {
    await this._waitForInit;
    return this.url;
  }
  async getUid() {
    await this._waitForInit;
    return this.uid;
  }
  async getDesktopRouteId() {
    await this._waitForInit;
    return this.desktopRouteId;
  }
  /**
   * If you are using mockRecords, then you need to use this method.
   * Wait until the mockRecords create the records successfully before navigating to the page.
   * @param this
   * @returns
   */
  async waitForInit() {
    await this._waitForInit;
    return this;
  }
  async destroy() {
    var _a;
    const waitList = [];
    if (this.uid || this.desktopRouteId !== void 0) {
      waitList.push(deletePage(this.uid, this.desktopRouteId));
      this.uid = void 0;
      this.desktopRouteId = void 0;
    }
    if ((_a = this.collectionsName) == null ? void 0 : _a.length) {
      waitList.push(deleteCollections(this.collectionsName));
      this.collectionsName = void 0;
    }
    await Promise.all(waitList);
  }
};
__name(_NocoPage, "NocoPage");
let NocoPage = _NocoPage;
const _NocoMobilePage = class _NocoMobilePage extends NocoPage {
  constructor(options, page) {
    super(options, page);
    this.options = options;
    this.page = page;
  }
  mobileRouteId;
  title;
  getTitle() {
    return this.title;
  }
  async init() {
    var _a, _b, _c, _d, _e;
    const waitList = [];
    if ((_b = (_a = this.options) == null ? void 0 : _a.collections) == null ? void 0 : _b.length) {
      const collections = omitSomeFields(this.options.collections);
      this.collectionsName = collections.map((item) => item.name);
      waitList.push(createCollections(collections));
    }
    waitList.push(createMobilePage(this.options));
    const result = await Promise.all(waitList);
    const { url, pageSchemaUid, routeId, title } = result[result.length - 1];
    this.title = title;
    this.mobileRouteId = routeId;
    this.uid = pageSchemaUid;
    if (((_c = this.options) == null ? void 0 : _c.type) == "link") {
      if (url == null ? void 0 : url.startsWith("/")) {
        this.url = `${((_d = this.options) == null ? void 0 : _d.basePath) || "/m"}${url}`;
      } else {
        this.url = url;
      }
    } else {
      this.url = `${((_e = this.options) == null ? void 0 : _e.basePath) || "/m"}${url}`;
    }
  }
  async mobileDestroy() {
    await deleteMobileRoutes(this.mobileRouteId);
    await this.destroy();
  }
};
__name(_NocoMobilePage, "NocoMobilePage");
let NocoMobilePage = _NocoMobilePage;
let _page;
const getPage = /* @__PURE__ */ __name(async (browser) => {
  if (!_page) {
    _page = await browser.newPage();
  }
  return _page;
}, "getPage");
const _test = import_test.test.extend({
  page: /* @__PURE__ */ __name(async ({ browser }, use) => {
    await use(await getPage(browser));
  }, "page"),
  mockPage: /* @__PURE__ */ __name(async ({ browser }, use) => {
    const page = await getPage(browser);
    const nocoPages = [];
    const mockPage = /* @__PURE__ */ __name((config) => {
      const nocoPage = new NocoPage(config, page);
      nocoPages.push(nocoPage);
      return nocoPage;
    }, "mockPage");
    await use(mockPage);
    const waitList = [];
    for (const nocoPage of nocoPages) {
      await nocoPage.destroy();
    }
    waitList.push(setDefaultRole("root"));
    waitList.push(removeRedundantUserAndRoles());
    await Promise.all(waitList);
  }, "mockPage"),
  mockMobilePage: /* @__PURE__ */ __name(async ({ browser }, use) => {
    const page = await getPage(browser);
    const nocoPages = [];
    const mockPage = /* @__PURE__ */ __name((config) => {
      const nocoPage = new NocoMobilePage(config, page);
      nocoPages.push(nocoPage);
      return nocoPage;
    }, "mockPage");
    await use(mockPage);
    const waitList = [];
    for (const nocoPage of nocoPages) {
      await nocoPage.mobileDestroy();
    }
    waitList.push(setDefaultRole("root"));
    waitList.push(removeRedundantUserAndRoles());
    await Promise.all(waitList);
  }, "mockMobilePage"),
  mockManualDestroyPage: /* @__PURE__ */ __name(async ({ browser }, use) => {
    const mockManualDestroyPage = /* @__PURE__ */ __name((config) => {
      const nocoPage = new NocoPage(config);
      return nocoPage;
    }, "mockManualDestroyPage");
    await use(mockManualDestroyPage);
  }, "mockManualDestroyPage"),
  createCollections: /* @__PURE__ */ __name(async ({ browser }, use) => {
    let collectionsName = [];
    const _createCollections = /* @__PURE__ */ __name(async (collectionSettings) => {
      collectionSettings = omitSomeFields(
        Array.isArray(collectionSettings) ? collectionSettings : [collectionSettings]
      );
      collectionsName = [...collectionsName, ...collectionSettings.map((item) => item.name)];
      await createCollections(collectionSettings);
    }, "_createCollections");
    await use(_createCollections);
    if (collectionsName.length) {
      await deleteCollections(import_lodash.default.uniq(collectionsName));
    }
  }, "createCollections"),
  mockCollections: /* @__PURE__ */ __name(async ({ browser }, use) => {
    let collectionsName = [];
    const destroy = /* @__PURE__ */ __name(async () => {
      if (collectionsName.length) {
        await deleteCollections(import_lodash.default.uniq(collectionsName));
      }
    }, "destroy");
    const mockCollections = /* @__PURE__ */ __name(async (collectionSettings) => {
      collectionSettings = omitSomeFields(collectionSettings);
      collectionsName = [...collectionsName, ...collectionSettings.map((item) => item.name)];
      return createCollections(collectionSettings);
    }, "mockCollections");
    await use(mockCollections);
    await destroy();
  }, "mockCollections"),
  mockCollection: /* @__PURE__ */ __name(async ({ browser }, use) => {
    let collectionsName = [];
    const destroy = /* @__PURE__ */ __name(async () => {
      if (collectionsName.length) {
        await deleteCollections(import_lodash.default.uniq(collectionsName));
      }
    }, "destroy");
    const mockCollection = /* @__PURE__ */ __name(async (collectionSetting, options) => {
      const collectionSettings = omitSomeFields([collectionSetting]);
      collectionsName = [...collectionsName, ...collectionSettings.map((item) => item.name)];
      return createCollections(collectionSettings);
    }, "mockCollection");
    await use(mockCollection);
    await destroy();
  }, "mockCollection"),
  mockRecords: /* @__PURE__ */ __name(async ({ browser }, use) => {
    const mockRecords = /* @__PURE__ */ __name(async (collectionName, count = 3, data) => {
      let maxDepth;
      if (import_lodash.default.isNumber(data)) {
        maxDepth = data;
        data = void 0;
      }
      if (import_lodash.default.isArray(count)) {
        data = count;
        count = data.length;
      }
      return createRandomData(collectionName, count, data, maxDepth);
    }, "mockRecords");
    await use(mockRecords);
  }, "mockRecords"),
  mockRecord: /* @__PURE__ */ __name(async ({ browser }, use) => {
    const mockRecord = /* @__PURE__ */ __name(async (collectionName, data, maxDepth) => {
      if (import_lodash.default.isNumber(data)) {
        maxDepth = data;
        data = void 0;
      }
      const result = await createRandomData(collectionName, 1, data, maxDepth);
      return result[0];
    }, "mockRecord");
    await use(mockRecord);
  }, "mockRecord"),
  deletePage: /* @__PURE__ */ __name(async ({ browser }, use) => {
    const page = await getPage(browser);
    const deletePage2 = /* @__PURE__ */ __name(async (pageName) => {
      await page.getByLabel(pageName, { exact: true }).hover();
      await page.getByRole("button", { name: "designer-schema-settings-" }).hover();
      await page.getByRole("menuitem", { name: "Delete", exact: true }).click();
      await page.getByRole("button", { name: "OK", exact: true }).click();
    }, "deletePage");
    await use(deletePage2);
  }, "deletePage"),
  mockRole: /* @__PURE__ */ __name(async ({ browser }, use) => {
    const mockRole = /* @__PURE__ */ __name(async (roleSetting) => {
      return createRole(roleSetting);
    }, "mockRole");
    await use(mockRole);
  }, "mockRole"),
  updateRole: /* @__PURE__ */ __name(async ({ browser }, use) => {
    await use(updateRole);
  }, "updateRole"),
  mockExternalDataSource: /* @__PURE__ */ __name(async ({ browser }, use) => {
    const mockExternalDataSource = /* @__PURE__ */ __name(async (DataSourceSetting) => {
      return createExternalDataSource(DataSourceSetting);
    }, "mockExternalDataSource");
    await use(mockExternalDataSource);
  }, "mockExternalDataSource"),
  destoryExternalDataSource: /* @__PURE__ */ __name(async ({ browser }, use) => {
    const destoryDataSource = /* @__PURE__ */ __name(async (key) => {
      return destoryExternalDataSource(key);
    }, "destoryDataSource");
    await use(destoryDataSource);
  }, "destoryExternalDataSource"),
  clearBlockTemplates: /* @__PURE__ */ __name(async ({ browser }, use) => {
    let ended = false;
    let isImmediate = false;
    const clearBlockTemplates = /* @__PURE__ */ __name(async ({ immediate } = { immediate: false }) => {
      isImmediate = immediate;
      if (!ended && !immediate) {
        return;
      }
      const api = await import_test.request.newContext({
        storageState: process.env.PLAYWRIGHT_AUTH_FILE
      });
      const state = await api.storageState();
      const headers = getHeaders(state);
      const filter = {
        key: { $exists: true }
      };
      const result = await api.post(`/api/uiSchemaTemplates:destroy?filter=${JSON.stringify(filter)}`, {
        headers
      });
      if (!result.ok()) {
        throw new Error(await result.text());
      }
    }, "clearBlockTemplates");
    await use(clearBlockTemplates);
    ended = true;
    if (!isImmediate) {
      await clearBlockTemplates();
    }
  }, "clearBlockTemplates")
});
const test = Object.assign(_test, {
  /** 只运行在 postgres 数据库中 */
  pgOnly: process.env.DB_DIALECT == "postgres" ? _test : _test.skip
});
const getStorageItem = /* @__PURE__ */ __name((key, storageState) => {
  var _a, _b;
  return (_b = (_a = storageState.origins.find((item) => item.origin === APP_BASE_URL)) == null ? void 0 : _a.localStorage.find((item) => item.name === key)) == null ? void 0 : _b.value;
}, "getStorageItem");
const updateUidOfPageSchema = /* @__PURE__ */ __name((uiSchema) => {
  if (!uiSchema) {
    return;
  }
  if (uiSchema["x-uid"]) {
    uiSchema["x-uid"] = (0, import_shared.uid)();
  }
  if (uiSchema.properties) {
    Object.keys(uiSchema.properties).forEach((key) => {
      updateUidOfPageSchema(uiSchema.properties[key]);
    });
  }
  return uiSchema;
}, "updateUidOfPageSchema");
const createPage = /* @__PURE__ */ __name(async (options) => {
  var _a, _b, _c, _d;
  const { type = "page", url, name, pageSchema, tabSchema, keepUid, pageUid: pageUidFromOptions } = options || {};
  const api = await import_test.request.newContext({
    storageState: process.env.PLAYWRIGHT_AUTH_FILE
  });
  const schema = getPageMenuSchemaWithTabSchema({ tabSchema }) || pageSchema;
  const state = await api.storageState();
  const headers = getHeaders(state);
  const newPageSchema = keepUid ? schema : updateUidOfPageSchema(schema);
  const pageSchemaUid = (newPageSchema == null ? void 0 : newPageSchema["x-uid"]) || (0, import_shared.uid)();
  const newTabSchemaUid = (0, import_shared.uid)();
  const newTabSchemaName = (0, import_shared.uid)();
  const title = name || pageSchemaUid;
  let routeId;
  let schemaUid;
  if (type === "group") {
    const result = await api.post("/api/desktopRoutes:create", {
      headers,
      data: {
        type: "group",
        title,
        hideInMenu: false
      }
    });
    if (!result.ok()) {
      throw new Error(await result.text());
    }
    const data = await result.json();
    routeId = (_a = data.data) == null ? void 0 : _a.id;
  }
  if (type === "page") {
    const routeResult = await api.post("/api/desktopRoutes:create", {
      headers,
      data: {
        type: "page",
        title,
        schemaUid: pageSchemaUid,
        hideInMenu: false,
        enableTabs: !!((_b = newPageSchema == null ? void 0 : newPageSchema["x-component-props"]) == null ? void 0 : _b.enablePageTabs),
        children: newPageSchema ? schemaToRoutes(newPageSchema) : [
          {
            type: "tabs",
            title: '{{t("Unnamed")}}',
            schemaUid: newTabSchemaUid,
            tabSchemaName: newTabSchemaName,
            hideInMenu: false
          }
        ]
      }
    });
    if (!routeResult.ok()) {
      throw new Error(await routeResult.text());
    }
    const schemaResult = await api.post(`/api/uiSchemas:insert`, {
      headers,
      data: newPageSchema || getPageMenuSchema({
        pageSchemaUid,
        tabSchemaUid: newTabSchemaUid,
        tabSchemaName: newTabSchemaName
      })
    });
    if (!schemaResult.ok()) {
      throw new Error(await routeResult.text());
    }
    const data = await routeResult.json();
    routeId = (_c = data.data) == null ? void 0 : _c.id;
    schemaUid = pageSchemaUid;
  }
  if (type === "link") {
    const result = await api.post("/api/desktopRoutes:create", {
      headers,
      data: {
        type: "link",
        title,
        hideInMenu: false,
        options: {
          href: url
        }
      }
    });
    if (!result.ok()) {
      throw new Error(await result.text());
    }
    const data = await result.json();
    routeId = (_d = data.data) == null ? void 0 : _d.id;
  }
  return { schemaUid, routeId };
}, "createPage");
const createMobilePage = /* @__PURE__ */ __name(async (options) => {
  const { type = "page", url, name, pageSchema, keepUid } = options || {};
  function randomStr() {
    return Math.random().toString(36).substring(2);
  }
  __name(randomStr, "randomStr");
  const api = await import_test.request.newContext({
    storageState: process.env.PLAYWRIGHT_AUTH_FILE
  });
  const state = await api.storageState();
  const headers = getHeaders(state);
  const pageSchemaUid = name || (0, import_shared.uid)();
  const schemaUrl = `/page/${pageSchemaUid}`;
  const firstTabUid = (0, import_shared.uid)();
  const title = name || randomStr();
  const routerResponse = await api.post(`/api/mobileRoutes:create`, {
    headers,
    data: {
      type,
      schemaUid: pageSchemaUid,
      title,
      icon: "appstoreoutlined",
      options: {
        url
      }
    }
  });
  const responseData = await routerResponse.json();
  const routeId = responseData.data.id;
  if (!routerResponse.ok()) {
    throw new Error(await routerResponse.text());
  }
  if (type === "link") return { url, routeId, title };
  const createSchemaResult = await api.post(`/api/uiSchemas:insertAdjacent?resourceIndex=mobile&position=beforeEnd`, {
    headers,
    data: {
      schema: {
        type: "void",
        name: pageSchemaUid,
        "x-uid": pageSchemaUid,
        "x-component": "MobilePageProvider",
        "x-settings": "mobile:page",
        "x-decorator": "BlockItem",
        "x-toolbar-props": {
          draggable: false,
          spaceWrapperStyle: {
            right: -15,
            top: -15
          },
          spaceClassName: "css-m1q7xw",
          toolbarStyle: {
            overflowX: "hidden"
          }
        },
        properties: {
          header: {
            type: "void",
            "x-component": "MobilePageHeader",
            properties: {
              pageNavigationBar: {
                type: "void",
                "x-component": "MobilePageNavigationBar",
                properties: {
                  actionBar: {
                    type: "void",
                    "x-component": "MobileNavigationActionBar",
                    "x-initializer": "mobile:navigation-bar:actions",
                    "x-component-props": {
                      spaceProps: {
                        style: {
                          flexWrap: "nowrap"
                        }
                      }
                    },
                    name: "actionBar"
                  }
                },
                name: "pageNavigationBar"
              },
              pageTabs: {
                type: "void",
                "x-component": "MobilePageTabs",
                name: "pageTabs"
              }
            },
            name: "header"
          },
          content: {
            type: "void",
            "x-component": "MobilePageContent",
            properties: {
              [firstTabUid]: {
                ...(keepUid ? pageSchema : updateUidOfPageSchema(pageSchema)) || {
                  type: "void",
                  "x-uid": firstTabUid,
                  "x-async": true,
                  "x-component": "Grid",
                  "x-initializer": "mobile:addBlock"
                },
                name: firstTabUid,
                "x-uid": firstTabUid
              }
            }
          }
        }
      }
    }
  });
  if (!createSchemaResult.ok()) {
    throw new Error(await createSchemaResult.text());
  }
  const createTabResponse = await api.post(`/api/mobileRoutes:create`, {
    headers,
    data: {
      parentId: routeId,
      type: "tabs",
      title: "Unnamed",
      schemaUid: firstTabUid
    }
  });
  if (!createTabResponse.ok()) {
    throw new Error(await createTabResponse.text());
  }
  return { url: schemaUrl, pageSchemaUid, routeId, title };
}, "createMobilePage");
const removeAllMobileRoutes = /* @__PURE__ */ __name(async () => {
  const api = await import_test.request.newContext({
    storageState: process.env.PLAYWRIGHT_AUTH_FILE
  });
  const state = await api.storageState();
  const headers = getHeaders(state);
  const result = await api.post(
    `/api/mobileRoutes:destroy?filter=%7B%22%24and%22%3A%5B%7B%22id%22%3A%7B%22%24ne%22%3A0%7D%7D%5D%7D`,
    {
      headers
    }
  );
  if (!result.ok()) {
    throw new Error(await result.text());
  }
}, "removeAllMobileRoutes");
const deleteMobileRoutes = /* @__PURE__ */ __name(async (mobileRouteId) => {
  if (!mobileRouteId) return;
  const api = await import_test.request.newContext({
    storageState: process.env.PLAYWRIGHT_AUTH_FILE
  });
  const state = await api.storageState();
  const headers = getHeaders(state);
  const result = await api.post(`/api/mobileRoutes:destroy?filterByTk=${mobileRouteId}`, {
    headers
  });
  if (!result.ok()) {
    throw new Error(await result.text());
  }
  const result2 = await api.post(
    `/api/mobileRoutes:destroy?filter=${encodeURIComponent(JSON.stringify({ parentId: mobileRouteId }))}`,
    {
      headers
    }
  );
  if (!result2.ok()) {
    throw new Error(await result2.text());
  }
}, "deleteMobileRoutes");
const deletePage = /* @__PURE__ */ __name(async (pageUid, routeId) => {
  const api = await import_test.request.newContext({
    storageState: process.env.PLAYWRIGHT_AUTH_FILE
  });
  const state = await api.storageState();
  const headers = getHeaders(state);
  if (routeId !== void 0) {
    const routeResult = await api.post(`/api/desktopRoutes:destroy?filterByTk=${routeId}`, {
      headers
    });
    if (!routeResult.ok()) {
      throw new Error(await routeResult.text());
    }
  }
  if (pageUid) {
    const result = await api.post(`/api/uiSchemas:remove/${pageUid}`, {
      headers
    });
    if (!result.ok()) {
      throw new Error(await result.text());
    }
  }
}, "deletePage");
const deleteCollections = /* @__PURE__ */ __name(async (collectionNames) => {
  const api = await import_test.request.newContext({
    storageState: process.env.PLAYWRIGHT_AUTH_FILE
  });
  const state = await api.storageState();
  const headers = getHeaders(state);
  const params = collectionNames.map((name) => `filterByTk[]=${name}`).join("&");
  const result = await api.post(`/api/collections:destroy?${params}`, {
    headers,
    params: {
      cascade: true
    }
  });
  if (!result.ok()) {
    throw new Error(await result.text());
  }
}, "deleteCollections");
const deleteRecords = /* @__PURE__ */ __name(async (collectionName, filter) => {
  const api = await import_test.request.newContext({
    storageState: process.env.PLAYWRIGHT_AUTH_FILE
  });
  const state = await api.storageState();
  const headers = getHeaders(state);
  const result = await api.post(`/api/${collectionName}:destroy?filter=${JSON.stringify(filter)}`, {
    headers
  });
  if (!result.ok()) {
    throw new Error(await result.text());
  }
}, "deleteRecords");
const omitSomeFields = /* @__PURE__ */ __name((collectionSettings) => {
  return collectionSettings.map((collection) => {
    var _a;
    return {
      ...import_lodash.default.omit(collection, ["key"]),
      fields: (_a = collection.fields) == null ? void 0 : _a.map((field) => import_lodash.default.omit(field, ["key", "collectionName"]))
    };
  });
}, "omitSomeFields");
const createCollections = /* @__PURE__ */ __name(async (collectionSettings) => {
  const api = await import_test.request.newContext({
    storageState: process.env.PLAYWRIGHT_AUTH_FILE
  });
  const state = await api.storageState();
  const headers = getHeaders(state);
  collectionSettings = Array.isArray(collectionSettings) ? collectionSettings : [collectionSettings];
  const result = await api.post(`/api/collections:mock`, {
    headers,
    data: collectionSettings
  });
  if (!result.ok()) {
    throw new Error(await result.text());
  }
  return (await result.json()).data;
}, "createCollections");
const createRole = /* @__PURE__ */ __name(async (roleSetting) => {
  const api = await import_test.request.newContext({
    storageState: process.env.PLAYWRIGHT_AUTH_FILE
  });
  const state = await api.storageState();
  const headers = getHeaders(state);
  const name = roleSetting.name || (0, import_shared.uid)();
  const result = await api.post(`/api/users/1/roles:create`, {
    headers,
    data: { ...roleSetting, name, title: name }
  });
  if (!result.ok()) {
    throw new Error(await result.text());
  }
  const roleData = (await result.json()).data;
  await setDefaultRole(name);
  return roleData;
}, "createRole");
const updateRole = /* @__PURE__ */ __name(async (roleSetting) => {
  const api = await import_test.request.newContext({
    storageState: process.env.PLAYWRIGHT_AUTH_FILE
  });
  const state = await api.storageState();
  const headers = getHeaders(state);
  const name = roleSetting.name;
  const dataSourceKey = roleSetting.dataSourceKey;
  const url = !dataSourceKey ? `/api/roles:update?filterByTk=${name}` : `/api/dataSources/${dataSourceKey}/roles:update?filterByTk=${name}`;
  const result = await api.post(url, {
    headers,
    data: { ...roleSetting }
  });
  if (!result.ok()) {
    throw new Error(await result.text());
  }
  const roleData = (await result.json()).data;
  return roleData;
}, "updateRole");
const setDefaultRole = /* @__PURE__ */ __name(async (name) => {
  const api = await import_test.request.newContext({
    storageState: process.env.PLAYWRIGHT_AUTH_FILE
  });
  const state = await api.storageState();
  const headers = getHeaders(state);
  const result = await api.post(`/api/users:setDefaultRole`, {
    headers,
    data: { roleName: name }
  });
  if (!result.ok()) {
    throw new Error(await result.text());
  }
}, "setDefaultRole");
const createExternalDataSource = /* @__PURE__ */ __name(async (dataSourceSetting) => {
  const api = await import_test.request.newContext({
    storageState: process.env.PLAYWRIGHT_AUTH_FILE
  });
  const state = await api.storageState();
  const headers = getHeaders(state);
  const result = await api.post(`/api/dataSources:create`, {
    headers,
    data: { ...dataSourceSetting }
  });
  if (!result.ok()) {
    throw new Error(await result.text());
  }
  return (await result.json()).data;
}, "createExternalDataSource");
const destoryExternalDataSource = /* @__PURE__ */ __name(async (key) => {
  const api = await import_test.request.newContext({
    storageState: process.env.PLAYWRIGHT_AUTH_FILE
  });
  const state = await api.storageState();
  const headers = getHeaders(state);
  const result = await api.post(`/api/dataSources:destroy?filterByTk=${key}`, {
    headers
  });
  if (!result.ok()) {
    throw new Error(await result.text());
  }
  return (await result.json()).data;
}, "destoryExternalDataSource");
const generateFakerData = /* @__PURE__ */ __name((collectionSetting) => {
  var _a;
  const excludeField = ["id", "createdAt", "updatedAt", "createdBy", "updatedBy"];
  const basicInterfaceToData = {
    input: /* @__PURE__ */ __name(() => import_faker.faker.lorem.words(), "input"),
    textarea: /* @__PURE__ */ __name(() => import_faker.faker.lorem.paragraph(), "textarea"),
    richText: /* @__PURE__ */ __name(() => import_faker.faker.lorem.paragraph(), "richText"),
    phone: /* @__PURE__ */ __name(() => import_faker.faker.phone.number(), "phone"),
    email: /* @__PURE__ */ __name(() => import_faker.faker.internet.email(), "email"),
    url: /* @__PURE__ */ __name(() => import_faker.faker.internet.url(), "url"),
    integer: /* @__PURE__ */ __name(() => import_faker.faker.number.int(), "integer"),
    number: /* @__PURE__ */ __name(() => import_faker.faker.number.int(), "number"),
    percent: /* @__PURE__ */ __name(() => import_faker.faker.number.float(), "percent"),
    password: /* @__PURE__ */ __name(() => import_faker.faker.internet.password(), "password"),
    color: /* @__PURE__ */ __name(() => import_faker.faker.internet.color(), "color"),
    icon: /* @__PURE__ */ __name(() => "checkcircleoutlined", "icon"),
    datetime: /* @__PURE__ */ __name(() => import_faker.faker.date.anytime({ refDate: "2023-09-21T00:00:00.000Z" }), "datetime"),
    time: /* @__PURE__ */ __name(() => "00:00:00", "time")
  };
  const result = {};
  (_a = collectionSetting.fields) == null ? void 0 : _a.forEach((field) => {
    if (field.name && excludeField.includes(field.name)) {
      return;
    }
    if (basicInterfaceToData[field.interface] && field.name) {
      result[field.name] = basicInterfaceToData[field.interface]();
    }
  });
  return result;
}, "generateFakerData");
const createRandomData = /* @__PURE__ */ __name(async (collectionName, count = 10, data, maxDepth) => {
  const api = await import_test.request.newContext({
    storageState: process.env.PLAYWRIGHT_AUTH_FILE
  });
  const state = await api.storageState();
  const headers = getHeaders(state);
  const result = await api.post(
    `/api/${collectionName}:mock?count=${count}&maxDepth=${import_lodash.default.isNumber(maxDepth) ? maxDepth : 1}`,
    {
      headers,
      data
    }
  );
  if (!result.ok()) {
    throw new Error(await result.text());
  }
  return (await result.json()).data;
}, "createRandomData");
async function removeRedundantUserAndRoles() {
  const deletePromises = [
    deleteRecords("users", { id: { $ne: 1 } }),
    deleteRecords("roles", { name: { $ne: ["root", "admin", "member"] } })
  ];
  await Promise.all(deletePromises);
}
__name(removeRedundantUserAndRoles, "removeRedundantUserAndRoles");
function getHeaders(storageState) {
  var _a;
  const headers = {};
  const token = getStorageItem("NOCOBASE_TOKEN", storageState);
  const auth = getStorageItem("NOCOBASE_AUTH", storageState);
  const subAppName = (_a = new URL(APP_BASE_URL).pathname.match(/^\/apps\/([^/]*)\/*/)) == null ? void 0 : _a[1];
  const hostName = new URL(APP_BASE_URL).host;
  const locale = getStorageItem("NOCOBASE_LOCALE", storageState);
  const timezone = "+08:00";
  const withAclMeta = "true";
  const role = getStorageItem("NOCOBASE_ROLE", storageState);
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  if (auth) {
    headers["X-Authenticator"] = auth;
  }
  if (subAppName) {
    headers["X-App"] = subAppName;
  }
  if (hostName) {
    headers["X-Hostname"] = hostName;
  }
  if (locale) {
    headers["X-Locale"] = locale;
  }
  if (timezone) {
    headers["X-Timezone"] = timezone;
  }
  if (withAclMeta) {
    headers["X-With-Acl-Meta"] = withAclMeta;
  }
  if (role) {
    headers["X-Role"] = role;
  }
  return headers;
}
__name(getHeaders, "getHeaders");
async function expectSettingsMenu({
  showMenu,
  supportedOptions,
  page,
  unsupportedOptions
}) {
  await page.waitForTimeout(100);
  await showMenu();
  await page.waitForTimeout(2e3);
  for (const option of supportedOptions) {
    await (0, import_test.expect)(page.getByRole("menuitem", { name: option, exact: option === "Edit" })).toBeVisible();
  }
  if (unsupportedOptions) {
    for (const option of unsupportedOptions) {
      await (0, import_test.expect)(page.getByRole("menuitem", { name: option, exact: option === "Edit" })).not.toBeVisible();
    }
  }
}
__name(expectSettingsMenu, "expectSettingsMenu");
async function expectInitializerMenu({
  showMenu,
  supportedOptions,
  page,
  expectValue
}) {
  await showMenu();
  for (const option of supportedOptions) {
    await (0, import_test.expect)(page.getByRole("menuitem", { name: option }).first()).toBeVisible();
  }
  await page.mouse.move(300, 0);
  if (expectValue) {
    await expectValue();
  }
}
__name(expectInitializerMenu, "expectInitializerMenu");
const createBlockInPage = /* @__PURE__ */ __name(async (page, name) => {
  await page.getByLabel("schema-initializer-Grid-page:addBlock").hover();
  if (name === "Form") {
    await page.getByText("Form", { exact: true }).first().hover();
  } else if (name === "Filter form") {
    await page.getByText("Form", { exact: true }).nth(1).hover();
  } else {
    await page.getByText(name, { exact: true }).hover();
  }
  if (name === "Markdown") {
    await page.getByRole("menuitem", { name: "Markdown" }).click();
  } else {
    await page.getByRole("menuitem", { name: "Users" }).click();
  }
  await page.mouse.move(300, 0);
}, "createBlockInPage");
const mockUserRecordsWithoutDepartments = /* @__PURE__ */ __name((mockRecords, count) => {
  return mockRecords(
    "users",
    Array.from({ length: count }).map(() => ({
      departments: null,
      mainDepartment: null
    }))
  );
}, "mockUserRecordsWithoutDepartments");
async function expectSupportedVariables(page, variables) {
  for (const name of variables) {
    await (0, import_test.expect)(page.getByRole("menuitemcheckbox", { name })).toBeVisible();
  }
}
__name(expectSupportedVariables, "expectSupportedVariables");
function schemaToRoutes(schema) {
  const schemaKeys = Object.keys(schema.properties || {});
  if (schemaKeys.length === 0) {
    return [];
  }
  const result = schemaKeys.map((key) => {
    var _a;
    const item = schema.properties[key];
    return {
      type: "tabs",
      title: item.title || '{{t("Unnamed")}}',
      icon: (_a = item["x-component-props"]) == null ? void 0 : _a.icon,
      schemaUid: item["x-uid"],
      tabSchemaName: key,
      hideInMenu: false
    };
  });
  return result;
}
__name(schemaToRoutes, "schemaToRoutes");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NocoMobilePage,
  NocoPage,
  createBlockInPage,
  defineConfig,
  deleteRecords,
  expectInitializerMenu,
  expectSettingsMenu,
  expectSupportedVariables,
  mockUserRecordsWithoutDepartments,
  omitSomeFields,
  removeAllMobileRoutes,
  test,
  ...require("@playwright/test")
});
