import { Plugin } from '@nocobase/server';
export declare class PluginAsyncExportServer extends Plugin {
    private progressThrottles;
    afterAdd(): Promise<void>;
    beforeLoad(): Promise<void>;
    getThrottledProgressEmitter(taskId: string, userId: string): Function;
    load(): Promise<void>;
}
export default PluginAsyncExportServer;
