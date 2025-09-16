/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { ISchema, Schema } from '@formily/json-schema';
export declare function findSchemaByUid(schema: Schema, uid: string): any;
export declare function collectSchemaFirstVirtualUids(schema: Schema): Set<string>;
/**
 * Find a schema in the cache by its UID
 * @param cache The cache object containing schemas
 * @param uid The UID to search for
 * @returns The found schema or null
 */
export declare function findSchemaCache(cache: Record<string, any>, uid: string): any;
/**
 * Find the first virtual schema by UID
 * @param schema The schema to search in
 * @param uid The UID to search for
 * @returns Object containing schema and insertion details, or null if not found
 */
export declare function findFirstVirtualSchema(schema: ISchema, uid: string, wrap?: ISchema): {
    schema: any;
    insertTarget: string;
    insertPosition: string;
} | null;
/**
 * Convert a schema to a create schema format
 * @param schema The schema to convert
 * @returns The converted schema
 */
export declare function convertToCreateSchema(schema: ISchema, skipUids?: string[]): any;
export declare function addToolbarClass(schema: any): void;
export declare function syncExtraTemplateInfo(schema: any, templateInfos: Map<string, any>, savedSchemaUids: Set<string>): void;
/**
 * Get the full schema by merging with template schema
 * @param schema The schema to process
 * @param templateschemacache The template schema cache
 * @param templateInfos The template info cache
 * @returns The full schema
 */
export declare function getFullSchema(schema: any, templateschemacache: Record<string, any>, templateInfos: Map<string, any>, savedSchemaUids?: Set<string>): any;
/**
 * Set x-virtual to false for all virtual schemas
 * @param schema The schema to set
 */
export declare function setToTrueSchema(schema: any): void;
