/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { ICollection } from '@nocobase/data-source-manager';
import { ImportColumn } from './xlsx-importer';
import * as XLSX from 'xlsx';
import { Workbook as ExcelJSWorkbook } from 'exceljs';
export type TemplateCreatorOptions = {
    collection?: ICollection;
    title?: string;
    explain?: string;
    columns: Array<ImportColumn>;
};
export type TemplateResult = {
    workbook: XLSX.WorkBook | ExcelJSWorkbook;
    headerRowIndex: number;
};
export declare class TemplateCreator {
    private options;
    private headerRowIndex;
    constructor(options: TemplateCreatorOptions);
    getHeaderRowIndex(): number;
    run(options?: any): Promise<XLSX.WorkBook | ExcelJSWorkbook>;
    renderHeaders(): string[];
}
