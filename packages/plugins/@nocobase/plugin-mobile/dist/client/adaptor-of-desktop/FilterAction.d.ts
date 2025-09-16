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
 * 为了解决在桌面端配置页面弹窗超出移动端页面范围的问题。
 * 之所以不直接在 mobile-container 中设置 transform，是因为会影响到子页面区块的拖拽功能。
 * @param visible 控制弹窗是否可见
 * @param animationDelay 动画延迟时间，默认300ms
 * @returns
 */
export declare const usePopupContainer: (visible: boolean, animationDelay?: number) => {
    visiblePopup: boolean;
    popupContainerRef: {
        current: HTMLDivElement;
    };
};
