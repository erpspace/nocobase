/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare const EXECUTION_STATUS: {
    readonly QUEUEING: any;
    readonly STARTED: 0;
    readonly RESOLVED: 1;
    readonly FAILED: -1;
    readonly ERROR: -2;
    readonly ABORTED: -3;
    readonly CANCELED: -4;
    readonly REJECTED: -5;
    readonly RETRY_NEEDED: -6;
};
export declare const JOB_STATUS: {
    readonly PENDING: 0;
    readonly RESOLVED: 1;
    readonly FAILED: -1;
    readonly ERROR: -2;
    readonly ABORTED: -3;
    readonly CANCELED: -4;
    readonly REJECTED: -5;
    readonly RETRY_NEEDED: -6;
};
