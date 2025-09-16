/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare const createDefaultActionSwagger: ({ collection }: {
    collection: any;
}) => {
    list: {
        method: string;
        responses: {
            default: {
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
    create: {
        method: string;
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: string;
                    };
                };
            };
        };
    };
    get: {
        method: string;
        responses: {
            default: {
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
    update: {
        method: string;
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: string;
                    };
                };
            };
        };
        responses: {
            default: {
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
    destroy: {
        method: string;
        responses: {
            default: {
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
    add: {
        method: string;
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: string;
                    };
                };
            };
        };
        responses: {
            default: {
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
    set: {
        method: string;
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: string;
                    };
                };
            };
        };
    };
    remove: {
        method: string;
        responses: {
            default: {
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
    toggle: {
        method: string;
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: string;
                    };
                };
            };
        };
        responses: {
            default: {
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
    move: {
        method: string;
        requestBody: {
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
export declare const getInterfaceCollection: (options: Record<string, any>) => {
    '/{resourceName}': any[];
    '/{resourceName}/{resourceIndex}': any[];
    '/{associatedName}/{associatedIndex}/{resourceName}': any[];
    '/{associatedName}/{associatedIndex}/{resourceName}/{resourceIndex}': any[];
};
