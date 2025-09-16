/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { ModelStatic } from 'sequelize';
import { AssociationKeysToBeUpdate, BlackList, WhiteList } from './repository';
type UpdateValueItem = string | number | UpdateValues;
type UpdateValues = {
    [key: string]: UpdateValueItem | Array<UpdateValueItem>;
};
type UpdateAction = 'create' | 'update';
export declare class UpdateGuard {
    model: ModelStatic<any>;
    action: UpdateAction;
    underscored: boolean;
    private associationKeysToBeUpdate;
    private blackList;
    private whiteList;
    static fromOptions(model: any, options: any): UpdateGuard;
    setAction(action: UpdateAction): void;
    setModel(model: ModelStatic<any>): void;
    setAssociationKeysToBeUpdate(associationKeysToBeUpdate: AssociationKeysToBeUpdate): void;
    setWhiteList(whiteList: WhiteList): void;
    setBlackList(blackList: BlackList): void;
    checkValues(values: any): void;
    /**
     * Sanitize values by whitelist blacklist
     * @param values
     */
    sanitize(values: UpdateValues): {};
}
export {};
