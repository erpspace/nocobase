import XLSX from 'xlsx';
import { BaseExporter, ExportOptions } from './base-exporter';
type ExportColumn = {
    dataIndex: Array<string>;
    title?: string;
    defaultTitle: string;
};
type XlsxExportOptions = Omit<ExportOptions, 'fields'> & {
    columns: Array<ExportColumn>;
};
export declare class XlsxExporter extends BaseExporter<XlsxExportOptions & {
    fields: Array<Array<string>>;
}> {
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
    private workbook;
    private worksheet;
    private startRowNumber;
    constructor(options: XlsxExportOptions);
    init(ctx?: any): Promise<void>;
    handleRow(row: any, ctx?: any): Promise<void>;
    finalize(): Promise<XLSX.WorkBook>;
    private renderHeaders;
}
export {};
