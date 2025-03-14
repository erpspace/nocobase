/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
export declare const EXECUTION_STATUS: {
    QUEUEING: any;
    STARTED: number;
    RESOLVED: number;
    FAILED: number;
    ERROR: number;
    ABORTED: number;
    CANCELED: number;
    REJECTED: number;
    RETRY_NEEDED: number;
};
export declare const ExecutionStatusOptions: {
    value: any;
    label: string;
    color: string;
    icon: React.JSX.Element;
    statusType: string;
    description: string;
}[];
export declare const ExecutionStatusOptionsMap: {};
export declare const JOB_STATUS: {
    PENDING: number;
    RESOLVED: number;
    FAILED: number;
    ERROR: number;
    ABORTED: number;
    CANCELED: number;
    REJECTED: number;
    RETRY_NEEDED: number;
};
export declare const JobStatusOptions: {
    value: number;
    label: string;
    color: string;
    icon: React.JSX.Element;
}[];
export declare const JobStatusOptionsMap: {};
