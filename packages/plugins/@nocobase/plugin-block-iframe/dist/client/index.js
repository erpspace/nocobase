/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react-i18next"),require("react"),require("@formily/antd-v5"),require("@formily/shared"),require("@nocobase/client"),require("antd"),require("@ant-design/icons"),require("@formily/react")):"function"==typeof define&&define.amd?define("@nocobase/plugin-block-iframe",["react-i18next","react","@formily/antd-v5","@formily/shared","@nocobase/client","antd","@ant-design/icons","@formily/react"],t):"object"==typeof exports?exports["@nocobase/plugin-block-iframe"]=t(require("react-i18next"),require("react"),require("@formily/antd-v5"),require("@formily/shared"),require("@nocobase/client"),require("antd"),require("@ant-design/icons"),require("@formily/react")):e["@nocobase/plugin-block-iframe"]=t(e["react-i18next"],e.react,e["@formily/antd-v5"],e["@formily/shared"],e["@nocobase/client"],e.antd,e["@ant-design/icons"],e["@formily/react"])}(self,function(e,t,r,n,o,a,i,l){return function(){"use strict";var c={753:function(e){var t=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;e.exports=!function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},r=0;r<10;r++)t["_"+String.fromCharCode(r)]=r;var n=Object.getOwnPropertyNames(t).map(function(e){return t[e]});if("0123456789"!==n.join(""))return!1;var o={};if("abcdefghijklmnopqrst".split("").forEach(function(e){o[e]=e}),"abcdefghijklmnopqrst"!==Object.keys(Object.assign({},o)).join(""))return!1;return!0}catch(e){return!1}}()?function(e,o){for(var a,i,l=function(e){if(null==e)throw TypeError("Object.assign cannot be called with null or undefined");return Object(e)}(e),c=1;c<arguments.length;c++){for(var u in a=Object(arguments[c]),a)r.call(a,u)&&(l[u]=a[u]);if(t){i=t(a);for(var s=0;s<i.length;s++)n.call(a,i[s])&&(l[i[s]]=a[i[s]])}}return l}:Object.assign},482:function(e){e.exports=i},632:function(e){e.exports=r},505:function(e){e.exports=l},875:function(e){e.exports=n},772:function(e){e.exports=o},721:function(e){e.exports=a},156:function(e){e.exports=t},238:function(t){t.exports=e}},u={};function s(e){var t=u[e];if(void 0!==t)return t.exports;var r=u[e]={exports:{}};return c[e](r,r.exports,s),r.exports}s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,{a:t}),t},s.d=function(e,t){for(var r in t)s.o(t,r)&&!s.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var f={};s.r(f),s.d(f,{default:function(){return W},PluginBlockIframeClient:function(){return Q}});var p=s("772"),m=s("156"),d=s.n(m),b=s("632"),h=s("505"),y=s("721"),v=s("238"),g=s("753"),O=s.n(g),w=({url:e,allowFullScreen:t,position:r,display:n,height:o,width:a,overflow:i,styles:l,onLoad:c,onMouseOver:u,onMouseOut:s,scrolling:f,id:p,frameBorder:m,ariaHidden:b,sandbox:h,allow:y,className:v,title:g,ariaLabel:w,ariaLabelledby:x,name:j,target:S,loading:P,importance:k,referrerpolicy:I,allowpaymentrequest:E,src:B,key:R})=>{let q=O()({src:B||e,target:S||null,style:{position:r||null,display:n||"initial",overflow:i||null},scrolling:f||null,allowpaymentrequest:E||null,importance:k||null,sandbox:h&&[...h].join(" ")||null,loading:P||null,styles:l||null,name:j||null,className:v||null,allowFullScreen:"allowFullScreen",referrerpolicy:I||null,title:g||null,allow:y||null,id:p||null,"aria-labelledby":x||null,"aria-hidden":b||null,"aria-label":w||null,width:a||null,height:o||null,onLoad:c||null,onMouseOver:u||null,onMouseOut:s||null,key:R||"iframe"}),C=Object.create(null);for(let e of Object.keys(q))null!=q[e]&&(C[e]=q[e]);for(let e of Object.keys(C.style))null==C.style[e]&&delete C.style[e];if(C.styles)for(let e of Object.keys(C.styles))C.styles.hasOwnProperty(e)&&(C.style[e]=C.styles[e]),Object.keys(C.styles).pop()==e&&delete C.styles;if(t){if("allow"in C){let e=C.allow.replace("fullscreen","");C.allow=`fullscreen ${e.trim()}`.trim()}else C.allow="fullscreen"}return m>=0&&!C.style.hasOwnProperty("border")&&(C.style.border=m),d().createElement("iframe",Object.assign({},C))},x=s("875");function j(e,t,r,n,o,a,i){try{var l=e[a](i),c=l.value}catch(e){r(e);return}l.done?t(c):Promise.resolve(c).then(n,o)}function S(e){return function(){var t=this,r=arguments;return new Promise(function(n,o){var a=e.apply(t,r);function i(e){j(a,n,o,i,l,"next",e)}function l(e){j(a,n,o,i,l,"throw",e)}i(void 0)})}}function P(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),n.forEach(function(t){var n,o,a;n=e,o=t,a=r[t],o in n?Object.defineProperty(n,o,{value:a,enumerable:!0,configurable:!0,writable:!0}):n[o]=a})}return e}function k(e,t){var r,n,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function l(a){return function(l){return function(a){if(r)throw TypeError("Generator is already executing.");for(;i;)try{if(r=1,n&&(o=2&a[0]?n.return:a[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,a[1])).done)return o;switch(n=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,n=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!(o=(o=i.trys).length>0&&o[o.length-1])&&(6===a[0]||2===a[0])){i=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){i.label=a[1];break}if(6===a[0]&&i.label<o[1]){i.label=o[1],o=a;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(a);break}o[2]&&i.ops.pop(),i.trys.pop();continue}a=t.call(e,i)}catch(e){a=[6,e],n=0}finally{r=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,l])}}}function I(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}function E(e,t,r,n,o,a,i){try{var l=e[a](i),c=l.value}catch(e){r(e);return}l.done?t(c):Promise.resolve(c).then(n,o)}function B(e){return"string"==typeof e&&!isNaN(e)&&!isNaN(parseFloat(e))}var R=(0,h.observer)(function(e){var t,r,n=e.url,o=e.htmlId,a=e.mode,i=void 0===a?"url":a,l=e.height,c=(e.html,e.params),u=e.engine,s=function(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],!(t.indexOf(r)>=0)&&(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++){if(r=a[n],!(t.indexOf(r)>=0))Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}}return o}(e,["url","htmlId","mode","height","html","params","engine"]),f=(0,h.useField)(),b=(0,v.useTranslation)().t,g=(0,p.useBlockHeight)()||l,O=(0,p.useVariables)(),x=(0,p.useLocalVariables)(),j=(0,p.useCompile)(),S=(0,p.useRequest)({url:"iframeHtml:getHtml/".concat(o)},{refreshDeps:[o,f.data],ready:"html"===i&&!!o}),P=S.loading,k=S.data,R=(0,p.useParseURLAndParams)().parseURLAndParams;var q=(t=(0,m.useState)(null),r=2,function(e){if(Array.isArray(e))return e}(t)||function(e,t){var r,n,o=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=o){var a=[],i=!0,l=!1;try{for(o=o.call(e);!(i=(r=o.next()).done)&&(a.push(r.value),!t||a.length!==t);i=!0);}catch(e){l=!0,n=e}finally{try{!i&&null!=o.return&&o.return()}finally{if(l)throw n}}return a}}(t,2)||function(e,t){if(e){if("string"==typeof e)return I(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);if("Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return I(e,t)}}(t,r)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),C=q[0],T=q[1];return((0,m.useEffect)(function(){var e,t;(t=(e=function(){var e;return function(e,t){var r,n,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function l(a){return function(l){return function(a){if(r)throw TypeError("Generator is already executing.");for(;i;)try{if(r=1,n&&(o=2&a[0]?n.return:a[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,a[1])).done)return o;switch(n=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,n=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!(o=(o=i.trys).length>0&&o[o.length-1])&&(6===a[0]||2===a[0])){i=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){i.label=a[1];break}if(6===a[0]&&i.label<o[1]){i.label=o[1],o=a;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(a);break}o[2]&&i.ops.pop(),i.trys.pop();continue}a=t.call(e,i)}catch(e){a=[6,e],n=0}finally{r=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,l])}}}(this,function(t){switch(t.label){case 0:if("html"!==i)return[3,2];return[4,(0,p.getRenderContent)(u,k,j(O),j(x),function(e){return e})];case 1:if(void 0===(e=t.sent()))return[2];return T("data:text/html;charset=utf-8,"+encodeURIComponent(e)),[3,5];case 2:return t.trys.push([2,4,,5]),[4,R(n,c||[])];case 3:return T(t.sent()),[3,5];case 4:return console.error("Error fetching target URL:",t.sent()),T("fallback-url"),[3,5];case 5:return[2]}})},function(){var t=this,r=arguments;return new Promise(function(n,o){var a=e.apply(t,r);function i(e){E(a,n,o,i,l,"next",e)}function l(e){E(a,n,o,i,l,"throw",e)}i(void 0)})}),function(){return t.apply(this,arguments)})()},[k,i,n,O,x,c]),("url"!==i||n)&&("html"!==i||o))?P&&!C?d().createElement("div",{style:{height:B(g)?"".concat(g,"px"):g||"60vh",marginBottom:"24px",border:0}},d().createElement(y.Spin,null)):d().createElement(w,function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),n.forEach(function(t){var n,o,a;n=e,o=t,a=r[t],o in n?Object.defineProperty(n,o,{value:a,enumerable:!0,configurable:!0,writable:!0}):n[o]=a})}return e}({url:C,width:"100%",display:"block",position:"relative",styles:{height:B(g)?"".concat(g,"px"):g||"60vh",marginBottom:"24px",border:0}},s)):d().createElement(y.Card,{style:{marginBottom:24,height:B(g)?"".concat(g,"px"):g}},b("Please fill in the iframe URL"))},{displayName:"Iframe"});R.Designer=function(){var e,t,r=(0,h.useField)(),n=(0,h.useFieldSchema)(),o=(0,v.useTranslation)().t,a=(0,p.useDesignable)().dn,i=(0,p.useAPIClient)(),l=n["x-component-props"]||{},c=l.mode,u=l.url,s=l.htmlId,f=l.height,m=void 0===f?"60vh":f;l.engine;var b=(e=S(function(e){var t,r,n,o,a,l,c,u;return k(this,function(f){switch(f.label){case 0:var p,m;if(t={values:{html:e}},!s)return[3,2];return[4,null===(r=(n=i.resource("iframeHtml")).update)||void 0===r?void 0:r.call(n,(p=P({},t),m=(m={filterByTk:s},m),Object.getOwnPropertyDescriptors?Object.defineProperties(p,Object.getOwnPropertyDescriptors(m)):(function(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r.push.apply(r,n)}return r})(Object(m)).forEach(function(e){Object.defineProperty(p,e,Object.getOwnPropertyDescriptor(m,e))}),p))];case 1:return[2,(null==(a=f.sent().data)?void 0:null===(o=a.data)||void 0===o?void 0:o[0])||{id:s}];case 2:return[4,null===(l=(c=i.resource("iframeHtml")).create)||void 0===l?void 0:l.call(c,t)];case 3:return[2,null==(u=f.sent().data)?void 0:u.data];case 4:return[2]}})}),function(t){return e.apply(this,arguments)});var y=(t=S(function(e){var t,o,i,l,c,u,s;return k(this,function(f){switch(f.label){case 0:if(t=e.mode,o=e.url,i=e.html,l=e.height,c=e.engine,(u=n["x-component-props"]||{}).mode=t,u.height=l,u.url=o,u.engine=c||"string","html"!==t)return[3,2];return[4,b(i)];case 1:s=f.sent(),u.htmlId=s.id,f.label=2;case 2:return n["x-component-props"]=u,r.componentProps=P({},u),r.data={v:(0,x.uid)()},a.emit("patch",{schema:{"x-uid":n["x-uid"],"x-component-props":u}}),[2]}})}),function(e){return t.apply(this,arguments)}),g=(0,p.useFormBlockContext)().form,O=(0,p.useRecord)(),w=(0,p.useVariableOptions)({collectionField:{uiSchema:n},form:g,record:O,uiSchema:n,noDisabled:!0});return d().createElement(p.GeneralSchemaDesigner,null,d().createElement(p.SchemaSettingsModalItem,{title:o("Edit iframe"),asyncGetInitialValues:S(function(){var e,t,r,n,o;return k(this,function(a){switch(a.label){case 0:if(e={mode:c,url:u,height:m},!s)return[3,2];return[4,null===(t=(r=i.resource("iframeHtml")).get)||void 0===t?void 0:t.call(r,{filterByTk:s})];case 1:o=a.sent().data,e.html=(null==o?void 0:null===(n=o.data)||void 0===n?void 0:n.html)||"",a.label=2;case 2:return[2,e]}})}),schema:{type:"object",title:o("Edit iframe"),properties:{mode:{title:'{{t("Mode")}}',"x-component":"Radio.Group","x-decorator":"FormItem",required:!0,default:"url",enum:[{value:"url",label:o("URL")},{value:"html",label:o("HTML")}]},url:{title:o("URL"),type:"string","x-decorator":"FormItem","x-component":"Variable.TextArea","x-component-props":{scope:w},required:!0,"x-reactions":{dependencies:["mode"],fulfill:{state:{hidden:'{{$deps[0] === "html"}}'}}}},engine:{title:'{{t("Template engine")}}',"x-component":"Radio.Group","x-decorator":"FormItem",enum:[{value:"string",label:o("String template")},{value:"handlebars",label:o("Handlebars")}],"x-reactions":{dependencies:["mode"],fulfill:{state:{hidden:'{{$deps[0] === "url"}}'}}}},html:{title:o("html"),type:"string","x-decorator":"FormItem","x-component":"Variable.RawTextArea","x-component-props":{scope:w,style:{minHeight:"200px"}},required:!0,"x-reactions":{dependencies:["mode"],fulfill:{state:{hidden:'{{$deps[0] === "url"}}'}}}},height:{title:o("Height"),type:"string","x-decorator":"FormItem","x-component":"Input",required:!0}}},onSubmit:y}),d().createElement(p.SchemaSettingsDivider,null),d().createElement(p.SchemaSettingsRemove,{removeParentsIfNoChildren:!0,breakRemoveOn:{"x-component":"Grid"}}))};var q=s("482"),C=function(){var e,t,r=(0,p.useSchemaInitializer)().insert,n=(0,p.useSchemaInitializerItem)();return d().createElement(p.SchemaInitializerItem,(e=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),n.forEach(function(t){var n,o,a;n=e,o=t,a=r[t],o in n?Object.defineProperty(n,o,{value:a,enumerable:!0,configurable:!0,writable:!0}):n[o]=a})}return e}({},n),t=(t={icon:d().createElement(q.PicRightOutlined,null),onClick:function(){r({type:"void","x-settings":"blockSettings:iframe","x-decorator":"BlockItem","x-decorator-props":{name:"iframe"},"x-component":"Iframe","x-component-props":{}})}},t),Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):(function(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r.push.apply(r,n)}return r})(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}),e))},T=function(e){return d().createElement(p.SchemaComponentOptions,{components:{Iframe:R,IframeBlockInitializer:C,ArrayItems:b.ArrayItems}},e.children)};function F(e,t,r,n,o,a,i){try{var l=e[a](i),c=l.value}catch(e){r(e);return}l.done?t(c):Promise.resolve(c).then(n,o)}function M(e){return function(){var t=this,r=arguments;return new Promise(function(n,o){var a=e.apply(t,r);function i(e){F(a,n,o,i,l,"next",e)}function l(e){F(a,n,o,i,l,"throw",e)}i(void 0)})}}function D(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),n.forEach(function(t){var n,o,a;n=e,o=t,a=r[t],o in n?Object.defineProperty(n,o,{value:a,enumerable:!0,configurable:!0,writable:!0}):n[o]=a})}return e}function H(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):(function(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r.push.apply(r,n)}return r})(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}),e}function z(e,t){var r,n,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function l(a){return function(l){return function(a){if(r)throw TypeError("Generator is already executing.");for(;i;)try{if(r=1,n&&(o=2&a[0]?n.return:a[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,a[1])).done)return o;switch(n=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,n=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!(o=(o=i.trys).length>0&&o[o.length-1])&&(6===a[0]||2===a[0])){i=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){i.label=a[1];break}if(6===a[0]&&i.label<o[1]){i.label=o[1],o=a;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(a);break}o[2]&&i.ops.pop(),i.trys.pop();continue}a=t.call(e,i)}catch(e){a=[6,e],n=0}finally{r=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,l])}}}var A={items:[{name:"EditIframe",type:"modal",useComponentProps:function(){var e,t,r,n=(0,h.useField)(),o=(0,h.useFieldSchema)(),a=(0,v.useTranslation)(),i=a.t,l=a.i18n,c=(0,p.useDesignable)().dn,u=(0,p.useAPIClient)(),s=o["x-component-props"]||{},f=s.mode,m=s.url,b=s.params,y=s.htmlId,g=s.height,O=void 0===g?"60vh":g,w=s.engine;var j=(e=M(function(e){var t,r,n,o,a,i,l,c;return z(this,function(s){switch(s.label){case 0:if(t={values:{html:e}},!y)return[3,2];return[4,null===(r=(n=u.resource("iframeHtml")).update)||void 0===r?void 0:r.call(n,H(D({},t),{filterByTk:y}))];case 1:return[2,(null==(a=s.sent().data)?void 0:null===(o=a.data)||void 0===o?void 0:o[0])||{id:y}];case 2:return[4,null===(i=(l=u.resource("iframeHtml")).create)||void 0===i?void 0:i.call(l,t)];case 3:return[2,null==(c=s.sent().data)?void 0:c.data];case 4:return[2]}})}),function(t){return e.apply(this,arguments)}),S=(0,p.useURLAndHTMLSchema)(),P=S.urlSchema,k=S.paramsSchema;var I=(t=M(function(e){var t,r,a,i,l,u,s,f;return z(this,function(p){switch(p.label){case 0:if(t=e.mode,r=e.url,a=e.html,i=e.height,l=e.params,u=e.engine,(s=o["x-component-props"]||{}).mode=t,s.height=i,s.engine=u||"string",s.params=l,s.url=r,"html"!==t)return[3,2];return[4,j(a)];case 1:f=p.sent(),s.htmlId=f.id,p.label=2;case 2:return o["x-component-props"]=s,n.componentProps=D({},s),n.data={v:(0,x.uid)()},c.emit("patch",{schema:{"x-uid":o["x-uid"],"x-component-props":s}}),[2]}})}),function(e){return t.apply(this,arguments)}),E=d().createElement(d().Fragment,null,d().createElement("span",{style:{marginLeft:".25em"},className:"ant-formily-item-extra"},i("Syntax references"),":")," ",d().createElement("a",{href:"https://".concat("zh-CN"===l.language?"docs-cn":"docs",".nocobase.com/handbook/template-handlebars"),target:"_blank",rel:"noreferrer"},"Handlebars.js"));return{title:i("Edit iframe"),asyncGetInitialValues:M(function(){var e,t,r,n,o;return z(this,function(a){switch(a.label){case 0:if(e={mode:f,url:m,height:O,engine:w,params:b},!y)return[3,2];return[4,null===(t=(r=u.resource("iframeHtml")).get)||void 0===t?void 0:t.call(r,{filterByTk:y})];case 1:o=a.sent().data,e.html=(null==o?void 0:null===(n=o.data)||void 0===n?void 0:n.html)||"",a.label=2;case 2:return[2,e]}})}),schema:{type:"object",title:i("Edit iframe"),properties:{mode:{title:'{{t("Mode")}}',"x-component":"Radio.Group","x-decorator":"FormItem",required:!0,default:"url",enum:[{value:"url",label:i("URL")},{value:"html",label:i("HTML")}]},url:H(D({},P),{required:!0}),params:k,engine:{title:'{{t("Template engine")}}',"x-component":"Radio.Group","x-decorator":"FormItem",default:"string",enum:[{value:"string",label:i("String template")},{value:"handlebars",label:i("Handlebars")}],"x-reactions":{dependencies:["mode"],fulfill:{state:{hidden:'{{$deps[0] === "url"}}'}}}},html:{title:i("html"),type:"string","x-decorator":"FormItem","x-component":(r=p.Variable.RawTextArea,function(e){var t=(0,h.useFieldSchema)(),n=(0,p.useFormBlockContext)().form,o=(0,p.useRecord)(),a=(0,p.useVariableOptions)({collectionField:{uiSchema:t},form:n,record:o,uiSchema:t,noDisabled:!0});return d().createElement(r,H(D({},e),{scope:a}))}),"x-component-props":{rows:10},required:!0,description:E,"x-reactions":[{dependencies:["mode"],fulfill:{state:{hidden:'{{$deps[0] === "url"}}'}}},function(e){"handlebars"===e.form.values.engine?e.description=E:e.description=null}]}}},onSubmit:I,noRecord:!0}}},{name:"setTheBlockHeight",Component:p.SchemaSettingsBlockHeightItem},{name:"divider",type:"divider"},{name:"delete",type:"remove",useComponentProps:function(){return{removeParentsIfNoChildren:!0,breakRemoveOn:{"x-component":"Grid"}}}}]},L=new p.SchemaSettings(D({name:"iframeBlockSchemaSettings"},A)),_=new p.SchemaSettings(D({name:"blockSettings:iframe"},A));function G(e,t,r,n,o,a,i){try{var l=e[a](i),c=l.value}catch(e){r(e);return}l.done?t(c):Promise.resolve(c).then(n,o)}function N(e,t,r){return(N=K()?Reflect.construct:function(e,t,r){var n=[null];n.push.apply(n,t);var o=new(Function.bind.apply(e,n));return r&&$(o,r.prototype),o}).apply(null,arguments)}function U(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function V(e){return(V=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function $(e,t){return($=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function J(e){var t="function"==typeof Map?new Map:void 0;return(J=function(e){var r;if(null===e||(r=e,-1===Function.toString.call(r).indexOf("[native code]")))return e;if("function"!=typeof e)throw TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,n)}function n(){return N(e,arguments,V(this).constructor)}return n.prototype=Object.create(e.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),$(n,e)})(e)}function K(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch(e){}return(K=function(){return!!e})()}var Q=function(e){var t,r,n;function o(){var e,t,r;return!function(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}(this,o),e=this,t=o,r=arguments,t=V(t),function(e,t){return t&&("object"===function(e){return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e}(t)||"function"==typeof t)?t:function(e){if(void 0===e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(e,K()?Reflect.construct(t,r||[],V(e).constructor):t.apply(e,r))}return!function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&$(e,t)}(o,e),t=o,r=[{key:"load",value:function(){var e,t=this;return(e=function(){var e,r,n,o;return function(e,t){var r,n,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function l(a){return function(l){return function(a){if(r)throw TypeError("Generator is already executing.");for(;i;)try{if(r=1,n&&(o=2&a[0]?n.return:a[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,a[1])).done)return o;switch(n=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,n=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!(o=(o=i.trys).length>0&&o[o.length-1])&&(6===a[0]||2===a[0])){i=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){i.label=a[1];break}if(6===a[0]&&i.label<o[1]){i.label=o[1],o=a;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(a);break}o[2]&&i.ops.pop(),i.trys.pop();continue}a=t.call(e,i)}catch(e){a=[6,e],n=0}finally{r=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,l])}}}(this,function(a){return t.app.schemaSettingsManager.add(L),t.app.schemaSettingsManager.add(_),t.app.use(T),null==(e=t.app.schemaInitializerManager.get("page:addBlock"))||e.add("otherBlocks.iframe",{title:'{{t("Iframe")}}',Component:"IframeBlockInitializer"}),null==(r=t.app.schemaInitializerManager.get("popup:addNew:addBlock"))||r.add("otherBlocks.iframe",{title:'{{t("Iframe")}}',Component:"IframeBlockInitializer"}),null==(n=t.app.schemaInitializerManager.get("popup:common:addBlock"))||n.add("otherBlocks.iframe",{title:'{{t("Iframe")}}',Component:"IframeBlockInitializer"}),null==(o=t.app.schemaInitializerManager.get("RecordFormBlockInitializers"))||o.add("otherBlocks.iframe",{title:'{{t("Iframe")}}',Component:"IframeBlockInitializer"}),t.app.schemaInitializerManager.addItem("mobilePage:addBlock","otherBlocks.iframe",{title:'{{t("Iframe")}}',Component:"IframeBlockInitializer"}),t.app.schemaInitializerManager.addItem("mobile:addBlock","otherBlocks.iframe",{title:'{{t("Iframe")}}',Component:"IframeBlockInitializer"}),[2]})},function(){var t=this,r=arguments;return new Promise(function(n,o){var a=e.apply(t,r);function i(e){G(a,n,o,i,l,"next",e)}function l(e){G(a,n,o,i,l,"throw",e)}i(void 0)})})()}}],U(t.prototype,r),o}(J(p.Plugin)),W=Q;return f}()});