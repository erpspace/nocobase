/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare const NAMESPACE = "calendar";
export declare function i18nt(key: string, options?: any): import("i18next").TFunctionDetailedResult<object>;
export declare function generateNTemplate(key: string): string;
export declare function useTranslation(): import("react-i18next").UseTranslationResponse<("calendar" | "client")[], undefined>;
