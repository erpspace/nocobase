/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import { ITokenBlacklistService } from './token-blacklist-service';
export interface JwtOptions {
    secret: string;
    expiresIn?: string;
}
export type SignPayload = Parameters<typeof jwt.sign>[0];
export declare class JwtService {
    protected options: JwtOptions;
    constructor(options?: JwtOptions);
    blacklist: ITokenBlacklistService;
    private expiresIn;
    private secret;
    sign(payload: SignPayload, options?: SignOptions): string;
    decode(token: string): Promise<JwtPayload>;
    /**
     * @description Block a token so that this token can no longer be used
     */
    block(token: string): Promise<any>;
}
