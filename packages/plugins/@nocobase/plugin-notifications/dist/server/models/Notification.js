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
var Notification_exports = {};
__export(Notification_exports, {
  Notification: () => Notification
});
module.exports = __toCommonJS(Notification_exports);
var import_database = require("@nocobase/database");
var import_lodash = __toESM(require("lodash"));
class Notification extends import_database.Model {
  get db() {
    return this.constructor["database"];
  }
  async getReceiversByOptions() {
    const { data, fromTable, filter, dataField } = this.receiver_options;
    let receivers = [];
    if (data) {
      receivers = Array.isArray(data) ? data : [data];
    } else if (fromTable) {
      const collection = this.db.getCollection(fromTable);
      const rows = await collection.repository.find({
        filter
      });
      receivers = rows.map((row) => row[dataField]);
    }
    return receivers;
  }
  async send(options = {}) {
    const { transaction } = options;
    if (!this.service) {
      this.service = await this.getService();
    }
    const receivers = await this.getReceiversByOptions();
    let { to } = options;
    if (to) {
      to = Array.isArray(to) ? to : [to];
      receivers.push(...to);
    }
    console.log(receivers);
    for (const receiver of receivers) {
      try {
        const response = await this.service.send({
          to: receiver,
          subject: this.getSubject(),
          html: this.getBody(options)
        });
        await this.createLog(
          {
            receiver,
            state: "success",
            response
          },
          {
            transaction
          }
        );
        await new Promise((resolve) => {
          setTimeout(resolve, 100);
        });
      } catch (error) {
        console.error(error);
        await this.createLog(
          {
            receiver,
            state: "fail",
            response: {}
          },
          {
            transaction
          }
        );
      }
    }
  }
  getSubject() {
    return this.subject;
  }
  getBody(data) {
    const compiled = import_lodash.default.template(this.body);
    const body = compiled(data);
    return body;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Notification
});
