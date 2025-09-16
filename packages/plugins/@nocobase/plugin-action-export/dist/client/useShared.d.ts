export declare const useShared: () => {
    schema: {
        type: string;
        'x-component': string;
        properties: {
            exportSettings: {
                type: string;
                'x-component': string;
                'x-decorator': string;
                items: {
                    type: string;
                    properties: {
                        space: {
                            type: string;
                            'x-component': string;
                            'x-component-props': {
                                className: string;
                            };
                            properties: {
                                sort: {
                                    type: string;
                                    'x-decorator': string;
                                    'x-component': string;
                                };
                                dataIndex: {
                                    type: string;
                                    'x-decorator': string;
                                    'x-component': string;
                                    required: boolean;
                                    'x-component-props': {
                                        fieldNames: {
                                            label: string;
                                            value: string;
                                            children: string;
                                        };
                                        changeOnSelect: boolean;
                                    };
                                    'x-use-component-props': () => {
                                        options: any;
                                    };
                                };
                                title: {
                                    type: string;
                                    'x-decorator': string;
                                    'x-component': string;
                                    'x-component-props': {
                                        placeholder: string;
                                    };
                                };
                                remove: {
                                    type: string;
                                    'x-decorator': string;
                                    'x-component': string;
                                };
                            };
                        };
                    };
                };
                properties: {
                    add: {
                        type: string;
                        title: string;
                        'x-component': string;
                        'x-component-props': {
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
