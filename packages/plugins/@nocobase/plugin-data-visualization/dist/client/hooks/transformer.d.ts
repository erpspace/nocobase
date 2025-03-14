/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { ChartRendererProps } from '../renderer';
import { FieldOption } from './query';
export declare const useFieldSelectProps: (fields: FieldOption[]) => () => {
    onChange: (value: string) => void;
};
export declare const useFieldTypeSelectProps: () => {
    options: {
        label: string;
        value: string;
    }[];
    onChange: (value: string) => void;
};
export declare const useTransformerSelectProps: () => {
    onChange: (value: string) => void;
};
export declare const useTransformers: (field: any) => void;
export declare const useArgument: (field: any) => void;
export declare const useFieldTransformer: (transform: ChartRendererProps['transform'], locale?: string) => {};
