/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Page } from '@playwright/test';
import { defineConfig } from './defineConfig';
export * from '@playwright/test';
export { defineConfig };
export interface CollectionSetting {
    name: string;
    title?: string;
    titleField?: string;
    /**
     * @default 'general'
     */
    template?: string;
    /**
     * @default true
     */
    logging?: boolean;
    /**
     * Generate ID field automatically
     * @default true
     */
    autoGenId?: boolean;
    /**
     * Store the creation user of each record
     * @default true
     */
    createdBy?: boolean;
    /**
     * Store the last update user of each record
     * @default true
     */
    updatedBy?: boolean;
    /**
     * Store the creation time of each record
     * @default true
     */
    createdAt?: boolean;
    /**
     * Store the last update time of each record
     * @default true
     */
    updatedAt?: boolean;
    /**
     * Records can be sorted
     * @default true
     */
    sortable?: boolean | string;
    /**
     * @default false
     */
    inherit?: boolean;
    inherits?: string[];
    category?: any[];
    hidden?: boolean;
    description?: string;
    view?: boolean;
    key?: string;
    fields?: Array<{
        interface: string;
        type?: string;
        name?: string;
        unique?: boolean;
        uiSchema?: {
            type?: string;
            title?: string;
            required?: boolean;
            'x-component'?: string;
            'x-read-pretty'?: boolean;
            'x-validator'?: any;
            'x-component-props'?: Record<string, any>;
            [key: string]: any;
        };
        field?: string;
        target?: string;
        targetKey?: string;
        foreignKey?: string;
        allowNull?: boolean;
        autoIncrement?: boolean;
        primaryKey?: boolean;
        key?: string;
        description?: string;
        collectionName?: string;
        parentKey?: any;
        reverseKey?: any;
        [key: string]: any;
    }>;
}
interface AclActionsSetting {
    name: string;
    fields?: any[];
    scope?: any;
}
interface AclResourcesSetting {
    name: string;
    usingActionsConfig: boolean;
    actions?: AclActionsSetting[];
}
interface AclRoleSetting {
    name?: string;
    title?: string;
    /**
     * @default true
     */
    allowNewMenu?: boolean;
    snippets?: string[];
    strategy?: any;
    resources?: AclResourcesSetting[];
    /**
     * @default false
     */
    default?: boolean;
    key?: string;
    desktopRoutes?: number[];
    dataSourceKey?: string;
}
interface DatabaseSetting {
    database: string;
    host: string;
    port: string;
    schema?: string;
    username?: string;
    password?: string;
}
interface DataSourceSetting {
    key: string;
    displayName: string;
    type: string;
    options: DatabaseSetting;
    enabled?: boolean;
}
export interface PageConfig {
    /**
     * 页面类型
     * @default 'page'
     */
    type?: 'group' | 'page' | 'link';
    /**
     * type 为 link 时，表示跳转的链接
     */
    url?: string;
    /**
     * 用户可见的页面名称
     * @default uid()
     */
    name?: string;
    /**
     * 页面的基础路径
     * @default '/admin/'
     */
    basePath?: string;
    /**
     * 页面数据表的配置
     * @default undefined
     */
    collections?: CollectionSetting[];
    /**
     * @deprecate 在菜单被重构之后，没有办法直接复制完整的页面 Schema 了。所以这个选项不推荐使用了。
     * 推荐使用 tabSchema，复制一个页面 tab 的 Schema 传给 tabSchema。
     *
     * 页面整体的 Schema
     * @default undefined
     */
    pageSchema?: any;
    /**
     * 页面 Tab 的 Schema。当 pageSchema 和 tabSchema 都存在时，最终显示的会是 tabSchema 的内容
     */
    tabSchema?: any;
    /** 如果为 true 则表示不会更改 PageSchema 的 uid */
    keepUid?: boolean;
    /** 在 URL 中的 uid，例如：/admin/0ig6xhe03u2 */
    pageUid?: string;
}
export interface MobilePageConfig extends Omit<PageConfig, 'type'> {
    type?: 'page' | 'link';
    /**
     * 页面的基础路径
     * @default '/m/'
     */
    basePath?: string;
}
interface ExtendUtils {
    page?: Page;
    /**
     * 根据配置，生成一个 NocoBase 的页面
     * @param pageConfig 页面配置
     * @returns
     */
    mockPage: (pageConfig?: PageConfig) => NocoPage;
    /**
     * 根据配置，生成一个移动端 NocoBase 的页面
     * @param pageConfig 页面配置
     * @returns
     */
    mockMobilePage: (pageConfig?: MobilePageConfig) => NocoMobilePage;
    /**
     * 根据配置，生成一个需要手动销毁的 NocoPage 页面
     * @param pageConfig
     * @returns
     */
    mockManualDestroyPage: (pageConfig?: PageConfig) => NocoPage;
    /**
     * 根据配置，生成多个 collections
     * @param collectionSettings
     * @returns 返回一个 destroy 方法，用于销毁创建的 collections
     */
    mockCollections: (collectionSettings: CollectionSetting[]) => Promise<any>;
    /**
     * 根据配置，生成一个 collection
     * @param collectionSetting
     * @returns 返回一个 destroy 方法，用于销毁创建的 collection
     */
    mockCollection: (collectionSetting: CollectionSetting) => Promise<any>;
    /**
     * 自动生成一条对应 collection 的数据
     * @returns 返回一条生成的数据
     */
    mockRecord: {
        /**
         * @param collectionName 数据表名称
         * @param data 自定义的数据，缺失时会生成随机数据
         * @param maxDepth - 生成的数据的最大深度，默认为 1，当想生成多层级数据时可以设置一个较高的值
         */
        <T = any>(collectionName: string, data?: any, maxDepth?: number): Promise<T>;
        /**
         * @param collectionName 数据表名称
         * @param maxDepth - 生成的数据的最大深度，默认为 1，当想生成多层级数据时可以设置一个较高的值
         */
        <T = any>(collectionName: string, maxDepth?: number): Promise<T>;
    };
    /**
     * 自动生成多条对应 collection 的数据
     */
    mockRecords: {
        /**
         * @param collectionName - 数据表名称
         * @param count - 生成的数据条数
         * @param maxDepth - 生成的数据的最大深度，默认为 1，当想生成多层级数据时可以设置一个较高的值
         */
        <T = any>(collectionName: string, count?: number, maxDepth?: number): Promise<T[]>;
        /**
         * @param collectionName - 数据表名称
         * @param data - 指定生成的数据
         * @param maxDepth - 生成的数据的最大深度，默认为 1，当想生成多层级数据时可以设置一个较高的值
         */
        <T = any>(collectionName: string, data?: any[], maxDepth?: number): Promise<T[]>;
    };
    /**
     * 该方法已弃用，请使用 mockCollections
     * @deprecated
     * @param collectionSettings
     * @returns
     */
    createCollections: (collectionSettings: CollectionSetting | CollectionSetting[]) => Promise<void>;
    /**
     * 根据页面 title 删除对应的页面
     * @param pageName 显示在页面菜单中的名称
     * @returns
     */
    deletePage: (pageName: string) => Promise<void>;
    /**
     * 生成一个新的角色，并和admin关联上
     */
    mockRole: <T = any>(roleSetting: AclRoleSetting) => Promise<T>;
    /**
     * 更新角色权限配置
     */
    updateRole: <T = any>(roleSetting: AclRoleSetting) => Promise<T>;
    /**
     * 创建一个外部数据源（pg）
     */
    mockExternalDataSource: <T = any>(DataSourceSetting: DataSourceSetting) => Promise<T>;
    /**
     * 删除外部数据源
     * @param key 外部数据源key
     */
    destoryExternalDataSource: <T = any>(key: string) => Promise<T>;
    /**
     * 清空区块模板，该方法应该放到测试用例开始的位置（放在末尾的话，如果测试报错会导致模板不会被清空）
     */
    clearBlockTemplates: ({ immediate, }?: {
        /**
         * 是否立即清空，默认为 false。如果为 true，则会立即清空，否则会等到测试用例结束后再清空
         */
        immediate: boolean;
    }) => Promise<void>;
}
export declare class NocoPage {
    protected options?: PageConfig;
    protected page?: Page;
    protected url: string;
    protected uid: string | undefined;
    protected desktopRouteId: number | undefined;
    protected collectionsName: string[] | undefined;
    protected _waitForInit: Promise<void>;
    constructor(options?: PageConfig, page?: Page);
    init(): Promise<void>;
    goto(): Promise<void>;
    getUrl(): Promise<string>;
    getUid(): Promise<string>;
    getDesktopRouteId(): Promise<number>;
    /**
     * If you are using mockRecords, then you need to use this method.
     * Wait until the mockRecords create the records successfully before navigating to the page.
     * @param this
     * @returns
     */
    waitForInit(this: NocoPage): Promise<NocoPage>;
    destroy(): Promise<void>;
}
export declare class NocoMobilePage extends NocoPage {
    protected options?: MobilePageConfig;
    protected page?: Page;
    protected mobileRouteId: number;
    protected title: string;
    constructor(options?: MobilePageConfig, page?: Page);
    getTitle(): string;
    init(): Promise<void>;
    mobileDestroy(): Promise<void>;
}
export declare const test: import("@playwright/test").TestType<import("@playwright/test").PlaywrightTestArgs & import("@playwright/test").PlaywrightTestOptions & ExtendUtils, import("@playwright/test").PlaywrightWorkerArgs & import("@playwright/test").PlaywrightWorkerOptions> & {
    /** 只运行在 postgres 数据库中 */
    pgOnly: import("@playwright/test").TestType<import("@playwright/test").PlaywrightTestArgs & import("@playwright/test").PlaywrightTestOptions & ExtendUtils, import("@playwright/test").PlaywrightWorkerArgs & import("@playwright/test").PlaywrightWorkerOptions> | {
        (title: string, body: (args: import("@playwright/test").PlaywrightTestArgs & import("@playwright/test").PlaywrightTestOptions & ExtendUtils & import("@playwright/test").PlaywrightWorkerArgs & import("@playwright/test").PlaywrightWorkerOptions, testInfo: import("@playwright/test").TestInfo) => void | Promise<void>): void;
        (title: string, details: import("@playwright/test").TestDetails, body: (args: import("@playwright/test").PlaywrightTestArgs & import("@playwright/test").PlaywrightTestOptions & ExtendUtils & import("@playwright/test").PlaywrightWorkerArgs & import("@playwright/test").PlaywrightWorkerOptions, testInfo: import("@playwright/test").TestInfo) => void | Promise<void>): void;
        (): void;
        (condition: boolean, description?: string): void;
        (callback: (args: import("@playwright/test").PlaywrightTestArgs & import("@playwright/test").PlaywrightTestOptions & ExtendUtils & import("@playwright/test").PlaywrightWorkerArgs & import("@playwright/test").PlaywrightWorkerOptions) => boolean, description?: string): void;
    };
};
export declare const removeAllMobileRoutes: () => Promise<void>;
/**
 * 将数据表中 mock 出来的 records 删除掉
 * @param collectionName
 * @param records
 */
