/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
export interface TaskTypeOptions {
    title: string;
    collection: string;
    useActionParams: Function;
    component: React.ComponentType;
    extraActions?: React.ComponentType;
}
export declare function WorkflowTasks(): React.JSX.Element;
export declare const TasksProvider: (props: any) => React.JSX.Element;
