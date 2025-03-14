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
    };
    tags: any[];
    paths: {
        '/workflows:list': {
            get: {
                tags: string[];
                description: string;
                parameters: {
                    $ref: string;
                }[];
                responses: {
                    200: {
                        description: string;
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
                };
            };
        };
        '/workflows:get': {
            get: {
                tags: string[];
                description: string;
                parameters: {
                    $ref: string;
                }[];
                responses: {
                    200: {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    allOf: ({
                                        $ref: string;
                                        type?: undefined;
                                        properties?: undefined;
                                    } | {
                                        type: string;
                                        properties: {
                                            nodes: {
                                                type: string;
                                                items: {
                                                    $ref: string;
                                                };
                                            };
                                        };
                                        $ref?: undefined;
                                    })[];
                                };
                            };
                        };
                    };
                };
            };
        };
        '/workflows:create': {
            post: {
                tags: string[];
                description: string;
                parameters: any[];
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: string;
                                properties: {
                                    title: {
                                        $ref: string;
                                    };
                                    type: {
                                        $ref: string;
                                    };
                                    description: {
                                        $ref: string;
                                    };
                                };
                            };
                        };
                    };
                };
                responses: {
                    200: {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    allOf: {
                                        $ref: string;
                                    }[];
                                };
                            };
                        };
                    };
                };
            };
        };
        '/workflows:update': {
            post: {
                tags: string[];
                description: string;
                parameters: any[];
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: string;
                                properties: {
                                    title: {
                                        $ref: string;
                                    };
                                    enabled: {
                                        $ref: string;
                                    };
                                    description: {
                                        $ref: string;
                                    };
                                    config: {
                                        $ref: string;
                                    };
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
        '/workflows:destroy': {
            post: {
                tags: string[];
                description: string;
                parameters: ({
                    name: string;
                    in: string;
                    description: string;
                    schema: {
                        type: string;
                        description: string;
                        properties?: undefined;
                    };
                } | {
                    name: string;
                    in: string;
                    description: string;
                    schema: {
                        type: string;
                        properties: {
                            key: {
                                type: string;
                                description: string;
                            };
                        };
                        description?: undefined;
                    };
                })[];
                responses: {
                    200: {
                        description: string;
                    };
                };
            };
        };
        '/workflows:revision': {
            post: {
                tags: string[];
                description: string;
                parameters: ({
                    name: string;
                    in: string;
                    description: string;
                    schema: {
                        type: string;
                        description: string;
                        properties?: undefined;
                    };
                } | {
                    name: string;
                    in: string;
                    description: string;
                    schema: {
                        type: string;
                        properties: {
                            key: {
                                type: string;
                                description: string;
                            };
                        };
                        description?: undefined;
                    };
                })[];
                responses: {
                    200: {
                        description: string;
                    };
                };
            };
        };
        '/workflows:trigger': {
            post: {
                tags: string[];
                description: string;
                parameters: {
                    name: string;
                    in: string;
                    description: string;
                    schema: {
                        type: string;
                    };
                }[];
                responses: {
                    202: {
                        description: string;
                    };
                    400: {
                        description: string;
                    };
                };
            };
        };
        '/workflows/{workflowId}/nodes:create': {
            post: {
                tags: string[];
                description: string;
                parameters: any[];
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: string;
                                properties: {
                                    title: {
                                        $ref: string;
                                    };
                                    type: {
                                        $ref: string;
                                    };
                                    upstreamId: {
                                        $ref: string;
                                    };
                                    branchIndex: {
                                        $ref: string;
                                    };
                                };
                            };
                        };
                    };
                };
                responses: {
                    200: {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    allOf: {
                                        $ref: string;
                                    }[];
                                };
                            };
                        };
                    };
                };
            };
        };
        '/flow_nodes:update': {
            post: {
                tags: string[];
                description: string;
                parameters: {
                    name: string;
                    in: string;
                    description: string;
                    schema: {
                        type: string;
                        description: string;
                    };
                }[];
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: string;
                                properties: {
                                    title: {
                                        $ref: string;
                                    };
                                    config: {
                                        $ref: string;
                                    };
                                };
                            };
                        };
                    };
                };
                responses: {
                    200: {
                        description: string;
                    };
                    400: {
                        description: string;
                    };
                };
            };
        };
        '/flow_nodes:destroy': {
            post: {
                tags: string[];
                description: string;
                parameters: {
                    name: string;
                    in: string;
                    description: string;
                    schema: {
                        type: string;
                        description: string;
                    };
                }[];
                responses: {
                    200: {
                        description: string;
                    };
                    400: {
                        description: string;
                    };
                };
            };
        };
        '/executions:list': {
            get: {
                tags: string[];
                description: string;
                parameters: any[];
                responses: {
                    200: {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    type: string;
                                    description: string;
                                    items: {
                                        $ref: string;
                                        type: string;
                                        not: {
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
        '/executions:get': {
            get: {
                tags: string[];
                description: string;
                parameters: {
                    name: string;
                    in: string;
                    description: string;
                    schema: {
                        type: string;
                        description: string;
                    };
                }[];
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
        '/workflowManualTasks:list': {
            get: {
                tags: string[];
                description: string;
                parameters: any[];
                responses: {
                    200: {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    type: string;
                                    description: string;
                                    items: {
                                        $ref: string;
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
        '/workflowManualTasks:get': {
            get: {
                tags: string[];
                description: string;
                parameters: any[];
                responses: {
                    200: {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    allOf: ({
                                        $ref: string;
                                        type?: undefined;
                                        properties?: undefined;
                                    } | {
                                        type: string;
                                        properties: {
                                            execution: {
                                                $ref: string;
                                            };
                                        };
                                        $ref?: undefined;
                                    })[];
                                };
                            };
                        };
                    };
                };
            };
        };
        '/workflowManualTasks:submit': {
            post: {
                tags: string[];
                description: string;
                parameters: {
                    name: string;
                    in: string;
                    description: string;
                    schema: {
                        type: string;
                        description: string;
                    };
                }[];
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: string;
                                properties: {
                                    result: {
                                        type: string;
                                        properties: {
                                            $formKey: {
                                                type: string;
                                            };
                                            _: {
                                                type: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
                responses: {
                    202: {
                        description: string;
                    };
                    400: {
                        description: string;
                    };
                };
            };
        };
    };
    components: {
        schemas: {
            workflow: {
                model: {
                    type: string;
                    description: string;
                    properties: {
                        id: {
                            type: string;
                            description: string;
                        };
                        key: {
                            type: string;
                            description: string;
                        };
                        title: {
                            type: string;
                            description: string;
                        };
                        description: {
                            type: string;
                            description: string;
                        };
                        current: {
                            type: string;
                            description: string;
                        };
                        enabled: {
                            type: string;
                            description: string;
                        };
                        type: {
                            type: string;
                            description: string;
                        };
                        config: {
                            type: string;
                            description: string;
                        };
                        nodes: {
                            type: string;
                            description: string;
                        };
                        executions: {
                            type: string;
                            description: string;
                        };
                        revisions: {
                            type: string;
                            description: string;
                        };
                        executed: {
                            type: string;
                            description: string;
                        };
                        allExecuted: {
                            type: string;
                            description: string;
                        };
                    };
                };
                filterByTk: {
                    name: string;
                    in: string;
                    description: string;
                    schema: {
                        type: string;
                        description: string;
                    };
                };
                filter: {
                    name: string;
                    in: string;
                    description: string;
                    schema: {
                        type: string;
                        properties: {
                            id: {
                                $ref: string;
                            };
                            title: {
                                $ref: string;
                            };
                            type: {
                                $ref: string;
                            };
                            enabled: {
                                $ref: string;
                            };
                            current: {
                                $ref: string;
                            };
                            key: {
                                $ref: string;
                            };
                            executed: {
                                $ref: string;
                            };
                            allExecuted: {
                                $ref: string;
                            };
                        };
                    };
                };
            };
            node: {
                type: string;
                description: string;
                properties: {
                    id: {
                        type: string;
                        description: string;
                    };
                    title: {
                        type: string;
                        description: string;
                    };
                    workflowId: {
                        type: string;
                        description: string;
                    };
                    upstreamId: {
                        type: string;
                        description: string;
                    };
                    upstream: {
                        type: string;
                        description: string;
                        $ref: string;
                    };
                    downstreamId: {
                        type: string;
                        description: string;
                        $ref: string;
                    };
                    downstream: {
                        type: string;
                        description: string;
                        $ref: string;
                    };
                    type: {
                        type: string;
                        description: string;
                    };
                    config: {
                        type: string;
                        description: string;
                    };
                    branchIndex: {
                        type: string;
                        description: string;
                    };
                    branches: {
                        type: string;
                        description: string;
                        items: {
                            $ref: string;
                        };
                    };
                };
            };
            execution: {
                type: string;
                description: string;
                properties: {
                    id: {
                        type: string;
                        description: string;
                    };
                    key: {
                        type: string;
                        description: string;
                    };
                    workflowId: {
                        type: string;
                        description: string;
                    };
                    context: {
                        type: string;
                        description: string;
                    };
                    status: {
                        type: string;
                        description: string;
                    };
                    jobs: {
                        type: string;
                        description: string;
                        items: {
                            $ref: string;
                        };
                    };
                };
            };
            job: {
                type: string;
                description: string;
                properties: {
                    id: {
                        type: string;
                        description: string;
                    };
                    executionId: {
                        type: string;
                        description: string;
                    };
                    nodeId: {
                        type: string;
                        description: string;
                    };
                    status: {
                        type: string;
                        description: string;
                    };
                    result: {
                        type: string;
                        description: string;
                    };
                };
            };
            user_job: {
                type: string;
                description: string;
                properties: {
                    id: {
                        type: string;
                        description: string;
                    };
                    executionId: {
                        type: string;
                        description: string;
                    };
                    nodeId: {
                        type: string;
                        description: string;
                    };
                    workflowId: {
                        type: string;
                        description: string;
                    };
                    userId: {
                        type: string;
                        description: string;
                    };
                    status: {
                        type: string;
                        description: string;
                    };
                    result: {
                        type: string;
                        description: string;
                    };
                };
            };
        };
    };
};
export default _default;
