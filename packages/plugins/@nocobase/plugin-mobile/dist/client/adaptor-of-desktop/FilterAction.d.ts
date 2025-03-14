/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
export declare const FilterAction: React.FunctionComponent<any>;
/**
 * adapt Filter.Action to mobile
 */
export declare const useToAdaptFilterActionToMobile: () => void;
/**
 * 之所以不直接在 mobile-container 中设置 transform，是因为会影响到子页面区块的拖拽功能。详见：https://nocobase.height.app/T-4959
 * @param visible
 * @returns
 */
export declare const usePopupContainer: (visible: boolean) => {
    visiblePopup: boolean;
    popupContainerRef: React.MutableRefObject<HTMLDivElement>;
};
