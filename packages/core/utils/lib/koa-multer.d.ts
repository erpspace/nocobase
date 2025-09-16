/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import originalMulter from 'multer';
declare function multer(options?: any): any;
declare namespace multer {
    var diskStorage: typeof originalMulter.diskStorage;
    var memoryStorage: typeof originalMulter.memoryStorage;
}
export { multer as koaMulter };
