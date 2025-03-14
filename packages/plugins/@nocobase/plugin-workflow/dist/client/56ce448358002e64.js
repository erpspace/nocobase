/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

"use strict";(self.webpackChunk_nocobase_plugin_workflow=self.webpackChunk_nocobase_plugin_workflow||[]).push([["929"],{458:function(e,t,r){r.d(t,{g:function(){return k}});var n=r("2721"),o=r("8156"),a=r.n(o);let l=(0,o.createContext)(null),i={didCatch:!1,error:null};class c extends o.Component{constructor(e){super(e),this.resetErrorBoundary=this.resetErrorBoundary.bind(this),this.state=i}static getDerivedStateFromError(e){return{didCatch:!0,error:e}}resetErrorBoundary(){let{error:e}=this.state;if(null!==e){for(var t,r,n=arguments.length,o=Array(n),a=0;a<n;a++)o[a]=arguments[a];null===(t=(r=this.props).onReset)||void 0===t||t.call(r,{args:o,reason:"imperative-api"}),this.setState(i)}}componentDidCatch(e,t){var r,n;null===(r=(n=this.props).onError)||void 0===r||r.call(n,e,t)}componentDidUpdate(e,t){let{didCatch:r}=this.state,{resetKeys:n}=this.props;if(r&&null!==t.error&&function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return e.length!==t.length||e.some((e,r)=>!Object.is(e,t[r]))}(e.resetKeys,n)){var o,a;null===(o=(a=this.props).onReset)||void 0===o||o.call(a,{next:n,prev:e.resetKeys,reason:"keys"}),this.setState(i)}}render(){let{children:e,fallbackRender:t,FallbackComponent:r,fallback:n}=this.props,{didCatch:a,error:i}=this.state,c=e;if(a){let e={error:i,resetErrorBoundary:this.resetErrorBoundary};if((0,o.isValidElement)(n))c=n;else if("function"==typeof t)c=t(e);else if(r)c=(0,o.createElement)(r,e);else throw i}return(0,o.createElement)(l.Provider,{value:{didCatch:a,error:i,resetErrorBoundary:this.resetErrorBoundary}},c)}}var s=r("3772"),u=r("2708"),d=r("8018"),f=r("573"),p=r("8378"),m=r("336"),v=r("5071");function y(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}function b(e,t){return!t&&(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}function h(){var e=b(["\n                  margin-top: 0 !important;\n                "]);return h=function(){return e},e}function w(){var e=b(["\n                      margin-bottom: 1em;\n                    "]);return w=function(){return e},e}function g(){var e=b(["\n                      margin-top: 0 !important;\n                    "]);return g=function(){return e},e}function k(e){var t,r,o=e.entry,l=(0,p.Z)().styles,i=(0,d.G2)().workflow;var b=(t=a().useState(100),r=2,function(e){if(Array.isArray(e))return e}(t)||function(e,t){var r,n,o=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=o){var a=[],l=!0,i=!1;try{for(o=o.call(e);!(l=(r=o.next()).done)&&(a.push(r.value),!t||a.length!==t);l=!0);}catch(e){i=!0,n=e}finally{try{!l&&null!=o.return&&o.return()}finally{if(i)throw n}}return a}}(t,2)||function(e,t){if(e){if("string"==typeof e)return y(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);if("Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return y(e,t)}}(t,r)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),k=b[0],E=b[1];return a().createElement("div",{className:"workflow-canvas-wrapper"},a().createElement(c,{FallbackComponent:s.ErrorFallback,onError:console.error},a().createElement(v.E1,null,a().createElement("div",{className:"workflow-canvas",style:{zoom:k/100}},a().createElement("div",{className:(0,s.cx)(l.branchBlockClass,(0,s.css)(h()))},a().createElement("div",{className:l.branchClass},(null==i?void 0:i.executed)?a().createElement(n.Alert,{type:"warning",message:(0,f.KQ)("Executed workflow cannot be modified. Could be copied to a new version to modify."),showIcon:!0,className:(0,s.css)(w())}):null,a().createElement(m.Gk,null),a().createElement("div",{className:(0,s.cx)(l.branchBlockClass,(0,s.css)(g()))},a().createElement(u.I,{entry:o})),a().createElement("div",{className:l.terminalClass},(0,f.KQ)("End"))))))),a().createElement("div",{className:"workflow-canvas-zoomer"},a().createElement(n.Slider,{vertical:!0,reverse:!0,defaultValue:100,step:10,min:10,value:k,onChange:E})))}},5437:function(e,t,r){r.r(t),r.d(t,{WorkflowPage:function(){return z}});var n=r("3772"),o=r("8156"),a=r.n(o),l=r("6128"),i=r("8378"),c=r("3238"),s=r("2721"),u=r("482"),d=r("3505"),f=r("7584"),p=r("2748"),m=r("458"),v=r("2266"),y=r("8958"),b=r("8018"),h=r("573"),w=r("2659"),g=r("7893"),k=r("1188"),E=r("8327"),x=r("336"),A=r("9144"),C=r("6805");function O(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}function S(e,t,r,n,o,a,l){try{var i=e[a](l),c=i.value}catch(e){r(e);return}i.done?t(c):Promise.resolve(c).then(n,o)}function P(e){return function(){var t=this,r=arguments;return new Promise(function(n,o){var a=e.apply(t,r);function l(e){S(a,n,o,l,i,"next",e)}function i(e){S(a,n,o,l,i,"throw",e)}l(void 0)})}}function j(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),n.forEach(function(t){var n,o,a;n=e,o=t,a=r[t],o in n?Object.defineProperty(n,o,{value:a,enumerable:!0,configurable:!0,writable:!0}):n[o]=a})}return e}function T(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):(function(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r.push.apply(r,n)}return r})(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}),e}function N(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],!(t.indexOf(r)>=0)&&(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++){if(r=a[n],!(t.indexOf(r)>=0))Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}}return o}function K(e,t){var r,n,o,a,l={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function i(a){return function(i){return function(a){if(r)throw TypeError("Generator is already executing.");for(;l;)try{if(r=1,n&&(o=2&a[0]?n.return:a[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,a[1])).done)return o;switch(n=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return l.label++,{value:a[1],done:!1};case 5:l.label++,n=a[1],a=[0];continue;case 7:a=l.ops.pop(),l.trys.pop();continue;default:if(!(o=(o=l.trys).length>0&&o[o.length-1])&&(6===a[0]||2===a[0])){l=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){l.label=a[1];break}if(6===a[0]&&l.label<o[1]){l.label=o[1],o=a;break}if(o&&l.label<o[2]){l.label=o[2],l.ops.push(a);break}o[2]&&l.ops.pop(),l.trys.pop();continue}a=t.call(e,l)}catch(e){a=[6,e],n=0}finally{r=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,i])}}}function D(){var e,t,r=(e=["\n                              margin-bottom: 1em;\n                            "],!t&&(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}})));return D=function(){return r},r}function R(e){var t,r=e.request,o=(e.filter,N(e,["request","filter"])),l=(0,b.G2)().workflow,i=T(j({},o),{request:T(j({},r),{params:T(j({},null==r?void 0:r.params),{filter:T(j({},null==r?void 0:null===(t=r.params)||void 0===t?void 0:t.filter),{key:l.key})})})});return a().createElement(n.ResourceActionProvider,i)}function B(e){var t=e.data,r=e.option,o=(0,n.useCompile)()(r.label);return a().createElement(c.Trans,{ns:h.A7,values:{statusText:o}},"Workflow executed, the result status is ",a().createElement(s.Tag,{color:r.color},"{{statusText}}"),a().createElement(l.Link,{to:"/admin/workflow/executions/".concat(t.id)},"View the execution"))}function F(){var e=(0,b.G2)().workflow,t=(0,d.useForm)(),r=(0,n.useResourceContext)().resource,o=(0,n.useActionContext)(),l=(0,n.useNavigateNoUpdate)(),i=s.App.useApp().message;return{run:function(){return P(function(){var n,c,s,u;return K(this,function(d){switch(d.label){case 0:return c=(n=t.values).autoRevision,s=N(n,["autoRevision"]),[4,t.submit()];case 1:return d.sent(),[4,r.execute(j({filterByTk:e.id,values:s},!e.executed&&c?{autoRevision:1}:{}))];case 2:var f,p,m,v;return u=d.sent().data.data,t.reset(),o.setFormValueChanged(!1),o.setVisible(!1),null==i||i.open((p=(f=u.execution).id,m=f.status,(v=A.uy[m])?{type:"info",content:a().createElement(B,{data:{id:p},option:v})}:null)),u.newVersionId&&l("/admin/workflow/workflows/".concat(u.newVersionId)),[2]}})})()}}}function Q(e){var t=e.children,r=(0,d.useField)(),n=(0,b.G2)().workflow,o=(0,x.cC)(),l=o.validate(n.config),i="";switch(!0){case!l:i=(0,h.KQ)("The trigger is not configured correctly, please check the trigger configuration.");break;case!o.triggerFieldset:i=(0,h.KQ)("This type of trigger has not been supported to be executed manually.")}return r.setPattern(i?"disabled":"editable"),i?a().createElement(s.Tooltip,{title:i},t):t}function I(){var e,t=(0,b.G2)().workflow,r=(0,x.cC)();return a().createElement(b.zQ.Provider,{value:t},a().createElement(C.XA.Provider,{value:!0},a().createElement(n.SchemaComponent,{components:j({Alert:s.Alert,Fieldset:k.p,ActionDisabledProvider:Q},r.components),scope:j({useCancelAction:n.useCancelAction,useExecuteConfirmAction:F},r.scope),schema:{name:"trigger-modal-".concat(t.type,"-").concat(t.id),type:"void","x-decorator":"ActionDisabledProvider","x-component":"Action","x-component-props":{openSize:"small"},title:"{{t('Execute manually', { ns: \"".concat(h.A7,'" })}}'),properties:{drawer:{type:"void","x-decorator":"FormV2","x-component":"Action.Modal",title:"{{t('Execute manually', { ns: \"".concat(h.A7,'" })}}'),properties:T(j(T(j({},Object.keys(null!==(e=r.triggerFieldset)&&void 0!==e?e:{}).length?{alert:{type:"void","x-component":"Alert","x-component-props":{message:"{{t('Trigger variables need to be filled for executing.', { ns: \"".concat(h.A7,'" })}}'),className:(0,n.css)(D())}}}:{description:{type:"void","x-component":"p","x-content":"{{t('This will perform all the actions configured in the workflow. Are you sure you want to continue?', { ns: \"".concat(h.A7,'" })}}')}}),{fieldset:{type:"void","x-decorator":"FormItem","x-component":"Fieldset",title:"{{t('Trigger variables', { ns: \"".concat(h.A7,'" })}}'),properties:r.triggerFieldset}}),t.executed?{}:{autoRevision:{type:"boolean","x-decorator":"FormItem","x-component":"Checkbox","x-content":"{{t('Automatically create a new version after execution', { ns: \"".concat(h.A7,'" })}}'),default:!0}}),{footer:{type:"void","x-component":"Action.Modal.Footer",properties:{cancel:{type:"void",title:"{{t('Cancel')}}","x-component":"Action","x-component-props":{useAction:"{{useCancelAction}}"}},submit:{type:"void",title:"{{t('Confirm')}}","x-component":"Action","x-component-props":{type:"primary",useAction:"{{useExecuteConfirmAction}}"}}}}})}}}})))}function V(){var e,t,r=(0,b.G2)(),i=r.workflow,d=r.revisions;var f=(e=(0,o.useState)(!1),t=2,function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r,n,o=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=o){var a=[],l=!0,i=!1;try{for(o=o.call(e);!(l=(r=o.next()).done)&&(a.push(r.value),!t||a.length!==t);l=!0);}catch(e){i=!0,n=e}finally{try{!l&&null!=o.return&&o.return()}finally{if(i)throw n}}return a}}(e,2)||function(e,t){if(e){if("string"==typeof e)return O(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);if("Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return O(e,t)}}(e,t)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),p=f[0],m=f[1],k=(0,l.useNavigate)(),x=(0,c.useTranslation)().t,A=s.App.useApp().modal,C=(0,n.useApp)(),S=(0,n.useResourceContext)().resource,j=s.App.useApp().message,T=(0,o.useCallback)(P(function(){var e;return K(this,function(t){switch(t.label){case 0:return[4,S.revision({filterByTk:i.id,filter:{key:i.key}})];case 1:return e=t.sent().data.data,j.success(x("Operation succeeded")),k("/admin/workflow/workflows/".concat(e.id)),[2]}})}),[S,i.id,i.key,j,x,k]),N=(0,o.useCallback)(P(function(){var e;return K(this,function(t){return e=i.current?(0,h.KQ)("Delete a main version will cause all other revisions to be deleted too."):"",A.confirm({title:x("Are you sure you want to delete it?"),content:e,onOk:function(){return P(function(){var e;return K(this,function(t){switch(t.label){case 0:return[4,S.destroy({filterByTk:i.id})];case 1:return t.sent(),j.success(x("Operation succeeded")),k(i.current?C.pluginSettingsManager.getRoutePath("workflow"):(0,g.SI)(null===(e=d.find(function(e){return e.current}))||void 0===e?void 0:e.id)),[2]}})})()}}),[2]})}),[i,A,x,S,j,k,C.pluginSettingsManager,d]),D=(0,o.useCallback)(function(e){switch(e.key){case"history":m(!0);return;case"revision":return T();case"delete":return N()}},[N,T]),B=i.executed&&!d.find(function(e){return!e.executed&&new Date(e.createdAt)>new Date(i.createdAt)});return a().createElement(a().Fragment,null,a().createElement(s.Dropdown,{menu:{items:[{key:"key",label:"Key: ".concat(i.key),disabled:!0},{type:"divider"},{role:"button","aria-label":"history",key:"history",label:(0,h.KQ)("Execution history"),disabled:!i.allExecuted},{role:"button","aria-label":"revision",key:"revision",label:(0,h.KQ)("Copy to new version"),disabled:!B},{type:"divider"},{role:"button","aria-label":"delete",danger:!0,key:"delete",label:x("Delete")}],onClick:D}},a().createElement(s.Button,{"aria-label":"more",type:"text",icon:a().createElement(u.EllipsisOutlined,null)})),a().createElement(n.ActionContextProvider,{value:{visible:p,setVisible:m}},a().createElement(n.SchemaComponent,{schema:w.V,components:{ExecutionResourceProvider:R,ExecutionLink:y.a,ExecutionStatusColumn:v.r},scope:{useRefreshActionProps:E.X}})))}function G(){var e,t,r=(0,l.useNavigate)(),c=(0,n.useApp)(),d=(0,n.useResourceActionContext)(),v=d.data,y=d.refresh,w=d.loading,k=(0,n.useResourceContext)().resource,E=(0,n.useDocumentTitle)().setTitle,x=(0,i.Z)().styles;(0,n.usePlugin)(p.default);var A=null!==(t=null==v?void 0:v.data)&&void 0!==t?t:{},C=A.nodes,O=void 0===C?[]:C,S=A.revisions,j=void 0===S?[]:S,T=N(A,["nodes","revisions"]);(0,g.Yc)(O),(0,o.useEffect)(function(){var e,t=(null!==(e=null==v?void 0:v.data)&&void 0!==e?e:{}).title;null==E||E("".concat((0,h.KQ)("Workflow")).concat(t?": ".concat(t):""))},[null==v?void 0:v.data,E]);var D=(0,o.useCallback)(function(e){var t=e.key;t!=T.id&&r((0,g.SI)(t))},[T.id,r]);var R=(0,o.useCallback)((e=P(function(e){return K(this,function(t){switch(t.label){case 0:return[4,k.update({filterByTk:T.id,values:{enabled:e}})];case 1:return t.sent(),y(),[2]}})}),function(t){return e.apply(this,arguments)}),[k,T.id,y]);if(!(null==v?void 0:v.data))return w?a().createElement(s.Spin,null):a().createElement(s.Result,{status:"404",title:"Not found",extra:a().createElement(s.Button,{onClick:function(){return r(-1)}},(0,h.KQ)("Go back"))});var B=O.find(function(e){return!e.upstream});return a().createElement(b.iT.Provider,{value:{workflow:T,revisions:j,nodes:O,refresh:y}},a().createElement("div",{className:"workflow-toolbar"},a().createElement("header",null,a().createElement(s.Breadcrumb,{items:[{title:a().createElement(l.Link,{to:c.pluginSettingsManager.getRoutePath("workflow")},(0,h.KQ)("Workflow"))},{title:a().createElement(s.Tooltip,{title:"Key: ".concat(T.key)},a().createElement("strong",null,T.title))}]}),T.sync?a().createElement(s.Tag,{color:"orange"},(0,h.KQ)("Synchronously")):a().createElement(s.Tag,{color:"cyan"},(0,h.KQ)("Asynchronously"))),a().createElement("aside",null,a().createElement(I,null),a().createElement(s.Dropdown,{className:"workflow-versions",trigger:["click"],menu:{onClick:D,defaultSelectedKeys:["".concat(T.id)],className:(0,n.cx)(x.dropdownClass,x.workflowVersionDropdownClass),items:j.sort(function(e,t){return t.id-e.id}).map(function(e,t){return{role:"button","aria-label":"version-".concat(t),key:"".concat(e.id),icon:e.current?a().createElement(u.RightOutlined,null):null,className:(0,n.cx)({executed:e.executed,unexecuted:!e.executed,enabled:e.enabled}),label:a().createElement(a().Fragment,null,a().createElement("strong",null,"#".concat(e.id)),a().createElement("time",null,(0,f.dayjs)(e.createdAt).fromNow()))}})}},a().createElement(s.Button,{type:"text","aria-label":"version"},a().createElement("label",null,(0,h.KQ)("Version")),a().createElement("span",null,(null==T?void 0:T.id)?"#".concat(T.id):null),a().createElement(u.DownOutlined,null))),a().createElement(s.Switch,{checked:T.enabled,onChange:R,checkedChildren:(0,h.KQ)("On"),unCheckedChildren:(0,h.KQ)("Off")}),a().createElement(V,null))),a().createElement(m.g,{entry:B}))}var z=function(){var e,t,r,o=(0,l.useParams)(),c=(0,i.Z)().styles;return a().createElement("div",{className:(0,n.cx)(c.workflowPageClass)},a().createElement(n.SchemaComponent,{schema:{type:"void",properties:(e={},t="provider_".concat(o.id),r={type:"void","x-decorator":"ResourceActionProvider","x-decorator-props":{collection:{name:"workflows",fields:[]},resourceName:"workflows",request:{resource:"workflows",action:"get",params:{filter:{id:o.id},appends:["nodes","revisions.id","revisions.createdAt","revisions.current","revisions.executed","revisions.enabled"]}}},"x-component":"WorkflowCanvas"},t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e)},components:{WorkflowCanvas:G}}))}}}]);