/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

"use strict";(self.webpackChunk_nocobase_plugin_auth=self.webpackChunk_nocobase_plugin_auth||[]).push([["890"],{387:function(e,t,n){n.r(t),n.d(t,{AuthProvider:function(){return c}});var a=n(772),u=n(156),r=n.n(u),c=function(e){var t=(0,a.useLocationSearch)(),n=(0,a.useApp)();return(0,u.useEffect)(function(){var e=new URLSearchParams(t),a=e.get("authenticator"),u=e.get("token");u&&(n.apiClient.auth.setToken(u),n.apiClient.auth.setAuthenticator(a))}),r().createElement(r().Fragment,null,e.children)}}}]);