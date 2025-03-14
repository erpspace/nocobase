/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare const NAMESPACE = "@nocobase/plugin-notification-manager";
export declare function lang(key: string): string;
export declare function generateNTemplate(key: string): string;
export declare function useNotificationTranslation(): import("react-i18next").UseTranslationResponse<("@nocobase/plugin-notification-manager" | "client" | "data-source-manager")[], undefined>;
