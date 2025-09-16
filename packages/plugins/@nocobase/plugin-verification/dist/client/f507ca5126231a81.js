/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

"use strict";(self.webpackChunk_nocobase_plugin_verification=self.webpackChunk_nocobase_plugin_verification||[]).push([["929"],{813:function(e,t,n){n.r(t),n.d(t,{VerifierSelect:function(){return v}});var i=n(156),l=n.n(i),a=n(505),r=n(721),u=n(772),o=n(748),c=n(128),s=n(632),v=(0,a.connect)(function(e){var t=(0,o.SD)().t,n=e.scene,v=e.value,f=e.title,m=e.onChange,p=e.multiple;p=p?"multiple":void 0;var d=(0,u.useAPIClient)(),h=(0,u.useRequest)(function(){return d.resource("verifiers").listByScene({scene:n}).then(function(e){var t;return null==e||null==(t=e.data)?void 0:t.data})}).data||{},g=h.verifiers,b=void 0===g?[]:g,E=h.availableTypes,k=(0,i.useMemo)(function(){return null==b?void 0:b.map(function(e){return{label:e.title,value:e.name}})},[b]);return l().createElement(s.FormItem,{label:f||t("Verifiers"),extra:l().createElement(l().Fragment,null,t("The following types of verifiers are available:"),(void 0===E?[]:E).map(function(e){return a.Schema.compile(e.title,{t:t})}).join(", "),". ",t("Go to")," ",l().createElement(c.Link,{to:"/admin/settings/verification"},t("create verifiers")))},l().createElement(r.Select,{allowClear:!0,options:k,value:v,mode:p,onChange:m}))},(0,a.mapReadPretty)(function(){var e,t=(0,a.useField)();return(null==(e=t.value)?void 0:e.length)?l().createElement(u.EllipsisWithTooltip,{ellipsis:!0},t.value.map(function(e){return l().createElement(r.Tag,{key:e.name},e.title)})):null}))}}]);