/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { CollectionTemplate, ICollectionTemplate } from '@nocobase/client';
export declare const calendar: ICollectionTemplate;
export declare class CalendarCollectionTemplate extends CollectionTemplate {
    name: string;
    title: string;
    order: number;
    color: string;
    default: {
        createdBy: boolean;
        updatedBy: boolean;
        createdAt: boolean;
        updatedAt: boolean;
        sortable: boolean;
        fields: ({
            name: string;
            type: string;
            uiSchema: {
                type: string;
                title: string;
                'x-component': string;
                'x-component-props': string;
                enum: {
                    label: string;
                    value: string;
                }[];
            };
            interface: string;
        } | {
            name: string;
            type: string;
            uiSchema?: undefined;
            interface?: undefined;
        })[];
    };
    availableFieldInterfaces: {
        include: any[];
    };
    configurableProperties: Record<import("@nocobase/client/es/collection-manager/templates/properties").DefaultConfigurableKeys, any>;
}
