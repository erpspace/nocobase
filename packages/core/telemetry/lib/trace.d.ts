/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Registry } from '@nocobase/utils';
import { SpanProcessor } from '@opentelemetry/sdk-trace-base';
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { Resource } from '@opentelemetry/resources';
export type TraceOptions = {
    tracerName?: string;
    version?: string;
    processorName?: string | string[];
};
type GetSpanProcessor = () => SpanProcessor;
export declare class Trace {
    processorName: string | string[];
    processors: Registry<GetSpanProcessor>;
    tracerName: string;
    version: string;
    provider: NodeTracerProvider;
    constructor(options?: TraceOptions);
    init(resource: Resource): void;
    registerProcessor(name: string, processor: GetSpanProcessor): void;
    getProcessor(name: string): GetSpanProcessor;
    getTracer(name?: string, version?: string): import("@opentelemetry/sdk-trace-base").Tracer;
    start(): void;
    shutdown(): Promise<void>;
}
export {};
