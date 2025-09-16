/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { PageConfig } from './e2eUtils';
/**
 * 一个空的 group 页面
 */
export declare const groupPageEmpty: PageConfig;
/**
 * 一个空的 link 页面
 */
export declare const linkPage: PageConfig;
/**
 * 一个空的且启用 tabs 的 page 页面
 */
export declare const tabPageEmpty: PageConfig;
/**
 * 1. 一个数据表，且拥有一个对一的关系字段
 * 2. 一个 Table 区块，且基于上面的 collection
 */
export declare const oneEmptyTable: PageConfig;
/**
 * 1. 页面中有一个空的 Form 区块
 */
export declare const oneEmptyForm: PageConfig;
export declare const oneEmptyFormWithActions: PageConfig;
/**
 * 1. 页面中有一个空的 Details 区块
 */
export declare const oneEmptyDetailsBlock: PageConfig;
/**
 * 1. 页面中有一个空的 List 区块
 */
export declare const oneEmptyListBlock: PageConfig;
/**
 * 1. 页面中有一个空的 Grid Card 区块
 */
export declare const oneEmptyGridCardBlock: PageConfig;
/**
 * 1. 页面中有一个空的 Filter Form 区块
 */
export declare const oneEmptyFilterFormBlock: PageConfig;
/**
 * 1. 页面中有一个空的 Filter Collapse 区块
 */
export declare const oneEmptyFilterCollapseBlock: PageConfig;
/**
 * 页面中有一个空的 Table 区块，并且有这些按钮：Add new / Delete / Refresh / Add record / Filter / view / edit / delete / duplicate
 */
export declare const oneEmptyTableBlockWithActions: PageConfig;
/**
 * 页面中有一个 Table 区块，并且有这些按钮：Add new / Delete / Refresh / Add record / Filter / view / edit / delete / duplicate；
 * 1. 其中 Add new 弹窗中有一个新增表单区块；
 * 2. 其中 view 弹窗中有一个详情表单区块；
 * 3. 其中 edit 弹窗中有一个编辑表单区块；
 */
export declare const oneTableBlockWithActionsAndFormBlocks: PageConfig;
/**
 * 一个空的 Table 区块，并且有这些按钮：Bulk edit
 */
export declare const oneEmptyTableBlockWithCustomizeActions: PageConfig;
/**
 * 一个基于 Users 表的 Form 区块，且有一个 Roles 字段，并且是数据选择器模式
 */
export declare const oneFormBlockWithRolesFieldBasedUsers: PageConfig;
/**
 * 一个 Form 区块，包含所有的关系字段，且都是数据选择器模式
 */
export declare const oneFormBlockWithAllAssociationFieldsAndSelectorMode: PageConfig;
/**
 * 页面中有一个详情区块，且有一个名为 toGeneral 的关系字段（m2o），指向 General 表
 */
export declare const oneDetailBlockWithM2oFieldToGeneral: PageConfig;
/**
 * 1. 一个 Table 区块
 * 2. 点击 Add new 有一个 Form 区块
 * 3. 点击 View 有一个 Details 区块
 * 4. 点击 Edit 有一个 Form 区块
 * 5. 所有字段都是 basic 字段
 */
export declare const oneTableBlockWithAddNewAndViewAndEditAndBasicFields: PageConfig;
/**
 * 1. 一个 Table 区块
 * 2. 显示ID和一个整数列
 * 3. 查看详情: email integer number phone
 */
export declare const oneTableBlockWithIntegerAndIDColumn: PageConfig;
/**
 * 1. 一个 Table 区块
 * 2. 点击 Add new 有一个 Form 区块，里面有一个 sub-table 字段
 * 3. 点击 View 有一个 Details 区块，里面有一个 sub-table 字段
 * 4. 点击 Edit 有一个 Form 区块，里面有一个 sub-table 字段
 * 5. sub-table 中的所有字段都是 basic 字段
 */
export declare const oneTableBlockWithAddNewAndViewAndEditAndBasicFieldsAndSubTable: PageConfig;
/**
 * 页面中有一个表格，点击行编辑按钮，弹出一个表单，表单中有一个子表单
 */
export declare const oneTableBlockWithEditAndSubForm: PageConfig;
/**
 * 1. 一个 Table 区块
 * 2. 点击 Add new 有一个 Form 区块
 * 3. 点击 View 有一个 Details 区块
 * 4. 点击 Edit 有一个 Form 区块
 * 5. 所有字段都是 choices 字段
 */
export declare const oneTableBlockWithAddNewAndViewAndEditAndChoicesFields: PageConfig;
/**
 * 1. 一个 Table 区块
 * 2. 点击 Add new 有一个 Form 区块
 * 3. 点击 View 有一个 Details 区块
 * 4. 点击 Edit 有一个 Form 区块
 * 5. 所有字段都是 media 字段
 */
