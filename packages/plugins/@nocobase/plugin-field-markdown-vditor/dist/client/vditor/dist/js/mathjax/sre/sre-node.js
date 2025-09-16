/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SRE = require("speech-rule-engine");
global.SRE = SRE;
global.sre = Object.create(SRE);
global.sre.Engine = {
    isReady: function () {
        return SRE.engineReady();
    }
};
//# sourceMappingURL=sre-node.js.map