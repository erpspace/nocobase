/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import lodash from 'lodash';
import { CollectionOptions } from '@nocobase/client';
export declare const useGCMTranslation: () => import("react-i18next").UseTranslationResponse<"graph-collection-manager", undefined>;
export declare const getInheritCollections: (collections: any, name: any) => any[];
export declare const getChildrenCollections: (collections: any, name: any) => any[];
export declare const formatData: (data: any) => {
    nodesData: any;
    edgesData: any[];
    inheritEdges: any[];
};
export declare const formatPortData: (ports: any) => lodash.Dictionary<any[]>;
export declare const formatInheritEdgeData: (collections: any) => any[];
export declare const getDiffNode: (newNodes: any, oldNodes: any) => any[];
export declare const getDiffEdge: (newEdges: any, oldEdges: any) => any[];
/**
 * 所有的 getPopupContainer 都需要保证返回的是唯一的 div。React 18 concurrent 下会反复调用该方法
 * 参考：https://ant.design/docs/react/migration-v5-cn#%E5%8D%87%E7%BA%A7%E5%87%86%E5%A4%87
 */
export declare const getPopupContainer: () => any;
export declare const cleanGraphContainer: () => void;
export declare const collection: CollectionOptions;
