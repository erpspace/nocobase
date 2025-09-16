export declare class ImportValidationError extends Error {
    code: string;
    params?: Record<string, any>;
    constructor(code: string, params?: Record<string, any>);
}
export interface ImportErrorOptions {
    rowIndex: number;
    rowData: any;
    cause?: Error;
}
export declare class ImportError extends Error {
    rowIndex: number;
    rowData: any;
    cause?: Error;
    constructor(message: string, options: ImportErrorOptions);
}