export declare const oneTableBlockWithAddNewAndViewAndEditAndMediaFields: PageConfig;
/**
 * 1. 一个 Table 区块
 * 2. 点击 Add new 有一个 Form 区块
 * 3. 点击 View 有一个 Details 区块
 * 4. 点击 Edit 有一个 Form 区块
 * 5. 所有字段都是 datetime 字段
 */
export declare const oneTableBlockWithAddNewAndViewAndEditAndDatetimeFields: PageConfig;
/**
 * 1. 一个 Table 区块
 * 2. 点击 Add new 有一个 Form 区块
 * 3. 点击 View 有一个 Details 区块
 * 4. 点击 Edit 有一个 Form 区块
 * 5. 所有字段都是 relation 字段
 */
export declare const oneTableBlockWithAddNewAndViewAndEditAndAssociationFields: PageConfig;
/**
 * 页面中有一个 filter form 区块，包含所有关系字段类型的字段
 */
export declare const oneFilterFormBlockWithAllAssociationFields: PageConfig;
/**
 * v1.3.33-beta
 * 页面中有一个 filter form 区块，包含所有关系字段类型的字段
 */
export declare const oneFilterFormBlockWithAllAssociationFieldsV1333Beta: PageConfig;
/**
 * 1. 一个 Table 区块
 * 2. 点击 Add new 有一个 Form 区块
 * 3. 点击 View 有一个 Details 区块
 * 4. 点击 Edit 有一个 Form 区块
 * 5. 所有字段都是 advanced 字段
 */
export declare const oneTableBlockWithAddNewAndViewAndEditAndAdvancedFields: PageConfig;
/**
 * 1. 一个 Table 区块
 * 2. 点击 Add new 有一个 Form 区块
 * 3. 点击 View 有一个 Details 区块
 * 4. 点击 Edit 有一个 Form 区块
 * 5. 所有字段都是 systemInfo 字段
 */
export declare const oneTableBlockWithAddNewAndViewAndEditAndSystemInfoFields: PageConfig;
export declare const oneEmptyTableWithTreeCollection: PageConfig;
export declare const oneEmptyMarkdown: PageConfig;
/**
 * 一个 collapse block 和一个 table block 且它们的数据表相同
 */
export declare const oneCollapseAndOneTableWithSameCollection: PageConfig;
/**
 * 一个包含多层级关系字段的表单区块
 */
export declare const oneFormWithMultiLevelAssociationFields: PageConfig;
/**
 * 一个包含多层级关系字段的子表单区块，并包含在一个表单区块中
 */
export declare const oneSubformWithMultiLevelAssociationFields: PageConfig;
/**
 * 一个包含多层级关系字段的子表单区块，并包含在一个表单区块中，该区块存在于一个编辑弹窗中
 */
export declare const oneTableSubformWithMultiLevelAssociationFields: PageConfig;
/**
 * 一个包含多层级关系字段的子表格区块，并包含在一个表单区块中，该区块存在于一个编辑弹窗中
 */
export declare const oneTableSubtableWithMultiLevelAssociationFields: PageConfig;
/**
 * 一个 table block，在点击 add new 打开的弹窗中，有一个 form block，其文本字段设置了一个使用了 `当前表单` 变量的默认值
 */
export declare const formBlockDefaultValueTemplate: PageConfig;
/**
 * 一个基于 users 表创建的表单区块
 */
export declare const oneFormBlockBasedOnUsers: PageConfig;
/**
 * 一个表单和一个表格，且使用同一个数据表创建
 */
export declare const oneFormAndOneTableWithSameCollection: PageConfig;
/**
 * 一个空页面，且有两个 tab 子页面，用于测试拖拽 tab 标签
 */
export declare const twoTabsPage: {
    pageSchema: {
        'x-uid': string;
        _isJSONSchemaObject: boolean;
        version: string;
        type: string;
        'x-component': string;
        'x-component-props': {
            enablePageTabs: boolean;
        };
        properties: {
            bi8ep3svjee: {
                'x-uid': string;
                _isJSONSchemaObject: boolean;
                version: string;
                type: string;
                'x-component': string;
                'x-initializer': string;
                title: string;
                'x-async': boolean;
                'x-index': number;
            };
            rw91udnzpr3: {
                _isJSONSchemaObject: boolean;
                version: string;
                type: string;
                title: string;
                'x-component': string;
                'x-initializer': string;
                'x-uid': string;
                'x-async': boolean;
                'x-index': number;
            };
        };
        'x-async': boolean;
        'x-index': number;
    };
};
/**
 * 页面中有两个 table block，且它们的数据表相同
 */
