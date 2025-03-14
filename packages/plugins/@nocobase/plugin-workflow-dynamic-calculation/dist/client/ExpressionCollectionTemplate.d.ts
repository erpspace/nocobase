/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { CollectionTemplate } from '@nocobase/client';
export declare class ExpressionCollectionTemplate extends CollectionTemplate {
    name: string;
    title: string;
    order: number;
    color: string;
    default: {
        createdBy: boolean;
        updatedBy: boolean;
        createdAt: boolean;
        updatedAt: boolean;
        fields: ({
            name: string;
            type: string;
            interface: string;
            uiSchema: {
                type: string;
                title: string;
                'x-component': string;
                enum: any;
                default: string;
                'x-component-props'?: undefined;
            };
        } | {
            name: string;
            type: string;
            interface: string;
            uiSchema: {
                type: string;
                title: string;
                'x-component': string;
                'x-component-props': {};
                enum?: undefined;
                default?: undefined;
            };
        } | {
            name: string;
            type: string;
            interface: string;
            uiSchema: {
                type: string;
                title: string;
                'x-component': string;
                enum?: undefined;
                default?: undefined;
                'x-component-props'?: undefined;
            };
        })[];
    };
    availableFieldInterfaces: {
        include: any[];
    };
    configurableProperties: Record<import("@nocobase/client/es/collection-manager/templates/properties").DefaultConfigurableKeys, any>;
}
