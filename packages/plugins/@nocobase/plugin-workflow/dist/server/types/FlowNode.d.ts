/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { BelongsToGetAssociationMixin, Database, Model } from '@nocobase/database';
import WorkflowModel from './Workflow';
export default class FlowNodeModel extends Model {
    static readonly database: Database;
    id: number;
    title: string;
    branchIndex: null | number;
    type: string;
    config: any;
    createdAt: Date;
    updatedAt: Date;
    upstream: FlowNodeModel;
    downstream: FlowNodeModel;
    workflow?: WorkflowModel;
    getWorkflow: BelongsToGetAssociationMixin<WorkflowModel>;
}
