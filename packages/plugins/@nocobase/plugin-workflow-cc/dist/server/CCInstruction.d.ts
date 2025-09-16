/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Instruction } from '@nocobase/plugin-workflow';
export default class CCInstruction extends Instruction {
    static type: string;
    run(node: any, prevJob: any, processor: any): Promise<any>;
    duplicateConfig(node: any, { transaction }: {
        transaction: any;
    }): Promise<any>;
}
