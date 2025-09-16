/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Collection, RelationField } from '@nocobase/database';
type TemplateOptions = {
    collection: Collection;
    relationField?: RelationField;
};
export declare function relationTypeToString(field: RelationField): any;
export declare function ListActionTemplate({ collection, relationField }: TemplateOptions): {
    get: {
        tags: string[];
        summary: string;
        parameters: ({
            name: string;
            in: string;
            description: string;
            required: boolean;
            schema: {
                type: string;
            };
            $ref?: undefined;
        } | {
            $ref: string;
            name?: undefined;
            in?: undefined;
            description?: undefined;
            required?: undefined;
            schema?: undefined;
        })[];
        responses: {
            '200': {
                description: string;
                content: {
                    'application/json': {
                        schema: {
                            type: string;
                            properties: {
                                data: {
                                    type: string;
                                    items: {
                                        $ref: string;
                                    };
                                };
                                meta: {
                                    type: string;
                                    properties: {
                                        count: {
                                            type: string;
                                            description: string;
                                        };
                                        page: {
                                            type: string;
                                            description: string;
                                        };
                                        pageSize: {
                                            type: string;
                                            description: string;
                                        };
                                        totalPage: {
                                            type: string;
                                            description: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
export declare function GetActionTemplate(options: TemplateOptions): {
    get: {
        tags: string[];
        summary: string;
        parameters: {
            $ref: string;
        }[];
        responses: {
            '200': {
                description: string;
                content: {
                    'application/json': {
                        schema: {
                            type: string;
                            properties: {
                                data: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
export declare function CreateActionTemplate(options: TemplateOptions): {
    post: {
        tags: string[];
        summary: string;
        parameters: {
            $ref: string;
        }[];
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
            '200': {
                description: string;
                content: {
                    'application/json': {
                        schema: {
                            type: string;
                            properties: {
                                data: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
export declare function UpdateActionTemplate(options: TemplateOptions): {
    post: {
        tags: string[];
        summary: string;
        parameters: {
            $ref: string;
        }[];
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
            '200': {
                description: string;
                content: {
                    'application/json': {
                        schema: {
                            type: string;
                            properties: {
                                data: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
export declare function DestroyActionTemplate(options: TemplateOptions): {
    post: {
        tags: string[];
        summary: string;
        parameters: {
            $ref: string;
        }[];
        responses: {
            '200': {
                description: string;
            };
        };
    };
};
export declare function MoveActionTemplate(options: TemplateOptions): {
    post: {
        tags: string[];
        summary: string;
        parameters: {
            name: string;
            in: string;
            description: string;
            schema: {
                type: string;
            };
        }[];
        responses: {
            '200': {
                description: string;
            };
        };
    };
};
declare const _default: (collection: Collection) => any;
export default _default;
