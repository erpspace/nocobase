/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Channel } from '../../types';
export type ChannelStatus = 'all' | 'read' | 'unread';
export declare enum InappChannelStatusEnum {
    all = "all",
    read = "read",
    unread = "unread"
}
export declare const channelMapObs: {
    value: Record<string, Channel>;
};
export declare const isFetchingChannelsObs: {
    value: boolean;
};
export declare const channelCountObs: {
    value: number;
};
export declare const channelStatusFilterObs: {
    value: ChannelStatus;
};
export declare const channelListObs: {
    value: Channel[];
};
export declare const showChannelLoadingMoreObs: {
    value: boolean;
};
export declare const selectedChannelNameObs: {
    value: string | null;
};
export declare const selectedChannelObs: {
    value: Channel;
};
export declare const fetchChannels: (params: any) => Promise<void>;
