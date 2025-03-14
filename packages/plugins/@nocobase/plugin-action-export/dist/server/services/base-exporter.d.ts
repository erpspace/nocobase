/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
/// <reference types="node" />
import { FindOptions, ICollection, ICollectionManager, IField, IModel } from '@nocobase/data-source-manager';
import EventEmitter from 'events';
export type ExportOptions = {
    collectionManager: ICollectionManager;
    collection: ICollection;
    repository?: any;
    fields: Array<Array<string>>;
    findOptions?: FindOptions;
    chunkSize?: number;
    limit?: number;
};
declare abstract class BaseExporter<T extends ExportOptions = ExportOptions> extends EventEmitter {
    protected options: T;
    /**
     * You can adjust the maximum number of exported rows based on business needs and system
     * available resources. However, please note that you need to fully understand the risks
     * after the modification. Increasing the maximum number of rows that can be exported may
     * increase system resource usage, leading to increased processing delays for other
     * requests, or even server processes being recycled by the operating system.
     *
     * 您可以根据业务需求和系统可用资源等参数，调整最大导出数量的限制。但请注意，您需要充分了解修改之后的风险，
     * 增加最大可导出的行数可能会导致系统资源占用率升高，导致其他请求处理延迟增加、无法处理、甚至
     * 服务端进程被操作系统回收等问题。
     */
    protected limit: number;
    protected constructor(options: T);
    abstract init(ctx?: any): Promise<void>;
    abstract finalize(): Promise<any>;
    abstract handleRow(row: any, ctx?: any): Promise<void>;
    run(ctx?: any): Promise<any>;
    protected getAppendOptionsFromFields(): string[];
    protected getFindOptions(): any;
    protected findFieldByDataIndex(dataIndex: Array<string>): IField;
    protected renderRawValue(value: any): any;
    protected getFieldRenderer(field?: IField, ctx?: any): (value: any) => any;
    protected formatValue(rowData: IModel, dataIndex: Array<string>, ctx?: any): any;
    generateOutputPath(prefix?: string, ext?: string, destination?: string): string;
}
export { BaseExporter };
