/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
declare const _default: {
    echo: {
        run({ config }: any, { result }: {
            result: any;
        }, processor: any): {
            status: number;
            result: any;
        };
        test(config?: {}): {
            status: number;
            result: any;
        };
    };
    echoVariable: {
        run({ id, config }: any, job: any, processor: any): {
            status: number;
            result: any;
        };
    };
    error: {
        run(node: any, input: any, processor: any): never;
    };
    pending: {
        run(node: any, input: any, processor: any): {
            status: number;
        };
        resume(node: any, job: any): any;
        test(): {
            status: number;
        };
    };
    prompt: {
        run(node: any, input: any, processor: any): {
            status: number;
        };
        resume(node: any, job: any, processor: any): any;
    };
    'prompt->error': {
        run(node: any, input: any, processor: any): {
            status: number;
        };
        resume(node: any, input: any, processor: any): any;
    };
    asyncResume: {
        run(node: any, input: any, processor: any): Promise<any>;
        resume(node: any, job: any, processor: any): any;
    };
    customizedSuccess: {
        run(node: any, input: any, processor: any): {
            status: number;
        };
    };
    customizedError: {
        run(node: any, input: any, processor: any): {
            status: number;
        };
    };
};
export default _default;
