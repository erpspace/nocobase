export declare const publicFormsCollection: {
    name: string;
    filterTargetKey: string;
    fields: ({
        type: string;
        name: string;
        interface: string;
        uiSchema: {
            type: string;
            title: string;
            required: boolean;
            'x-component': string;
            enum?: undefined;
            'x-component-props'?: undefined;
            default?: undefined;
        };
    } | {
        type: string;
        name: string;
        interface: string;
        uiSchema: {
            type: string;
            title: string;
            'x-component': string;
            required?: undefined;
            enum?: undefined;
            'x-component-props'?: undefined;
            default?: undefined;
        };
    } | {
        type: string;
        name: string;
        interface: string;
        uiSchema: {
            type: string;
            title: string;
            'x-component': string;
            enum: string;
            required?: undefined;
            'x-component-props'?: undefined;
            default?: undefined;
        };
    } | {
        type: string;
        name: string;
        interface: string;
        uiSchema: {
            type: string;
            title: string;
            'x-component': string;
            'x-component-props': {
                autocomplete: string;
                password: boolean;
            };
            required?: undefined;
            enum?: undefined;
            default?: undefined;
        };
    } | {
        type: string;
        name: string;
        interface: string;
        uiSchema: {
            type: string;
            title: string;
            'x-component': string;
            default: boolean;
            required?: undefined;
            enum?: undefined;
            'x-component-props'?: undefined;
        };
    })[];
};
