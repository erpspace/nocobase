/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Processor } from '@nocobase/plugin-workflow';
import ManualInstruction from '../ManualInstruction';
export default function (this: ManualInstruction, instance: any, { dataSource, collection, filter }: {
    dataSource?: string;
    collection: any;
    filter?: {};
}, processor: Processor): Promise<void>;
