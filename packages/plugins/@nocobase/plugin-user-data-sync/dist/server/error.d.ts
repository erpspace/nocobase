/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare class ExternalAPIError extends Error {
    code: number;
    constructor(message: string);
}
export declare class ErrorCodes {
    static SUCCESS: number;
    static UNAUTHORIZED: number;
    static EXTERNAL_API_ERROR: number;
    static messages: {
        [x: number]: string;
    };
    static getErrorMessage(code: any): string;
}
