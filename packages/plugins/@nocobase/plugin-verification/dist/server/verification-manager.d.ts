/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Registry } from '@nocobase/utils';
import { Verification, VerificationExtend } from './verification';
import { Context, Next } from '@nocobase/actions';
import { Database } from '@nocobase/database';
export type VerificationTypeOptions = {
    title: string;
    description?: string;
    bindingRequired?: boolean;
    verification: VerificationExtend<Verification>;
};
type SceneRule = (scene: string, verificationType: string) => boolean;
export interface ActionOptions {
    manual?: boolean;
    getUserIdFromCtx?(ctx: Context): number | Promise<number>;
    getBoundInfoFromCtx?(ctx: Context): any | Promise<any>;
    getVerifyParams?(ctx: Context): any | Promise<any>;
    onVerifySuccess?(ctx: Context, userId: number, verifyResult: any): any | Promise<any>;
    onVerifyFail?(ctx: Context, err: Error, userId: number): any | Promise<any>;
}
export interface SceneOptions {
    actions: {
        [key: string]: ActionOptions;
    };
    getVerifiers?(ctx: Context): Promise<string[]>;
}
export declare class VerificationManager {
    db: Database;
    verificationTypes: Registry<VerificationTypeOptions>;
    scenes: Registry<SceneOptions>;
    sceneRules: SceneRule[];
    actions: Registry<ActionOptions & {
        scene?: string;
    }>;
    constructor({ db }: {
        db: any;
    });
    registerVerificationType(type: string, options: VerificationTypeOptions): void;
    listTypes(): {
        name: string;
        title: string;
    }[];
    addSceneRule(rule: SceneRule): void;
    registerAction(action: string, options: ActionOptions): void;
    registerScene(scene: string, options: SceneOptions): void;
    getVerificationTypesByScene(scene: string): any[];
    getVerification(type: string): VerificationExtend<Verification>;
    getVerifier(verifierName: string): Promise<any>;
    getVerifiers(verifierNames: string[]): Promise<any>;
    getBoundRecord(userId: number, verifier: string): Promise<any>;
    getAndValidateBoundInfo(ctx: Context, action: ActionOptions, verification: Verification): Promise<{
        boundInfo: {
            uuid: string;
        };
        userId: number;
    }>;
    private validateAndGetVerifier;
    verify(ctx: Context, next: Next): Promise<void>;
    middleware(): (ctx: Context, next: Next) => Promise<any>;
}
export {};
