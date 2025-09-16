/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Registry } from '@nocobase/utils';
import { MetricReader, MeterProvider, View } from '@opentelemetry/sdk-metrics';
import { Resource } from '@opentelemetry/resources';
export type MetricOptions = {
    meterName?: string;
    version?: string;
    readerName?: string | string[];
};
type GetMetricReader = () => MetricReader;
export declare class Metric {
    meterName: string;
    version: string;
    readerName: string | string[];
    readers: Registry<GetMetricReader>;
    provider: MeterProvider;
    views: View[];
    constructor(options?: MetricOptions);
    init(resource: Resource): void;
    registerReader(name: string, reader: GetMetricReader): void;
    getReader(name: string): GetMetricReader;
    addView(...view: View[]): void;
    getMeter(name?: string, version?: string): import("@opentelemetry/api").Meter;
    start(): void;
    shutdown(): Promise<void>;
}
export {};
