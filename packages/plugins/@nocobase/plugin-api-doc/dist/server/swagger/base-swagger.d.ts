/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
declare const _default: {
    openapi: string;
    info: {
        title: string;
        description: string;
        contact: {
            url: string;
        };
        license: {
            name: string;
            url: string;
        };
    };
    externalDocs: {
        description: string;
        url: string;
    };
    components: {
        securitySchemes: {
            'api-key': {
                type: string;
                scheme: string;
            };
        };
        schemas: {
            error: {
                type: string;
                properties: {
                    errors: {
                        type: string;
                        items: {
                            type: string;
                            properties: {
                                message: {
                                    description: string;
                                    type: string;
                                };
                            };
                        };
                    };
                };
            };
        };
    };
    security: {
        'api-key': any[];
    }[];
};
export default _default;
