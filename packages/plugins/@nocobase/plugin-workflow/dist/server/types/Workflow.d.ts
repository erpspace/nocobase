/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Database, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, Model } from '@nocobase/database';
import ExecutionModel from './Execution';
import FlowNodeModel from './FlowNode';
export default class WorkflowModel extends Model {
    static database: Database;
    id: number;
    key: string;
    title: string;
    enabled: boolean;
    current: boolean;
    description?: string;
    type: string;
    config: any;
    options: any;
    executed: number;
    allExecuted: number;
    sync: boolean;
    createdAt: Date;
    updatedAt: Date;
    nodes?: FlowNodeModel[];
    getNodes: HasManyGetAssociationsMixin<FlowNodeModel>;
    createNode: HasManyCreateAssociationMixin<FlowNodeModel>;
    executions?: ExecutionModel[];
    countExecutions: HasManyCountAssociationsMixin;
    getExecutions: HasManyGetAssociationsMixin<ExecutionModel>;
    createExecution: HasManyCreateAssociationMixin<ExecutionModel>;
}
