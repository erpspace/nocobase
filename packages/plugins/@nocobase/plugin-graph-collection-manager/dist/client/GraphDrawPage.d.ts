/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
export declare enum DirectionType {
    Both = "both",
    Target = "target",
    Source = "source"
}
export declare enum ConnectionType {
    Both = "both",
    Inherit = "inherited",
    Entity = "entity"
}
export declare const CollapsedContext: React.Context<any>;
export declare const GraphDrawPage: React.MemoExoticComponent<() => React.JSX.Element>;
