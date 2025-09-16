/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
interface BlockTemplateContextProps {
    loading: boolean;
    templates: any[];
    handleTemplateClick: (item: any, options?: any, insert?: any) => Promise<void>;
}
export declare const useBlockTemplateMenus: () => BlockTemplateContextProps;
export declare const BlockTemplateMenusProvider: {
    ({ children }: {
        children: any;
    }): React.JSX.Element;
    displayName: string;
};
export {};
