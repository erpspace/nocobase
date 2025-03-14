/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
declare const _default: {
    info: {
        title: string;
    };
    paths: {
        '/swagger:getUrls': {
            get: {
                description: string;
                tags: string[];
                responses: {
                    200: {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                };
            };
        };
    };
    components: {
        responses: {
            SwaggerUrls: {
                type: string;
                items: {
                    properties: {
                        name: {
                            type: string;
                        };
                        url: {
                            type: string;
                        };
                    };
                };
            };
        };
    };
};
export default _default;
