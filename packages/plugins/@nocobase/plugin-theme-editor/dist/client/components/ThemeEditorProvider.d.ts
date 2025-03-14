/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
export declare const useThemeEditorContext: () => {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export declare const ThemeEditorProvider: {
    ({ children, open, setOpen }: {
        children: any;
        open: any;
        setOpen: any;
    }): React.JSX.Element;
    displayName: string;
};
