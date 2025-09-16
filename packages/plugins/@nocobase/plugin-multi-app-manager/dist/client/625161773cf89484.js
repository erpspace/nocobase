/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

"use strict";(self.webpackChunk_nocobase_plugin_multi_app_manager=self.webpackChunk_nocobase_plugin_multi_app_manager||[]).push([["271"],{863:function(e,n,t){t.r(n),t.d(n,{AppManager:function(){return g}});var a=t(772),c=t(721),r=t(156),o=t.n(r),u=t(565),i=t(979),p=t(875),l=function(e){var n=e.value,t=e.onChange,a=(0,i.g)().t;return o().createElement(c.Checkbox,{onChange:function(e){e.target.checked?t("".concat((0,p.uid)()).concat((0,p.uid)()).concat((0,p.uid)()).concat((0,p.uid)())):t("")},checked:!!n},a("Automatically generate a JWT secret"))},m=function(){var e=(0,a.useRecord)(),n=(0,a.useApp)();return e.cname?"//".concat(e.cname):n.getRouteUrl("/apps/".concat(e.name,"/admin/"))},s=function(){var e=(0,i.g)().t,n=m();return o().createElement("a",{href:n,target:"_blank",rel:"noreferrer"},e("View",{ns:"client"}))},g=function(){return o().createElement(c.Card,{bordered:!1},o().createElement(a.SchemaComponent,{schema:u.fK,components:{AppVisitor:s,JwtSecretInput:l}}))}}}]);