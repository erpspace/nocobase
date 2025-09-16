/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { CompatibleSchemaInitializer, SchemaInitializer } from '@nocobase/client';
/**
 * @deprecated
 * 之所以还保留，仅是为了兼容旧版 schema
 */
export declare const CreateFormBulkEditBlockInitializers: SchemaInitializer;
/**
 * @deprecated
 * use `bulkEditBlockInitializers` instead
 */
export declare const BulkEditBlockInitializers_deprecated: CompatibleSchemaInitializer;
export declare const bulkEditBlockInitializers: CompatibleSchemaInitializer;