export declare const deleteRecords: (collectionName: string, filter: any) => Promise<void>;
/**
 * 删除一些不需要的字段，如 key
 * @param collectionSettings
 * @returns
 */
export declare const omitSomeFields: (collectionSettings: CollectionSetting[]) => any[];
interface ExpectSettingsMenuParams {
    showMenu: () => Promise<void>;
    supportedOptions: string[];
    page: Page;
    unsupportedOptions?: string[];
}
/**
 * 辅助断言 SchemaSettings 的菜单项是否存在
 * @param param0
 */
export declare function expectSettingsMenu({ showMenu, supportedOptions, page, unsupportedOptions, }: ExpectSettingsMenuParams): Promise<void>;
/**
 * 辅助断言 Initializer 的菜单项是否存在
 * @param param0
 */
export declare function expectInitializerMenu({ showMenu, supportedOptions, page, expectValue, }: {
    showMenu: () => Promise<void>;
    supportedOptions: string[];
    page: Page;
    expectValue?: () => Promise<void>;
}): Promise<void>;
/**
 * 用于辅助在 page 中创建区块
 * @param page
 * @param name
 */
export declare const createBlockInPage: (page: Page, name: string) => Promise<void>;
export declare const mockUserRecordsWithoutDepartments: (mockRecords: ExtendUtils['mockRecords'], count: number) => Promise<any[]>;
/**
 * 用来辅助断言是否支持某些变量
 * @param page
 * @param variables
 */
export declare function expectSupportedVariables(page: Page, variables: string[]): Promise<void>;
