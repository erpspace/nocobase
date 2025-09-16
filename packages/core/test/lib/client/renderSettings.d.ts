/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { GetAppComponentOptions } from '../web';
export declare function showSettingsMenu(container?: HTMLElement | Document): Promise<void>;
export interface RenderSettingsOptions extends GetAppComponentOptions {
    container?: () => HTMLElement;
}
export declare const renderSettings: (options?: RenderSettingsOptions) => Promise<import("@testing-library/react").RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>>;
export declare const renderReadPrettySettings: (options?: RenderSettingsOptions) => Promise<import("@testing-library/react").RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>>;
