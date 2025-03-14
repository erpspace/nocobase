/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

"use strict";(self.webpackChunk_nocobase_plugin_notification_manager=self.webpackChunk_nocobase_plugin_notification_manager||[]).push([["16"],{770:function(e,t,n){n.r(t),n.d(t,{ChannelManager:function(){return S}});var o=n("482"),r=n("772"),i=n("721"),c=n("156"),a=n.n(c),p=n("391"),l=n("3"),s=n("573"),u=n("274"),m=n("381"),d=n("875"),y=n("124");function f(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},o=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),o.forEach(function(t){var o,r,i;o=e,r=t,i=n[t],r in o?Object.defineProperty(o,r,{value:i,enumerable:!0,configurable:!0,writable:!0}):o[r]=i})}return e}function x(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):(function(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n.push.apply(n,o)}return n})(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}),e}var b={type:"object",properties:{drawer:{type:"void","x-component":"Action.Drawer","x-decorator":"FormV2","x-use-decorator-props":"useCreateFormProps",title:'{{t("Add new")}}',properties:x(f({},{name:{"x-component":"CollectionField","x-decorator":"FormItem"},title:{"x-component":"CollectionField","x-decorator":"FormItem"},description:{"x-component":"CollectionField","x-decorator":"FormItem"},options:{"x-component":"CollectionField"}}),{footer:{type:"void","x-component":"Action.Drawer.Footer",properties:{cancel:{title:'{{t("Cancel")}}',"x-component":"Action","x-use-component-props":"useCloseActionProps"},submit:{title:'{{t("Submit")}}',"x-component":"Action","x-use-component-props":"useCreateActionProps"}}}})}}},h={type:"void",name:(0,d.uid)(),"x-decorator":"TableBlockProvider","x-decorator-props":{collection:y.O.channels,action:"list",dragSort:!1,params:{sort:["createdAt"],pageSize:20}},properties:{actions:{type:"void","x-component":"ActionBar","x-component-props":{style:{marginBottom:16}},properties:{refresh:{title:"{{t('Refresh')}}","x-action":"refresh","x-component":"Action","x-use-component-props":"useRefreshActionProps","x-component-props":{icon:"ReloadOutlined"}},create:{type:"void",title:'{{t("Add new")}}',"x-component":"AddNew","x-component-props":{type:"primary"}},filter:{"x-action":"filter",type:"object","x-component":"Filter.Action",title:"{{t('Filter')}}","x-use-component-props":"useFilterActionProps","x-component-props":{icon:"FilterOutlined"},"x-align":"left"}}},table:{type:"array","x-component":"TableV2","x-use-component-props":"useTableBlockProps","x-component-props":{rowKey:"name"},properties:{title:{type:"void","x-component":"TableV2.Column",title:'{{t("Channel display name")}}',"x-component-props":{width:100},properties:{title:{type:"string","x-component":"CollectionField","x-read-pretty":!0,"x-component-props":{ellipsis:!0}}}},name:{type:"void","x-component":"TableV2.Column",title:'{{t("Channel name")}}',"x-component-props":{width:100},properties:{name:{type:"string","x-component":"CollectionField","x-read-pretty":!0,"x-component-props":{ellipsis:!0}}}},description:{type:"void","x-component":"TableV2.Column",title:'{{t("Description")}}',"x-component-props":{width:200},properties:{description:{type:"boolean","x-component":"CollectionField","x-read-pretty":!0,"x-component-props":{ellipsis:!0}}}},notificationType:{title:'{{t("Notification type")}}',type:"void","x-component":"TableV2.Column","x-component-props":{width:200},properties:{notificationType:{type:"string","x-component":"CollectionField","x-read-pretty":!0}}},actions:{type:"void",title:'{{t("Actions")}}',"x-component":"TableV2.Column",properties:{edit:{type:"void",title:"Edit","x-component":"Action.Link","x-component-props":{openMode:"drawer",icon:"EditOutlined"},"x-use-component-props":"useRecordEditActionProps","x-decorator":"Space",properties:{drawer:{type:"void",title:'{{t("Edit")}}',"x-component":"Action.Drawer","x-decorator":"FormV2","x-use-decorator-props":"useEditFormProps",properties:x(f({},{name:{"x-component":"CollectionField","x-decorator":"FormItem","x-disabled":!0},title:{"x-component":"CollectionField","x-decorator":"FormItem"},description:{"x-component":"CollectionField","x-decorator":"FormItem"},options:{"x-component":"CollectionField"}}),{footer:{type:"void","x-component":"Action.Drawer.Footer",properties:{cancel:{title:'{{t("Cancel")}}',"x-component":"Action","x-use-component-props":"useCloseActionProps"},submit:{title:"Submit","x-component":"Action","x-use-component-props":"useEditActionProps"}}}})}}},delete:{type:"void",title:'{{t("Delete")}}',"x-decorator":"Space","x-component":"Action.Link","x-use-component-props":"useRecordDeleteActionProps","x-component-props":{confirm:{title:"{{t('Delete record')}}",content:"{{t('Are you sure you want to delete it?')}}"}}}}}}}}},g=n("505"),v=(0,g.observer)(function(){var e,t,n=(0,g.useForm)(),o=(0,r.useCollectionRecord)(),i=n.values.notificationType||(null==o?void 0:null===(e=o.data)||void 0===e?void 0:e.notificationType),p=(0,c.useContext)(u.wi).channelTypes.find(function(e){return e.type===i});return(null===(t=p.components)||void 0===t?void 0:t.ChannelConfigForm)?a().createElement(p.components.ChannelConfigForm,null):null},{displayName:"ConfigForm"});function C(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}function P(e,t,n,o,r,i,c){try{var a=e[i](c),p=a.value}catch(e){n(e);return}a.done?t(p):Promise.resolve(p).then(o,r)}var w=function(){var e=(0,r.useActionContext)().setVisible;return{run:function(){var t;return(t=function(){return function(e,t){var n,o,r,i,c={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(n)throw TypeError("Generator is already executing.");for(;c;)try{if(n=1,o&&(r=2&i[0]?o.return:i[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,i[1])).done)return r;switch(o=0,r&&(i=[2&i[0],r.value]),i[0]){case 0:case 1:r=i;break;case 4:return c.label++,{value:i[1],done:!1};case 5:c.label++,o=i[1],i=[0];continue;case 7:i=c.ops.pop(),c.trys.pop();continue;default:if(!(r=(r=c.trys).length>0&&r[r.length-1])&&(6===i[0]||2===i[0])){c=0;continue}if(3===i[0]&&(!r||i[1]>r[0]&&i[1]<r[3])){c.label=i[1];break}if(6===i[0]&&c.label<r[1]){c.label=r[1],r=i;break}if(r&&c.label<r[2]){c.label=r[2],c.ops.push(i);break}r[2]&&c.ops.pop(),c.trys.pop();continue}i=t.call(e,c)}catch(e){i=[6,e],o=0}finally{n=r=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}}(this,function(t){return e(!1),[2]})},function(){var e=this,n=arguments;return new Promise(function(o,r){var i=t.apply(e,n);function c(e){P(i,o,r,c,a,"next",e)}function a(e){P(i,o,r,c,a,"throw",e)}c(void 0)})})()}}},A=function(){var e,t,n=(0,s.oG)().t;var p=(e=(0,c.useState)(!1),t=2,function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n,o,r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var i=[],c=!0,a=!1;try{for(r=r.call(e);!(c=(n=r.next()).done)&&(i.push(n.value),!t||i.length!==t);c=!0);}catch(e){a=!0,o=e}finally{try{!c&&null!=r.return&&r.return()}finally{if(a)throw o}}return i}}(e,2)||function(e,t){if(e){if("string"==typeof e)return C(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if("Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return C(e,t)}}(e,t)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),l=p[0],d=p[1],y=(0,u.tZ)(),f=y.NotificationTypeNameProvider,x=(y.name,y.setName),h=(0,r.useAPIClient)(),g=(0,u.CZ)().filter(function(e){var t;return(null===(t=e.meta)||void 0===t?void 0:t.creatable)!==!1}),v=0===g.length?[{key:"__empty__",label:a().createElement(i.Empty,{image:i.Empty.PRESENTED_IMAGE_SIMPLE,description:a().createElement(a().Fragment,null,n("No channel enabled yet"),a().createElement("br",null)," ",a().createElement("a",{target:"_blank",href:"zh-CN"===h.auth.locale?"https://docs-cn.nocobase.com/handbook/notification-manager":"https://docs.nocobase.com/handbook/notification-manager",rel:"noreferrer"},n("View documentation")))})}]:g.map(function(e){return{key:e.type,label:e.title,onClick:function(){d(!0),x(e.type)}}});return a().createElement(r.ActionContextProvider,{value:{visible:l,setVisible:d}},a().createElement(f,null,a().createElement(i.Dropdown,{menu:{items:v}},a().createElement(i.Button,{icon:a().createElement(o.PlusOutlined,null),type:"primary"},n("Add new")," ",a().createElement(o.DownOutlined,null))),a().createElement(r.SchemaComponent,{scope:{useCloseAction:w,useCreateActionProps:m.cD,useEditActionProps:m.G8,useCloseActionProps:m.Uy,useEditFormProps:m.fC,useCreateFormProps:m.Uc},schema:b})))},O=function(){return(0,r.useAsyncData)().data,!1},S=function(){var e=(0,s.oG)().t,t=(0,m.aT)(),n=(0,r.useSchemaComponentContext)(),o=(0,c.useMemo)(function(){var e,t;return e=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},o=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),o.forEach(function(t){var o,r,i;o=e,r=t,i=n[t],r in o?Object.defineProperty(o,r,{value:i,enumerable:!0,configurable:!0,writable:!0}):o[r]=i})}return e}({},n),t=(t={designable:!1},t),Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):(function(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n.push.apply(n,o)}return n})(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}),e},[n]);return a().createElement(r.ExtendCollectionsProvider,{collections:[p.Z,l.Z]},a().createElement(r.SchemaComponentContext.Provider,{value:o},a().createElement(u.wi.Provider,{value:{channelTypes:t}},a().createElement(i.Card,{bordered:!1},a().createElement(r.SchemaComponent,{schema:h,components:{AddNew:A,ConfigForm:v},scope:{useCanNotDelete:O,t:e,notificationTypeOptions:t,useCreateActionProps:m.cD,useEditActionProps:m.G8,useCloseActionProps:m.Uy,useEditFormProps:m.fC,useCreateFormProps:m.Uc,useRecordDeleteActionProps:m.$l,useRecordEditActionProps:m.Bj}})))))};S.displayName="ChannelManager"},391:function(e,t,n){var o=n(124);t.Z={name:o.O.channels,migrationRules:["overwrite","schema-only"],filterTargetKey:"name",autoGenId:!1,createdAt:!0,createdBy:!0,updatedAt:!0,updatedBy:!0,fields:[{name:"name",type:"uid",prefix:"s_",primaryKey:!0,interface:"input",uiSchema:{type:"string",title:'{{t("Channel name")}}',"x-component":"Input",required:!0,description:"{{t('Randomly generated and can not be modified. Support letters, numbers and underscores, must start with an letter.')}}"}},{name:"title",type:"string",interface:"input",uiSchema:{type:"string","x-component":"Input",title:'{{t("Channel display name")}}',required:!0}},{name:"options",type:"json",interface:"json",uiSchema:{type:"object","x-component":"ConfigForm"}},{name:"meta",type:"json",interface:"json"},{interface:"input",type:"string",name:"notificationType",uiSchema:{type:"string",title:'{{t("Notification type")}}',"x-component":"Select",enum:"{{notificationTypeOptions}}",required:!0}},{name:"description",type:"text",interface:"textarea",uiSchema:{type:"string","x-component":"Input.TextArea",title:'{{t("Description")}}'}}]}},3:function(e,t,n){var o=n(124);t.Z={name:o.O.logs,migrationRules:["schema-only"],title:"MessageLogs",fields:[{name:"id",type:"uuid",primaryKey:!0,allowNull:!1,interface:"uuid",uiSchema:{type:"string",title:'{{t("ID")}}',"x-component":"Input","x-read-pretty":!0}},{name:"channelName",type:"string",interface:"input",uiSchema:{type:"string",title:'{{t("Channel name")}}',"x-component":"Input"}},{name:"channelTitle",type:"string",interface:"input",uiSchema:{type:"string","x-component":"Input",title:'{{t("Channel display name")}}'}},{name:"triggerFrom",type:"string",interface:"input",uiSchema:{type:"string","x-component":"Input",title:'{{t("Trigger from")}}'}},{name:"notificationType",type:"string",interface:"input",uiSchema:{type:"string",title:'{{t("Notification type")}}',"x-component":"Select",enum:"{{notificationTypeOptions}}",required:!0}},{name:"status",type:"string",interface:"select",uiSchema:{type:"string","x-component":"Select",enum:[{label:'{{t("Success")}}',value:"success",color:"green"},{label:'{{t("Failure")}}',value:"failure",color:"red"}],title:'{{t("Status")}}'}},{name:"message",type:"json",interface:"json",uiSchema:{"x-component":"Input.JSON",title:'{{t("Message")}}',"x-component-props":{autoSize:{minRows:5}},autoSize:{minRows:5}}},{name:"reason",type:"text",interface:"input",uiSchema:{type:"string","x-component":"Input",title:'{{t("Failed reason")}}'}},{name:"createdAt",type:"date",interface:"createdAt",field:"createdAt",uiSchema:{type:"datetime",title:'{{t("Created at")}}',"x-component":"DatePicker","x-component-props":{},"x-read-pretty":!0}},{name:"updatedAt",type:"date",interface:"updatedAt",field:"updatedAt",uiSchema:{type:"datetime",title:'{{t("Last updated at")}}',"x-component":"DatePicker","x-component-props":{},"x-read-pretty":!0}}]}}}]);