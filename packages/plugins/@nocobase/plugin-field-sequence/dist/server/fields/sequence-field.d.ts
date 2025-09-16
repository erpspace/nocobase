/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { BaseColumnFieldOptions, DataTypes, Field, FieldContext, Model, Transactionable } from '@nocobase/database';
import { Registry } from '@nocobase/utils';
export interface Pattern {
    validate?(options: any): string | null;
    generate(this: SequenceField, instance: Model, opts: {
        [key: string]: any;
    }, options: Transactionable): Promise<string> | string;
    batchGenerate(this: SequenceField, instances: Model[], values: string[], opts: {
        [key: string]: any;
    }, options: Transactionable): Promise<void> | void;
    getLength(options: any): number;
    getMatcher(options: any): string;
    update?(this: SequenceField, instance: Model, value: string, options: any, transactionable: Transactionable): Promise<void>;
}
export declare const sequencePatterns: Registry<Pattern>;
interface PatternConfig {
    type: string;
    title?: string;
    options?: any;
}
export interface SequenceFieldOptions extends BaseColumnFieldOptions {
    type: 'sequence';
    patterns: PatternConfig[];
}
export declare class SequenceField extends Field {
    matcher: RegExp;
    get dataType(): DataTypes.StringDataTypeConstructor;
    constructor(options: SequenceFieldOptions, context: FieldContext);
    validate: (instance: Model) => void;
    setValue: (instance: Model, options: any) => Promise<void>;
    setGroupValue: (instances: Model[], options: any) => Promise<void>;
    cleanHook: (_: any, options: any) => void;
    match(value: any): RegExpMatchArray;
    update(instance: Model, options: any): Promise<void>;
    bind(): void;
    unbind(): void;
}
export {};
