/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

"use strict";(self.webpackChunk_nocobase_plugin_auth=self.webpackChunk_nocobase_plugin_auth||[]).push([["642"],{401:function(e,t,a){a.r(t),a.d(t,{AuthProvider:function(){return i}});var n=a(772),r=a(156),u=a.n(r),c=a(128),i=function(e){var t=(0,n.useApp)(),a=(0,c.useNavigate)(),i=(0,c.useLocation)();return(0,r.useEffect)(function(){var e=new URLSearchParams(i.search),n=e.get("authenticator"),r=e.get("token");if(r){t.apiClient.auth.setToken(r),t.apiClient.auth.setAuthenticator(n),e.delete("token");var u=e.toString();a({pathname:i.pathname,search:u?"?".concat(u):""},{replace:!0})}},[i.search,t,a,i.pathname]),u().createElement(u().Fragment,null,e.children)}}}]);