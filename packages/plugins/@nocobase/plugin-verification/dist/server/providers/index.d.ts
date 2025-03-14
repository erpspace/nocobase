/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import Plugin from '../Plugin';
import { Provider } from './Provider';
interface Providers {
    [key: string]: typeof Provider;
}
export default function (plugin: Plugin, more?: Providers): Promise<void>;
export {};
