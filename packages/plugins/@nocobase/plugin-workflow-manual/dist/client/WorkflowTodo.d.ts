/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
export declare const WorkflowTodo: React.FC & {
    Initializer: React.FC;
    Drawer: React.FC;
    Decorator: React.FC;
};
export declare function getWorkflowTodoViewActionSchema({ defaultOpenMode, collectionName }: {
    defaultOpenMode: any;
    collectionName: any;
}): {
    name: string;
    type: string;
    'x-component': string;
    'x-component-props': {
        openMode: any;
    };
    title: string;
    'x-uid': string;
    'x-action': string;
    'x-action-context': {
        dataSource: string;
        collection: any;
        doNotUpdateContext: boolean;
    };
    properties: {
        drawer: {
            type: string;
            'x-component': React.FC<{}>;
        };
    };
};
declare function TaskItem(): React.JSX.Element;
declare function useTodoActionParams(status: any): {
    filter: any;
    appends: string[];
};
declare function TodoExtraActions(): React.JSX.Element;
export declare const manualTodo: {
    title: string;
    collection: string;
    useActionParams: typeof useTodoActionParams;
    component: typeof TaskItem;
    extraActions: typeof TodoExtraActions;
};
export {};
