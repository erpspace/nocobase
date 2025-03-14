/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { NAMESPACE } from '../common/constants';
export { NAMESPACE };
export declare function useLang(key: string, options?: {}): string;
export declare const lang: typeof useLang;
export declare function usePluginTranslation(options?: any): import("react-i18next").UseTranslationResponse<"workflow-manual", undefined>;
