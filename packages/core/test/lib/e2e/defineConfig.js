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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var defineConfig_exports = {};
__export(defineConfig_exports, {
  defineConfig: () => defineConfig
});
module.exports = __toCommonJS(defineConfig_exports);
var import_test = require("@playwright/test");
const defineConfig = /* @__PURE__ */ __name((config) => {
  return (0, import_test.defineConfig)({
    timeout: process.env.CI ? 60 * 1e3 : 30 * 1e3,
    expect: {
      timeout: 10 * 1e3
    },
    globalTimeout: 60 * 60 * 1e3,
    // Look for test files in the "tests" directory, relative to this configuration file.
    testDir: "packages",
    // Match all test files in the e2e and __e2e__ directories.
    testMatch: /(.*\/e2e\/|.*\/__e2e__\/).+\.test\.[tj]sx*$/,
    // Run all tests in parallel.
    fullyParallel: false,
    // Fail the build on CI if you accidentally left test.only in the source code.
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    // Opt out of parallel tests on CI.
    // workers: process.env.CI ? 1 : undefined,
    workers: 1,
    maxFailures: 0,
    // Reporter to use
    reporter: process.env.CI ? [["blob", { outputDir: `./storage/playwright/tests-report-blob/blob-${process.env.E2E_JOB_ID}` }]] : [["html", { outputFolder: `./storage/playwright/tests-report-html`, open: "never" }]],
    outputDir: "./storage/playwright/test-results",
    use: {
      // Base URL to use in actions like `await page.goto('/')`.
      baseURL: process.env.APP_BASE_URL || `http://localhost:${process.env.APP_PORT || 2e4}`,
      trace: "on-first-retry"
    },
    // Configure projects for major browsers.
    projects: [
      {
        name: "authSetup",
        testDir: "./storage/playwright/tests",
        testMatch: "auth.setup.ts"
      },
      {
        name: "chromium",
        use: {
          ...import_test.devices["Desktop Chrome"],
          storageState: process.env.PLAYWRIGHT_AUTH_FILE,
          contextOptions: {
            // chromium-specific permissions
            permissions: ["clipboard-read", "clipboard-write"]
          }
        },
        dependencies: ["authSetup"]
      }
    ]
  });
}, "defineConfig");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  defineConfig
});
