/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare function useAttachmentUrlFieldProps(props: any): any;
export declare const useInsertSchema: (component: any) => (ss: any) => void;
export declare const useAttachmentTargetProps: () => {
    service: {
        resource: string;
        params: {
            paginate: boolean;
        };
    };
    manual: boolean;
    fieldNames: {
        label: string;
        value: string;
    };
    onSuccess: (data: any) => void;
};
