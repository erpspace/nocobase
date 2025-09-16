/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import Application from './application';
import { QueueEventOptions, QueueMessageOptions } from './event-queue';
export interface BackgroundJobManagerOptions {
    channel?: string;
}
type BackgroundJobEventOptions = Pick<QueueEventOptions, 'process' | 'idle'>;
declare class BackgroundJobManager {
    private app;
    private options;
    static DEFAULT_CHANNEL: string;
    private subscriptions;
    private processing;
    private get channel();
    private onAfterStart;
    private onBeforeStop;
    private process;
    constructor(app: Application, options?: BackgroundJobManagerOptions);
    private get idle();
    /**
     * 订阅指定主题的任务处理器
     * @param options 订阅选项
     */
    subscribe(topic: string, options: BackgroundJobEventOptions): void;
    /**
     * 取消订阅指定主题
     * @param topic 主题名称
     */
    unsubscribe(topic: string): void;
    publish(topic: string, payload: any, options?: QueueMessageOptions): Promise<void>;
}
export { BackgroundJobManager };
export default BackgroundJobManager;
