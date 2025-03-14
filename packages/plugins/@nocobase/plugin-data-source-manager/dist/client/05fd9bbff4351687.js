/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

"use strict";(self.webpackChunk_nocobase_plugin_data_source_manager=self.webpackChunk_nocobase_plugin_data_source_manager||[]).push([["210"],{186:function(e,t,n){n.r(t),n.d(t,{DatabaseConnectionManagerPane:function(){return R}});var r=n("875"),o=n("772"),a=n("721"),i=n("156"),c=n.n(i),u=n("238"),l=n("60"),s=n("421"),p=n("382"),d=n("482"),f=n("212"),y=n("573");function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function b(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n,r,o=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=o){var a=[],i=!0,c=!1;try{for(o=o.call(e);!(i=(n=o.next()).done)&&(a.push(n.value),!t||a.length!==t);i=!0);}catch(e){c=!0,r=e}finally{try{!i&&null!=o.return&&o.return()}finally{if(c)throw r}}return a}}(e,t)||h(e,t)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function v(e){return function(e){if(Array.isArray(e))return m(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||h(e)||function(){throw TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function h(e,t){if(e){if("string"==typeof e)return m(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if("Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return m(e,t)}}var g=function(){var e=b((0,i.useState)({}),2),t=e[0],n=e[1],s=(0,o.usePlugin)(l.default),p=(0,o.useCompile)(),m=b((0,i.useState)(!1),2),h=m[0],g=m[1],x=(0,u.useTranslation)().t,A=b((0,i.useState)(null),2),C=A[0],S=A[1],k=(0,o.useAPIClient)();return c().createElement("div",null,c().createElement(o.ActionContext.Provider,{value:{visible:h,setVisible:g}},c().createElement(a.Dropdown,{menu:{onClick:function(e){if("__empty__"!==e.key){var t,o,a,i=s.types.get(e.key);S(e.key),g(!0),n({type:"object",properties:(t={},o=(0,r.uid)(),a={type:"void","x-component":"Action.Drawer","x-decorator":"Form","x-decorator-props":{initialValue:{type:e.key,key:"d_".concat((0,r.uid)())}},title:p("{{t('Add new')}}")+" - "+p(i.label),properties:{body:{type:"void","x-component":i.DataSourceSettingsForm},footer:{type:"void","x-component":"Action.Drawer.Footer",properties:{testConnection:{title:'{{ t("Test Connection",{ ns: "'.concat(y.A7,'" }) }}'),"x-component":"Action","x-component-props":{useAction:"{{ useTestConnectionAction }}"},"x-hidden":null==i?void 0:i.disableTestConnection},cancel:{title:'{{t("Cancel")}}',"x-component":"Action","x-component-props":{useAction:"{{ cm.useCancelAction }}"}},submit:{title:'{{t("Submit")}}',"x-component":"Action","x-component-props":{type:"primary",useAction:"{{ cm.useCreateAction }}",actionCallback:"{{ dataSourceCreateCallback }}"}}}}}},o in t?Object.defineProperty(t,o,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[o]=a,t)})}},items:[s.types.size?null:{key:"__empty__",label:c().createElement(a.Empty,{image:a.Empty.PRESENTED_IMAGE_SIMPLE,description:c().createElement(c().Fragment,null,x("No external data source plugin installed",{ns:y.A7}),c().createElement("br",null)," ",c().createElement("a",{target:"_blank",href:"zh-CN"===k.auth.locale?"https://docs-cn.nocobase.com/handbook/data-source-manager":"https://docs.nocobase.com/handbook/data-source-manager",rel:"noreferrer"},x("View documentation",{ns:y.A7})))})}].filter(Boolean).concat(v(s.types.keys()).map(function(e){var t=s.types.get(e);return{key:e,label:p(null==t?void 0:t.label)}}))}},c().createElement(a.Button,{type:"primary",icon:c().createElement(d.PlusOutlined,null)},x("Add new")," ",c().createElement(d.DownOutlined,null))),c().createElement(o.SchemaComponent,{scope:{createOnly:!1,useTestConnectionAction:f.useTestConnectionAction,dialect:C,useDialectDataSource:function(e){var t=v(s.types.keys()).map(function(e){var t=s.types.get(e);return{value:t.name,label:p(t.label)}});e.dataSource=t}},schema:t})))},x=n("505");function A(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function C(e,t,n,r,o,a,i){try{var c=e[a](i),u=c.value}catch(e){n(e);return}c.done?t(u):Promise.resolve(u).then(r,o)}function S(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n,r,o=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=o){var a=[],i=!0,c=!1;try{for(o=o.call(e);!(i=(n=o.next()).done)&&(a.push(n.value),!t||a.length!==t);i=!0);}catch(e){c=!0,r=e}finally{try{!i&&null!=o.return&&o.return()}finally{if(c)throw r}}return a}}(e,t)||function(e,t){if(e){if("string"==typeof e)return A(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if("Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return A(e,t)}}(e,t)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var k=function(){var e=(0,o.useRecord)(),t=S((0,i.useState)({}),2),n=t[0],a=t[1],s=(0,o.usePlugin)(l.default),p=(0,o.useCompile)(),d=S((0,i.useState)(!1),2),f=d[0],m=d[1],b=(0,u.useTranslation)().t,v=(0,o.useDataSourceManager)();return c().createElement("div",null,c().createElement(o.ActionContext.Provider,{value:{visible:f,setVisible:m}},"main"!==e.key&&c().createElement("a",{onClick:function(){m(!0);var t,n,o,i=s.types.get(e.type);a({type:"object",properties:(t={},n=(0,r.uid)(),o={type:"void","x-component":"Action.Drawer","x-decorator":"Form","x-decorator-props":{initialValue:e},title:p("{{t('Edit')}}")+" - "+p(e.displayName),properties:{body:{type:"void","x-component":i.DataSourceSettingsForm},footer:{type:"void","x-component":"Action.Drawer.Footer",properties:{cancel:{title:'{{t("Cancel")}}',"x-component":"Action","x-component-props":{useAction:"{{ cm.useCancelAction }}"}},testConnectiion:{title:'{{ t("Test Connection",{ ns: "'.concat(y.A7,'" }) }}'),"x-component":"Action","x-component-props":{useAction:"{{ useTestConnectionAction }}"},"x-hidden":null==i?void 0:i.disableTestConnection},submit:{title:'{{t("Submit")}}',"x-component":"Action","x-component-props":{type:"primary",useAction:"{{ useUpdateAction }}"}}}}}},n in t?Object.defineProperty(t,n,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[n]=o,t)})}},b("Edit")),c().createElement(o.SchemaComponent,{scope:{createOnly:!0,useUpdateAction:function(){var e=(0,x.useField)(),t=(0,x.useForm)(),n=(0,o.useActionContext)(),r=(0,o.useResourceActionContext)().refresh,a=(0,o.useResourceContext)().resource,i=(0,o.useRecord)().key;return{run:function(){var o;return(o=function(){return function(e,t){var n,r,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function c(a){return function(c){return function(a){if(n)throw TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(o=2&a[0]?r.return:a[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,a[1])).done)return o;switch(r=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,r=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!(o=(o=i.trys).length>0&&o[o.length-1])&&(6===a[0]||2===a[0])){i=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){i.label=a[1];break}if(6===a[0]&&i.label<o[1]){i.label=o[1],o=a;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(a);break}o[2]&&i.ops.pop(),i.trys.pop();continue}a=t.call(e,i)}catch(e){a=[6,e],r=0}finally{n=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,c])}}}(this,function(o){switch(o.label){case 0:return[4,t.submit()];case 1:o.sent(),e.data=e.data||{},e.data.loading=!0,o.label=2;case 2:return o.trys.push([2,5,6,7]),[4,a.update({filterByTk:i,values:t.values})];case 3:return o.sent(),n.setVisible(!1),v.getDataSource(i).setOptions(t.values),v.getDataSource(i).reload(),[4,t.reset()];case 4:return o.sent(),r(),[3,7];case 5:return console.log(o.sent()),[3,7];case 6:return e.data.loading=!1,[7];case 7:return[2]}})},function(){var e=this,t=arguments;return new Promise(function(n,r){var a=o.apply(e,t);function i(e){C(a,n,r,i,c,"next",e)}function c(e){C(a,n,r,i,c,"throw",e)}i(void 0)})})()}}}},schema:n})))},w=n("964"),D=n("128"),E=function(e){var t=e.key,n=e.type;return"/admin/settings/data-source-manager/".concat(t,"/collections?type=").concat(n)};function T(){var e,t,n=(e=["\n              .ant-btn-link {\n                &:hover {\n                  color: rgba(0, 0, 0, 0.25) !important;\n                }\n              }\n            "],!t&&(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}})));return T=function(){return n},n}var P=function(){var e=(0,o.useRecord)(),t=(0,D.useNavigate)(),n=(0,u.useTranslation)().t;return c().createElement("div",{className:e.enabled?void 0:(0,w.css)(T())},c().createElement(a.Button,{type:"link",style:{padding:"0px"},disabled:!e.enabled,onClick:function(){t(E(e))},role:"button","aria-label":"".concat(null==e?void 0:e.key,"-Configure")},n("Configure")))};function O(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function j(e,t,n,r,o,a,i){try{var c=e[a](i),u=c.value}catch(e){n(e);return}c.done?t(u):Promise.resolve(u).then(r,o)}function _(e){return function(){var t=this,n=arguments;return new Promise(function(r,o){var a=e.apply(t,n);function i(e){j(a,r,o,i,c,"next",e)}function c(e){j(a,r,o,i,c,"throw",e)}i(void 0)})}}function I(e){return function(e){if(Array.isArray(e))return O(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return O(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if("Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return O(e,t)}}(e)||function(){throw TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function F(e,t){var n,r,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function c(a){return function(c){return function(a){if(n)throw TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(o=2&a[0]?r.return:a[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,a[1])).done)return o;switch(r=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,r=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!(o=(o=i.trys).length>0&&o[o.length-1])&&(6===a[0]||2===a[0])){i=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){i.label=a[1];break}if(6===a[0]&&i.label<o[1]){i.label=o[1],o=a;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(a);break}o[2]&&i.ops.pop(),i.trys.pop();continue}a=t.call(e,i)}catch(e){a=[6,e],r=0}finally{n=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,c])}}}var R=function(){var e=(0,u.useTranslation)().t,t=(0,o.usePlugin)(l.default),n=I(t.types.keys()).map(function(n){var r=t.types.get(n);return{value:n,label:e(null==r?void 0:r.label)}}).concat([{value:"main",label:e("Main")}]),d=(0,o.useDataSourceManager)(),f=c().useRef([]);(0,i.useEffect)(function(){return function(){d.getDataSources().forEach(function(e){f.current.includes(e.key)&&e.reload()})}},[f]);var y=(0,i.useCallback)(function(e){d.removeDataSources(e)},[d]),m=(0,i.useCallback)(function(e){d.addDataSource(p.F,e),f.current=I(f.current).concat([e.key])},[]);return c().createElement(a.Card,{bordered:!1},c().createElement(o.SchemaComponent,{components:{CreateDatabaseConnectAction:g,EditDatabaseConnectionAction:k,ViewDatabaseConnectionAction:P},scope:{useNewId:function(e){return"".concat(e).concat((0,r.uid)())},types:n,useRefreshActionProps:function(){var e=(0,o.useResourceActionContext)();return{onClick:function(){return _(function(){var t,n,r,o,a;return F(this,function(i){switch(i.label){case 0:if(!(null==(r=null==e?void 0:null===(t=e.data)||void 0===t?void 0:t.data.filter(function(e){return"loaded"!==e.status}))?void 0:r.length))return[3,2];return o=d.getDataSources(),a=r.map(function(e){return e.key}),[4,Promise.all(o.filter(function(e){return a.includes(e.key)}).map(function(e){return e.reload()}))];case 1:i.sent(),i.label=2;case 2:return null==e||null===(n=e.refresh)||void 0===n||n.call(e),[2]}})})()}}},useDestroyAction:function(){var e=(0,o.useResourceActionContext)().refresh,t=(0,o.useResourceContext)().resource,n=(0,o.useRecord)().key;return{run:function(){return _(function(){return F(this,function(r){switch(r.label){case 0:return[4,t.destroy({filterByTk:n})];case 1:return r.sent(),y([n]),e(),[2]}})})()}}},dataSourceDeleteCallback:y,dataSourceCreateCallback:m,useIsAbleDelete:function(e){var t=(0,o.useRecord)().key;e.visible="main"!==t}},schema:s.j}))}},212:function(e,t,n){n.r(t),n.d(t,{useCreateDatabaseServer:function(){return d},useTestConnectionAction:function(){return f}});var r=n(505),o=n(721),a=n(238),i=n(772),c=n(573);function u(e,t,n,r,o,a,i){try{var c=e[a](i),u=c.value}catch(e){n(e);return}c.done?t(u):Promise.resolve(u).then(r,o)}function l(e){return function(){var t=this,n=arguments;return new Promise(function(r,o){var a=e.apply(t,n);function i(e){u(a,r,o,i,c,"next",e)}function c(e){u(a,r,o,i,c,"throw",e)}i(void 0)})}}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){var r,o,a;r=e,o=t,a=n[t],o in r?Object.defineProperty(r,o,{value:a,enumerable:!0,configurable:!0,writable:!0}):r[o]=a})}return e}function p(e,t){var n,r,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function c(a){return function(c){return function(a){if(n)throw TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(o=2&a[0]?r.return:a[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,a[1])).done)return o;switch(r=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,r=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!(o=(o=i.trys).length>0&&o[o.length-1])&&(6===a[0]||2===a[0])){i=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){i.label=a[1];break}if(6===a[0]&&i.label<o[1]){i.label=o[1],o=a;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(a);break}o[2]&&i.ops.pop(),i.trys.pop();continue}a=t.call(e,i)}catch(e){a=[6,e],r=0}finally{n=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,c])}}}var d=function(e){var t=(0,r.useForm)(),n=(0,i.useActionContext)(),c=(0,i.useAPIClient)(),u=(0,a.useTranslation)().t,d=(0,r.useField)();return d.data=d.data||{},{run:function(){return l(function(){var r,a;return p(this,function(i){switch(i.label){case 0:return[4,t.submit()];case 1:i.sent(),i.label=2;case 2:return i.trys.push([2,5,,6]),d.data.loading=!0,[4,c.resource("databaseServers").create({values:s({},t.values)})];case 3:return r=i.sent().data,d.data.loading=!1,n.setVisible(!1),[4,t.reset()];case 4:return i.sent(),null==e||e(null==r?void 0:r.data),o.message.success(u("Saved successfully")),[3,6];case 5:return a=i.sent(),d.data.loading=!1,console.log(a),[3,6];case 6:return[2]}})})()}}},f=function(){var e=(0,r.useForm)(),t=(0,i.useAPIClient)(),n=(0,a.useTranslation)().t,u=(0,r.useField)();return u.data=u.data||{},{run:function(){return l(function(){var r;return p(this,function(a){switch(a.label){case 0:return[4,e.submit()];case 1:a.sent(),a.label=2;case 2:return a.trys.push([2,4,,5]),u.data.loading=!0,[4,t.resource("dataSources").testConnection({values:s({},e.values)})];case 3:return a.sent(),u.data.loading=!1,o.message.success(n("Connection successful",{ns:c.A7})),[3,5];case 4:return r=a.sent(),u.data.loading=!1,console.log(r),[3,5];case 5:return[2]}})})()}}}},421:function(e,t,n){n.d(t,{$:function(){return u},j:function(){return s}});var r,o,a,i=n(875),c=n(573),u=[{value:"loading",label:'{{t("Loading",{ns:"'.concat(c.A7,'"})}}'),color:"orange"},{value:"loading-failed",label:'{{t("Failed",{ns:"'.concat(c.A7,'"})}}'),color:"red"},{value:"loaded",label:'{{t("Loaded",{ns:"'.concat(c.A7,'"})}}'),color:"green"},{value:"reloading",label:'{{t("Reloading",{ns:"'.concat(c.A7,'"})}}'),color:"orange"}],l={name:"collections-"+(0,i.uid)(),fields:[{type:"string",name:"key",interface:"input",uiSchema:{title:'{{t("Data source name",{ ns: "'.concat(c.A7,'" })}}'),type:"string","x-component":"Input",required:!0}},{type:"string",name:"displayName",interface:"input",uiSchema:{title:'{{t("Data source display name",{ ns: "'.concat(c.A7,'" })}}'),type:"string","x-component":"Input",required:!0}},{type:"string",name:"type",interface:"select",uiSchema:{title:'{{t("Type", { ns: "'.concat(c.A7,'" })}}'),type:"string","x-component":"Select",enum:"{{types}}"}},{type:"string",name:"status",interface:"select",uiSchema:{title:'{{t("Status", { ns: "'.concat(c.A7,'" })}}'),type:"string","x-component":"Select",enum:u}},{type:"boolean",name:"enabled",uiSchema:{type:"boolean",title:'{{t("Enabled")}}',"x-component":"Checkbox"}}]};var s={type:"object",properties:(r={},o=(0,i.uid)(),a={type:"void","x-decorator":"ResourceActionProvider","x-decorator-props":{collection:l,resourceName:"dataSources",request:{resource:"dataSources",action:"list",params:{pageSize:50,appends:[]}}},"x-component":"CollectionProvider_deprecated","x-component-props":{collection:l},properties:{actions:{type:"void","x-component":"ActionBar","x-component-props":{style:{marginBottom:16}},properties:{refresh:{type:"void",title:'{{ t("Refresh") }}',"x-component":"Action","x-use-component-props":"useRefreshActionProps","x-component-props":{icon:"ReloadOutlined"}},delete:{type:"void",title:'{{ t("Delete") }}',"x-component":"Action","x-component-props":{icon:"DeleteOutlined",useAction:"{{ cm.useBulkDestroyAction }}",confirm:{title:"{{t('Delete')}}",content:"{{t('Are you sure you want to delete it?')}}"},actionCallback:"{{ dataSourceDeleteCallback }}"}},create:{type:"void",title:'{{t("Add new")}}',"x-component":"CreateDatabaseConnectAction","x-component-props":{type:"primary"}}}},table:{type:"void","x-uid":"input","x-component":"Table.Void","x-component-props":{rowKey:"key",rowSelection:{type:"checkbox"},useDataSource:"{{ cm.useDataSourceFromRAC }}"},properties:{key:{type:"void","x-decorator":"Table.Column.Decorator","x-component":"Table.Column",properties:{key:{type:"string","x-component":"CollectionField","x-read-pretty":!0}}},displayName:{type:"void","x-decorator":"Table.Column.Decorator","x-component":"Table.Column",properties:{displayName:{type:"string","x-component":"CollectionField","x-read-pretty":!0}}},type:{type:"void","x-decorator":"Table.Column.Decorator","x-component":"Table.Column",properties:{type:{type:"string","x-component":"CollectionField","x-read-pretty":!0}}},status:{type:"void","x-decorator":"Table.Column.Decorator","x-component":"Table.Column",properties:{status:{type:"string","x-component":"CollectionField","x-read-pretty":!0}}},enabled:{type:"void","x-decorator":"Table.Column.Decorator","x-component":"Table.Column",properties:{enabled:{type:"string","x-component":"CollectionField","x-read-pretty":!0}}},actions:{type:"void",title:'{{t("Actions")}}',"x-component":"Table.Column",properties:{actions:{type:"void","x-component":"Space","x-component-props":{},properties:{view:{type:"void",title:'{{t("View")}}',"x-component":"ViewDatabaseConnectionAction","x-component-props":{type:"primary"}},update:{type:"void",title:'{{t("Edit")}}',"x-component":"EditDatabaseConnectionAction","x-component-props":{type:"primary"},"x-reactions":["{{useIsAbleDelete($self)}}"]},delete:{type:"void",title:'{{ t("Delete") }}',"x-component":"Action.Link","x-component-props":{confirm:{title:'{{t("Delete")}}',content:'{{t("Are you sure you want to delete it?")}}'},useAction:"{{useDestroyAction}}"},"x-reactions":["{{useIsAbleDelete($self)}}"]}}}}}}}}},o in r?Object.defineProperty(r,o,{value:a,enumerable:!0,configurable:!0,writable:!0}):r[o]=a,r)}}}]);