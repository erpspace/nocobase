/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Plugin } from '@nocobase/client';
import { ChartGroup } from './chart/group';
declare class PluginDataVisualiztionClient extends Plugin {
    charts: ChartGroup;
    load(): Promise<void>;
}
export default PluginDataVisualiztionClient;
export { Chart } from './chart/chart';
export type { ChartProps, ChartType, RenderProps } from './chart/chart';
export { ChartConfigContext } from './configure';
export { useSetChartSize } from './hooks';
export type { FieldOption } from './hooks';
export type { QueryProps } from './renderer';
