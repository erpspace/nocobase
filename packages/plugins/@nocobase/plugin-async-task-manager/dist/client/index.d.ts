import { Plugin } from '@nocobase/client';
import { TaskResultRendererManager } from './TaskResultRendererManager';
export declare class PluginAsyncExportClient extends Plugin {
    taskResultRendererManager: TaskResultRendererManager;
    load(): Promise<void>;
}
export default PluginAsyncExportClient;
