/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
declare const MobileDateTimePicker: React.ForwardRefExoticComponent<Omit<Partial<any>, "ref"> & React.RefAttributes<unknown>>;
declare const MobileRangePicker: (props: any) => React.JSX.Element;
declare const MobileDateFilterWithPicker: (props: any) => React.JSX.Element;
type ComposedMobileTimePicker = React.FC<any> & {
    RangePicker?: React.FC<any>;
    ReadPretty?: React.FC<any>;
};
declare const MobileTimePicker: ComposedMobileTimePicker;
export { MobileDateTimePicker, MobileRangePicker, MobileDateFilterWithPicker, MobileTimePicker };
