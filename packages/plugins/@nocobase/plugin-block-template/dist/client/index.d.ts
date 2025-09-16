/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Plugin } from '@nocobase/client';
import { ISchema } from '@formily/json-schema';
export declare class PluginBlockTemplateClient extends Plugin {
    #private;
    templateInfos: Map<any, any>;
    templateschemacache: {};
    pageBlocks: {};
    savedSchemaUids: Set<string>;
    injectInitializers: string[];
    afterAdd(): Promise<void>;
    beforeLoad(): Promise<void>;
    load(): Promise<void>;
    isInBlockTemplateConfigPage(): boolean;
    setTemplateCache: (schema?: ISchema) => void;
    clearTemplateCache: (templateRootUid: string) => void;
}
export default PluginBlockTemplateClient;
