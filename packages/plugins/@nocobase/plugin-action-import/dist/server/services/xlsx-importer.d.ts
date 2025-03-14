/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
/// <reference types="node" />
import { ICollection, ICollectionManager } from '@nocobase/data-source-manager';
import { Transaction } from 'sequelize';
import EventEmitter from 'events';
export type ImportColumn = {
    dataIndex: Array<string>;
    defaultTitle: string;
    title?: string;
    description?: string;
};
export type ImporterOptions = {
    collectionManager: ICollectionManager;
    collection: ICollection;
    columns: Array<ImportColumn>;
    workbook: any;
    chunkSize?: number;
    explain?: string;
    repository?: any;
};
export type RunOptions = {
    transaction?: Transaction;
    context?: any;
};
export declare class XlsxImporter extends EventEmitter {
    protected options: ImporterOptions;
    private repository;
    constructor(options: ImporterOptions);
    validate(): Promise<string[][]>;
    run(options?: RunOptions): Promise<any>;
    resetSeq(options?: RunOptions): Promise<void>;
    performImport(options?: RunOptions): Promise<any>;
    performInsert(insertOptions: {
        values: any;
        transaction: Transaction;
        context: any;
        hooks?: boolean;
    }): Promise<any>;
    renderErrorMessage(error: any): any;
    trimString(str: string): string;
    private getExpectedHeaders;
    getData(): Promise<string[][]>;
    private findAndValidateHeaders;
}