export declare const twoTableWithSameCollection: PageConfig;
/**
 * 页面中有两个 table block，且它们的数据表之间相互关联
 */
export declare const twoTableWithAssociationFields: PageConfig;
/**
 * 页面中有两个 table block，且它们的数据表之间通过外键关联
 */
export declare const twoTableWithForeignKey: PageConfig;
/**
 * 一个空的 table block，且基于 users 表创建
 */
export declare const oneEmptyTableBlockBasedOnUsers: {
    pageSchema: {
        _isJSONSchemaObject: boolean;
        version: string;
        type: string;
        'x-component': string;
        properties: {
            '3r0yxum84w2': {
                _isJSONSchemaObject: boolean;
                version: string;
                type: string;
                'x-component': string;
                'x-initializer': string;
                properties: {
                    vduni5v1u2v: {
                        _isJSONSchemaObject: boolean;
                        version: string;
                        type: string;
                        'x-component': string;
                        properties: {
                            qwrauugqc1k: {
                                _isJSONSchemaObject: boolean;
                                version: string;
                                type: string;
                                'x-component': string;
                                properties: {
                                    '92vs3ej14vo': {
                                        _isJSONSchemaObject: boolean;
                                        version: string;
                                        type: string;
                                        'x-decorator': string;
                                        'x-acl-action': string;
                                        'x-decorator-props': {
                                            collection: string;
                                            resource: string;
                                            action: string;
                                            params: {
                                                pageSize: number;
                                            };
                                            rowKey: string;
                                            showIndex: boolean;
                                            dragSort: boolean;
                                            disableTemplate: boolean;
                                        };
                                        'x-designer': string;
                                        'x-component': string;
                                        'x-filter-targets': any[];
                                        properties: {
                                            actions: {
                                                _isJSONSchemaObject: boolean;
                                                version: string;
                                                type: string;
                                                'x-initializer': string;
                                                'x-component': string;
                                                'x-component-props': {
                                                    style: {
                                                        marginBottom: string;
                                                    };
                                                };
                                                'x-uid': string;
                                                'x-async': boolean;
                                                'x-index': number;
                                            };
                                            vlkh4fiq98e: {
                                                _isJSONSchemaObject: boolean;
                                                version: string;
                                                type: string;
                                                'x-initializer': string;
                                                'x-component': string;
                                                'x-component-props': {
                                                    rowKey: string;
                                                    rowSelection: {
                                                        type: string;
                                                    };
                                                    useProps: string;
                                                };
                                                properties: {
                                                    actions: {
                                                        _isJSONSchemaObject: boolean;
                                                        version: string;
                                                        type: string;
                                                        title: string;
                                                        'x-action-column': string;
                                                        'x-decorator': string;
                                                        'x-component': string;
                                                        'x-designer': string;
                                                        'x-initializer': string;
                                                        properties: {
                                                            actions: {
                                                                _isJSONSchemaObject: boolean;
                                                                version: string;
                                                                type: string;
                                                                'x-decorator': string;
                                                                'x-component': string;
                                                                'x-component-props': {
                                                                    split: string;
                                                                };
                                                                'x-uid': string;
                                                                'x-async': boolean;
                                                                'x-index': number;
                                                            };
                                                        };
                                                        'x-uid': string;
                                                        'x-async': boolean;
                                                        'x-index': number;
                                                    };
                                                };
                                                'x-uid': string;
                                                'x-async': boolean;
                                                'x-index': number;
                                            };
                                        };
                                        'x-uid': string;
                                        'x-async': boolean;
                                        'x-index': number;
                                    };
                                };
                                'x-uid': string;
                                'x-async': boolean;
                                'x-index': number;
                            };
                        };
                        'x-uid': string;
                        'x-async': boolean;
                        'x-index': number;
                    };
                };
                'x-uid': string;
                'x-async': boolean;
                'x-index': number;
            };
        };
        'x-uid': string;
        'x-async': boolean;
        'x-index': number;
    };
};
/**
 * 用于测试 table 行的 checkbox
 */
