/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Application, SchemaSettingsItemType } from '@nocobase/client';
export declare const hideConvertToBlockSettingItem: (settingItem: SchemaSettingsItemType, preSettingItem: SchemaSettingsItemType, nextSettingItem: SchemaSettingsItemType) => void;
export declare const hideDeleteSettingItem: (settingItem: SchemaSettingsItemType, preSettingItem: SchemaSettingsItemType) => void;
export declare const hideBlocksFromTemplate: (initializers: string[], app: Application) => void;
export declare const hideConnectDataBlocksFromTemplate: (settingItem: SchemaSettingsItemType) => void;
