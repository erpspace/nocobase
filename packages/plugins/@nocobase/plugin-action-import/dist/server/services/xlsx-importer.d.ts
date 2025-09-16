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
import { Model } from '@nocobase/database';
import { Transaction } from 'sequelize';
import EventEmitter from 'events';
import { Context } from '@nocobase/actions';
import { Logger } from '@nocobase/logger';
import { LoggerService } from '../utils';
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
    logger?: Logger;
};
export type RunOptions = {
    transaction?: Transaction;
    context?: any;
};
export declare class XlsxImporter extends EventEmitter {
    protected options: ImporterOptions;
    private repository;
    protected loggerService: LoggerService;
    protected logger: Logger;
    constructor(options: ImporterOptions);
    beforePerformImport(data: string[][], options: RunOptions): Promise<string[][]>;
    validate(ctx?: Context): Promise<string[][]>;
    run(options?: RunOptions): Promise<any>;
    resetSeq(options?: RunOptions): Promise<void>;
    private getColumnsByPermission;
    performImport(data: string[][], options?: RunOptions): Promise<any>;
    protected getModel(): typeof Model;
    handleRowValuesWithColumns(row: any, rowValues: any, options: RunOptions): Promise<void>;
    handleChuckRows(chunkRows: string[][], runOptions?: RunOptions, options?: {
        handingRowIndex: number;
        context: any;
    }): Promise<void>;
    performInsert(insertOptions: {
        values: any[];
        transaction: Transaction;
        context: any;
        hooks?: boolean;
    }): Promise<Model<{}, {}>[]>;
    associateRecords(targets: Model[], options?: any): Promise<void>;
    renderErrorMessage(error: any): any;
    trimString(str: string): string;
    private getExpectedHeaders;
    getData(ctx?: Context): Promise<string[][]>;
    private alignWithHeaders;
    private findAndValidateHeaders;
}
