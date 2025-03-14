/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("@nocobase/plugin-workflow/client"),require("react-i18next"),require("@ant-design/icons"),require("@formily/react"),require("@nocobase/client"),require("react"),require("antd")):"function"==typeof define&&define.amd?define("@nocobase/plugin-workflow-aggregate",["@nocobase/plugin-workflow/client","react-i18next","@ant-design/icons","@formily/react","@nocobase/client","react","antd"],t):"object"==typeof exports?exports["@nocobase/plugin-workflow-aggregate"]=t(require("@nocobase/plugin-workflow/client"),require("react-i18next"),require("@ant-design/icons"),require("@formily/react"),require("@nocobase/client"),require("react"),require("antd")):e["@nocobase/plugin-workflow-aggregate"]=t(e["@nocobase/plugin-workflow/client"],e["react-i18next"],e["@ant-design/icons"],e["@formily/react"],e["@nocobase/client"],e.react,e.antd)}(self,function(e,t,n,r,o,i,a){return function(){"use strict";var l={482:function(e){e.exports=n},505:function(e){e.exports=r},772:function(e){e.exports=o},433:function(t){t.exports=e},721:function(e){e.exports=a},156:function(e){e.exports=i},238:function(e){e.exports=t}},c={};function u(e){var t=c[e];if(void 0!==t)return t.exports;var n=c[e]={exports:{}};return l[e](n,n.exports,u),n.exports}u.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return u.d(t,{a:t}),t},u.d=function(e,t){for(var n in t)u.o(t,n)&&!u.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var s={};u.r(s),u.d(s,{default:function(){return U}});var f=u("772"),p=u("505"),d=u("721"),y=u("156"),b=u.n(y),m=u("482"),v=u("433"),g=u("238"),h="workflow-aggregate";function O(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function x(e,t,n,r,o,i,a){try{var l=e[i](a),c=l.value}catch(e){n(e);return}l.done?t(c):Promise.resolve(c).then(r,o)}function w(e){return function(){var t=this,n=arguments;return new Promise(function(r,o){var i=e.apply(t,n);function a(e){x(i,r,o,a,l,"next",e)}function l(e){x(i,r,o,a,l,"throw",e)}a(void 0)})}}function j(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function S(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function C(e){return(C=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function k(e,t){return(k=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function P(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n,r,o=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=o){var i=[],a=!0,l=!1;try{for(o=o.call(e);!(a=(n=o.next()).done)&&(i.push(n.value),!t||i.length!==t);a=!0);}catch(e){l=!0,r=e}finally{try{!a&&null!=o.return&&o.return()}finally{if(l)throw r}}return i}}(e,t)||T(e,t)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function F(e){return function(e){if(Array.isArray(e))return O(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||T(e)||function(){throw TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function T(e,t){if(e){if("string"==typeof e)return O(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if("Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return O(e,t)}}function _(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch(e){}return(_=function(){return!!e})()}function I(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function l(i){return function(l){return function(i){if(n)throw TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,l])}}}function q(){var e,t,n=(e=["\n                position: relative;\n                width: 100%;\n              "],!t&&(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}})));return q=function(){return n},n}function E(e){return["hasMany","belongsToMany"].includes(e.type)}function D(e){var t,n,r,o,i=e.value,a=e.onChange,l=function(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],!(t.indexOf(n)>=0)&&(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++){if(n=i[r],!(t.indexOf(n)>=0))Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}}return o}(e,["value","onChange"]),c=(0,p.useForm)().setValuesIn,u=(0,f.useCollectionManager_deprecated)().getCollection;var s=(t=(0,f.useCompile)(),[v.nodesOptions,v.triggerOptions].map(function(e){var n,r=null===(n=e.useOptions({types:[E],appends:null,depth:4}))||void 0===n?void 0:n.filter(Boolean);return{label:t(e.label),value:e.value,key:e.value,children:t(r),disabled:r&&!r.length}})),m=P((0,y.useState)(s),2),g=m[0],h=m[1],O=null!=i?i:{},x=O.associatedKey,j=O.name,C=[],k=(void 0===x?"":x).match(/^{{(.*)}}$/);k&&(C=F(k[1].trim().split(".").slice(0,-1)).concat([j]));var T=(n=w(function(e){var t,n;return I(this,function(r){switch(r.label){case 0:if(!(!(null===(t=(n=e[e.length-1]).children)||void 0===t?void 0:t.length)&&!n.isLeaf&&n.loadChildren))return[3,2];return[4,n.loadChildren(n)];case 1:r.sent(),h(function(e){return F(e)}),r.label=2;case 2:return[2]}})}),function(e){return n.apply(this,arguments)});(0,y.useEffect)(function(){var e;(e=w(function(){var e,t,n;return I(this,function(r){switch(r.label){case 0:if(e=function(e){var n,r;return I(this,function(o){switch(o.label){case 0:n=C[e],o.label=1;case 1:if(o.trys.push([1,6,,7]),0!==e)return[3,2];return t=g.find(function(e){return e.value===n}),[3,5];case 2:if(!(t.loadChildren&&!(null===(r=t.children)||void 0===r?void 0:r.length)))return[3,4];return[4,t.loadChildren(t)];case 3:o.sent(),o.label=4;case 4:t=t.children.find(function(e){return e.value===n}),o.label=5;case 5:return[3,7];case 6:return console.error(o.sent()),[3,7];case 7:return[2]}})},!C||g.length<=1)return[2];t=null,n=0,r.label=1;case 1:if(!(n<C.length))return[3,4];return[5,function(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}(e(n))];case 2:r.sent(),r.label=3;case 3:return n++,[3,1];case 4:return h(F(g)),[2]}})}),function(){return e.apply(this,arguments)})()},[i,g.length]);var _=(0,y.useCallback)(function(e,t){if(!(null==e?void 0:e.length)){c("collection",null),a({});return}var n=t.pop().field;if(!!n&&!!["hasMany","belongsToMany"].includes(n.type)){var r=n.collectionName,o=n.target,i=n.name,l=n.dataSourceKey,s=u(r,l).fields.find(function(e){return e.primaryKey});c("collection",(0,f.joinCollectionName)(l,o)),a({name:i,associatedKey:"{{".concat(e.slice(0,-1).join("."),".").concat(s.name,"}}"),associatedCollection:(0,f.joinCollectionName)(l,r)})}},[a]);return b().createElement(d.Cascader,(r=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){S(e,t,n[t])})}return e}({},l),o=(o={value:C,options:g,changeOnSelect:!0,onChange:_,loadData:T},o),Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(o)):(function(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n.push.apply(n,r)}return n})(Object(o)).forEach(function(e){Object.defineProperty(r,e,Object.getOwnPropertyDescriptor(o,e))}),r))}var A=function(e){var t,n,r;function o(){var e,t,n,r;return!function(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}(this,o),t=this,n=o,r=arguments,n=C(n),S(e=function(e,t){return t&&("object"===function(e){return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e}(t)||"function"==typeof t)?t:function(e){if(void 0===e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(t,_()?Reflect.construct(n,r||[],C(t).constructor):n.apply(t,r)),"title",'{{t("Aggregate", { ns: "'.concat(h,'" })}}')),S(e,"type","aggregate"),S(e,"group","collection"),S(e,"description",'{{t("Counting, summing, finding maximum, minimum, and average values for multiple records of a collection or associated data of a record.", { ns: "'.concat(h,'" })}}')),S(e,"icon",b().createElement(m.BarChartOutlined,{style:{}})),S(e,"fieldset",{aggregator:{type:"string",title:'{{t("Aggregator function", { ns: "'.concat(h,'" })}}'),"x-decorator":"FormItem","x-component":"Radio.Group",enum:[{label:"COUNT",value:"count"},{label:"SUM",value:"sum"},{label:"AVG",value:"avg"},{label:"MIN",value:"min"},{label:"MAX",value:"max"}],required:!0,default:"count"},associated:{type:"boolean",title:'{{t("Target type", { ns: "'.concat(h,'" })}}'),"x-decorator":"FormItem","x-component":"Radio.Group",enum:[{label:'{{t("Data of collection", { ns: "'.concat(h,'" })}}'),value:!1},{label:'{{t("Data of associated collection", { ns: "'.concat(h,'" })}}'),value:!0}],required:!0,default:!1,"x-reactions":[{target:"collection",effects:["onFieldValueChange"],fulfill:{state:{value:null}}},{target:"association",effects:["onFieldValueChange"],fulfill:{state:{value:null}}}]},collectionField:{type:"void","x-decorator":"SchemaComponentContext.Provider","x-decorator-props":{value:{designable:!1}},"x-component":"Grid",properties:{row:{type:"void","x-component":"Grid.Row",properties:{target:{type:"void","x-component":"Grid.Col",properties:{collection:{type:"string",required:!0,"x-decorator":"FormItem","x-component":"DataSourceCollectionCascader","x-component-props":{dataSourceFilter:function(e){return"main"===e.key||e.options.isDBInstance}},title:'{{t("Data of collection", { ns: "'.concat(h,'" })}}'),"x-reactions":[{dependencies:["associated"],fulfill:{state:{display:'{{$deps[0] ? "hidden" : "visible"}}'}}},{target:"params.field",effects:["onFieldValueChange"],fulfill:{state:{value:null}}},{target:"params.filter",effects:["onFieldValueChange"],fulfill:{state:{value:null}}}]},association:{type:"object",title:'{{t("Data of associated collection", { ns: "'.concat(h,'" })}}'),"x-decorator":"FormItem","x-component":"AssociatedConfig","x-component-props":{changeOnSelect:!0},"x-reactions":[{dependencies:["associated"],fulfill:{state:{visible:"{{!!$deps[0]}}"}}}],required:!0}}},field:{type:"void","x-component":"Grid.Col",properties:{"params.field":{type:"string",title:'{{t("Field to aggregate", { ns: "'.concat(h,'" })}}'),"x-decorator":"FormItem","x-component":"FieldsSelect","x-component-props":{filter:function(e){return!e.hidden&&e.interface&&!["belongsTo","hasOne","hasMany","belongsToMany"].includes(e.type)}},required:!0,"x-reactions":[{dependencies:["collection"],fulfill:{state:{visible:"{{!!$deps[0]}}"}}}]}}}}}}},params:{type:"object",properties:{distinct:{type:"boolean","x-decorator":"FormItem","x-component":"Checkbox","x-content":'{{t("Distinct", { ns: "'.concat(h,'" })}}'),"x-reactions":[{dependencies:["collection","aggregator"],fulfill:{state:{visible:'{{!!$deps[0] && ["count"].includes($deps[1])}}'}}}]},filter:{type:"object",title:'{{t("Filter")}}',"x-decorator":"FormItem","x-component":"Filter","x-use-component-props":function(){var e=(0,p.useForm)().values,t=P((0,f.parseCollectionName)(null==e?void 0:e.collection),2),n=t[0],r=t[1];return{options:(0,f.useCollectionFilterOptions)(r,n),className:(0,f.css)(q())}},"x-component-props":{dynamicComponent:"FilterDynamicComponent"},"x-reactions":[{dependencies:["collection"],fulfill:{state:{visible:"{{!!$deps[0]}}"}}}]}}}}),S(e,"scope",{useCollectionDataSource:f.useCollectionDataSource}),S(e,"components",{SchemaComponentContext:f.SchemaComponentContext,FilterDynamicComponent:v.FilterDynamicComponent,FieldsSelect:v.FieldsSelect,ValueBlock:v.ValueBlock,AssociatedConfig:D}),e}return!function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&k(e,t)}(o,e),t=o,n=[{key:"useVariables",value:function(e,t){var n,r=e.key,o=e.title,i=t.types,a=t.fieldNames,l=void 0===a?v.defaultFieldNames:a;return i&&!i.some(function(e){return e in v.BaseTypeSets||Object.values(v.BaseTypeSets).some(function(t){return t.has(e)})})?null:(S(n={},l.value,r),S(n,l.label,o),n)}},{key:"useInitializers",value:function(e){var t,n=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return(0,function(e){return(0,g.useTranslation)(h,e)}(t).t)(e)}("Query result");return e.config.collection?{name:"#".concat(e.id),type:"item",title:null!==(t=e.title)&&void 0!==t?t:"#".concat(e.id),Component:v.ValueBlock.Initializer,node:e,resultTitle:n}:null}}],j(t.prototype,n),o}(v.Instruction);function M(e,t,n,r,o,i,a){try{var l=e[i](a),c=l.value}catch(e){n(e);return}l.done?t(c):Promise.resolve(c).then(r,o)}function B(e){return function(){var t=this,n=arguments;return new Promise(function(r,o){var i=e.apply(t,n);function a(e){M(i,r,o,a,l,"next",e)}function l(e){M(i,r,o,a,l,"throw",e)}a(void 0)})}}function R(e,t,n){return(R=z()?Reflect.construct:function(e,t,n){var r=[null];r.push.apply(r,t);var o=new(Function.bind.apply(e,r));return n&&N(o,n.prototype),o}).apply(null,arguments)}function V(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function G(e){return(G=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function N(e,t){return(N=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function $(e){var t="function"==typeof Map?new Map:void 0;return($=function(e){var n;if(null===e||(n=e,-1===Function.toString.call(n).indexOf("[native code]")))return e;if("function"!=typeof e)throw TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,r)}function r(){return R(e,arguments,G(this).constructor)}return r.prototype=Object.create(e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),N(r,e)})(e)}function z(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch(e){}return(z=function(){return!!e})()}function K(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function l(i){return function(l){return function(i){if(n)throw TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,l])}}}var U=function(e){var t,n,r;function o(){var e,t,n;return!function(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}(this,o),e=this,t=o,n=arguments,t=G(t),function(e,t){return t&&("object"===function(e){return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e}(t)||"function"==typeof t)?t:function(e){if(void 0===e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(e,z()?Reflect.construct(t,n||[],G(e).constructor):t.apply(e,n))}return!function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&N(e,t)}(o,e),t=o,n=[{key:"afterAdd",value:function(){return B(function(){return K(this,function(e){return[2]})})()}},{key:"beforeLoad",value:function(){return B(function(){return K(this,function(e){return[2]})})()}},{key:"load",value:function(){var e=this;return B(function(){return K(this,function(t){return e.app.pm.get("workflow").registerInstruction("aggregate",A),[2]})})()}}],V(t.prototype,n),o}($(f.Plugin));return s}()});