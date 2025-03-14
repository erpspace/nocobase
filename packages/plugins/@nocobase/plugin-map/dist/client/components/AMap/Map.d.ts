/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import '@amap/amap-jsapi-types';
import React from 'react';
import { MapEditorType } from '../../types';
export interface AMapComponentProps {
    value?: any;
    onChange?: (value: number[]) => void;
    disabled?: boolean;
    mapType: string;
    /**
     * only ReadPretty
     */
    readonly: string;
    zoom: number;
    type: MapEditorType;
    style?: React.CSSProperties;
    overlayCommonOptions?: AMap.PolylineOptions & AMap.PolygonOptions;
    block?: boolean;
}
export interface AMapForwardedRefProps {
    setOverlay: (t: MapEditorType, v: any, o?: AMap.PolylineOptions & AMap.PolygonOptions & AMap.MarkerOptions) => any;
    getOverlay: (t: MapEditorType, v: any, o?: AMap.PolylineOptions & AMap.PolygonOptions & AMap.MarkerOptions) => any;
    createMouseTool: (type: MapEditorType) => void;
    createEditor: (type: MapEditorType) => void;
    executeMouseTool: (type: MapEditorType) => void;
    aMap: any;
    map: AMap.Map;
    editor: () => {
        getTarget: () => AMap.Polygon;
        setTarget: (o: any) => void;
        close: () => void;
        on: (event: string, callback: (e: any) => void) => void;
    };
    mouseTool: () => {
        close: (clear?: boolean) => void;
    };
    overlay: AMap.Polygon;
    errMessage?: string;
}
export declare const AMapComponent: React.ForwardRefExoticComponent<AMapComponentProps & React.RefAttributes<AMapForwardedRefProps>>;
