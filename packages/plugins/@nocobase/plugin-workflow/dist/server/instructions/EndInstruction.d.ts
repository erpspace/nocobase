/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import Instruction from '.';
import Processor from '../Processor';
import { FlowNodeModel } from '../types';
export default class extends Instruction {
    run(node: FlowNodeModel, prevJob: any, processor: Processor): Promise<any>;
}
