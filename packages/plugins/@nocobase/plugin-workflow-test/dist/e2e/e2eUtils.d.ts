/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Browser } from '@nocobase/test/e2e';
export declare const apiCreateWorkflow: (data: any) => Promise<any>;
export declare const apiUpdateWorkflow: (id: number, data: any) => Promise<any>;
export declare const apiDeleteWorkflow: (id: number) => Promise<any>;
export declare const apiGetWorkflow: (id: number) => Promise<any>;
export declare const apiUpdateWorkflowTrigger: (id: number, data: any) => Promise<any>;
export declare const apiCreateWorkflowNode: (workflowId: number, data: any) => Promise<any>;
export declare const apiGetWorkflowNode: (id: number) => Promise<any>;
export declare const apiUpdateWorkflowNode: (id: number, data: any) => Promise<any>;
export declare const apiGetWorkflowNodeExecutions: (id: number) => Promise<any>;
export declare const apiUpdateRecord: (collectionName: string, id: number, data: any) => Promise<any>;
export declare const apiGetRecord: (collectionName: string, id: number) => Promise<any>;
export declare const apiGetList: (collectionName: string) => Promise<any>;
export declare const apiFilterList: (collectionName: string, filter: string) => Promise<any>;
export declare const apiCreateRecordTriggerFormEvent: (collectionName: string, triggerWorkflows: string, data: any) => Promise<any>;
export declare const apiSubmitRecordTriggerFormEvent: (triggerWorkflows: string, data: any) => Promise<any>;
export declare const apiGetDataSourceCount: () => Promise<any>;
export declare const apiCreateRecordTriggerActionEvent: (collectionName: string, triggerWorkflows: string, data: any) => Promise<any>;
export declare const apiTriggerCustomActionEvent: (collectionName: string, triggerWorkflows: string, data: any) => Promise<any>;
export declare const apiApplyApprovalEvent: (data: any) => Promise<any>;
export declare const apiCreateField: (collectionName: string, data: any) => Promise<any>;
export declare const approvalUserPassword = "1a2B3c4#";
export declare const userLogin: (browser: Browser, approvalUserEmail: string, approvalUser: string) => Promise<import("playwright-core").BrowserContext>;
declare const _default: {
    apiCreateWorkflow: (data: any) => Promise<any>;
    apiUpdateWorkflow: (id: number, data: any) => Promise<any>;
    apiDeleteWorkflow: (id: number) => Promise<any>;
    apiGetWorkflow: (id: number) => Promise<any>;
    apiUpdateWorkflowTrigger: (id: number, data: any) => Promise<any>;
    apiGetWorkflowNodeExecutions: (id: number) => Promise<any>;
    apiCreateWorkflowNode: (workflowId: number, data: any) => Promise<any>;
    apiUpdateWorkflowNode: (id: number, data: any) => Promise<any>;
    apiGetWorkflowNode: (id: number) => Promise<any>;
    apiUpdateRecord: (collectionName: string, id: number, data: any) => Promise<any>;
    apiGetRecord: (collectionName: string, id: number) => Promise<any>;
    apiGetList: (collectionName: string) => Promise<any>;
    apiCreateRecordTriggerFormEvent: (collectionName: string, triggerWorkflows: string, data: any) => Promise<any>;
    apiSubmitRecordTriggerFormEvent: (triggerWorkflows: string, data: any) => Promise<any>;
    apiFilterList: (collectionName: string, filter: string) => Promise<any>;
    apiGetDataSourceCount: () => Promise<any>;
    apiCreateRecordTriggerActionEvent: (collectionName: string, triggerWorkflows: string, data: any) => Promise<any>;
    apiApplyApprovalEvent: (data: any) => Promise<any>;
    userLogin: (browser: Browser, approvalUserEmail: string, approvalUser: string) => Promise<import("playwright-core").BrowserContext>;
    apiCreateField: (collectionName: string, data: any) => Promise<any>;
    apiTriggerCustomActionEvent: (collectionName: string, triggerWorkflows: string, data: any) => Promise<any>;
    approvalUserPassword: string;
};
export default _default;
