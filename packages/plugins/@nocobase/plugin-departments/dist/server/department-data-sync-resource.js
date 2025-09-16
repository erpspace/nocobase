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
var department_data_sync_resource_exports = {};
__export(department_data_sync_resource_exports, {
  DepartmentDataSyncResource: () => DepartmentDataSyncResource
});
module.exports = __toCommonJS(department_data_sync_resource_exports);
var import_lodash = __toESM(require("lodash"));
var import_plugin_user_data_sync = require("@nocobase/plugin-user-data-sync");
class DepartmentDataSyncResource extends import_plugin_user_data_sync.UserDataResource {
  name = "departments";
  accepts = ["user", "department"];
  get userRepo() {
    return this.db.getRepository("users");
  }
  get deptRepo() {
    return this.db.getRepository("departments");
  }
  get deptUserRepo() {
    return this.db.getRepository("departmentsUsers");
  }
  getFlteredSourceDepartment(sourceDepartment) {
    const deleteProps = [
      "id",
      "uid",
      "createdAt",
      "updatedAt",
      "sort",
      "createdById",
      "updatedById",
      "isDeleted",
      "parentId",
      "parentUid"
    ];
    return import_lodash.default.omit(sourceDepartment, deleteProps);
  }
  async update(record, resourcePks) {
    const { dataType, metaData, sourceName } = record;
    if (dataType === "user") {
      const sourceUser = metaData;
      if (sourceUser.isDeleted) {
        if (!resourcePks || !resourcePks.length) {
          return [];
        } else {
          return resourcePks.map((id) => ({ resourcesPk: id, isDeleted: true }));
        }
      }
      const resources = record.resources.filter((r) => r.resource === "users");
      if (!resources.length) {
        return [];
      }
      const user = await this.userRepo.findOne({
        filterByTk: resources[0].resourcePk
      });
      if (!user) {
        if (!resourcePks || !resourcePks.length) {
          return [];
        } else {
          return resourcePks.map((id) => ({ resourcesPk: id, isDeleted: true }));
        }
      } else {
        return await this.updateUserDepartments(user, resourcePks, sourceUser.departments, sourceName);
      }
    } else if (dataType === "department") {
      const sourceDepartment = metaData;
      const department = await this.deptRepo.findOne({
        filterByTk: resourcePks[0]
      });
      if (!department) {
        if (sourceDepartment.isDeleted) {
          return [{ resourcesPk: resourcePks[0], isDeleted: true }];
        }
        const result = await this.create(record);
        return [...result, { resourcesPk: resourcePks[0], isDeleted: true }];
      }
      await this.updateDepartment(department, sourceDepartment, sourceName);
    } else {
      this.logger.warn(`update department: unsupported data type: ${dataType}`);
    }
    return [];
  }
  async create(record) {
    const { dataType, metaData, sourceName } = record;
    if (dataType === "user") {
      const sourceUser = metaData;
      if (sourceUser.isDeleted) {
        return [];
      }
      const resources = record.resources.filter((r) => r.resource === "users");
      if (!resources.length) {
        return [];
      }
      const user = await this.userRepo.findOne({
        filterByTk: resources[0].resourcePk
      });
      return await this.updateUserDepartments(user, [], sourceUser.departments, sourceName);
    } else if (dataType === "department") {
      const sourceDepartment = metaData;
      const newDepartmentId = await this.createDepartment(sourceDepartment, sourceName);
      return [{ resourcesPk: newDepartmentId, isDeleted: false }];
    } else {
      this.logger.warn(`create department: unsupported data type: ${dataType}`);
    }
    return [];
  }
  async getDepartmentIdsBySourceUks(sourceUks, sourceName) {
    const syncDepartmentRecords = await this.syncRecordRepo.find({
      filter: {
        sourceName,
        dataType: "department",
        sourceUk: { $in: sourceUks },
        "resources.resource": this.name
      },
      appends: ["resources"]
    });
    const departmentIds = syncDepartmentRecords.filter((record) => {
      var _a;
      return (_a = record.resources) == null ? void 0 : _a.length;
    }).map((record) => record.resources[0].resourcePk);
    return departmentIds;
  }
  async getDepartmentIdBySourceUk(sourceUk, sourceName) {
    var _a;
    const syncDepartmentRecord = await this.syncRecordRepo.findOne({
      filter: {
        sourceName,
        dataType: "department",
        sourceUk,
        "resources.resource": this.name
      },
      appends: ["resources"]
    });
    if (syncDepartmentRecord && ((_a = syncDepartmentRecord.resources) == null ? void 0 : _a.length)) {
      return syncDepartmentRecord.resources[0].resourcePk;
    }
  }
  async updateUserDepartments(user, currentDepartmentIds, sourceDepartments, sourceName) {
    if (!this.deptRepo) {
      return [];
    }
    if (!sourceDepartments || !sourceDepartments.length) {
      const userDepartments = await user.getDepartments();
      if (userDepartments.length) {
        await user.removeDepartments(userDepartments);
      }
      if (currentDepartmentIds && currentDepartmentIds.length) {
        return currentDepartmentIds.map((id) => ({ resourcesPk: id, isDeleted: true }));
      } else {
        return [];
      }
    } else {
      const sourceDepartmentIds = sourceDepartments.map((sourceDepartment) => {
        if (typeof sourceDepartment === "string" || typeof sourceDepartment === "number") {
          return sourceDepartment;
        }
        return sourceDepartment.uid;
      });
      const newDepartmentIds = await this.getDepartmentIdsBySourceUks(sourceDepartmentIds, sourceName);
      const newDepartments = await this.deptRepo.find({
        filter: { id: { $in: newDepartmentIds } }
      });
      const realCurrentDepartments = await user.getDepartments();
      const toRealRemoveDepartments = realCurrentDepartments.filter((currnetDepartment) => {
        return !newDepartments.find((newDepartment) => newDepartment.id === currnetDepartment.id);
      });
      if (toRealRemoveDepartments.length) {
        await user.removeDepartments(toRealRemoveDepartments);
      }
      const toRealAddDepartments = newDepartments.filter((newDepartment) => {
        if (realCurrentDepartments.length === 0) {
          return true;
        }
        return !realCurrentDepartments.find((currentDepartment) => currentDepartment.id === newDepartment.id);
      });
      if (toRealAddDepartments.length) {
        await user.addDepartments(toRealAddDepartments);
      }
      for (const sourceDepartment of sourceDepartments) {
        this.logger.debug("update dept owner: " + JSON.stringify(sourceDepartment));
        let isOwner = false;
        let isMain = false;
        let uid;
        if (typeof sourceDepartment !== "string" && typeof sourceDepartment !== "number") {
          isOwner = sourceDepartment.isOwner || false;
          isMain = sourceDepartment.isMain || false;
          uid = sourceDepartment.uid;
        } else {
          uid = sourceDepartment;
        }
        const deptId = await this.getDepartmentIdBySourceUk(uid, sourceName);
        this.logger.debug("update dept owner: " + JSON.stringify({ deptId, isOwner, isMain, userId: user.id }));
        if (!deptId) {
          continue;
        }
        await this.deptUserRepo.update({
          filter: {
            userId: user.id,
            departmentId: deptId
          },
          values: {
            isOwner,
            isMain
          }
        });
      }
      const recordResourceChangeds = [];
      if (currentDepartmentIds !== void 0 && currentDepartmentIds.length > 0) {
        const toRemoveDepartmentIds = currentDepartmentIds.filter(
          (currentDepartmentId) => !newDepartmentIds.includes(currentDepartmentId)
        );
        recordResourceChangeds.push(
          ...toRemoveDepartmentIds.map((departmentId) => {
            return { resourcesPk: departmentId, isDeleted: true };
          })
        );
        const toAddDepartmentIds = newDepartmentIds.filter(
          (newDepartmentId) => !currentDepartmentIds.includes(newDepartmentId)
        );
        recordResourceChangeds.push(
          ...toAddDepartmentIds.map((departmentId) => {
            return { resourcesPk: departmentId, isDeleted: false };
          })
        );
      } else {
        recordResourceChangeds.push(
          ...toRealAddDepartments.map((department) => {
            return {
              resourcesPk: department.id,
              isDeleted: false
            };
          })
        );
      }
      return recordResourceChangeds;
    }
  }
  async updateDepartment(department, sourceDepartment, sourceName) {
    if (sourceDepartment.isDeleted) {
      await department.destroy();
      return;
    }
    let dataChanged = false;
    const filteredSourceDepartment = this.getFlteredSourceDepartment(sourceDepartment);
    import_lodash.default.forOwn(filteredSourceDepartment, (value, key) => {
      if (department[key] !== value) {
        department[key] = value;
        dataChanged = true;
      }
    });
    if (dataChanged) {
      await department.save();
    }
    await this.updateParentDepartment(department, sourceDepartment.parentUid, sourceName);
  }
  async createDepartment(sourceDepartment, sourceName) {
    const filteredSourceDepartment = this.getFlteredSourceDepartment(sourceDepartment);
    const department = await this.deptRepo.create({
      values: filteredSourceDepartment
    });
    await this.updateParentDepartment(department, sourceDepartment.parentUid, sourceName);
    return department.id;
  }
  async updateParentDepartment(department, parentUid, sourceName) {
    var _a;
    if (!parentUid) {
      const parentDepartment = await department.getParent();
      if (parentDepartment) {
        await department.setParent(null);
      }
    } else {
      const syncDepartmentRecord = await this.syncRecordRepo.findOne({
        filter: {
          sourceName,
          dataType: "department",
          sourceUk: parentUid,
          "resources.resource": this.name
        },
        appends: ["resources"]
      });
      if (syncDepartmentRecord && ((_a = syncDepartmentRecord.resources) == null ? void 0 : _a.length)) {
        const parentDepartment = await this.deptRepo.findOne({
          filterByTk: syncDepartmentRecord.resources[0].resourcePk
        });
        if (!parentDepartment) {
          await department.setParent(null);
          return;
        }
        const parent = await department.getParent();
        if (parent) {
          if (parentDepartment.id !== parent.id) {
            await department.setParent(parentDepartment);
          }
        } else {
          await department.setParent(parentDepartment);
        }
      } else {
        await department.setParent(null);
      }
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DepartmentDataSyncResource
});
