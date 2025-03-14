/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
declare const calcCustomToken: (name: string, value: any) => {
    colorSettings: any;
    colorBgSettingsHover: string;
    colorBorderSettingsHover: string;
} | {
    [x: string]: any;
    colorSettings?: undefined;
    colorBgSettingsHover?: undefined;
    colorBorderSettingsHover?: undefined;
};
export default calcCustomToken;
