/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
import { FieldOption } from '../hooks';
import { DimensionProps, MeasureProps } from '../renderer';
import { ISchema } from '@formily/react';
import { Config, ConfigType } from './configs';
import { Transformer } from '../transformers';
export type RenderProps = {
    data: Record<string, any>[];
    general: any;
    advanced: any;
    fieldProps: {
        [field: string]: {
            label: string;
            transformer: Transformer;
            interface: string;
        };
    };
};
export interface ChartType {
    name: string;
    title: string;
    enableAdvancedConfig?: boolean;
    Component: React.FC<any>;
    schema: ISchema;
    init?: (fields: FieldOption[], query: {
        measures?: MeasureProps[];
        dimensions?: DimensionProps[];
    }) => {
        general?: any;
        advanced?: any;
    };
    getProps(props: RenderProps): any;
    getReference?: () => {
        title: string;
        link: string;
    };
}
export type ChartProps = {
    name: string;
    title: string;
    enableAdvancedConfig?: boolean;
    Component: React.FC<any>;
    config?: Config[];
};
export declare class Chart implements ChartType {
    name: string;
    title: string;
    enableAdvancedConfig: boolean;
    Component: React.FC<any>;
    config: Config[];
    configTypes: Map<string, ConfigType>;
    constructor({ name, title, enableAdvancedConfig, Component, config }: ChartProps);
    get schema(): {
        type?: undefined;
        properties?: undefined;
    } | {
        type: string;
        properties: any;
    };
    addConfigTypes(configs: {
        [key: string]: ConfigType;
    }): void;
    infer(fields: FieldOption[], { measures, dimensions, }: {
        measures?: MeasureProps[];
        dimensions?: DimensionProps[];
    }): {
        xField: FieldOption;
        yField: FieldOption;
        seriesField: FieldOption;
        colorField: FieldOption;
        yFields: FieldOption[];
    };
    /**
     * getProps
     * Accept the information that the chart component needs to render,
     * process it and return the props of the chart component.
     */
    getProps(props: RenderProps): any;
}