export declare const checkboxForTableRow: {
    collections: {
        name: string;
        title: string;
        fields: {
            name: string;
            interface: string;
        }[];
    }[];
    pageSchema: {
        _isJSONSchemaObject: boolean;
        version: string;
        type: string;
        'x-component': string;
        properties: {
            nrwnyusnbrd: {
                _isJSONSchemaObject: boolean;
                version: string;
                type: string;
                'x-component': string;
                'x-initializer': string;
                properties: {
                    w85tu6tnlfp: {
                        _isJSONSchemaObject: boolean;
                        version: string;
                        type: string;
                        'x-component': string;
                        properties: {
                            q9vljapijwj: {
                                _isJSONSchemaObject: boolean;
                                version: string;
                                type: string;
                                'x-component': string;
                                properties: {
                                    zia3dyel3jr: {
                                        _isJSONSchemaObject: boolean;
                                        version: string;
                                        type: string;
                                        'x-decorator': string;
                                        'x-acl-action': string;
                                        'x-decorator-props': {
                                            collection: string;
                                            resource: string;
                                            action: string;
                                            params: {
                                                pageSize: number;
                                            };
                                            rowKey: string;
                                            showIndex: boolean;
                                            dragSort: boolean;
                                            disableTemplate: boolean;
                                        };
                                        'x-designer': string;
                                        'x-component': string;
                                        'x-filter-targets': any[];
                                        properties: {
                                            actions: {
                                                _isJSONSchemaObject: boolean;
                                                version: string;
                                                type: string;
                                                'x-initializer': string;
                                                'x-component': string;
                                                'x-component-props': {
                                                    style: {
                                                        marginBottom: string;
                                                    };
                                                };
                                                properties: {
                                                    '5210td4a1ms': {
                                                        _isJSONSchemaObject: boolean;
                                                        version: string;
                                                        title: string;
                                                        'x-action': string;
                                                        'x-component': string;
                                                        'x-designer': string;
                                                        'x-decorator': string;
                                                        'x-acl-action-props': {
                                                            skipScopeCheck: boolean;
                                                        };
                                                        'x-component-props': {
                                                            icon: string;
                                                            confirm: {
                                                                title: string;
                                                                content: string;
                                                            };
                                                            useProps: string;
                                                        };
                                                        'x-acl-action': string;
                                                        'x-align': string;
                                                        type: string;
                                                        'x-uid': string;
                                                        'x-async': boolean;
                                                        'x-index': number;
                                                    };
                                                };
                                                'x-uid': string;
                                                'x-async': boolean;
                                                'x-index': number;
                                            };
                                            k88f9zdl4k1: {
                                                _isJSONSchemaObject: boolean;
                                                version: string;
                                                type: string;
                                                'x-initializer': string;
                                                'x-component': string;
                                                'x-component-props': {
                                                    rowKey: string;
                                                    rowSelection: {
                                                        type: string;
                                                    };
                                                    useProps: string;
                                                };
                                                properties: {
                                                    actions: {
                                                        _isJSONSchemaObject: boolean;
                                                        version: string;
                                                        type: string;
                                                        title: string;
                                                        'x-action-column': string;
                                                        'x-decorator': string;
                                                        'x-component': string;
                                                        'x-designer': string;
                                                        'x-initializer': string;
                                                        properties: {
                                                            actions: {
                                                                _isJSONSchemaObject: boolean;
                                                                version: string;
                                                                type: string;
                                                                'x-decorator': string;
                                                                'x-component': string;
                                                                'x-component-props': {
                                                                    split: string;
                                                                };
                                                                'x-uid': string;
                                                                'x-async': boolean;
                                                                'x-index': number;
                                                            };
                                                        };
                                                        'x-uid': string;
                                                        'x-async': boolean;
                                                        'x-index': number;
                                                    };
                                                    wwn0ajwixxl: {
                                                        _isJSONSchemaObject: boolean;
                                                        version: string;
                                                        type: string;
                                                        'x-decorator': string;
                                                        'x-designer': string;
                                                        'x-component': string;
                                                        properties: {
                                                            f_vbrlno0zej9: {
                                                                _isJSONSchemaObject: boolean;
                                                                version: string;
                                                                'x-collection-field': string;
                                                                'x-component': string;
                                                                'x-component-props': {
                                                                    ellipsis: boolean;
                                                                };
                                                                'x-read-pretty': boolean;
                                                                'x-decorator': any;
                                                                'x-decorator-props': {
                                                                    labelStyle: {
                                                                        display: string;
                                                                    };
                                                                };
                                                                'x-uid': string;
                                                                'x-async': boolean;
                                                                'x-index': number;
                                                            };
                                                        };
                                                        'x-uid': string;
                                                        'x-async': boolean;
                                                        'x-index': number;
                                                    };
                                                };
                                                'x-uid': string;
                                                'x-async': boolean;
                                                'x-index': number;
                                            };
                                        };
                                        'x-uid': string;
                                        'x-async': boolean;
                                        'x-index': number;
                                    };
                                };
                                'x-uid': string;
                                'x-async': boolean;
                                'x-index': number;
                            };
                        };
                        'x-uid': string;
                        'x-async': boolean;
                        'x-index': number;
                    };
                };
                'x-uid': string;
                'x-async': boolean;
                'x-index': number;
            };
        };
        'x-uid': string;
        'x-async': boolean;
        'x-index': number;
    };
};
