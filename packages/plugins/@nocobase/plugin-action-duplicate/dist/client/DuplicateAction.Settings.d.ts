/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { SchemaSettings } from '@nocobase/client';
/**
 * @deprecated
 * 用于兼容之前的 name
 */
declare const deprecatedDuplicateActionSettings: SchemaSettings<{}>;
declare const duplicateActionSettings: SchemaSettings<{}>;
export { deprecatedDuplicateActionSettings, duplicateActionSettings };
