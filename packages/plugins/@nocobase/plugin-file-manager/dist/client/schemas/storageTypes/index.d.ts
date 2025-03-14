/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare const storageTypes: {
    local: {
        title: string;
        name: string;
        fieldset: {
            title: {
                'x-component': string;
                'x-decorator': string;
            };
            name: {
                'x-component': string;
                'x-decorator': string;
                'x-disabled': string;
                required: boolean;
                default: string;
                description: string;
            };
            baseUrl: {
                'x-component': string;
                'x-decorator': string;
                'x-display': string;
                default: string;
            };
            options: {
                type: string;
                'x-component': string;
                properties: {
                    documentRoot: {
                        title: string;
                        type: string;
                        'x-decorator': string;
                        'x-component': string;
                        'x-display': string;
                        default: string;
                    };
                };
            };
            path: {
                'x-component': string;
                'x-decorator': string;
                'x-component-props': {
                    addonBefore: string;
                };
            };
            rules: {
                type: string;
                'x-component': string;
                properties: {
                    size: {
                        type: string;
                        title: string;
                        description: string;
                        'x-decorator': string;
                        'x-component': string;
                        required: boolean;
                        default: number;
                    };
                    mimetype: {
                        type: string;
                        title: string;
                        description: string;
                        'x-decorator': string;
                        'x-component': string;
                        'x-component-props': {
                            placeholder: string;
                        };
                    };
                };
            };
            default: {
                'x-component': string;
                'x-decorator': string;
                'x-content': string;
            };
            paranoid: {
                'x-component': string;
                'x-decorator': string;
                'x-content': string;
            };
        };
    };
    'ali-oss': {
        title: string;
        name: string;
        fieldset: {
            title: {
                'x-component': string;
                'x-decorator': string;
            };
            name: {
                'x-component': string;
                'x-decorator': string;
                'x-disabled': string;
                required: boolean;
                default: string;
                description: string;
            };
            baseUrl: {
                'x-component': string;
                'x-decorator': string;
                description: string;
            };
            options: {
                type: string;
                'x-component': string;
                properties: {
                    region: {
                        title: string;
                        type: string;
                        'x-decorator': string;
                        'x-component': string;
                        description: string;
                        required: boolean;
                    };
                    accessKeyId: {
                        title: string;
                        type: string;
                        'x-decorator': string;
                        'x-component': string;
                        required: boolean;
                    };
                    accessKeySecret: {
                        title: string;
                        type: string;
                        'x-decorator': string;
                        'x-component': string;
                        'x-component-props': {
                            password: boolean;
                        };
                        required: boolean;
                    };
                    bucket: {
                        title: string;
                        type: string;
                        'x-decorator': string;
                        'x-component': string;
                        required: boolean;
                    };
                    thumbnailRule: {
                        title: string;
                        type: string;
                        'x-decorator': string;
                        'x-component': string;
                        'x-component-props': {
                            placeholder: string;
                        };
                        description: string;
                    };
                };
            };
            path: {
                'x-component': string;
                'x-decorator': string;
                description: string;
            };
            rules: {
                type: string;
                'x-component': string;
                properties: {
                    size: {
                        type: string;
                        title: string;
                        description: string;
                        'x-decorator': string;
                        'x-component': string;
                        required: boolean;
                        default: number;
                    };
                    mimetype: {
                        type: string;
                        title: string;
                        description: string;
                        'x-decorator': string;
                        'x-component': string;
                        'x-component-props': {
                            placeholder: string;
                        };
                    };
                };
            };
            default: {
                'x-component': string;
                'x-decorator': string;
                'x-content': string;
            };
            paranoid: {
                'x-component': string;
                'x-decorator': string;
                'x-content': string;
            };
        };
        thumbnailRuleLink: string;
    };
    s3: {
        title: string;
        name: string;
        fieldset: {
            title: {
                'x-component': string;
                'x-decorator': string;
            };
            name: {
                'x-component': string;
                'x-decorator': string;
                'x-disabled': string;
                required: boolean;
                default: string;
                description: string;
            };
            baseUrl: {
                'x-component': string;
                'x-decorator': string;
                description: string;
            };
            options: {
                type: string;
                'x-component': string;
                properties: {
                    region: {
                        title: string;
                        type: string;
                        'x-decorator': string;
                        'x-component': string;
                        required: boolean;
                    };
                    accessKeyId: {
                        title: string;
                        type: string;
                        'x-decorator': string;
                        'x-component': string;
                        required: boolean;
                    };
                    secretAccessKey: {
                        title: string;
                        type: string;
                        'x-decorator': string;
                        'x-component': string;
                        'x-component-props': {
                            password: boolean;
                        };
                        required: boolean;
                    };
                    bucket: {
                        title: string;
                        type: string;
                        'x-decorator': string;
                        'x-component': string;
                        required: boolean;
                    };
                    endpoint: {
                        title: string;
                        type: string;
                        'x-decorator': string;
                        'x-component': string;
                    };
                };
            };
            path: {
                'x-component': string;
                'x-decorator': string;
                description: string;
            };
            rules: {
                type: string;
                'x-component': string;
                properties: {
                    size: {
                        type: string;
                        title: string;
                        description: string;
                        'x-decorator': string;
                        'x-component': string;
                        required: boolean;
                        default: number;
                    };
                    mimetype: {
                        type: string;
                        title: string;
                        description: string;
                        'x-decorator': string;
                        'x-component': string;
                        'x-component-props': {
                            placeholder: string;
                        };
                    };
                };
            };
            default: {
                'x-component': string;
                'x-decorator': string;
                'x-content': string;
            };
            paranoid: {
                'x-component': string;
                'x-decorator': string;
                'x-content': string;
            };
        };
    };
    'tx-cos': {
        title: string;
        name: string;
        fieldset: {
            title: {
                'x-component': string;
                'x-decorator': string;
            };
            name: {
                'x-component': string;
                'x-decorator': string;
                'x-disabled': string;
                required: boolean;
                default: string;
                description: string;
            };
            baseUrl: {
                'x-component': string;
                'x-decorator': string;
                description: string;
            };
            options: {
                type: string;
                'x-component': string;
                properties: {
                    Region: {
                        title: string;
                        type: string;
                        'x-decorator': string;
                        'x-component': string;
                        required: boolean;
                    };
                    SecretId: {
                        title: string;
                        type: string;
                        'x-decorator': string;
                        'x-component': string;
                        required: boolean;
                    };
                    SecretKey: {
                        title: string;
                        type: string;
                        'x-decorator': string;
                        'x-component': string;
                        'x-component-props': {
                            password: boolean;
                        };
                        required: boolean;
                    };
                    Bucket: {
                        title: string;
                        type: string;
                        'x-decorator': string;
                        'x-component': string;
                        required: boolean;
                    };
                    thumbnailRule: {
                        title: string;
                        type: string;
                        'x-decorator': string;
                        'x-component': string;
                        'x-component-props': {
                            placeholder: string;
                        };
                        description: string;
                    };
                };
            };
            path: {
                'x-component': string;
                'x-decorator': string;
                description: string;
            };
            rules: {
                type: string;
                'x-component': string;
                properties: {
                    size: {
                        type: string;
                        title: string;
                        description: string;
                        'x-decorator': string;
                        'x-component': string;
                        required: boolean;
                        default: number;
                    };
                    mimetype: {
                        type: string;
                        title: string;
                        description: string;
                        'x-decorator': string;
                        'x-component': string;
                        'x-component-props': {
                            placeholder: string;
                        };
                    };
                };
            };
            default: {
                'x-component': string;
                'x-decorator': string;
                'x-content': string;
            };
            paranoid: {
                'x-component': string;
                'x-decorator': string;
                'x-content': string;
            };
        };
        thumbnailRuleLink: string;
    };
};
