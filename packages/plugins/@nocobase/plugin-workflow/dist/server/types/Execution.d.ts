/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { BelongsToGetAssociationMixin, Database, HasManyGetAssociationsMixin, Model } from '@nocobase/database';
import JobModel from './Job';
import WorkflowModel from './Workflow';
export default class ExecutionModel extends Model {
    static readonly database: Database;
    id: number;
    title: string;
    context: any;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    key: string;
    workflow?: WorkflowModel;
    getWorkflow: BelongsToGetAssociationMixin<WorkflowModel>;
    jobs?: JobModel[];
    getJobs: HasManyGetAssociationsMixin<JobModel>;
}
