/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { ISchema, SchemaInitializerItemActionModalType, SchemaSettings } from '@nocobase/client';
export declare const mobileNavigationBarLinkSettings: SchemaSettings<{}>;
export declare const useMobileNavigationBarLink: () => {
    onClick: () => Promise<void>;
};
export declare const getMobileNavigationBarLinkSchema: (values: any) => ISchema;
export declare const mobileNavigationBarLinkInitializerItem: SchemaInitializerItemActionModalType;
