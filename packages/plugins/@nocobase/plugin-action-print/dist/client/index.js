/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("@nocobase/client"),require("react")):"function"==typeof define&&define.amd?define("@nocobase/plugin-action-print",["@nocobase/client","react"],t):"object"==typeof exports?exports["@nocobase/plugin-action-print"]=t(require("@nocobase/client"),require("react")):e["@nocobase/plugin-action-print"]=t(e["@nocobase/client"],e.react)}(self,function(e,t){return function(){var n,r,o,i,c,u,a,l,f={581:function(e){e.exports=function(e,t){return"undefined"!=typeof __deoptimization_sideEffect__&&__deoptimization_sideEffect__(e,t),t}},772:function(t){"use strict";t.exports=e},156:function(e){"use strict";e.exports=t}},p={};function s(e){var t=p[e];if(void 0!==t)return t.exports;var n=p[e]={exports:{}};return f[e].call(n.exports,n,n.exports,s),n.exports}s.m=f,s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,{a:t}),t},r=Object.getPrototypeOf?function(e){return Object.getPrototypeOf(e)}:function(e){return e.__proto__},s.t=function(e,t){if(1&t&&(e=this(e)),8&t||"object"==typeof e&&e&&(4&t&&e.__esModule||16&t&&"function"==typeof e.then))return e;var o=Object.create(null);s.r(o);var i={};n=n||[null,r({}),r([]),r(r)];for(var c=2&t&&e;"object"==typeof c&&!~n.indexOf(c);c=r(c))Object.getOwnPropertyNames(c).forEach(function(t){i[t]=function(){return e[t]}});return i.default=function(){return e},s.d(o,i),o},s.d=function(e,t){for(var n in t)s.o(t,n)&&!s.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},s.f={},s.e=function(e){return Promise.all(Object.keys(s.f).reduce(function(t,n){return s.f[n](e,t),t},[]))},s.u=function(e){return"0c9a4c2ce72a5099.js"},s.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||Function("return this")()}catch(e){if("object"==typeof window)return window}}(),s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o={},i="@nocobase/plugin-action-print:",s.l=function(e,t,n,r){if(o[e]){o[e].push(t);return}if(void 0!==n){for(var c,u,a=document.getElementsByTagName("script"),l=0;l<a.length;l++){var f=a[l];if(f.getAttribute("src")==e||f.getAttribute("data-webpack")==i+n){c=f;break}}}!c&&(u=!0,(c=document.createElement("script")).charset="utf-8",c.timeout=120,s.nc&&c.setAttribute("nonce",s.nc),c.setAttribute("data-webpack",i+n),c.src=e),o[e]=[t];var p=function(t,n){c.onerror=c.onload=null,clearTimeout(b);var r=o[e];if(delete o[e],c.parentNode&&c.parentNode.removeChild(c),r&&r.forEach(function(e){return e(n)}),t)return t(n)},b=setTimeout(p.bind(null,void 0,{type:"timeout",target:c}),12e4);c.onerror=p.bind(null,c.onerror),c.onload=p.bind(null,c.onload),u&&document.head.appendChild(c)},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.p=(!(c=window.__nocobase_public_path__||"/").endsWith("/")&&(c+="/"),c+"static/plugins/@nocobase/plugin-action-print/dist/client/"),u={909:0},s.f.j=function(e,t){var n=s.o(u,e)?u[e]:void 0;if(0!==n){if(n)t.push(n[2]);else{var r=new Promise(function(t,r){n=u[e]=[t,r]});t.push(n[2]=r);var o=s.p+s.u(e),i=Error();s.l(o,function(t){if(s.o(u,e)&&(0!==(n=u[e])&&(u[e]=void 0),n)){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;i.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",i.name="ChunkLoadError",i.type=r,i.request=o,n[1](i)}},"chunk-"+e,e)}}},a=function(e,t){var n=t[0],r=t[1],o=t[2],i,c,a=0;if(n.some(function(e){return 0!==u[e]})){for(i in r)s.o(r,i)&&(s.m[i]=r[i]);o&&o(s)}for(e&&e(t);a<n.length;a++)c=n[a],s.o(u,c)&&u[c]&&u[c][0](),u[c]=0},(l=self.webpackChunk_nocobase_plugin_action_print=self.webpackChunk_nocobase_plugin_action_print||[]).forEach(a.bind(null,0)),l.push=a.bind(null,l.push.bind(l));var b={};return!function(){"use strict";s.r(b),s.d(b,{PluginActionPrintClient:function(){return O},default:function(){return w}});var e=s("772"),t=[{name:"Customize",Component:function(e){return e.children},children:[{name:"editButton",Component:e.ActionDesigner.ButtonEditor,useComponentProps:function(){return(0,e.useSchemaToolbar)().buttonEditorProps}},{name:"linkageRules",Component:e.SchemaSettingsLinkageRules,useComponentProps:function(){var t,n,r=(0,e.useCollection_deprecated)().name;return t=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){var r,o,i;r=e,o=t,i=n[t],o in r?Object.defineProperty(r,o,{value:i,enumerable:!0,configurable:!0,writable:!0}):r[o]=i})}return e}({},(0,e.useSchemaToolbar)().linkageRulesProps),n=(n={collectionName:r},n),Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):(function(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n.push.apply(n,r)}return n})(Object(n)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}),t}},{name:"remove",sort:100,Component:e.ActionDesigner.RemoveButton,useComponentProps:function(){return(0,e.useSchemaToolbar)().removeButtonProps}}]}],n=new e.SchemaSettings({name:"ActionSettings:print",items:t}),r=new e.SchemaSettings({name:"actionSettings:print",items:t}),o=s("156"),i=s.n(o),c=function(t){var n,r;return i().createElement(e.ActionInitializer,(n=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){var r,o,i;r=e,o=t,i=n[t],o in r?Object.defineProperty(r,o,{value:i,enumerable:!0,configurable:!0,writable:!0}):r[o]=i})}return e}({},t),r=(r={schema:{title:'{{ t("Print") }}',"x-action":"print","x-component":"Action","x-use-component-props":"useDetailPrintActionProps","x-component-props":{icon:"PrinterOutlined"}}},r),Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(r)):(function(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n.push.apply(n,r)}return n})(Object(r)).forEach(function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(r,e))}),n))},u=s(581);function a(e,t,n,r,o,i,c){try{var u=e[i](c),a=u.value}catch(e){n(e);return}u.done?t(a):Promise.resolve(a).then(r,o)}var l=function(){var t=(0,e.useFormBlockContext)(),n=(0,e.useDetailsBlockContext)().formBlockRef,r=(0,e.useLazy)(function(){return u("imported_19jiev_component",s.e("216").then(s.t.bind(s,468,23)))},"useReactToPrint")({content:function(){var e,r=(null==t?void 0:null===(e=t.formBlockRef)||void 0===e?void 0:e.current)||(null==n?void 0:n.current);return r&&r.querySelector(".nb-grid")?r.querySelector(".nb-grid"):null},pageStyle:"@media print {\n        * {\n          margin: 0;\n        }\n        .nb-grid {\n          padding-top: 20px !important;\n        }\n         :not(.ant-formily-item-control-content-component) > div.ant-formily-layout div.nb-action-bar { {\n          overflow: hidden; height: 0;\n        }\n      }"});return{onClick:function(){var e;return(e=function(){return function(e,t){var n,r,o,i,c={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw TypeError("Generator is already executing.");for(;c;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return c.label++,{value:i[1],done:!1};case 5:c.label++,r=i[1],i=[0];continue;case 7:i=c.ops.pop(),c.trys.pop();continue;default:if(!(o=(o=c.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){c=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){c.label=i[1];break}if(6===i[0]&&c.label<o[1]){c.label=o[1],o=i;break}if(o&&c.label<o[2]){c.label=o[2],c.ops.push(i);break}o[2]&&c.ops.pop(),c.trys.pop();continue}i=t.call(e,c)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}}(this,function(e){return r(),[2]})},function(){var t=this,n=arguments;return new Promise(function(r,o){var i=e.apply(t,n);function c(e){a(i,r,o,c,u,"next",e)}function u(e){a(i,r,o,c,u,"throw",e)}c(void 0)})})()}}},f=function(t){return i().createElement(e.SchemaComponentOptions,{components:{PrintActionInitializer:c},scope:{useDetailPrintActionProps:l}},t.children)};function p(e,t,n,r,o,i,c){try{var u=e[i](c),a=u.value}catch(e){n(e);return}u.done?t(a):Promise.resolve(a).then(r,o)}function d(e,t,n){return(d=g()?Reflect.construct:function(e,t,n){var r=[null];r.push.apply(r,t);var o=new(Function.bind.apply(e,r));return n&&h(o,n.prototype),o}).apply(null,arguments)}function y(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function m(e){return(m=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function h(e,t){return(h=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function v(e){var t="function"==typeof Map?new Map:void 0;return(v=function(e){var n;if(null===e||(n=e,-1===Function.toString.call(n).indexOf("[native code]")))return e;if("function"!=typeof e)throw TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,r)}function r(){return d(e,arguments,m(this).constructor)}return r.prototype=Object.create(e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),h(r,e)})(e)}function g(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch(e){}return(g=function(){return!!e})()}var O=function(e){var t,o,i;function c(){var e,t,n;return!function(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}(this,c),e=this,t=c,n=arguments,t=m(t),function(e,t){return t&&("object"===function(e){return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e}(t)||"function"==typeof t)?t:function(e){if(void 0===e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(e,g()?Reflect.construct(t,n||[],m(e).constructor):t.apply(e,n))}return!function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&h(e,t)}(c,e),t=c,o=[{key:"load",value:function(){var e,t=this;return(e=function(){var e;return function(e,t){var n,r,o,i,c={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw TypeError("Generator is already executing.");for(;c;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return c.label++,{value:i[1],done:!1};case 5:c.label++,r=i[1],i=[0];continue;case 7:i=c.ops.pop(),c.trys.pop();continue;default:if(!(o=(o=c.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){c=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){c.label=i[1];break}if(6===i[0]&&c.label<o[1]){c.label=o[1],o=i;break}if(o&&c.label<o[2]){c.label=o[2],c.ops.push(i);break}o[2]&&c.ops.pop(),c.trys.pop();continue}i=t.call(e,c)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}}(this,function(o){return t.app.use(f),t.app.schemaSettingsManager.add(n),t.app.schemaSettingsManager.add(r),e={title:'{{t("Print")}}',Component:"PrintActionInitializer",schema:{"x-component":"Action","x-toolbar":"ActionSchemaToolbar","x-settings":"actionSettings:print","x-action":"print"}},t.app.schemaInitializerManager.addItem("details:configureActions","enableActions.print",e),t.app.schemaInitializerManager.addItem("CalendarFormActionInitializers","enableActions.print",e),[2]})},function(){var t=this,n=arguments;return new Promise(function(r,o){var i=e.apply(t,n);function c(e){p(i,r,o,c,u,"next",e)}function u(e){p(i,r,o,c,u,"throw",e)}c(void 0)})})()}}],y(t.prototype,o),c}(v(e.Plugin)),w=O}(),b}()});