/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare const useChinaRegionDataSource: (options: any) => import("@nocobase/client").UseRequestResult<{
    sort: string;
    paginate: boolean;
    filter: {
        level: number;
    };
}>;
export declare const useChinaRegionLoadData: () => (selectedOptions: any) => void;
