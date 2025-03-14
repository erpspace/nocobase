/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Plugin } from '@nocobase/client';
import { Instruction } from './nodes';
import { Trigger } from './triggers';
import { VariableOption } from './variable';
import { TaskTypeOptions } from './WorkflowTasks';
type InstructionGroup = {
    key?: string;
    label: string;
};
export default class PluginWorkflowClient extends Plugin {
    triggers: any;
    instructions: any;
    instructionGroups: any;
    systemVariables: any;
    taskTypes: any;
    useTriggersOptions: () => {
        value: any;
        label: any;
        color: string;
        options: {
            [x: string]: any;
        };
    }[];
    useInstructionGroupOptions: () => {
        key: any;
        label: any;
    }[];
    isWorkflowSync(workflow: any): any;
    registerTrigger(type: string, trigger: Trigger | {
        new (): Trigger;
    }): void;
    registerInstruction(type: string, instruction: Instruction | {
        new (): Instruction;
    }): void;
    registerInstructionGroup(key: string, group: InstructionGroup): void;
    registerSystemVariable(option: VariableOption): void;
    registerTaskType(key: string, option: TaskTypeOptions): void;
    load(): Promise<void>;
}
export * from './Branch';
export * from './components';
export * from './constants';
export * from './ExecutionContextProvider';
export * from './FlowContext';
export * from './hooks';
export * from './nodes';
export * from './settings/BindWorkflowConfig';
export { default as useStyles } from './style';
export { Trigger, useTrigger } from './triggers';
export * from './utils';
export * from './variable';
