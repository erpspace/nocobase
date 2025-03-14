/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("@formily/antd-v5"),require("@nocobase/plugin-workflow/client"),require("react-i18next"),require("@ant-design/icons"),require("@formily/shared"),require("@formily/react"),require("@formily/core"),require("@nocobase/client"),require("react")):"function"==typeof define&&define.amd?define("@nocobase/plugin-workflow-request",["@formily/antd-v5","@nocobase/plugin-workflow/client","react-i18next","@ant-design/icons","@formily/shared","@formily/react","@formily/core","@nocobase/client","react"],t):"object"==typeof exports?exports["@nocobase/plugin-workflow-request"]=t(require("@formily/antd-v5"),require("@nocobase/plugin-workflow/client"),require("react-i18next"),require("@ant-design/icons"),require("@formily/shared"),require("@formily/react"),require("@formily/core"),require("@nocobase/client"),require("react")):e["@nocobase/plugin-workflow-request"]=t(e["@formily/antd-v5"],e["@nocobase/plugin-workflow/client"],e["react-i18next"],e["@ant-design/icons"],e["@formily/shared"],e["@formily/react"],e["@formily/core"],e["@nocobase/client"],e.react)}(self,function(e,t,r,o,n,a,c,i,l){return function(){"use strict";var u={482:function(e){e.exports=o},632:function(t){t.exports=e},563:function(e){e.exports=c},505:function(e){e.exports=a},875:function(e){e.exports=n},772:function(e){e.exports=i},433:function(e){e.exports=t},156:function(e){e.exports=l},238:function(e){e.exports=r}},p={};function s(e){var t=p[e];if(void 0!==t)return t.exports;var r=p[e]={exports:{}};return u[e](r,r.exports,s),r.exports}s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,{a:t}),t},s.d=function(e,t){for(var r in t)s.o(t,r)&&!s.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var f={};s.r(f),s.d(f,{default:function(){return Y}});var m=s("772"),d=s("156"),y=s.n(d),b=s("563"),x=s("875"),v=s("505"),h=s("632"),w=s("482"),g=s("433"),O=s("238"),j="workflow-request";function T(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return(0,function(e){return(0,O.useTranslation)(j,e)}(t).t)(e)}function I(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,o=Array(t);r<t;r++)o[r]=e[r];return o}function S(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function P(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function k(e){return(k=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function A(e,t){return(A=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function F(e,t){return!t&&(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}function q(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch(e){}return(q=function(){return!!e})()}function E(){var e=F(["\n            font-size: 80%;\n            font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;\n          "]);return E=function(){return e},e}function N(){var e=F(["\n            font-size: 80%;\n            font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;\n          "]);return N=function(){return e},e}function R(){var e=F(["\n                & > .ant-space-item:first-child,\n                & > .ant-space-item:last-child {\n                  flex-shrink: 0;\n                }\n              "]);return R=function(){return e},e}function _(){var e=F(["\n                & > .ant-space-item:first-child,\n                & > .ant-space-item:last-child {\n                  flex-shrink: 0;\n                }\n              "]);return _=function(){return e},e}var C={"application/json":{type:"void",properties:{data:{type:"object","x-decorator":"FormItem","x-decorator-props":{},"x-component":"WorkflowVariableJSON","x-component-props":{changeOnSelect:!0,autoSize:{minRows:10},placeholder:'{{t("Input request data", { ns: "'.concat(j,'" })}}')}}}},"application/x-www-form-urlencoded":{type:"void",properties:{data:{type:"array","x-decorator":"FormItem","x-decorator-props":{},"x-component":"ArrayItems",items:{type:"object",properties:{space:{type:"void","x-component":"Space",properties:{name:{type:"string","x-decorator":"FormItem","x-component":"Input","x-component-props":{placeholder:'{{t("Name")}}'}},value:{type:"string","x-decorator":"FormItem","x-component":"WorkflowVariableTextArea","x-component-props":{useTypedConstant:!0}},remove:{type:"void","x-decorator":"FormItem","x-component":"ArrayItems.Remove"}}}}},properties:{add:{type:"void",title:'{{t("Add key-value pairs", { ns: "'.concat(j,'" })}}'),"x-component":"ArrayItems.Addition"}}}}},"application/xml":{type:"void",properties:{data:{type:"string","x-decorator":"FormItem","x-component":"WorkflowVariableRawTextArea","x-component-props":{placeholder:'<?xml version="1.0" encoding="UTF-8"?>',autoSize:{minRows:10},className:(0,m.css)(E())}}}},"text/plain":{type:"void",properties:{data:{type:"string","x-decorator":"FormItem","x-component":"WorkflowVariableRawTextArea","x-component-props":{autoSize:{minRows:10},className:(0,m.css)(N())}}}}};function V(e){var t,r,o=(0,v.useField)(),n=(0,v.useForm)(),a=n.values,c=n.setValuesIn,i=n.clearFormGraph,l=a.contentType;var u=(t=(0,d.useState)(C[l]),r=2,function(e){if(Array.isArray(e))return e}(t)||function(e,t){var r,o,n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var a=[],c=!0,i=!1;try{for(n=n.call(e);!(c=(r=n.next()).done)&&(a.push(r.value),!t||a.length!==t);c=!0);}catch(e){i=!0,o=e}finally{try{!c&&null!=n.return&&n.return()}finally{if(i)throw o}}return a}}(t,2)||function(e,t){if(e){if("string"==typeof e)return I(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);if("Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return I(e,t)}}(t,r)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),p=u[0],s=u[1];return(0,v.useFormEffects)(function(){(0,b.onFieldValueChange)("contentType",function(e){var t,r;i("".concat(o.address,".*")),s((t=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},o=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),o.forEach(function(t){P(e,t,r[t])})}return e}({},C[e.value]),r=(r={name:(0,x.uid)()},r),Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):(function(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r.push.apply(r,o)}return r})(Object(r)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}),t)),c("data",null)})}),y().createElement(m.SchemaComponent,{basePath:o.address,schema:p,onlyRenderProperties:!0})}var W=function(e){var t,r,o;function n(){var e,t,r,o;return!function(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}(this,n),t=this,r=n,o=arguments,r=k(r),P(e=function(e,t){return t&&("object"===function(e){return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e}(t)||"function"==typeof t)?t:function(e){if(void 0===e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(t,q()?Reflect.construct(r,o||[],k(t).constructor):r.apply(t,o)),"title",'{{t("HTTP request", { ns: "'.concat(j,'" })}}')),P(e,"type","request"),P(e,"group","extended"),P(e,"description",'{{t("Send HTTP request to a URL. You can use the variables in the upstream nodes as request headers, parameters and request body.", { ns: "'.concat(j,'" })}}')),P(e,"icon",y().createElement(w.GlobalOutlined,null)),P(e,"fieldset",{method:{type:"string",required:!0,title:'{{t("HTTP method", { ns: "'.concat(j,'" })}}'),"x-decorator":"FormItem","x-component":"Select","x-component-props":{showSearch:!1,allowClear:!1,className:"auto-width"},enum:[{label:"GET",value:"GET"},{label:"POST",value:"POST"},{label:"PUT",value:"PUT"},{label:"PATCH",value:"PATCH"},{label:"DELETE",value:"DELETE"}],default:"POST"},url:{type:"string",required:!0,title:'{{t("URL", { ns: "'.concat(j,'" })}}'),"x-decorator":"FormItem","x-decorator-props":{},"x-component":"WorkflowVariableTextArea","x-component-props":{placeholder:"https://www.nocobase.com"}},contentType:{type:"string",title:'{{t("Content-Type", { ns: "'.concat(j,'" })}}'),"x-decorator":"FormItem","x-component":"Select","x-component-props":{allowClear:!1},enum:[{label:"application/json",value:"application/json"},{label:"application/x-www-form-urlencoded",value:"application/x-www-form-urlencoded"},{label:"application/xml",value:"application/xml"},{label:"text/plain",value:"text/plain"}],default:"application/json"},headers:{type:"array","x-component":"ArrayItems","x-decorator":"FormItem",title:'{{t("Headers", { ns: "'.concat(j,'" })}}'),description:'{{t(\'"Content-Type" will be ignored from headers.\', { ns: "'.concat(j,'" })}}'),items:{type:"object",properties:{space:{type:"void","x-component":"Space","x-component-props":{style:{flexWrap:"nowrap",maxWidth:"100%"},className:(0,m.css)(R())},properties:{name:{type:"string","x-decorator":"FormItem","x-component":"Input","x-component-props":{placeholder:'{{t("Name")}}'}},value:{type:"string","x-decorator":"FormItem","x-component":"WorkflowVariableTextArea","x-component-props":{useTypedConstant:!0,placeholder:'{{t("Value")}}'}},remove:{type:"void","x-decorator":"FormItem","x-component":"ArrayItems.Remove"}}}}},properties:{add:{type:"void",title:'{{t("Add request header", { ns: "'.concat(j,'" })}}'),"x-component":"ArrayItems.Addition"}}},params:{type:"array","x-component":"ArrayItems","x-decorator":"FormItem",title:'{{t("Parameters", { ns: "'.concat(j,'" })}}'),items:{type:"object",properties:{space:{type:"void","x-component":"Space","x-component-props":{style:{flexWrap:"nowrap",maxWidth:"100%"},className:(0,m.css)(_())},properties:{name:{type:"string","x-decorator":"FormItem","x-component":"Input","x-component-props":{placeholder:'{{t("Name")}}'}},value:{type:"string","x-decorator":"FormItem","x-component":"WorkflowVariableTextArea","x-component-props":{useTypedConstant:!0,placeholder:'{{t("Value")}}'}},remove:{type:"void","x-decorator":"FormItem","x-component":"ArrayItems.Remove"}}}}},properties:{add:{type:"void",title:'{{t("Add parameter", { ns: "'.concat(j,'" })}}'),"x-component":"ArrayItems.Addition"}}},data:{type:"void",title:'{{t("Body", { ns: "'.concat(j,'" })}}'),"x-decorator":"FormItem","x-decorator-props":{},"x-component":"BodyComponent"},timeout:{type:"number",title:'{{t("Timeout config", { ns: "'.concat(j,'" })}}'),"x-decorator":"FormItem","x-decorator-props":{},"x-component":"InputNumber","x-component-props":{addonAfter:'{{t("ms", { ns: "'.concat(j,'" })}}'),min:1,step:1e3,defaultValue:5e3}},ignoreFail:{type:"boolean","x-content":'{{t("Ignore failed request and continue workflow", { ns: "'.concat(j,'" })}}'),"x-decorator":"FormItem","x-component":"Checkbox"}}),P(e,"components",{ArrayItems:h.ArrayItems,BodyComponent:V,WorkflowVariableJSON:g.WorkflowVariableJSON,WorkflowVariableTextArea:g.WorkflowVariableTextArea,WorkflowVariableRawTextArea:g.WorkflowVariableRawTextArea}),P(e,"testable",!0),e}return!function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&A(e,t)}(n,e),t=n,r=[{key:"useVariables",value:function(e,t){var r,o,n,a,c=e.key,i=e.title,l=e.config;t.types;var u=T("Status code"),p=T("Data"),s=T("Response headers");return P(a={},g.defaultFieldNames.value,c),P(a,g.defaultFieldNames.label,i),P(a,g.defaultFieldNames.children,l.onlyData?null:[(P(r={},g.defaultFieldNames.value,"status"),P(r,g.defaultFieldNames.label,u),r),(P(o={},g.defaultFieldNames.value,"data"),P(o,g.defaultFieldNames.label,p),o),(P(n={},g.defaultFieldNames.value,"headers"),P(n,g.defaultFieldNames.label,s),n)]),a}}],S(t.prototype,r),n}(g.Instruction);function M(e,t,r,o,n,a,c){try{var i=e[a](c),l=i.value}catch(e){r(e);return}i.done?t(l):Promise.resolve(l).then(o,n)}function D(e){return function(){var t=this,r=arguments;return new Promise(function(o,n){var a=e.apply(t,r);function c(e){M(a,o,n,c,i,"next",e)}function i(e){M(a,o,n,c,i,"throw",e)}c(void 0)})}}function U(e,t,r){return(U=L()?Reflect.construct:function(e,t,r){var o=[null];o.push.apply(o,t);var n=new(Function.bind.apply(e,o));return r&&H(n,r.prototype),n}).apply(null,arguments)}function z(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function B(e){return(B=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function H(e,t){return(H=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function G(e){var t="function"==typeof Map?new Map:void 0;return(G=function(e){var r;if(null===e||(r=e,-1===Function.toString.call(r).indexOf("[native code]")))return e;if("function"!=typeof e)throw TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,o)}function o(){return U(e,arguments,B(this).constructor)}return o.prototype=Object.create(e.prototype,{constructor:{value:o,enumerable:!1,writable:!0,configurable:!0}}),H(o,e)})(e)}function L(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch(e){}return(L=function(){return!!e})()}function J(e,t){var r,o,n,a,c={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return a={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function i(a){return function(i){return function(a){if(r)throw TypeError("Generator is already executing.");for(;c;)try{if(r=1,o&&(n=2&a[0]?o.return:a[0]?o.throw||((n=o.return)&&n.call(o),0):o.next)&&!(n=n.call(o,a[1])).done)return n;switch(o=0,n&&(a=[2&a[0],n.value]),a[0]){case 0:case 1:n=a;break;case 4:return c.label++,{value:a[1],done:!1};case 5:c.label++,o=a[1],a=[0];continue;case 7:a=c.ops.pop(),c.trys.pop();continue;default:if(!(n=(n=c.trys).length>0&&n[n.length-1])&&(6===a[0]||2===a[0])){c=0;continue}if(3===a[0]&&(!n||a[1]>n[0]&&a[1]<n[3])){c.label=a[1];break}if(6===a[0]&&c.label<n[1]){c.label=n[1],n=a;break}if(n&&c.label<n[2]){c.label=n[2],c.ops.push(a);break}n[2]&&c.ops.pop(),c.trys.pop();continue}a=t.call(e,c)}catch(e){a=[6,e],o=0}finally{r=n=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,i])}}}var Y=function(e){var t,r,o;function n(){var e,t,r;return!function(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}(this,n),e=this,t=n,r=arguments,t=B(t),function(e,t){return t&&("object"===function(e){return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e}(t)||"function"==typeof t)?t:function(e){if(void 0===e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(e,L()?Reflect.construct(t,r||[],B(e).constructor):t.apply(e,r))}return!function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&H(e,t)}(n,e),t=n,r=[{key:"afterAdd",value:function(){return D(function(){return J(this,function(e){return[2]})})()}},{key:"beforeLoad",value:function(){return D(function(){return J(this,function(e){return[2]})})()}},{key:"load",value:function(){var e=this;return D(function(){return J(this,function(t){return e.app.pm.get("workflow").registerInstruction("request",W),[2]})})()}}],z(t.prototype,r),n}(G(m.Plugin));return f}()});