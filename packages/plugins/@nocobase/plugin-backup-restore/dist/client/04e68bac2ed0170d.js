/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

"use strict";(self.webpackChunk_nocobase_plugin_backup_restore=self.webpackChunk_nocobase_plugin_backup_restore||[]).push([["97"],{123:function(e,t,n){n.r(t),n.d(t,{BackupAndRestoreList:function(){return C}});var r=n(482),l=n(632),a=n(772),o=n(721),i=n(346),u=n(156),c=n.n(u),s=n(573);function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function f(e,t,n,r,l,a,o){try{var i=e[a](o),u=i.value}catch(e){n(e);return}i.done?t(u):Promise.resolve(u).then(r,l)}function p(e){return function(){var t=this,n=arguments;return new Promise(function(r,l){var a=e.apply(t,n);function o(e){f(a,r,l,o,i,"next",e)}function i(e){f(a,r,l,o,i,"throw",e)}o(void 0)})}}function m(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){var r,l,a;r=e,l=t,a=n[t],l in r?Object.defineProperty(r,l,{value:a,enumerable:!0,configurable:!0,writable:!0}):r[l]=a})}return e}function b(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):(function(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n.push.apply(n,r)}return n})(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}),e}function y(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n,r,l=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=l){var a=[],o=!0,i=!1;try{for(l=l.call(e);!(o=(n=l.next()).done)&&(a.push(n.value),!t||a.length!==t);o=!0);}catch(e){i=!0,r=e}finally{try{!o&&null!=l.return&&l.return()}finally{if(i)throw r}}return a}}(e,t)||function(e,t){if(e){if("string"==typeof e)return d(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if("Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return d(e,t)}}(e,t)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function h(e,t){var n,r,l,a,o={label:0,sent:function(){if(1&l[0])throw l[1];return l[1]},trys:[],ops:[]};return a={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function i(a){return function(i){return function(a){if(n)throw TypeError("Generator is already executing.");for(;o;)try{if(n=1,r&&(l=2&a[0]?r.return:a[0]?r.throw||((l=r.return)&&l.call(r),0):r.next)&&!(l=l.call(r,a[1])).done)return l;switch(r=0,l&&(a=[2&a[0],l.value]),a[0]){case 0:case 1:l=a;break;case 4:return o.label++,{value:a[1],done:!1};case 5:o.label++,r=a[1],a=[0];continue;case 7:a=o.ops.pop(),o.trys.pop();continue;default:if(!(l=(l=o.trys).length>0&&l[l.length-1])&&(6===a[0]||2===a[0])){o=0;continue}if(3===a[0]&&(!l||a[1]>l[0]&&a[1]<l[3])){o.label=a[1];break}if(6===a[0]&&o.label<l[1]){o.label=l[1],l=a;break}if(l&&o.label<l[2]){o.label=l[2],o.ops.push(a);break}l[2]&&o.ops.pop(),o.trys.pop();continue}a=t.call(e,o)}catch(e){a=[6,e],r=0}finally{n=l=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,i])}}}var v=o.Upload.Dragger,g=function(e){var t,n=e.collectionsData,r=(0,s.lV)().t,l=y((0,u.useState)(!1),2),i=l[0],d=l[1],f=y((0,u.useState)(n),2),m=f[0],b=f[1];(0,u.useEffect)(function(){b(n)},[n]);var v=(0,a.useAPIClient)(),g=(0,a.useCompile)(),k=(0,u.useMemo)(function(){return v.resource("backupFiles")},[v]);var E=(t=p(function(){var t;return h(this,function(n){switch(n.label){case 0:if(!e.isBackup)return[3,2];return[4,k.dumpableCollections()];case 1:b(null==(t=n.sent())?void 0:t.data),d(!0),n.label=2;case 2:return d(!0),[2]}})}),function(){return t.apply(this,arguments)}),w=[{title:r("Collection"),dataIndex:"collection",key:"collection",render:function(e,t){var n=g(t.title);return t.name===n?n:c().createElement("div",null,t.name," ",c().createElement("span",{style:{color:"rgba(0, 0, 0, 0.3)",fontSize:"0.9em"}},"(",g(t.title),")"))}},{title:r("Origin"),dataIndex:"origin",key:"origin",width:"50%"}],C=Object.keys(m||{}).map(function(e){return{key:e,label:r("".concat(e,".title")),children:c().createElement(c().Fragment,null,c().createElement(o.Alert,{style:{marginBottom:16},message:r("".concat(e,".description"))}),c().createElement(o.Table,{pagination:{pageSize:100},bordered:!0,size:"small",dataSource:m[e],columns:w,scroll:{y:400}}))}});return c().createElement(c().Fragment,null,c().createElement("a",{onClick:E},r("Learn more")),c().createElement(o.Modal,{title:r("Backup instructions"),width:"80vw",open:i,footer:null,onOk:function(){d(!1)},onCancel:function(){d(!1)}},c().createElement(o.Tabs,{defaultActiveKey:"required",items:C})))},k=function(e){var t,n=e.ButtonComponent,r=void 0===n?o.Button:n,i=e.title,d=e.upload,f=void 0!==d&&d,m=e.fileData,b=(0,s.lV)().t,v=y((0,u.useState)(["required"]),2),k=v[0],E=v[1],C=y((0,u.useState)(!1),2),S=C[0],O=C[1],P=y((0,u.useState)(null),2),B=P[0],x=P[1],j=y((0,u.useState)(!1),2),D=j[0],A=j[1],F=(0,a.useAPIClient)(),I=(0,u.useMemo)(function(){return F.resource("backupFiles")},[F]),T=y((0,u.useState)([]),2),q=T[0],R=T[1];(0,u.useEffect)(function(){R(Object.keys((null==B?void 0:B.dumpableCollectionsGroupByGroup)||[]).map(function(e){return{value:e,label:b("".concat(e,".title")),disabled:["required","skipped"].includes(e)}}))},[B]);var G=(t=p(function(){var e,t,n,r;return h(this,function(l){switch(l.label){case 0:if(O(!0),f)return[3,2];return A(!0),[4,I.get({filterByTk:m.name})];case 1:R(Object.keys((null==(r=l.sent().data)?void 0:null===(t=r.data)||void 0===t?void 0:null===(e=t.meta)||void 0===e?void 0:e.dumpableCollectionsGroupByGroup)||[]).map(function(e){return{value:e,label:b("".concat(e,".title")),disabled:["required","skipped"].includes(e)}})),x(null==r?void 0:null===(n=r.data)||void 0===n?void 0:n.meta),A(!1),l.label=2;case 2:return[2]}})}),function(){return t.apply(this,arguments)});return c().createElement(c().Fragment,null,c().createElement(r,{onClick:G},i),c().createElement(o.Modal,{title:b("Restore"),width:800,footer:f&&!B?null:void 0,open:S,onOk:function(){I.restore({values:{dataTypes:k,filterByTk:null==m?void 0:m.name,key:null==B?void 0:B.key}}),O(!1)},onCancel:function(){O(!1),x(null),E(["required"])}},c().createElement(o.Spin,{spinning:D},f&&!B&&c().createElement(w,{setRestoreData:x}),(!f||B)&&[c().createElement("strong",{style:{fontWeight:600,display:"block",margin:"16px 0 8px"},key:"info"},b("Select the data to be restored")," (",c().createElement(g,{collectionsData:null==B?void 0:B.dumpableCollectionsGroupByGroup}),"):"),c().createElement("div",{style:{lineHeight:2,marginBottom:8},key:"dataType"},c().createElement(l.FormItem,null,c().createElement(a.Checkbox.Group,{options:q,style:{flexDirection:"column"},value:k,onChange:function(e){return E(e)}})))])))},E=function(e){var t,n=e.ButtonComponent,l=void 0===n?o.Button:n,i=e.refresh,d=(0,s.lV)().t,f=y((0,u.useState)(!1),2),m=f[0],b=f[1],v=y((0,u.useState)(["required"]),2),k=v[0],E=v[1],w=(0,a.useAPIClient)(),C=y((0,u.useState)([]),2),S=C[0],O=C[1];var P=(t=p(function(){return h(this,function(e){switch(e.label){case 0:return[4,w.resource("backupFiles").dumpableCollections()];case 1:return O(Object.keys(e.sent().data||[]).map(function(e){return{value:e,label:d("".concat(e,".title")),disabled:["required","skipped"].includes(e)}})),b(!0),[2]}})}),function(){return t.apply(this,arguments)});return c().createElement(c().Fragment,null,c().createElement(l,{icon:c().createElement(r.PlusOutlined,null),type:"primary",onClick:P},d("New backup")),c().createElement(o.Modal,{title:d("New backup"),width:800,open:m,onOk:function(){w.request({url:"backupFiles:create",method:"post",data:{dataTypes:k}}),b(!1),E(["required"]),setTimeout(function(){i()},500)},onCancel:function(){b(!1),E(["required"])}},c().createElement("strong",{style:{fontWeight:600,display:"block",margin:"16px 0 8px"}},d("Select the data to be backed up")," (",c().createElement(g,{isBackup:!0}),"):"),c().createElement("div",{style:{lineHeight:2,marginBottom:8}},c().createElement(a.Checkbox.Group,{options:S,style:{flexDirection:"column"},onChange:function(e){return E(e)},value:k}))))},w=function(e){var t,n,l=(0,s.lV)().t;return c().createElement(v,(t={multiple:!1,action:"/backupFiles:upload",onChange:function(t){t.fileList.length>1&&t.fileList.splice(0,t.fileList.length-1);var n,r,a,i=t.file.status;"done"===i?(o.message.success("".concat(t.file.name," ")+l("file uploaded successfully")),e.setRestoreData(b(m({},null===(r=t.file.response)||void 0===r?void 0:null===(n=r.data)||void 0===n?void 0:n.meta),{key:null===(a=t.file.response)||void 0===a?void 0:a.data.key}))):"error"===i&&o.message.error("".concat(t.file.name," ")+l("file upload failed"))},onDrop:function(e){console.log("Dropped files",e.dataTransfer.files)}},n=(0,a.useAPIClient)(),b(m({},t),{customRequest:function(e){var t=e.action,r=e.data,l=e.file,a=e.filename,o=e.headers,i=e.onError,u=e.onProgress,c=e.onSuccess,s=e.withCredentials,d=new FormData;return r&&Object.keys(r).forEach(function(e){d.append(e,r[e])}),d.append(a,l),n.axios.post(t,d,{withCredentials:s,headers:o,onUploadProgress:function(e){var t=e.total;u({percent:Math.round(e.loaded/t*100).toFixed(2)},l)}}).then(function(e){c(e.data,l)}).catch(i).finally(function(){}),{abort:function(){console.log("upload progress is aborted.")}}},onChange:function(e){var n;null===(n=t.onChange)||void 0===n||n.call(t,e)}})),c().createElement("p",{className:"ant-upload-drag-icon"},c().createElement(r.InboxOutlined,null)),c().createElement("p",{className:"ant-upload-text"}," ",l("Click or drag file to this area to upload")))},C=function(){var e,t,n,l=(0,s.lV)().t,d=(0,a.useAPIClient)(),f=y((0,u.useState)([]),2),m=f[0],b=f[1],v=y((0,u.useState)(!1),2),g=v[0],w=v[1],C=y((0,u.useState)(!1),2),S=(C[0],C[1]),O=o.App.useApp().modal,P=(0,u.useMemo)(function(){return d.resource("backupFiles")},[d]);(0,u.useEffect)(function(){B()},[]);var B=(e=p(function(){return h(this,function(e){switch(e.label){case 0:return w(!0),[4,P.list()];case 1:return b(e.sent().data.data),w(!1),[2]}})}),function(){return e.apply(this,arguments)});var x=(t=p(function(e){var t,n;return h(this,function(r){switch(r.label){case 0:return S(e.name),[4,d.request({url:"backupFiles:download",method:"get",params:{filterByTk:e.name},responseType:"blob"})];case 1:return t=r.sent(),S(!1),n=new Blob([t.data]),(0,i.saveAs)(n,e.name),[2]}})}),function(e){return t.apply(this,arguments)});var j=(n=p(function(){return h(this,function(e){switch(e.label){case 0:return[4,B()];case 1:return e.sent(),[2]}})}),function(){return n.apply(this,arguments)}),D=function(e){O.confirm({title:l("Delete record",{ns:"client"}),content:l("Are you sure you want to delete it?",{ns:"client"}),onOk:p(function(){return h(this,function(t){switch(t.label){case 0:return[4,P.destroy({filterByTk:e.name})];case 1:return t.sent(),[4,B()];case 2:return t.sent(),o.message.success(l("Deleted successfully")),[2]}})})})};return c().createElement("div",null,c().createElement(o.Card,{bordered:!1},c().createElement(o.Space,{style:{float:"right",marginBottom:16}},c().createElement(o.Button,{onClick:j,icon:c().createElement(r.ReloadOutlined,null)},l("Refresh")),c().createElement(k,{upload:!0,title:c().createElement(c().Fragment,null,c().createElement(r.UploadOutlined,null)," ",l("Restore backup from local"))}),c().createElement(E,{refresh:j})),c().createElement(o.Table,{dataSource:m,loading:g,columns:[{title:l("Backup file"),dataIndex:"name",width:400,onCell:function(e){return e.inProgress?{colSpan:4}:{}},render:function(e,t){return t.inProgress?c().createElement("div",{style:{color:"rgba(0, 0, 0, 0.88)"}},e,"(",l("Backing up"),"...)"):c().createElement("div",null,e)}},{title:l("File size"),dataIndex:"fileSize",onCell:function(e){return e.inProgress?{colSpan:0}:{}}},{title:l("Created at",{ns:"client"}),dataIndex:"createdAt",onCell:function(e){return e.inProgress?{colSpan:0}:{}},render:function(e){return c().createElement(a.DatePicker.ReadPretty,{value:e,showTime:!0})}},{title:l("Actions",{ns:"client"}),dataIndex:"actions",onCell:function(e){return e.inProgress?{colSpan:0}:{}},render:function(e,t){return c().createElement(o.Space,{split:c().createElement(o.Divider,{type:"vertical"})},c().createElement(k,{ButtonComponent:"a",title:l("Restore"),fileData:t}),c().createElement("a",{type:"link",onClick:function(){return x(t)}},l("Download")),c().createElement("a",{onClick:function(){return D(t)}},l("Delete")))}}]})))}}}]);