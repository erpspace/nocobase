/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

"use strict";(self.webpackChunk_nocobase_plugin_public_forms=self.webpackChunk_nocobase_plugin_public_forms||[]).push([["592"],{8097:function(e,t,o){o.r(t),o.d(t,{AdminPublicFormList:function(){return y}});var n=o("3772"),r=o("8156"),i=o.n(r),p=o("7712"),c=o("6903"),l={name:"publicForms",filterTargetKey:"key",fields:[{type:"string",name:"title",interface:"input",uiSchema:{type:"string",title:"{{t('Title')}}",required:!0,"x-component":"Input"}},{type:"text",name:"description",interface:"textarea",uiSchema:{type:"string",title:"{{t('Description')}}","x-component":"Input.TextArea"}},{type:"string",name:"type",interface:"radioGroup",uiSchema:{type:"string",title:'{{t("Type",{ns:"public-forms"})}}',"x-component":"Radio.Group",enum:"{{ formTypes }}"}},{type:"string",name:"collection",interface:"collection",uiSchema:{type:"string",title:"{{t('Collection')}}",required:!0,"x-component":"DataSourceCollectionCascader"}},{type:"password",name:"password",interface:"password",uiSchema:{type:"string",title:"{{t('Password')}}","x-component":"TextAreaWithGlobalScope","x-component-props":{autocomplete:"new-password",password:!0}}},{type:"boolean",name:"enabled",interface:"checkbox",uiSchema:{type:"string",title:'{{t("Enable form",{ns:"'.concat(c.A7,'"})}}'),"x-component":"Checkbox",default:!0}}]},s=o("4163"),m=o("8875"),a=o("6128"),d={type:"void","x-component":"Action",title:'{{t("Add New", { ns: "'.concat(c.A7,'" })}}'),"x-align":"right","x-component-props":{type:"primary",icon:"PlusOutlined"},properties:{drawer:{type:"void","x-component":"Action.Drawer",title:"{{t('Add New')}}","x-decorator":"Form",properties:{form:{type:"void",properties:{title:{type:"string","x-decorator":"FormItem","x-component":"CollectionField"},collection:{type:"string","x-decorator":"FormItem","x-component":"CollectionField"},type:{type:"string","x-decorator":"FormItem",title:'{{t("Type",{ns:"public-forms"})}}',"x-component":"CollectionField",default:"form",enum:"{{ formTypes }}"},description:{type:"string","x-decorator":"FormItem","x-component":"CollectionField"},password:{type:"string","x-decorator":"FormItem","x-component":"CollectionField"},enabled:{type:"string","x-decorator":"FormItem","x-component":"CollectionField",default:!0}}},footer:{type:"void","x-component":"Action.Drawer.Footer",properties:{submit:{title:"Submit","x-component":"Action","x-use-component-props":"useSubmitActionProps"}}}}}}},u={type:"void",name:(0,m.uid)(),"x-component":"CardItem","x-decorator":"TableBlockProvider","x-decorator-props":{collection:l.name,action:"list",params:{sort:"-createdAt",appends:["createdBy","updatedBy"]},showIndex:!0,dragSort:!1,rowKey:"key"},properties:{actions:{type:"void","x-component":"ActionBar","x-component-props":{style:{marginBottom:20}},properties:{filter:{type:"void",title:'{{ t("Filter") }}',default:{$and:[{title:{$includes:""}}]},"x-action":"filter","x-component":"Filter.Action","x-use-component-props":"useFilterActionProps","x-component-props":{icon:"FilterOutlined"},"x-align":"left"},refresh:{type:"void",title:'{{ t("Refresh") }}',"x-component":"Action","x-use-component-props":"useRefreshActionProps","x-component-props":{icon:"ReloadOutlined"}},destroy:{title:'{{ t("Delete") }}',"x-action":"destroy","x-component":"Action","x-use-component-props":"useBulkDestroyActionProps","x-component-props":{icon:"DeleteOutlined",confirm:{title:"{{t('Delete record')}}",content:"{{t('Are you sure you want to delete it?')}}"}}},createActionSchema:d}},table:{type:"array","x-component":"TableV2","x-use-component-props":"useTableBlockProps","x-component-props":{rowKey:l.filterTargetKey,rowSelection:{type:"checkbox"}},properties:{title:{type:"void",title:'{{ t("Title") }}',"x-component":"TableV2.Column","x-component-props":{width:170},properties:{title:{type:"string","x-component":"CollectionField","x-pattern":"readPretty"}}},collection:{type:"void",title:'{{ t("Collection") }}',"x-component":"TableV2.Column","x-component-props":{width:160},properties:{collection:{type:"string","x-component":"CollectionField","x-pattern":"readPretty"}}},column2:{type:"void",title:'{{t("Type", { ns: "'.concat(c.A7,'" })}}'),"x-component":"TableV2.Column","x-component-props":{width:100},properties:{type:{type:"string","x-component":"Radio.Group","x-pattern":"readPretty",enum:"{{ formTypes }}"}}},column3:{type:"void",title:'{{ t("Enabled") }}',"x-component":"TableV2.Column","x-component-props":{width:80},properties:{enabled:{type:"string","x-component":"CollectionField","x-pattern":"readPretty"}}},description:{type:"void",title:'{{ t("Description") }}',"x-component":"TableV2.Column",properties:{description:{type:"string","x-component":"CollectionField","x-pattern":"readPretty"}}},actions:{type:"void",title:'{{ t("Actions") }}',"x-component":"TableV2.Column",properties:{actions:{type:"void","x-component":"Space","x-component-props":{split:"|"},properties:{configure:{type:"void",title:"Configure","x-component":function(){var e=(0,n.useFilterByTk)(),t=(0,c.NT)();return i().createElement(a.Link,{to:"/admin/settings/public-forms/".concat(e)},t("Configure"))}},editActionSchema:{type:"void",title:"{{t('Edit')}}","x-component":"Action.Link","x-component-props":{openMode:"drawer",icon:"EditOutlined"},properties:{drawer:{type:"void",title:"Edit","x-component":"Action.Drawer","x-decorator":"FormV2","x-use-decorator-props":"useEditFormProps",properties:{form:{type:"void",properties:{title:{type:"string","x-decorator":"FormItem","x-component":"CollectionField"},collection:{type:"string","x-decorator":"FormItem","x-component":"CollectionField","x-component-props":{disabled:!0}},type:{type:"string","x-decorator":"FormItem",title:'{{t("Type",{ns:"public-forms"})}}',"x-component":"Radio.Group",default:"form",enum:"{{ formTypes }}"},description:{type:"string","x-decorator":"FormItem","x-component":"CollectionField"},password:{type:"string","x-decorator":"FormItem","x-component":"CollectionField"},enabled:{type:"string","x-decorator":"FormItem","x-component":"CollectionField",default:!0}}},footer:{type:"void","x-component":"Action.Drawer.Footer",properties:{submit:{title:"Submit","x-component":"Action","x-use-component-props":"useSubmitActionProps"}}}}}}},delete:{type:"void",title:"{{t('Delete')}}","x-component":"Action.Link","x-use-component-props":"useDeleteActionProps"}}}}}}}}},y=function(){var e,t,o=(0,n.usePlugin)(p.default),c=(0,n.useSchemaComponentContext)(),m=(0,r.useMemo)(function(){return o.getFormTypeOptions()},[o]);return i().createElement(n.ExtendCollectionsProvider,{collections:[l]},i().createElement(n.SchemaComponentContext.Provider,{value:(e=function(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{},n=Object.keys(o);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(o).filter(function(e){return Object.getOwnPropertyDescriptor(o,e).enumerable}))),n.forEach(function(t){var n,r,i;n=e,r=t,i=o[t],r in n?Object.defineProperty(n,r,{value:i,enumerable:!0,configurable:!0,writable:!0}):n[r]=i})}return e}({},c),t=(t={designable:!1},t),Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):(function(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);o.push.apply(o,n)}return o})(Object(t)).forEach(function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(t,o))}),e)},i().createElement(n.SchemaComponent,{schema:u,scope:{formTypes:m,useSubmitActionProps:s.j1,useEditFormProps:s.fC,useDeleteActionProps:s.Dq}})))}}}]);