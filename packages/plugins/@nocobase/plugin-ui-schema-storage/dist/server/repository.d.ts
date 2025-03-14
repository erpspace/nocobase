/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Cache } from '@nocobase/cache';
import { Repository, Transaction, Transactionable } from '@nocobase/database';
import { ChildOptions, SchemaNode } from './dao/ui_schema_node_dao';
export interface GetJsonSchemaOptions {
    includeAsyncNode?: boolean;
    readFromCache?: boolean;
    transaction?: Transaction;
}
export interface GetPropertiesOptions {
    readFromCache?: boolean;
    transaction?: Transaction;
}
type BreakRemoveOnType = {
    [key: string]: any;
};
export interface removeParentOptions extends Transactionable {
    removeParentsIfNoChildren?: boolean;
    breakRemoveOn?: BreakRemoveOnType;
}
interface InsertAdjacentOptions extends removeParentOptions {
    wrap?: any;
}
export declare class UiSchemaRepository extends Repository {
    cache: Cache;
    get uiSchemasTableName(): any;
    get uiSchemaTreePathTableName(): any;
    static schemaToSingleNodes(schema: any, carry?: SchemaNode[], childOptions?: ChildOptions): SchemaNode[];
    setCache(cache: Cache): void;
    /**
     * clear cache with xUid which in uiSchemaTreePath's Path
     * @param {string} xUid
     * @param {Transaction} transaction
     * @returns {Promise<void>}
     */
    clearXUidPathCache(xUid: string, transaction: Transaction): Promise<void>;
    tableNameAdapter(tableName: any): any;
    sqlAdapter(sql: string): string;
    getProperties(uid: string, options?: GetPropertiesOptions): Promise<Partial<{
        "x-uid": any;
        "x-async": boolean;
    }>>;
    getParentJsonSchema(uid: string, options?: GetJsonSchemaOptions): Promise<any>;
    getParentProperty(uid: string, options?: GetPropertiesOptions): Promise<any>;
    getJsonSchema(uid: string, options?: GetJsonSchemaOptions): Promise<any>;
    nodesToSchema(nodes: any, rootUid: any): {
        "x-uid": any;
        "x-async": boolean;
    };
    clearAncestor(uid: string, options?: Transactionable): Promise<void>;
    patch(newSchema: any, options?: any): Promise<void>;
    initializeActionContext(newSchema: any, options?: any): Promise<void>;
    batchPatch(schemas: any[], options?: any): Promise<void>;
    removeEmptyParents(options: Transactionable & {
        uid: string;
        breakRemoveOn?: BreakRemoveOnType;
    }): Promise<void>;
    recursivelyRemoveIfNoChildren(options: Transactionable & {
        uid: string;
        breakRemoveOn?: BreakRemoveOnType;
    }): Promise<void>;
    remove(uid: string, options?: Transactionable & removeParentOptions): Promise<void>;
    insertAdjacent(position: 'beforeBegin' | 'afterBegin' | 'beforeEnd' | 'afterEnd', target: string, schema: any, options?: InsertAdjacentOptions): Promise<any>;
    duplicate(uid: string, options?: Transactionable): Promise<any>;
    insert(schema: any, options?: Transactionable): Promise<any>;
    insertNewSchema(schema: any, options?: Transactionable & {
        returnNode?: boolean;
    }): Promise<any>;
    insertSingleNode(schema: SchemaNode, options: Transactionable & removeParentOptions): Promise<any>;
    protected updateNode(uid: string, schema: any, transaction?: Transaction): Promise<void>;
    protected childrenCount(uid: any, transaction: any): Promise<number>;
    protected isLeafNode(uid: any, transaction: any): Promise<boolean>;
    protected findParentUid(uid: any, transaction?: any): Promise<string>;
    protected findNodeSchemaWithParent(uid: any, transaction: any): Promise<{
        parentUid: string;
        schema: any;
    }>;
    protected isSingleChild(uid: any, transaction: any): Promise<any>;
    protected insertBeside(targetUid: string, schema: any, side: 'before' | 'after', options?: InsertAdjacentOptions): Promise<any>;
    protected insertInner(targetUid: string, schema: any, position: 'first' | 'last', options?: InsertAdjacentOptions): Promise<any>;
    protected insertAfterBegin(targetUid: string, schema: any, options?: InsertAdjacentOptions): Promise<any>;
    protected insertBeforeEnd(targetUid: string, schema: any, options?: InsertAdjacentOptions): Promise<any>;
    protected insertBeforeBegin(targetUid: string, schema: any, options?: InsertAdjacentOptions): Promise<any>;
    protected insertAfterEnd(targetUid: string, schema: any, options?: InsertAdjacentOptions): Promise<any>;
    protected insertNodes(nodes: SchemaNode[], options?: Transactionable): Promise<any[]>;
    private doGetProperties;
    private doGetJsonSchema;
    private ignoreSchemaProperties;
    private breakOnMatched;
    private schemaExists;
    private regenerateUid;
    private insertSchemaRecord;
    private prepareSingleNodeForInsert;
}
export default UiSchemaRepository;
