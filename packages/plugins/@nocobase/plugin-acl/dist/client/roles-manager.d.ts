/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
/// <reference types="react" />
export type RolesManagerOptions = {
    title: string;
    Component: React.ComponentType<any>;
};
export declare class RolesManager {
    rolesManager: any;
    add(name: string, options: RolesManagerOptions): void;
    list(): any;
}
