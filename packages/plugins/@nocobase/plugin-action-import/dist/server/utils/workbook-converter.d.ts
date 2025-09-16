import * as XLSX from 'xlsx';
import { Workbook as ExcelJSWorkbook } from 'exceljs';
export declare class WorkbookConverter {
    /**
     * Convert ExcelJS Workbook to XLSX Workbook
     */
    static excelJSToXLSX(workbook: ExcelJSWorkbook): Promise<XLSX.WorkBook>;
}
