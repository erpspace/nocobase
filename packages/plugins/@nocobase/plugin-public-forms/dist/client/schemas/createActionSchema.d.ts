export declare const createActionSchema: {
    type: string;
    'x-component': string;
    title: string;
    'x-align': string;
    'x-component-props': {
        type: string;
        icon: string;
    };
    properties: {
        drawer: {
            type: string;
            'x-component': string;
            title: string;
            'x-decorator': string;
            properties: {
                form: {
                    type: string;
                    properties: {
                        title: {
                            type: string;
                            'x-decorator': string;
                            'x-component': string;
                        };
                        collection: {
                            type: string;
                            'x-decorator': string;
                            'x-component': string;
                        };
                        type: {
                            type: string;
                            'x-decorator': string;
                            title: string;
                            'x-component': string;
                            default: string;
                            enum: string;
                        };
                        description: {
                            type: string;
                            'x-decorator': string;
                            'x-component': string;
                        };
                        password: {
                            type: string;
                            'x-decorator': string;
                            'x-component': string;
                        };
                        enabled: {
                            type: string;
                            'x-decorator': string;
                            'x-component': string;
                            default: boolean;
                        };
                    };
                };
                footer: {
                    type: string;
                    'x-component': string;
                    properties: {
                        submit: {
                            title: string;
                            'x-component': string;
                            'x-use-component-props': string;
                        };
                    };
                };
            };
        };
    };
};
