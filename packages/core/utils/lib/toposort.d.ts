/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import Topo from '@hapi/topo';
export interface ToposortOptions extends Topo.Options {
    tag?: string;
}
export declare class Toposort<T> extends Topo.Sorter<T> {
    unshift(...items: any[]): void;
    push(...items: any[]): void;
    add(nodes: T | T[], options?: ToposortOptions): T[];
}
export default Toposort;
