/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
export declare const mobileComponents: {
    Button: React.ForwardRefExoticComponent<{
        color?: "default" | "warning" | "success" | "primary" | "danger";
        fill?: "outline" | "none" | "solid";
        size?: "small" | "large" | "middle" | "mini";
        block?: boolean;
        loading?: boolean | "auto";
        loadingText?: string;
        loadingIcon?: React.ReactNode;
        disabled?: boolean;
        onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void | Promise<void>;
        type?: "button" | "submit" | "reset";
        shape?: "default" | "rounded" | "rectangular";
        children?: React.ReactNode;
    } & Pick<React.ClassAttributes<HTMLButtonElement> & React.ButtonHTMLAttributes<HTMLButtonElement>, "id" | "onMouseDown" | "onMouseUp" | "onTouchEnd" | "onTouchStart"> & {
        className?: string;
        style?: React.CSSProperties & Partial<Record<"--border-radius" | "--text-color" | "--background-color" | "--border-width" | "--border-style" | "--border-color", string>>;
        tabIndex?: number;
    } & React.AriaAttributes & React.RefAttributes<import("antd-mobile").ButtonRef>>;
    Select: (props: any) => React.JSX.Element;
    DatePicker: {
        (props: any): React.JSX.Element;
        FilterWithPicker(props: any): React.JSX.Element;
        RangePicker: {
            (props: any): React.JSX.Element;
            displayName: string;
        };
    };
    UnixTimestamp: React.ForwardRefExoticComponent<Omit<Partial<any>, "ref"> & React.RefAttributes<unknown>>;
    Modal: React.FC<import("antd-mobile").DialogProps> & {
        show: typeof import("antd-mobile/es/components/dialog/show").show;
        alert: typeof import("antd-mobile/es/components/dialog/alert").alert;
        confirm: typeof import("antd-mobile/es/components/dialog/confirm").confirm;
        clear: typeof import("antd-mobile/es/components/dialog/clear").clear;
    };
    AssociationField: {
        (props: any): React.JSX.Element;
        SubTable: any;
        Nester: any;
        AddNewer: any;
        Selector: any;
        Viewer: any;
        InternalSelect: any;
        ReadPretty: any;
        FileSelector: any;
    };
    TimePicker: (props: any) => React.JSX.Element;
};
export declare const MobilePage: () => React.JSX.Element;
