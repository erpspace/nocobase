/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
export declare const ResourcesContext: React.Context<{
    user: any;
    setUser?: (user: any) => void;
    department: any;
    setDepartment?: (department: any) => void;
    departmentsResource?: any;
    usersResource?: any;
}>;
export declare const ResourcesProvider: React.FC;
export declare const DepartmentsListProvider: React.FC;
export declare const UsersListProvider: React.FC;
