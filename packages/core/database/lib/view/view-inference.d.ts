/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import Database from '../database';
type InferredField = {
    name: string;
    type: string;
    source?: string;
};
type InferredFieldResult = {
    [key: string]: InferredField;
};
export declare class ViewFieldInference {
    static extractTypeFromDefinition(typeDefinition: any): any;
    static inferFields(options: {
        db: Database;
        viewName: string;
        viewSchema?: string;
    }): Promise<InferredFieldResult>;
    static inferToFieldType(options: {
        name: string;
        type: string;
        dialect: string;
    }): {
        possibleTypes: string[];
        type?: undefined;
    } | {
        type: any;
        possibleTypes: any[];
    } | {
        type: any;
        possibleTypes?: undefined;
    };
}
export {};
