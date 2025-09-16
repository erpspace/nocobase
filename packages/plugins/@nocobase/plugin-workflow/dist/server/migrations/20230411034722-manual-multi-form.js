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
var manual_multi_form_exports = {};
__export(manual_multi_form_exports, {
  default: () => manual_multi_form_default
});
module.exports = __toCommonJS(manual_multi_form_exports);
var import_server = require("@nocobase/server");
var import_utils = require("@nocobase/utils");
var import_lodash = __toESM(require("lodash"));
function findSchema(root, filter, onlyLeaf = false) {
  const result = [];
  if (!root) {
    return result;
  }
  if (filter(root) && (!onlyLeaf || !root.properties)) {
    result.push(root);
    return result;
  }
  if (root.properties) {
    Object.keys(root.properties).forEach((key) => {
      result.push(...findSchema(root.properties[key], filter));
    });
  }
  return result;
}
function findParent(root, node) {
  return findSchema(root, (item) => item.properties && Object.values(item.properties).includes(node))[0];
}
function migrateConfig({ schema = {}, actions = [] }) {
  const { blocks, collection } = schema;
  if (!blocks) {
    return {
      forms: {}
    };
  }
  const root = { properties: blocks };
  const formBlocks = findSchema(root, (item) => {
    return item["x-component"] === "CardItem" && item["x-designer"] === "SimpleDesigner" && item.properties.grid["x-initializer"] === "AddFormField";
  });
  if (!formBlocks.length) {
    return {
      schema: blocks,
      forms: {}
    };
  }
  formBlocks.forEach((formBlock2, i) => {
    const formItems = findSchema(
      formBlock2,
      (item) => {
        return item["x-component"] === "CollectionField" && item["x-decorator"] === "FormItem";
      },
      true
    );
    formItems.forEach((item) => {
      Object.assign(item, {
        "x-interface-options": collection.fields.find((field) => field.name === item.name)
      });
    });
    if (!i) {
      return;
    }
    Object.assign(formBlocks[0].properties.grid.properties, formBlock2.properties.grid.properties);
    const col = findParent(root, formBlock2);
    const row = findParent(root, col);
    delete row.properties[col.name];
    if (!Object.keys(row.properties).length) {
      const grid = findParent(root, row);
      delete grid.properties[row.name];
    }
  });
  const [formBlock] = formBlocks;
  Object.assign(formBlock, {
    "x-decorator": "FormCollectionProvider",
    "x-decorator-props": {
      collection
    },
    "x-component-props": {
      title: '{{t("Form")}}'
    },
    "x-designer-props": {
      type: "customForm"
    }
  });
  const formId = (0, import_utils.uid)();
  const newFormBlock = {
    [formId]: {
      type: "void",
      "x-component": "FormV2",
      "x-use-component-props": "useFormBlockProps",
      properties: {
        grid: Object.assign(formBlock.properties.grid, {
          "x-initializer": "workflowManual:customForm:configureFields"
        }),
        // 7.
        actions: {
          type: "void",
          "x-decorator": "ActionBarProvider",
          "x-component": "ActionBar",
          "x-component-props": {
            layout: "one-column",
            style: {
              marginTop: "1.5em"
            }
          },
          "x-initializer": "workflowManual:form:configureActions",
          properties: schema.actions
        }
      }
    }
  };
  delete formBlock.properties.grid;
  Object.assign(formBlock.properties, newFormBlock);
  return {
    schema: blocks,
    forms: {
      [formId]: {
        type: "custom",
        title: '{{t("Form")}}',
        actions,
        collection
      }
    }
  };
}
function migrateUsedConfig(config, manualForms) {
  Object.keys(config).forEach((key) => {
    const valueType = typeof config[key];
    if (valueType === "string") {
      config[key] = config[key].replace(/{{\s*\$jobsMapByNodeId\.(\d+)(\.[^}]+)?\s*}}/g, (matched, id, path) => {
        if (!manualForms[id]) {
          return matched;
        }
        return `{{$jobsMapByNodeId.${id}.${manualForms[id]}${path || ""}}}`;
      });
    } else if (valueType === "object" && config[key]) {
      migrateUsedConfig(config[key], manualForms);
    }
  });
  return config;
}
class manual_multi_form_default extends import_server.Migration {
  appVersion = "<0.9.1-alpha.3";
  async up() {
    const match = await this.app.version.satisfies("<0.9.1-alpha.3");
    if (!match) {
      return;
    }
    const { db } = this.context;
    const NodeRepo = db.getRepository("flow_nodes");
    const UserJobRepo = db.getRepository("users_jobs");
    await db.sequelize.transaction(async (transaction) => {
      const nodes = await NodeRepo.find({
        filter: {
          type: "manual"
        },
        transaction
      });
      console.log("%d nodes need to be migrated.", nodes.length);
      await nodes.reduce(
        (promise, node) => promise.then(() => {
          const { forms, schema, actions, ...config } = node.config;
          if (forms) {
            return;
          }
          return node.update(
            {
              config: {
                ...config,
                ...migrateConfig({ schema, actions })
              }
            },
            {
              silent: true,
              transaction
            }
          );
        }),
        Promise.resolve()
      );
      const usersJobs = await UserJobRepo.find({
        filter: {
          nodeId: nodes.map((item) => item.id)
        },
        appends: ["job", "node"],
        transaction
      });
      await usersJobs.reduce(
        (promise, userJob) => promise.then(async () => {
          const { result, job, node } = userJob;
          const { forms } = node.config;
          const [formId] = Object.keys(forms);
          if (result) {
            await userJob.update(
              {
                result: { [formId]: result }
              },
              {
                silent: true,
                transaction
              }
            );
          }
          if (job.result) {
            await job.update(
              {
                result: { [formId]: result }
              },
              {
                silent: true,
                transaction
              }
            );
          }
        }),
        Promise.resolve()
      );
      const usedNodes = await NodeRepo.find({
        filter: {
          type: {
            $notIn: ["delay", "parallel"]
          }
        },
        transaction
      });
      const nodeForms = {};
      nodes.forEach((node) => {
        const [form] = Object.keys(node.config.forms);
        if (form) {
          nodeForms[node.id] = form;
        }
      });
      await usedNodes.reduce(
        (promise, node) => promise.then(async () => {
          await node.update(
            {
              config: migrateUsedConfig(import_lodash.default.cloneDeep(node.config ?? {}), nodeForms)
            },
            {
              silent: true,
              transaction
            }
          );
        }),
        Promise.resolve()
      );
    });
  }
}
