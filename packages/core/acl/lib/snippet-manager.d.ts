/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export type SnippetOptions = {
    name: string;
    actions: Array<string>;
};
declare class Snippet {
    name: string;
    actions: Array<string>;
    constructor(name: string, actions: Array<string>);
}
export type SnippetGroup = {
    name: string;
    snippets: SnippetOptions[];
};
declare class SnippetManager {
    snippets: Map<string, Snippet>;
    register(snippet: SnippetOptions): void;
    allow(actionPath: string, snippetName: string): boolean;
}
export default SnippetManager;
