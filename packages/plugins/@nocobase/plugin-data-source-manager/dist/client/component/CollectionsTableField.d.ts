/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
export declare const CollectionsTableField: (props: {
    NAMESPACE: string;
    t: (key: string, options?: any) => string;
}) => {
    CollectionsTable: (props: any) => React.JSX.Element;
    createCollectionsSchema: (from: string, loadCollections: any) => {
        type: string;
        title: string;
        'x-decorator': string;
        'x-component': string;
        'x-component-props': {
            from: string;
            loadCollections: any;
            formValues: string;
            options: string;
            formSetValues: string;
        };
        'x-reactions': ({
            dependencies: string[];
            fulfill: {
                schema: {
                    'x-component-props.dataSourceKey': string;
                    'x-component-props.options': string;
                    'x-component-props.addAllCollectionsValue': string;
                };
                run?: undefined;
            };
        } | {
            dependencies: string[];
            fulfill: {
                run: string;
                schema?: undefined;
            };
        })[];
    };
    Text: React.MemoExoticComponent<import("@formily/react").ReactFC<Omit<any, "ref">>>;
    addAllCollectionsSchema: {
        type: string;
        'x-component': string;
        'x-display': string;
        default: boolean;
    };
};
