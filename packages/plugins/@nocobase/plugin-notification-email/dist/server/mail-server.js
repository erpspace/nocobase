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
var mail_server_exports = {};
__export(mail_server_exports, {
  MailNotificationChannel: () => MailNotificationChannel
});
module.exports = __toCommonJS(mail_server_exports);
var import_plugin_notification_manager = require("@nocobase/plugin-notification-manager");
var nodemailer = __toESM(require("nodemailer"));
class MailNotificationChannel extends import_plugin_notification_manager.BaseNotificationChannel {
  transpoter;
  async send(args) {
    const { message, channel, receivers } = args;
    const { host, port, secure, account, password, from } = channel.options;
    const userRepo = this.app.db.getRepository("users");
    try {
      const transpoter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: {
          user: account,
          pass: password
        }
      });
      const { subject, cc, bcc, to, contentType } = message;
      if ((receivers == null ? void 0 : receivers.type) === "userId") {
        const users = await userRepo.find({
          filter: {
            id: receivers.value
          }
        });
        const usersEmail = users.map((user) => user.email).filter(Boolean);
        const payload = {
          to: usersEmail,
          from,
          subject,
          ...contentType === "html" ? { html: message.html } : { text: message.text }
        };
        const result = await transpoter.sendMail(payload);
        return { status: "success", message };
      } else {
        const payload = {
          to: to.map((item) => item == null ? void 0 : item.trim()).filter(Boolean),
          cc: cc ? cc.flat().map((item) => item == null ? void 0 : item.trim()).filter(Boolean) : void 0,
          bcc: bcc ? bcc.flat().map((item) => item == null ? void 0 : item.trim()).filter(Boolean) : void 0,
          subject,
          from,
          ...contentType === "html" ? { html: message.html } : { text: message.text }
        };
        const result = await transpoter.sendMail(payload);
        return { status: "success", message };
      }
    } catch (error) {
      throw { status: "failure", reason: error.message, message };
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MailNotificationChannel
});
