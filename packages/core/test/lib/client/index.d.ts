/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
import { sleep } from '../web';
export * from './utils';
export { renderHook } from '@testing-library/react-hooks';
declare function customRender(ui: React.ReactElement, options?: {}): import("@testing-library/react").RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
export declare function waitForApp(): Promise<void>;
export declare function renderApp(element: React.JSX.Element): Promise<import("@testing-library/react").RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>>;
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
export { customRender as render, sleep };
export * from './renderAppOptions';
export * from './renderHookWithApp';
export * from './renderSettings';
export * from './renderSingleSettings';
export * from './settingsChecker';
export * from './commonSettingsChecker';
