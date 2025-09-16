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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var transaction_decorator_exports = {};
__export(transaction_decorator_exports, {
  transactionWrapperBuilder: () => transactionWrapperBuilder
});
module.exports = __toCommonJS(transaction_decorator_exports);
var import_lodash = __toESM(require("lodash"));
function transactionWrapperBuilder(transactionGenerator) {
  return /* @__PURE__ */ __name(function transaction(transactionInjector) {
    return (target, name, descriptor) => {
      const oldValue = descriptor.value;
      descriptor.value = async function() {
        let transaction2;
        let newTransaction = false;
        if (arguments.length > 0 && typeof arguments[0] === "object") {
          transaction2 = arguments[0]["transaction"];
        }
        if (!transaction2) {
          transaction2 = await transactionGenerator.apply(this);
          newTransaction = true;
        }
        transaction2.afterCommit(() => {
          if (transaction2.eventCleanupBinded) {
            return;
          }
          transaction2.eventCleanupBinded = true;
          if (this.database) {
            this.database.removeAllListeners(`transactionRollback:${transaction2.id}`);
          }
        });
        if (newTransaction) {
          try {
            let callArguments;
            if (import_lodash.default.isPlainObject(arguments[0])) {
              callArguments = {
                ...arguments[0],
                transaction: transaction2
              };
            } else if (transactionInjector) {
              callArguments = transactionInjector(arguments, transaction2);
            } else if (import_lodash.default.isNull(arguments[0]) || import_lodash.default.isUndefined(arguments[0])) {
              callArguments = {
                transaction: transaction2
              };
            } else {
              throw new Error(`please provide transactionInjector for ${name} call`);
            }
            const results = await oldValue.call(this, callArguments);
            await transaction2.commit();
            return results;
          } catch (err) {
            console.error(err);
            await transaction2.rollback();
            if (this.database) {
              await this.database.emitAsync(`transactionRollback:${transaction2.id}`);
              await this.database.removeAllListeners(`transactionRollback:${transaction2.id}`);
            }
            throw err;
          }
        } else {
          return oldValue.apply(this, arguments);
        }
      };
      return descriptor;
    };
  }, "transaction");
}
__name(transactionWrapperBuilder, "transactionWrapperBuilder");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  transactionWrapperBuilder
});
