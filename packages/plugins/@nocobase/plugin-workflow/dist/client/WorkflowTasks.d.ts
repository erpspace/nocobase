import React from 'react';
import { APIClient, SchemaInitializerItemType } from '@nocobase/client';
export interface TaskTypeOptions {
    title: string;
    collection: string;
    action?: string;
    useActionParams: Function;
    Actions?: React.ComponentType;
    Item: React.ComponentType;
    Detail: React.ComponentType;
    getPopupRecord?: (apiClient: APIClient, { params }: {
        params: any;
    }) => Promise<any>;
    alwaysShow?: boolean;
}
type Stats = Record<string, {
    pending: number;
    all: number;
}>;
export declare function useTasksCountsContext(): {
    reload: () => void;
    counts: Stats;
    total: number;
};
export declare function usePopupRecordContext(): any;
export declare function WorkflowTasks(): React.JSX.Element;
export declare function TasksProvider(props: any): React.JSX.Element;
export declare const tasksSchemaInitializerItem: SchemaInitializerItemType;
export declare const MobileTabBarWorkflowTasksItem: React.MemoExoticComponent<import("@formily/react").ReactFC<Omit<any, "ref">>>;
export declare function WorkflowTasksMobile(): React.JSX.Element;
export {};
