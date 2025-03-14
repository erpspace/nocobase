/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
/// <reference types="google.maps" />
import React from 'react';
import { MapEditorType } from '../../types';
export type OverlayOptions = google.maps.PolygonOptions & google.maps.MarkerOptions & google.maps.PolylineOptions;
export declare const getDrawingMode: (type: MapEditorType) => "polygon" | "circle" | "marker" | "polyline";
export interface GoogleMapsComponentProps {
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
    overlayCommonOptions?: OverlayOptions;
    block?: boolean;
}
export interface GoogleMapForwardedRefProps {
    setOverlay: (t: MapEditorType, v: any, o?: OverlayOptions) => google.maps.MVCObject;
    getOverlay: (t: MapEditorType, v: any, o?: OverlayOptions) => google.maps.MVCObject;
    setFitView: (overlays: google.maps.MVCObject[]) => void;
    createDraw: (onlyCreate?: boolean, additionalOptions?: OverlayOptions) => any;
    map: google.maps.Map;
    overlay: google.maps.MVCObject;
    drawingManager: google.maps.drawing.DrawingManager;
    errMessage?: string;
}
export declare const GoogleMapsComponent: React.ForwardRefExoticComponent<GoogleMapsComponentProps & React.RefAttributes<GoogleMapForwardedRefProps>>;
