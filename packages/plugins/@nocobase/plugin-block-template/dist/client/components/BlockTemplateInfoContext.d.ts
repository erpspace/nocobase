/// <reference types="react" />
interface BlockTemplateInfo {
    uid?: string;
    key?: string;
    title?: string;
    description?: string;
    configured?: boolean;
}
export declare const BlockTemplateInfoContext: import("react").Context<BlockTemplateInfo>;
export declare const useBlockTemplateInfo: () => BlockTemplateInfo;
export {};
