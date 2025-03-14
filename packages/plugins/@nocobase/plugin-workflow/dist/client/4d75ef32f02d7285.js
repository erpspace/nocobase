/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

"use strict";(self.webpackChunk_nocobase_plugin_workflow=self.webpackChunk_nocobase_plugin_workflow||[]).push([["999"],{458:function(e,t,r){r.d(t,{g:function(){return g}});var n=r("2721"),o=r("8156"),a=r.n(o);let l=(0,o.createContext)(null),i={didCatch:!1,error:null};class c extends o.Component{constructor(e){super(e),this.resetErrorBoundary=this.resetErrorBoundary.bind(this),this.state=i}static getDerivedStateFromError(e){return{didCatch:!0,error:e}}resetErrorBoundary(){let{error:e}=this.state;if(null!==e){for(var t,r,n=arguments.length,o=Array(n),a=0;a<n;a++)o[a]=arguments[a];null===(t=(r=this.props).onReset)||void 0===t||t.call(r,{args:o,reason:"imperative-api"}),this.setState(i)}}componentDidCatch(e,t){var r,n;null===(r=(n=this.props).onError)||void 0===r||r.call(n,e,t)}componentDidUpdate(e,t){let{didCatch:r}=this.state,{resetKeys:n}=this.props;if(r&&null!==t.error&&function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return e.length!==t.length||e.some((e,r)=>!Object.is(e,t[r]))}(e.resetKeys,n)){var o,a;null===(o=(a=this.props).onReset)||void 0===o||o.call(a,{next:n,prev:e.resetKeys,reason:"keys"}),this.setState(i)}}render(){let{children:e,fallbackRender:t,FallbackComponent:r,fallback:n}=this.props,{didCatch:a,error:i}=this.state,c=e;if(a){let e={error:i,resetErrorBoundary:this.resetErrorBoundary};if((0,o.isValidElement)(n))c=n;else if("function"==typeof t)c=t(e);else if(r)c=(0,o.createElement)(r,e);else throw i}return(0,o.createElement)(l.Provider,{value:{didCatch:a,error:i,resetErrorBoundary:this.resetErrorBoundary}},c)}}var s=r("3772"),u=r("2708"),d=r("8018"),m=r("573"),f=r("8378"),p=r("336"),y=r("5071");function v(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}function b(e,t){return!t&&(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}function E(){var e=b(["\n                  margin-top: 0 !important;\n                "]);return E=function(){return e},e}function h(){var e=b(["\n                      margin-bottom: 1em;\n                    "]);return h=function(){return e},e}function w(){var e=b(["\n                      margin-top: 0 !important;\n                    "]);return w=function(){return e},e}function g(e){var t,r,o=e.entry,l=(0,f.Z)().styles,i=(0,d.G2)().workflow;var b=(t=a().useState(100),r=2,function(e){if(Array.isArray(e))return e}(t)||function(e,t){var r,n,o=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=o){var a=[],l=!0,i=!1;try{for(o=o.call(e);!(l=(r=o.next()).done)&&(a.push(r.value),!t||a.length!==t);l=!0);}catch(e){i=!0,n=e}finally{try{!l&&null!=o.return&&o.return()}finally{if(i)throw n}}return a}}(t,2)||function(e,t){if(e){if("string"==typeof e)return v(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);if("Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return v(e,t)}}(t,r)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),g=b[0],k=b[1];return a().createElement("div",{className:"workflow-canvas-wrapper"},a().createElement(c,{FallbackComponent:s.ErrorFallback,onError:console.error},a().createElement(y.E1,null,a().createElement("div",{className:"workflow-canvas",style:{zoom:g/100}},a().createElement("div",{className:(0,s.cx)(l.branchBlockClass,(0,s.css)(E()))},a().createElement("div",{className:l.branchClass},(null==i?void 0:i.executed)?a().createElement(n.Alert,{type:"warning",message:(0,m.KQ)("Executed workflow cannot be modified. Could be copied to a new version to modify."),showIcon:!0,className:(0,s.css)(h())}):null,a().createElement(p.Gk,null),a().createElement("div",{className:(0,s.cx)(l.branchBlockClass,(0,s.css)(w()))},a().createElement(u.I,{entry:o})),a().createElement("div",{className:l.terminalClass},(0,m.KQ)("End"))))))),a().createElement("div",{className:"workflow-canvas-zoomer"},a().createElement(n.Slider,{vertical:!0,reverse:!0,defaultValue:100,step:10,min:10,value:g,onChange:k})))}},5625:function(e,t,r){r.r(t),r.d(t,{ExecutionPage:function(){return N}});var n=r("3772"),o=r("8156"),a=r.n(o),l=r("6128"),i=r("2721"),c=r("7584"),s=r("482"),u=r("3238"),d=r("2748"),m=r("458"),f=r("6594"),p=r("9144"),y=r("8018"),v=r("573"),b=r("8378"),E=r("7893"),h=r("467");function w(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}function g(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function k(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],!(t.indexOf(r)>=0)&&(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++){if(r=a[n],!(t.indexOf(r)>=0))Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}}return o}function x(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r,n,o=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=o){var a=[],l=!0,i=!1;try{for(o=o.call(e);!(l=(r=o.next()).done)&&(a.push(r.value),!t||a.length!==t);l=!0);}catch(e){i=!0,n=e}finally{try{!l&&null!=o.return&&o.return()}finally{if(i)throw n}}return a}}(e,t)||S(e,t)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function O(e){return function(e){if(Array.isArray(e))return w(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||S(e)||function(){throw TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function S(e,t){if(e){if("string"==typeof e)return w(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);if("Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return w(e,t)}}function j(e){var t,r,o=(0,y.G2)().viewJob,l=(0,n.useRequest)({resource:"jobs",action:"get",params:{filterByTk:o.id}}),c=l.data;if(l.loading)return a().createElement(i.Spin,null);var s=(0,h.get)(c,"data.result");return a().createElement(n.Input.JSON,(t=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),n.forEach(function(t){g(e,t,r[t])})}return e}({},e),r=(r={value:s,disabled:!0},r),Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):(function(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r.push.apply(r,n)}return r})(Object(r)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}),t))}function C(){var e=(0,n.usePlugin)(d.default).instructions,t=(0,n.useCompile)(),r=(0,y.G2)(),o=r.viewJob,l=r.setViewJob,c=(0,b.Z)().styles,s=(null!=o?o:{}).node,u=void 0===s?{}:s,m=e.get(u.type);return a().createElement(n.ActionContextProvider,{value:{visible:!!o,setVisible:l}},a().createElement(n.SchemaComponent,{components:{JobResult:j},schema:{type:"void",properties:g({},"".concat(null==o?void 0:o.id,"-").concat(null==o?void 0:o.updatedAt,"-modal"),{type:"void","x-decorator":"Form","x-decorator-props":{initialValue:o},"x-component":"Action.Modal",title:a().createElement("div",{className:c.nodeTitleClass},a().createElement(i.Tag,null,t(null==m?void 0:m.title)),a().createElement("strong",null,u.title),a().createElement("span",{className:"workflow-node-id"},"#",u.id)),properties:{status:{type:"number",title:'{{t("Status", { ns: "'.concat(v.A7,'" })}}'),"x-decorator":"FormItem","x-component":"Select",enum:p.Vh,"x-read-pretty":!0},updatedAt:{type:"string",title:'{{t("Executed at", { ns: "'.concat(v.A7,'" })}}'),"x-decorator":"FormItem","x-component":"DatePicker","x-component-props":{showTime:!0},"x-read-pretty":!0},result:{type:"object",title:'{{t("Node result", { ns: "'.concat(v.A7,'" })}}'),"x-decorator":"FormItem","x-component":"JobResult","x-component-props":{className:c.nodeJobResultClass,autoSize:{minRows:4,maxRows:32}}}}})}}))}function A(e){var t=(0,y.G2)().execution,r=(0,n.useAPIClient)(),u=(0,l.useNavigate)(),d=(0,b.Z)().styles,m=x((0,o.useState)([]),2),v=m[0],h=m[1],w=x((0,o.useState)([]),2),g=w[0],k=w[1];(0,o.useEffect)(function(){if(!!t)r.resource("executions").list({filter:{key:t.key,id:{$lt:t.id}},sort:"-createdAt",pageSize:10,fields:["id","status","createdAt"]}).then(function(e){h(e.data.data)}).catch(function(){})},[t.id]),(0,o.useEffect)(function(){if(!!t)r.resource("executions").list({filter:{key:t.key,id:{$gt:t.id}},sort:"createdAt",pageSize:10,fields:["id","status","createdAt"]}).then(function(e){k(e.data.data.reverse())}).catch(function(){})},[t.id]);var S=(0,o.useCallback)(function(e){var r=e.key;r!=t.id&&u((0,E.s_)(r))},[t.id]);return t?a().createElement(i.Dropdown,{menu:{onClick:S,defaultSelectedKeys:["".concat(t.id)],className:(0,n.cx)(d.dropdownClass,d.executionsDropdownRowClass),items:O(g).concat([t],O(v)).map(function(e){return{key:e.id,label:a().createElement(a().Fragment,null,a().createElement("span",{className:"id"},"#".concat(e.id)),a().createElement("time",null,(0,c.str2moment)(e.createdAt).format("YYYY-MM-DD HH:mm:ss"))),icon:a().createElement("span",null,a().createElement(f.Y,{statusMap:p.uy,status:e.status}))}})}},a().createElement(i.Space,null,a().createElement("strong",null,"#".concat(t.id)),a().createElement(s.DownOutlined,null))):null}function P(){var e,t=(0,u.useTranslation)().t,r=(0,n.useCompile)(),d=(0,n.useResourceActionContext)(),f=d.data,b=d.loading,h=d.refresh,w=(0,n.useDocumentTitle)().setTitle,g=x((0,o.useState)(null),2),O=g[0],S=g[1],j=(0,n.useApp)(),P=(0,n.useAPIClient)();(0,o.useEffect)(function(){var e,t=(null!==(e=null==f?void 0:f.data)&&void 0!==e?e:{}).workflow;null==w||w("".concat((null==t?void 0:t.title)?"".concat(t.title," - "):"").concat((0,v.KQ)("Execution history")))},[null==f?void 0:f.data,w]);var N=(0,o.useCallback)(function(){i.Modal.confirm({title:(0,v.KQ)("Cancel the execution"),icon:a().createElement(s.ExclamationCircleFilled,null),content:(0,v.KQ)("Are you sure you want to cancel the execution?"),onOk:function(){P.resource("executions").cancel({filterByTk:null==f?void 0:f.data.id}).then(function(){i.message.success(t("Operation succeeded")),h()}).catch(function(e){console.error(e.data.error)})}})},[null==f?void 0:f.data]);if(!(null==f?void 0:f.data))return b?a().createElement(i.Spin,null):a().createElement(i.Result,{status:"404",title:"Not found"});var I=null!==(e=null==f?void 0:f.data)&&void 0!==e?e:{},D=I.jobs,T=I.workflow,B=void 0===T?{}:T,R=B.nodes,K=void 0===R?[]:R,M=(B.revisions,k(I.workflow,["nodes","revisions"])),Y=k(I,["jobs","workflow"]);(0,E.Yc)(K),!function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],r=new Map;e.forEach(function(e){e.jobs=[],r.set(e.id,e)}),t.forEach(function(e){var t=r.get(e.nodeId);t.jobs.push(e),e.node={id:t.id,key:t.key,title:t.title,type:t.type}}),e.forEach(function(e){e.jobs=e.jobs.sort(function(e,t){return e.id-t.id})})}(K,void 0===D?[]:D);var F=K.find(function(e){return!e.upstream}),J=p.uy[Y.status];return a().createElement(y.iT.Provider,{value:{workflow:M.type?M:null,nodes:K,execution:Y,viewJob:O,setViewJob:S}},a().createElement("div",{className:"workflow-toolbar"},a().createElement("header",null,a().createElement(i.Breadcrumb,{items:[{title:a().createElement(l.Link,{to:j.pluginSettingsManager.getRoutePath("workflow")},(0,v.KQ)("Workflow"))},{title:a().createElement(i.Tooltip,{title:"Key: ".concat(M.key)},a().createElement(l.Link,{to:(0,E.SI)(M.id)},M.title))},{title:a().createElement(A,null)}]})),a().createElement("aside",null,a().createElement(i.Tag,{color:J.color},r(J.label)),Y.status?null:a().createElement(i.Tooltip,{title:(0,v.KQ)("Cancel the execution")},a().createElement(i.Button,{type:"link",danger:!0,onClick:N,shape:"circle",size:"small",icon:a().createElement(s.StopOutlined,null)})),a().createElement("time",null,(0,c.str2moment)(Y.updatedAt).format("YYYY-MM-DD HH:mm:ss")))),a().createElement(m.g,{entry:F}),a().createElement(C,null))}var N=function(){var e,t,r,o=(0,l.useParams)(),i=(0,b.Z)().styles;return a().createElement("div",{className:(0,n.cx)(i.workflowPageClass)},a().createElement(n.SchemaComponent,{schema:{type:"void",properties:(e={},t="execution_".concat(o.id),r={type:"void","x-decorator":"ResourceActionProvider","x-decorator-props":{collection:{name:"executions",fields:[]},resourceName:"executions",request:{resource:"executions",action:"get",params:{filter:o,appends:["jobs","workflow","workflow.nodes"],except:["jobs.result","workflow.options"]}}},"x-component":"ExecutionCanvas"},t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e)},components:{ExecutionCanvas:P}}))}}}]);