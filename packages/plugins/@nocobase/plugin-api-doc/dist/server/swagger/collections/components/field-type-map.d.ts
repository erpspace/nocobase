/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Field } from '@nocobase/database';
declare const fieldTypeMap: {
    bigint: {
        type: string;
        format: string;
    };
    datetime: {
        type: string;
        format: string;
    };
    string: {
        type: string;
    };
    text: {
        type: string;
    };
    jsontype: {
        type: string;
    };
};
declare function getTypeByField(field: Field): any;
export { fieldTypeMap, getTypeByField };
