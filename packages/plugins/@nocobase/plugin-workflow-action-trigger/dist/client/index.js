/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react-i18next"),require("@formily/react"),require("@nocobase/client"),require("@nocobase/plugin-workflow/client"),require("react")):"function"==typeof define&&define.amd?define("@nocobase/plugin-workflow-action-trigger",["react-i18next","@formily/react","@nocobase/client","@nocobase/plugin-workflow/client","react"],t):"object"==typeof exports?exports["@nocobase/plugin-workflow-action-trigger"]=t(require("react-i18next"),require("@formily/react"),require("@nocobase/client"),require("@nocobase/plugin-workflow/client"),require("react")):e["@nocobase/plugin-workflow-action-trigger"]=t(e["react-i18next"],e["@formily/react"],e["@nocobase/client"],e["@nocobase/plugin-workflow/client"],e.react)}(self,function(e,t,o,r,n){return function(){"use strict";var i={505:function(e){e.exports=t},772:function(e){e.exports=o},433:function(e){e.exports=r},156:function(e){e.exports=n},238:function(t){t.exports=e}},c={};function a(e){var t=c[e];if(void 0!==t)return t.exports;var o=c[e]={exports:{}};return i[e](o,o.exports,a),o.exports}a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,{a:t}),t},a.d=function(e,t){for(var o in t)a.o(t,o)&&!a.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var l={};a.r(l),a.d(l,{default:function(){return N}});var u=a("772"),s=a("433"),f=a("505"),p=a("238"),d="workflow-action-trigger";function b(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return(0,function(e){return(0,p.useTranslation)(d,e)}(t).t)(e)}var y=a("156"),m=a.n(y);function g(e,t){(null==t||t>e.length)&&(t=e.length);for(var o=0,r=Array(t);o<t;o++)r[o]=e[o];return r}function h(e,t){for(var o=0;o<t.length;o++){var r=t[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function v(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function w(e){return(w=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function O(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{},r=Object.keys(o);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(o).filter(function(e){return Object.getOwnPropertyDescriptor(o,e).enumerable}))),r.forEach(function(t){v(e,t,o[t])})}return e}function x(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):(function(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);o.push.apply(o,r)}return o})(Object(t)).forEach(function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(t,o))}),e}function S(e,t){return(S=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function k(e){return function(e){if(Array.isArray(e))return g(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||j(e)||function(){throw TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function j(e,t){if(e){if("string"==typeof e)return g(e,t);var o=Object.prototype.toString.call(e).slice(8,-1);if("Object"===o&&e.constructor&&(o=e.constructor.name),"Map"===o||"Set"===o)return Array.from(o);if("Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))return g(e,t)}}function P(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch(e){}return(P=function(){return!!e})()}var T="create",C="update";function W(e,t){var o,r,n,i=(o=(0,u.parseCollectionName)(e.collection),r=2,function(e){if(Array.isArray(e))return e}(o)||function(e,t){var o,r,n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var i=[],c=!0,a=!1;try{for(n=n.call(e);!(c=(o=n.next()).done)&&(i.push(o.value),!t||i.length!==t);c=!0);}catch(e){a=!0,r=e}finally{try{!c&&null!=n.return&&n.return()}finally{if(a)throw r}}return i}}(o,2)||j(o,r)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=i[0],a=i[1],l=(0,u.useCompile)(),f=(0,s.useGetCollectionFields)(c),p=(0,s.useGetCollectionFields)(),d=b("Trigger data"),y=b("User acted"),m=b("Role of user acted");return k((0,s.getCollectionFieldOptions)(x(O({appends:["data"].concat(k((null===(n=e.appends)||void 0===n?void 0:n.map(function(e){return"data.".concat(e)}))||[]))},t),{fields:[{collectionName:a,name:"data",type:"hasOne",target:a,uiSchema:{title:d}}],compile:l,getCollectionFields:f}))).concat(k((0,s.getCollectionFieldOptions)(x(O({appends:["user"]},t),{fields:[{collectionName:"users",name:"user",type:"hasOne",target:"users",uiSchema:{title:y}},{name:"roleName",uiSchema:{title:m}}],compile:l,getCollectionFields:p}))))}var A=function(e){var t,o,r;function n(){var e,t,o,r;return!function(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}(this,n),t=this,o=n,r=arguments,o=w(o),v(e=function(e,t){return t&&("object"===function(e){return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e}(t)||"function"==typeof t)?t:function(e){if(void 0===e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(t,P()?Reflect.construct(o,r||[],w(t).constructor):o.apply(t,r)),"title",'{{t("Post-action event", { ns: "'.concat(d,'" })}}')),v(e,"description","{{t('Triggered after the completion of a request initiated through an action button or API, such as after adding or updating data. Suitable for data processing, sending notifications, etc., after actions are completed.', { ns: \"".concat(d,'" })}}')),v(e,"fieldset",{collection:{type:"string",required:!0,"x-decorator":"FormItem","x-decorator-props":{tooltip:'{{t("The collection to which the triggered data belongs.", { ns: "'.concat(d,'" })}}')},"x-component":"DataSourceCollectionCascader","x-disabled":"{{ useWorkflowAnyExecuted() }}",title:'{{t("Collection", { ns: "'.concat(d,'" })}}'),"x-reactions":[{target:"appends",effects:["onFieldValueChange"],fulfill:{state:{value:[]}}}]},global:{type:"boolean",title:'{{t("Trigger mode", { ns: "'.concat(d,'" })}}'),"x-decorator":"FormItem","x-component":"RadioWithTooltip","x-component-props":{direction:"vertical",options:[{label:'{{t("Local mode, triggered after the completion of actions bound to this workflow", { ns: "'.concat(d,'" })}}'),value:!1},{label:'{{t("Global mode, triggered after the completion of the following actions", { ns: "'.concat(d,'" })}}'),value:!0}]},default:!1,"x-reactions":[{dependencies:["collection"],fulfill:{state:{visible:"{{!!$deps[0]}}"}}}]},actions:{type:"number",title:'{{t("Select actions", { ns: "'.concat(d,'" })}}'),"x-decorator":"FormItem","x-component":"CheckboxGroupWithTooltip","x-component-props":{direction:"vertical",options:[{label:'{{t("Create record action", { ns: "'.concat(d,'" })}}'),value:T},{label:'{{t("Update record action", { ns: "'.concat(d,'" })}}'),value:C}]},required:!0,"x-reactions":[{dependencies:["collection","global"],fulfill:{state:{visible:"{{!!$deps[0] && !!$deps[1]}}"}}}]},appends:{type:"array",title:'{{t("Associations to use", { ns: "'.concat(d,'" })}}'),description:'{{t("Please select the associated fields that need to be accessed in subsequent nodes. With more than two levels of to-many associations may cause performance issue, please use with caution.", { ns: "workflow" })}}',"x-decorator":"FormItem","x-component":"AppendsTreeSelect","x-component-props":{multiple:!0,useCollection:function(){var e=(0,f.useForm)().values;return null==e?void 0:e.collection}},"x-reactions":[{dependencies:["collection"],fulfill:{state:{visible:"{{!!$deps[0]}}"}}}]}}),v(e,"triggerFieldset",{data:{type:"object",title:'{{t("Trigger data", { ns: "workflow" })}}',description:'{{t("Choose a record or primary key of a record in the collection to trigger.", { ns: "workflow" })}}',"x-decorator":"FormItem","x-component":"TriggerCollectionRecordSelect",default:null,required:!0},userId:{type:"number",title:'{{t("User acted", { ns: "'.concat(d,'" })}}'),"x-decorator":"FormItem","x-component":"WorkflowVariableWrapper","x-component-props":{nullable:!1,changeOnSelect:!0,variableOptions:{types:[function(e){return e.isForeignKey||"context"===e.type?"users"===e.target:"users"===e.collectionName&&"id"===e.name}]},render:function(e){return m().createElement(u.RemoteSelect,O({fieldNames:{label:"nickname",value:"id"},service:{resource:"users"},manual:!1},e))}},default:null,required:!0},roleName:{type:"string",title:'{{t("Role of user acted", { ns: "'.concat(d,'" })}}'),"x-decorator":"FormItem","x-component":"WorkflowVariableWrapper","x-component-props":{nullable:!1,changeOnSelect:!0,variableOptions:{types:[function(e){return e.isForeignKey?"roles"===e.target:"roles"===e.collectionName&&"name"===e.name}]},render:function(e){return m().createElement(u.RemoteSelect,O({fieldNames:{label:"title",value:"name"},service:{resource:"roles"},manual:!1},e))}},default:null}}),v(e,"scope",{useCollectionDataSource:u.useCollectionDataSource,useWorkflowAnyExecuted:s.useWorkflowAnyExecuted}),v(e,"components",{RadioWithTooltip:s.RadioWithTooltip,CheckboxGroupWithTooltip:s.CheckboxGroupWithTooltip,TriggerCollectionRecordSelect:s.TriggerCollectionRecordSelect,WorkflowVariableWrapper:s.WorkflowVariableWrapper}),v(e,"isActionTriggerable",function(e,t){return!e.global&&["submit","customize:save","customize:update"].includes(t.buttonAction)}),v(e,"useVariables",W),e}return!function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&S(e,t)}(n,e),t=n,o=[{key:"validate",value:function(e){return e.collection}},{key:"useInitializers",value:function(e){return e.collection?{name:"triggerData",type:"item",key:"triggerData",title:'{{t("Trigger data", { ns: "'.concat(d,'" })}}'),Component:s.CollectionBlockInitializer,collection:e.collection,dataPath:"$context.data"}:null}}],h(t.prototype,o),n}(s.Trigger);function F(e,t,o,r,n,i,c){try{var a=e[i](c),l=a.value}catch(e){o(e);return}a.done?t(l):Promise.resolve(l).then(r,n)}function _(e,t,o){return(_=D()?Reflect.construct:function(e,t,o){var r=[null];r.push.apply(r,t);var n=new(Function.bind.apply(e,r));return o&&q(n,o.prototype),n}).apply(null,arguments)}function R(e,t){for(var o=0;o<t.length;o++){var r=t[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function E(e){return(E=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function q(e,t){return(q=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function I(e){var t="function"==typeof Map?new Map:void 0;return(I=function(e){var o;if(null===e||(o=e,-1===Function.toString.call(o).indexOf("[native code]")))return e;if("function"!=typeof e)throw TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,r)}function r(){return _(e,arguments,E(this).constructor)}return r.prototype=Object.create(e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),q(r,e)})(e)}function D(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch(e){}return(D=function(){return!!e})()}var N=function(e){var t,o,r;function n(){var e,t,o;return!function(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}(this,n),e=this,t=n,o=arguments,t=E(t),function(e,t){return t&&("object"===function(e){return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e}(t)||"function"==typeof t)?t:function(e){if(void 0===e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(e,D()?Reflect.construct(t,o||[],E(e).constructor):t.apply(e,o))}return!function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&q(e,t)}(n,e),t=n,o=[{key:"load",value:function(){var e,t=this;return(e=function(){return function(e,t){var o,r,n,i,c={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(o)throw TypeError("Generator is already executing.");for(;c;)try{if(o=1,r&&(n=2&i[0]?r.return:i[0]?r.throw||((n=r.return)&&n.call(r),0):r.next)&&!(n=n.call(r,i[1])).done)return n;switch(r=0,n&&(i=[2&i[0],n.value]),i[0]){case 0:case 1:n=i;break;case 4:return c.label++,{value:i[1],done:!1};case 5:c.label++,r=i[1],i=[0];continue;case 7:i=c.ops.pop(),c.trys.pop();continue;default:if(!(n=(n=c.trys).length>0&&n[n.length-1])&&(6===i[0]||2===i[0])){c=0;continue}if(3===i[0]&&(!n||i[1]>n[0]&&i[1]<n[3])){c.label=i[1];break}if(6===i[0]&&c.label<n[1]){c.label=n[1],n=i;break}if(n&&c.label<n[2]){c.label=n[2],c.ops.push(i);break}n[2]&&c.ops.pop(),c.trys.pop();continue}i=t.call(e,c)}catch(e){i=[6,e],r=0}finally{o=n=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}}(this,function(e){return t.app.pm.get("workflow").registerTrigger("action",A),t.app.addScopes({useTriggerWorkflowsActionProps:s.useTriggerWorkflowsActionProps,useRecordTriggerWorkflowsActionProps:s.useRecordTriggerWorkflowsActionProps}),[2]})},function(){var t=this,o=arguments;return new Promise(function(r,n){var i=e.apply(t,o);function c(e){F(i,r,n,c,a,"next",e)}function a(e){F(i,r,n,c,a,"throw",e)}c(void 0)})})()}}],R(t.prototype,o),n}(I(u.Plugin));return l}()});