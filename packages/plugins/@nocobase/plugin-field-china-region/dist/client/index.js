/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("@nocobase/client"),require("@formily/react"),require("@formily/shared")):"function"==typeof define&&define.amd?define("@nocobase/plugin-field-china-region",["@nocobase/client","@formily/react","@formily/shared"],t):"object"==typeof exports?exports["@nocobase/plugin-field-china-region"]=t(require("@nocobase/client"),require("@formily/react"),require("@formily/shared")):e["@nocobase/plugin-field-china-region"]=t(e["@nocobase/client"],e["@formily/react"],e["@formily/shared"])}(self,function(e,t,r){return function(){"use strict";var n={505:function(e){e.exports=t},875:function(e){e.exports=r},772:function(t){t.exports=e}},o={};function i(e){var t=o[e];if(void 0!==t)return t.exports;var r=o[e]={exports:{}};return n[e](r,r.exports,i),r.exports}i.d=function(e,t){for(var r in t)i.o(t,r)&&!i.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var c={};i.r(c),i.d(c,{PluginFieldChinaRegionClient:function(){return _},default:function(){return R}});var a=i("772"),u=i("505");function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}var f=function(e){var t,r,n=(0,u.useField)().componentProps.maxLevel;return(0,a.useRequest)({resource:"chinaRegions",action:"list",params:{sort:"code",paginate:!1,filter:{level:1}}},(t=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),n.forEach(function(t){var n,o,i;n=e,o=t,i=r[t],o in n?Object.defineProperty(n,o,{value:i,enumerable:!0,configurable:!0,writable:!0}):n[o]=i})}return e}({},e),r=(r={onSuccess:function(t){var r;null==e||e.onSuccess({data:(null==t?void 0:null===(r=t.data)||void 0===r?void 0:r.map(function(e){return 1!==n&&(e.isLeaf=!1),e}))||[]})},manual:!0},r),Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):(function(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r.push.apply(r,n)}return r})(Object(r)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}),t))},s=function(){var e=(0,a.useAPIClient)(),t=(0,u.useField)(),r=t.componentProps.maxLevel;return function(n){var o,i=n[n.length-1];if(!((null==i?void 0:null===(o=i.children)||void 0===o?void 0:o.length)>0))i.loading=!0,e.resource("chinaRegions").list({sort:"code",paginate:!1,filter:{parentCode:i.code}}).then(function(e){var n,o,c=e.data;i.loading=!1,i.children=(null==c?void 0:null===(o=c.data)||void 0===o?void 0:o.map(function(e){return r>e.level&&(e.isLeaf=!1),e}))||[],t.dataSource=function(e){if(Array.isArray(e))return l(e)}(n=t.dataSource)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(n)||function(e,t){if(e){if("string"==typeof e)return l(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);if("Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return l(e,t)}}(n)||function(){throw TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}).catch(function(e){console.error(e)})}},p=i("875");function y(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function b(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function d(e){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function h(e,t){return(h=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function v(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch(e){}return(v=function(){return!!e})()}var m=function(e){var t,r,n;function o(){var e,t,r,n,i,c;return!function(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}(this,o),t=this,r=o,n=arguments,r=d(r),b(e=function(e,t){return t&&("object"===function(e){return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e}(t)||"function"==typeof t)?t:function(e){if(void 0===e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(t,v()?Reflect.construct(r,n||[],d(t).constructor):r.apply(t,n)),"name","chinaRegion"),b(e,"type","object"),b(e,"group","choices"),b(e,"order",7),b(e,"title",'{{t("China region")}}'),b(e,"isAssociation",!0),b(e,"default",{interface:"chinaRegion",type:"belongsToMany",target:"chinaRegions",targetKey:"code",sortBy:"level",uiSchema:{type:"array","x-component":"Cascader","x-component-props":{useDataSource:"{{ useChinaRegionDataSource }}",useLoadData:"{{ useChinaRegionLoadData }}",changeOnSelectLast:!1,labelInValue:!0,maxLevel:3,fieldNames:{label:"name",value:"code",children:"children"}}}}),b(e,"availableTypes",["belongsToMany"]),b(e,"properties",(i=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),n.forEach(function(t){b(e,t,r[t])})}return e}({},a.defaultProps),c=(c={"uiSchema.x-component-props.maxLevel":{type:"number","x-component":"Radio.Group","x-decorator":"FormItem",title:'{{t("Select level")}}',default:3,enum:[{value:1,label:'{{t("Province")}}'},{value:2,label:'{{t("City")}}'},{value:3,label:'{{t("Area")}}'},{value:4,label:'{{t("Street")}}',disabled:!0},{value:5,label:'{{t("Village")}}',disabled:!0}]},"uiSchema.x-component-props.changeOnSelectLast":{type:"boolean","x-component":"Checkbox","x-content":'{{t("Must select to the last level")}}',"x-decorator":"FormItem"}},c),Object.getOwnPropertyDescriptors?Object.defineProperties(i,Object.getOwnPropertyDescriptors(c)):(function(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r.push.apply(r,n)}return r})(Object(c)).forEach(function(e){Object.defineProperty(i,e,Object.getOwnPropertyDescriptor(c,e))}),i)),b(e,"filterable",{children:[{name:"name",title:'{{t("Province/city/area name")}}',operators:a.operators.string,schema:{title:'{{t("Province/city/area name")}}',type:"string","x-component":"Input"}}]}),e}return!function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&h(e,t)}(o,e),t=o,r=[{key:"initialize",value:function(e){!e.through&&(e.through="t_".concat((0,p.uid)())),!e.foreignKey&&(e.foreignKey="f_".concat((0,p.uid)())),!e.otherKey&&(e.otherKey="f_".concat((0,p.uid)())),!e.sourceKey&&(e.sourceKey="id"),!e.targetKey&&(e.targetKey="id")}}],y(t.prototype,r),o}(a.CollectionFieldInterface);function g(e,t,r,n,o,i,c){try{var a=e[i](c),u=a.value}catch(e){r(e);return}a.done?t(u):Promise.resolve(u).then(n,o)}function O(e,t,r){return(O=x()?Reflect.construct:function(e,t,r){var n=[null];n.push.apply(n,t);var o=new(Function.bind.apply(e,n));return r&&S(o,r.prototype),o}).apply(null,arguments)}function j(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function P(e){return(P=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function S(e,t){return(S=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function w(e){var t="function"==typeof Map?new Map:void 0;return(w=function(e){var r;if(null===e||(r=e,-1===Function.toString.call(r).indexOf("[native code]")))return e;if("function"!=typeof e)throw TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,n)}function n(){return O(e,arguments,P(this).constructor)}return n.prototype=Object.create(e.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),S(n,e)})(e)}function x(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch(e){}return(x=function(){return!!e})()}var _=function(e){var t,r,n;function o(){var e,t,r;return!function(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}(this,o),e=this,t=o,r=arguments,t=P(t),function(e,t){return t&&("object"===function(e){return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e}(t)||"function"==typeof t)?t:function(e){if(void 0===e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(e,x()?Reflect.construct(t,r||[],P(e).constructor):t.apply(e,r))}return!function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&S(e,t)}(o,e),t=o,r=[{key:"load",value:function(){var e,t=this;return(e=function(){return function(e,t){var r,n,o,i,c={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(r)throw TypeError("Generator is already executing.");for(;c;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return c.label++,{value:i[1],done:!1};case 5:c.label++,n=i[1],i=[0];continue;case 7:i=c.ops.pop(),c.trys.pop();continue;default:if(!(o=(o=c.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){c=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){c.label=i[1];break}if(6===i[0]&&c.label<o[1]){c.label=o[1],o=i;break}if(o&&c.label<o[2]){c.label=o[2],c.ops.push(i);break}o[2]&&c.ops.pop(),c.trys.pop();continue}i=t.call(e,c)}catch(e){i=[6,e],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}}(this,function(e){return t.app.addScopes({useChinaRegionDataSource:f,useChinaRegionLoadData:s}),t.app.dataSourceManager.addFieldInterfaces([m]),[2]})},function(){var t=this,r=arguments;return new Promise(function(n,o){var i=e.apply(t,r);function c(e){g(i,n,o,c,a,"next",e)}function a(e){g(i,n,o,c,a,"throw",e)}c(void 0)})})()}}],j(t.prototype,r),o}(w(a.Plugin)),R=_;return c}()});