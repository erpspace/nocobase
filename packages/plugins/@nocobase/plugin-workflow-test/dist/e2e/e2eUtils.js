/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

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
var e2eUtils_exports = {};
__export(e2eUtils_exports, {
  apiApplyApprovalEvent: () => apiApplyApprovalEvent,
  apiCreateField: () => apiCreateField,
  apiCreateRecordTriggerActionEvent: () => apiCreateRecordTriggerActionEvent,
  apiCreateRecordTriggerFormEvent: () => apiCreateRecordTriggerFormEvent,
  apiCreateWorkflow: () => apiCreateWorkflow,
  apiCreateWorkflowNode: () => apiCreateWorkflowNode,
  apiDeleteWorkflow: () => apiDeleteWorkflow,
  apiFilterList: () => apiFilterList,
  apiGetDataSourceCount: () => apiGetDataSourceCount,
  apiGetList: () => apiGetList,
  apiGetRecord: () => apiGetRecord,
  apiGetWorkflow: () => apiGetWorkflow,
  apiGetWorkflowNode: () => apiGetWorkflowNode,
  apiGetWorkflowNodeExecutions: () => apiGetWorkflowNodeExecutions,
  apiSubmitRecordTriggerFormEvent: () => apiSubmitRecordTriggerFormEvent,
  apiTriggerCustomActionEvent: () => apiTriggerCustomActionEvent,
  apiUpdateRecord: () => apiUpdateRecord,
  apiUpdateWorkflow: () => apiUpdateWorkflow,
  apiUpdateWorkflowNode: () => apiUpdateWorkflowNode,
  apiUpdateWorkflowTrigger: () => apiUpdateWorkflowTrigger,
  approvalUserPassword: () => approvalUserPassword,
  default: () => e2eUtils_default,
  userLogin: () => userLogin
});
module.exports = __toCommonJS(e2eUtils_exports);
var import_e2e = require("@nocobase/test/e2e");
const PORT = process.env.APP_PORT || 2e4;
const APP_BASE_URL = process.env.APP_BASE_URL || `http://localhost:${PORT}`;
const apiCreateWorkflow = async (data) => {
  const api = await import_e2e.request.newContext({
    storageState: process.env.PLAYWRIGHT_AUTH_FILE
  });
  const state = await api.storageState();
  const headers = getHeaders(state);
  const result = await api.post(`/api/workflows:create`, {
    headers,
    data
  });
  if (!result.ok()) {
    throw new Error(await result.text());
  }
  return (await result.json()).data;
};
const apiUpdateWorkflow = async (id, data) => {
  const api = await import_e2e.request.newContext({
    storageState: process.env.PLAYWRIGHT_AUTH_FILE
  });
  const state = await api.storageState();
  const headers = getHeaders(state);
  const result = await api.post(`/api/workflows:update?filterByTk=${id}`, {
    headers,
    data
  });
  if (!result.ok()) {
    throw new Error(await result.text());
  }
  return (await result.json()).data;
};
const apiDeleteWorkflow = async (id) => {
  const api = await import_e2e.request.newContext({
    storageState: process.env.PLAYWRIGHT_AUTH_FILE
  });
  const state = await api.storageState();
  const headers = getHeaders(state);
  const result = await api.post(`/api/workflows:destroy?filterByTk=${id}`, {
    headers
  });
  if (!result.ok()) {
    throw new Error(await result.text());
  }
  return (await result.json()).data;
};
const apiGetWorkflow = async (id) => {
  const api = await import_e2e.request.newContext({
    storageState: process.env.PLAYWRIGHT_AUTH_FILE
  });
  const state = await api.storageState();
  const headers = getHeaders(state);
  const result = await api.get(`/api/workflows:get?filterByTk=${id}`, {
    headers
  });
  if (!result.ok()) {
    throw new Error(await result.text());
  }
  return (await result.json()).data;
};
const apiUpdateWorkflowTrigger = async (id, data) => {
  const api = await import_e2e.request.newContext({
    storageState: process.env.PLAYWRIGHT_AUTH_FILE
  });
  const state = await api.storageState();
  const headers = getHeaders(state);
  const result = await api.post(`/api/workflows:update?filterByTk=${id}`, {
    headers,
    data
  });
  if (!result.ok()) {
    throw new Error(await result.text());
  }
  return (await result.json()).data;
};
const apiCreateWorkflowNode = async (workflowId, data) => {
  const api = await import_e2e.request.newContext({
    storageState: process.env.PLAYWRIGHT_AUTH_FILE
  });
  const state = await api.storageState();
  const headers = getHeaders(state);
  const result = await api.post(`/api/workflows/${workflowId}/nodes:create`, {
    headers,
    data
  });
  if (!result.ok()) {
    throw new Error(await result.text());
  }
  return (await result.json()).data;
};
const apiGetWorkflowNode = async (id) => {
  const api = await import_e2e.request.newContext({
    storageState: process.env.PLAYWRIGHT_AUTH_FILE
  });
  const state = await api.storageState();
  const headers = getHeaders(state);
  const result = await api.get(`/api/flow_nodes:get?filterByTk=${id}`, {
    headers
  });
  if (!result.ok()) {
    throw new Error(await result.text());
  }
  return (await result.json()).data;
};
const apiUpdateWorkflowNode = async (id, data) => {
  const api = await import_e2e.request.newContext({
    storageState: process.env.PLAYWRIGHT_AUTH_FILE
  });
  const state = await api.storageState();
  const headers = getHeaders(state);
  const result = await api.post(`/api/flow_nodes:update?filterByTk=${id}`, {
    headers,
    data
  });
  if (!result.ok()) {
    throw new Error(await result.text());
  }
  return (await result.json()).data;
};
const apiGetWorkflowNodeExecutions = async (id) => {
  const api = await import_e2e.request.newContext({
    storageState: process.env.PLAYWRIGHT_AUTH_FILE
  });
  const state = await api.storageState();
  const headers = getHeaders(state);
  const url = `/api/executions:list?appends[]=jobs&filter[workflowId]=${id}&fields=id,createdAt,updatedAt,key,status,workflowId`;
  const result = await api.get(url, {
    headers
  });
  if (!result.ok()) {
    throw new Error(await result.text());
  }
  return (await result.json()).data;
};
const apiUpdateRecord = async (collectionName, id, data) => {
  const api = await import_e2e.request.newContext({
    storageState: process.env.PLAYWRIGHT_AUTH_FILE
  });
  const state = await api.storageState();
  const headers = getHeaders(state);
  const result = await api.post(`/api/${collectionName}:update?filterByTk=${id}`, {
    headers,
    data
  });
  if (!result.ok()) {
    throw new Error(await result.text());
  }
  return (await result.json()).data;
};
const apiGetRecord = async (collectionName, id) => {
  const api = await import_e2e.request.newContext({
    storageState: process.env.PLAYWRIGHT_AUTH_FILE
  });
  const state = await api.storageState();
  const headers = getHeaders(state);
  const result = await api.get(`/api/${collectionName}:get?filterByTk=${id}`, {
    headers
  });
  if (!result.ok()) {
    throw new Error(await result.text());
  }
  return (await result.json()).data;
};
const apiGetList = async (collectionName) => {
  const api = await import_e2e.request.newContext({
    storageState: process.env.PLAYWRIGHT_AUTH_FILE
  });
  const state = await api.storageState();
  const headers = getHeaders(state);
  const result = await api.get(`/api/${collectionName}:list`, {
    headers
  });
  if (!result.ok()) {
    throw new Error(await result.text());
  }
  return await result.json();
};
const apiFilterList = async (collectionName, filter) => {
  const api = await import_e2e.request.newContext({
    storageState: process.env.PLAYWRIGHT_AUTH_FILE
  });
  const state = await api.storageState();
  const headers = getHeaders(state);
  const result = await api.get(`/api/${collectionName}:list?${filter}`, {
    headers
  });
  if (!result.ok()) {
    throw new Error(await result.text());
  }
  return await result.json();
};
const apiCreateRecordTriggerFormEvent = async (collectionName, triggerWorkflows, data) => {
  const api = await import_e2e.request.newContext({
    storageState: process.env.PLAYWRIGHT_AUTH_FILE
  });
  const state = await api.storageState();
  const headers = getHeaders(state);
  const result = await api.post(`/api/${collectionName}:create?triggerWorkflows=${triggerWorkflows}`, {
    headers,
    data
  });
  if (!result.ok()) {
    throw new Error(await result.text());
  }
  return (await result.json()).data;
};
const apiSubmitRecordTriggerFormEvent = async (triggerWorkflows, data) => {
  const api = await import_e2e.request.newContext({
    storageState: process.env.PLAYWRIGHT_AUTH_FILE
  });
  const state = await api.storageState();
  const headers = getHeaders(state);
  const result = await api.post(`/api/workflows:trigger?triggerWorkflows=${triggerWorkflows}`, {
    headers,
    data
  });
  if (!result.ok()) {
    throw new Error(await result.text());
  }
  return await result.json();
};
const apiGetDataSourceCount = async () => {
  const api = await import_e2e.request.newContext({
    storageState: process.env.PLAYWRIGHT_AUTH_FILE
  });
  const state = await api.storageState();
  const headers = getHeaders(state);
  const result = await api.get(`/api/dataSources:list?pageSize=50`, {
    headers
  });
  if (!result.ok()) {
    throw new Error(await result.text());
  }
  return (await result.json()).meta.count;
};
const apiCreateRecordTriggerActionEvent = async (collectionName, triggerWorkflows, data) => {
  const api = await import_e2e.request.newContext({
    storageState: process.env.PLAYWRIGHT_AUTH_FILE
  });
  const state = await api.storageState();
  const headers = getHeaders(state);
  const result = await api.post(`/api/${collectionName}:create?triggerWorkflows=${triggerWorkflows}`, {
    headers,
    data
  });
  if (!result.ok()) {
    throw new Error(await result.text());
  }
  return (await result.json()).data;
};
const apiTriggerCustomActionEvent = async (collectionName, triggerWorkflows, data) => {
  const api = await import_e2e.request.newContext({
    storageState: process.env.PLAYWRIGHT_AUTH_FILE
  });
  const state = await api.storageState();
  const headers = getHeaders(state);
  const result = await api.post(`/api/${collectionName}:trigger?triggerWorkflows=${triggerWorkflows}`, {
    headers,
    data
  });
  if (!result.ok()) {
    throw new Error(await result.text());
  }
  return (await result.json()).data;
};
const apiApplyApprovalEvent = async (data) => {
  const api = await import_e2e.request.newContext({
    storageState: process.env.PLAYWRIGHT_AUTH_FILE
  });
  const state = await api.storageState();
  const headers = getHeaders(state);
  const result = await api.post("/api/approvals:create", {
    headers,
    data
  });
  if (!result.ok()) {
    throw new Error(await result.text());
  }
  return (await result.json()).data;
};
const apiCreateField = async (collectionName, data) => {
  const api = await import_e2e.request.newContext({
    storageState: process.env.PLAYWRIGHT_AUTH_FILE
  });
  const state = await api.storageState();
  const headers = getHeaders(state);
  const result = await api.post(`/api/collections/${collectionName}/fields:create`, {
    headers,
    data
  });
  if (!result.ok()) {
    throw new Error(await result.text());
  }
  return (await result.json()).data;
};
const getStorageItem = (key, storageState) => {
  var _a, _b;
  return (_b = (_a = storageState.origins.find((item) => item.origin === APP_BASE_URL)) == null ? void 0 : _a.localStorage.find((item) => item.name === key)) == null ? void 0 : _b.value;
};
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
const approvalUserPassword = "1a2B3c4#";
const userLogin = async (browser, approvalUserEmail, approvalUser) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("signin");
  await page.getByPlaceholder("Email").fill(approvalUserEmail);
  await page.getByPlaceholder("Password").fill(approvalUserPassword);
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.waitForLoadState("load");
  return context;
};
var e2eUtils_default = module.exports = {
  apiCreateWorkflow,
  apiUpdateWorkflow,
  apiDeleteWorkflow,
  apiGetWorkflow,
  apiUpdateWorkflowTrigger,
  apiGetWorkflowNodeExecutions,
  apiCreateWorkflowNode,
  apiUpdateWorkflowNode,
  apiGetWorkflowNode,
  apiUpdateRecord,
  apiGetRecord,
  apiGetList,
  apiCreateRecordTriggerFormEvent,
  apiSubmitRecordTriggerFormEvent,
  apiFilterList,
  apiGetDataSourceCount,
  apiCreateRecordTriggerActionEvent,
  apiApplyApprovalEvent,
  userLogin,
  apiCreateField,
  apiTriggerCustomActionEvent,
  approvalUserPassword
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  apiApplyApprovalEvent,
  apiCreateField,
  apiCreateRecordTriggerActionEvent,
  apiCreateRecordTriggerFormEvent,
  apiCreateWorkflow,
  apiCreateWorkflowNode,
  apiDeleteWorkflow,
  apiFilterList,
  apiGetDataSourceCount,
  apiGetList,
  apiGetRecord,
  apiGetWorkflow,
  apiGetWorkflowNode,
  apiGetWorkflowNodeExecutions,
  apiSubmitRecordTriggerFormEvent,
  apiTriggerCustomActionEvent,
  apiUpdateRecord,
  apiUpdateWorkflow,
  apiUpdateWorkflowNode,
  apiUpdateWorkflowTrigger,
  approvalUserPassword,
  userLogin
});
