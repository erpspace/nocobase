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
        '/userData:push': {
            post: {
                description: string;
                tags: string[];
                security: any[];
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: string;
                                items: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                };
                responses: {
                    200: {
                        description: string;
                    };
                };
            };
        };
    };
    components: {
        schemas: {
            userData: {
                type: string;
                description: string;
                properties: {
                    dataType: {
                        type: string;
                        description: string;
                    };
                    uniqueKey: {
                        type: string;
                        description: string;
                    };
                    records: {
                        type: string;
                        description: string;
                        items: {
                            type: string;
                        };
                    };
                    sourceName: {
                        type: string;
                        description: string;
                    };
                };
            };
            user: {
                type: string;
                description: string;
                properties: {
                    id: {
                        type: string;
                        description: string;
                    };
                    nickname: {
                        type: string;
                        description: string;
                    };
                    email: {
                        type: string;
                        description: string;
                    };
                    phone: {
                        type: string;
                        description: string;
                    };
                    departments: {
                        type: string;
                        description: string;
                        items: {
                            type: string;
                        };
                    };
                };
            };
            department: {
                type: string;
                description: string;
                properties: {
                    id: {
                        type: string;
                        description: string;
                    };
                    name: {
                        type: string;
                        description: string;
                    };
                    parentId: {
                        type: string;
                        description: string;
                    };
                };
            };
        };
    };
};
export default _default;
