/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare class Environment {
    private vars;
    setVariable(key: string, value: string): void;
    removeVariable(key: string): void;
    getVariablesAndSecrets(): {};
    getVariables(): {};
    renderJsonTemplate(template: any, options?: {
        omit?: string[];
    }): any;
}
