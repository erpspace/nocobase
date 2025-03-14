/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

!function(e){var t={};function r(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(o,n,function(t){return e[t]}.bind(null,n));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=15)}([function(e,t,r){"use strict";var o,n=this&&this.__read||function(e,t){var r="function"==typeof Symbol&&e[Symbol.iterator];if(!r)return e;var o,n,a=r.call(e),i=[];try{for(;(void 0===t||t-- >0)&&!(o=a.next()).done;)i.push(o.value)}catch(e){n={error:e}}finally{try{o&&!o.done&&(r=a.return)&&r.call(a)}finally{if(n)throw n.error}}return i},a=this&&this.__values||function(e){var t="function"==typeof Symbol&&Symbol.iterator,r=t&&e[t],o=0;if(r)return r.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&o>=e.length&&(e=void 0),{value:e&&e[o++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")};Object.defineProperty(t,"__esModule",{value:!0}),t.clearDocument=t.saveDocument=t.makeBsprAttributes=t.removeProperty=t.getProperty=t.setProperty=t.balanceRules=void 0;var i=r(10),l=r(4),u=null,f=null,s=function(e){return f.root=e,u.outputJax.getBBox(f,u).w},c=function(e){for(var t=0;e&&!i.default.isType(e,"mtable");){if(i.default.isType(e,"text"))return null;i.default.isType(e,"mrow")?(e=e.childNodes[0],t=0):(e=e.parent.childNodes[t],t++)}return e},d=function(e,t){return e.childNodes["up"===t?1:0].childNodes[0].childNodes[0].childNodes[0].childNodes[0]},p=function(e,t){return e.childNodes[t].childNodes[0].childNodes[0]},m=function(e){return p(e,0)},h=function(e){return p(e,e.childNodes.length-1)},y=function(e,t){return e.childNodes["up"===t?0:1].childNodes[0].childNodes[0].childNodes[0]},v=function(e){for(;e&&!i.default.isType(e,"mtd");)e=e.parent;return e},P=function(e){return e.parent.childNodes[e.parent.childNodes.indexOf(e)+1]},g=function(e){for(;e&&null==t.getProperty(e,"inference");)e=e.parent;return e},b=function(e,t,r){void 0===r&&(r=!1);var o=0;if(e===t)return o;if(e!==t.parent){var n=e.childNodes,a=r?n.length-1:0;i.default.isType(n[a],"mspace")&&(o+=s(n[a])),e=t.parent}if(e===t)return o;var l=e.childNodes,u=r?l.length-1:0;return l[u]!==t&&(o+=s(l[u])),o},x=function(e,r){void 0===r&&(r=!1);var o=c(e),n=y(o,t.getProperty(o,"inferenceRule"));return b(e,o,r)+(s(o)-s(n))/2},M=function(e,r,o,n){if(void 0===n&&(n=!1),t.getProperty(r,"inferenceRule")||t.getProperty(r,"labelledRule")){var a=e.nodeFactory.create("node","mrow");r.parent.replaceChild(a,r),a.setChildren([r]),_(r,a),r=a}var u=n?r.childNodes.length-1:0,f=r.childNodes[u];i.default.isType(f,"mspace")?i.default.setAttribute(f,"width",l.default.Em(l.default.dimen2em(i.default.getAttribute(f,"width"))+o)):(f=e.nodeFactory.create("node","mspace",[],{width:l.default.Em(o)}),n?r.appendChild(f):(f.parent=r,r.childNodes.unshift(f)))},_=function(e,r){["inference","proof","maxAdjust","labelledRule"].forEach((function(o){var n=t.getProperty(e,o);null!=n&&(t.setProperty(r,o,n),t.removeProperty(e,o))}))},w=function(e,r,o,n,a){var i=e.nodeFactory.create("node","mspace",[],{width:l.default.Em(a)});if("left"===n){var u=r.childNodes[o].childNodes[0];i.parent=u,u.childNodes.unshift(i)}else r.childNodes[o].appendChild(i);t.setProperty(r.parent,"sequentAdjust_"+n,a)},T=function(e,r){for(var o=r.pop();r.length;){var a=r.pop(),i=n(C(o,a),2),l=i[0],u=i[1];t.getProperty(o.parent,"axiom")&&(w(e,l<0?o:a,0,"left",Math.abs(l)),w(e,u<0?o:a,2,"right",Math.abs(u))),o=a}},C=function(e,t){var r=s(e.childNodes[2]),o=s(t.childNodes[2]);return[s(e.childNodes[0])-s(t.childNodes[0]),r-o]};t.balanceRules=function(e){var r,o;f=new e.document.options.MathItem("",null,e.math.display);var n=e.data;!function(e){var r=e.nodeLists.sequent;if(r)for(var o=r.length-1,n=void 0;n=r[o];o--)if(t.getProperty(n,"sequentProcessed"))t.removeProperty(n,"sequentProcessed");else{var a=[],i=g(n);if(1===t.getProperty(i,"inference")){for(a.push(n);1===t.getProperty(i,"inference");){i=c(i);var l=m(d(i,t.getProperty(i,"inferenceRule"))),u=t.getProperty(l,"inferenceRule")?y(l,t.getProperty(l,"inferenceRule")):l;t.getProperty(u,"sequent")&&(n=u.childNodes[0],a.push(n),t.setProperty(n,"sequentProcessed",!0)),i=l}T(e,a)}}}(n);var i=n.nodeLists.inference||[];try{for(var l=a(i),u=l.next();!u.done;u=l.next()){var s=u.value,p=t.getProperty(s,"proof"),_=c(s),w=d(_,t.getProperty(_,"inferenceRule")),C=m(w);if(t.getProperty(C,"inference")){var I=x(C);if(I){M(n,C,-I);var S=b(s,_,!1);M(n,s,I-S)}}var N=h(w);if(null!=t.getProperty(N,"inference")){var A=x(N,!0);M(n,N,-A,!0);var j=b(s,_,!0),L=t.getProperty(s,"maxAdjust");null!=L&&(A=Math.max(A,L));var k=void 0;if(!p&&(k=v(s))){var O=P(k);if(O){var J=n.nodeFactory.create("node","mspace",[],{width:A-j+"em"});O.appendChild(J),s.removeProperty("maxAdjust")}else{var B=g(k);B&&(A=t.getProperty(B,"maxAdjust")?Math.max(t.getProperty(B,"maxAdjust"),A):A,t.setProperty(B,"maxAdjust",A))}}else M(n,t.getProperty(s,"proof")?s:s.parent,A-j,!0)}}}catch(e){r={error:e}}finally{try{u&&!u.done&&(o=l.return)&&o.call(l)}finally{if(r)throw r.error}}};var I=((o={}).bspr_maxAdjust=!0,o);t.setProperty=function(e,t,r){i.default.setProperty(e,"bspr_"+t,r)},t.getProperty=function(e,t){return i.default.getProperty(e,"bspr_"+t)},t.removeProperty=function(e,t){e.removeProperty("bspr_"+t)},t.makeBsprAttributes=function(e){e.data.root.walkTree((function(e,t){var r=[];e.getPropertyNames().forEach((function(t){!I[t]&&t.match(RegExp("^bspr_"))&&r.push(t+":"+e.getProperty(t))})),r.length&&i.default.setAttribute(e,"semantics",r.join(";"))}))},t.saveDocument=function(e){if(!("getBBox"in(u=e.document).outputJax))throw Error("The bussproofs extension requires an output jax with a getBBox() method")},t.clearDocument=function(e){u=null}},function(e,t,r){"use strict";var o,n=this&&this.__extends||(o=function(e,t){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)});Object.defineProperty(t,"__esModule",{value:!0}),t.ProofTreeItem=void 0;var a=r(3),i=r(8),l=r(9),u=r(0),f=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.leftLabel=null,t.rigthLabel=null,t.innerStack=new l.default(t.factory,{},!0),t}return n(t,e),Object.defineProperty(t.prototype,"kind",{get:function(){return"proofTree"},enumerable:!1,configurable:!0}),t.prototype.checkItem=function(e){if(e.isKind("end")&&"prooftree"===e.getName()){var t=this.toMml();return u.setProperty(t,"proof",!0),[[this.factory.create("mml",t),e],!0]}if(e.isKind("stop"))throw new a.default("EnvMissingEnd","Missing \\end{%1}",this.getName());return this.innerStack.Push(e),i.BaseItem.fail},t.prototype.toMml=function(){var t=e.prototype.toMml.call(this),r=this.innerStack.Top();if(r.isKind("start")&&!r.Size())return t;this.innerStack.Push(this.factory.create("stop"));var o=this.innerStack.Top().toMml();return this.create("node","mrow",[o,t],{})},t}(i.BaseItem);t.ProofTreeItem=f},function(e,t,r){"use strict";var o=this&&this.__read||function(e,t){var r="function"==typeof Symbol&&e[Symbol.iterator];if(!r)return e;var o,n,a=r.call(e),i=[];try{for(;(void 0===t||t-- >0)&&!(o=a.next()).done;)i.push(o.value)}catch(e){n={error:e}}finally{try{o&&!o.done&&(r=a.return)&&r.call(a)}finally{if(n)throw n.error}}return i},n=this&&this.__spread||function(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(o(arguments[t]));return e};Object.defineProperty(t,"__esModule",{value:!0});var a=r(3),i=r(12),l=r(4),u=r(0),f={Prooftree:function(e,t){return e.Push(t),e.itemFactory.create("proofTree").setProperties({name:t.getName(),line:"solid",currentLine:"solid",rootAtTop:!1})},Axiom:function(e,t){var r=e.stack.Top();if("proofTree"!==r.kind)throw new a.default("IllegalProofCommand","Proof commands only allowed in prooftree environment.");var o=s(e,e.GetArgument(t));u.setProperty(o,"axiom",!0),r.Push(o)}},s=function(e,t){var r=l.default.internalMath(e,l.default.trimSpaces(t),0);if(!r[0].childNodes[0].childNodes.length)return e.create("node","mrow",[]);var o=e.create("node","mspace",[],{width:".5ex"}),a=e.create("node","mspace",[],{width:".5ex"});return e.create("node","mrow",n([o],r,[a]))};function c(e,t,r,o,n,a,i){var l,f,s,c,d=e.create("node","mtr",[e.create("node","mtd",[t],{})],{}),p=e.create("node","mtr",[e.create("node","mtd",r,{})],{}),m=e.create("node","mtable",i?[p,d]:[d,p],{align:"top 2",rowlines:a,framespacing:"0 0"});if(u.setProperty(m,"inferenceRule",i?"up":"down"),o&&(l=e.create("node","mpadded",[o],{height:"+.5em",width:"+.5em",voffset:"-.15em"}),u.setProperty(l,"prooflabel","left")),n&&(f=e.create("node","mpadded",[n],{height:"+.5em",width:"+.5em",voffset:"-.15em"}),u.setProperty(f,"prooflabel","right")),o&&n)s=[l,m,f],c="both";else if(o)s=[l,m],c="left";else{if(!n)return m;s=[m,f],c="right"}return m=e.create("node","mrow",s),u.setProperty(m,"labelledRule",c),m}function d(e,t){if("$"!==e.GetNext())throw new a.default("IllegalUseOfCommand","Use of %1 does not match it's definition.",t);e.i++;var r=e.GetUpTo(t,"$");if(-1===r.indexOf("\\fCenter"))throw new a.default("IllegalUseOfCommand","Missing \\fCenter in %1.",t);var n=o(r.split("\\fCenter"),2),l=n[0],f=n[1],s=new i.default(l,e.stack.env,e.configuration).mml(),c=new i.default(f,e.stack.env,e.configuration).mml(),d=new i.default("\\fCenter",e.stack.env,e.configuration).mml(),p=e.create("node","mtd",[s],{}),m=e.create("node","mtd",[d],{}),h=e.create("node","mtd",[c],{}),y=e.create("node","mtr",[p,m,h],{}),v=e.create("node","mtable",[y],{columnspacing:".5ex",columnalign:"center 2"});return u.setProperty(v,"sequent",!0),e.configuration.addNode("sequent",y),v}f.Inference=function(e,t,r){var o=e.stack.Top();if("proofTree"!==o.kind)throw new a.default("IllegalProofCommand","Proof commands only allowed in prooftree environment.");if(o.Size()<r)throw new a.default("BadProofTree","Proof tree badly specified.");var n=o.getProperty("rootAtTop"),i=1!==r||o.Peek()[0].childNodes.length?r:0,l=[];do{l.length&&l.unshift(e.create("node","mtd",[],{})),l.unshift(e.create("node","mtd",[o.Pop()],{rowalign:n?"top":"bottom"})),r--}while(r>0);var f=e.create("node","mtr",l,{}),d=e.create("node","mtable",[f],{framespacing:"0 0"}),p=s(e,e.GetArgument(t)),m=o.getProperty("currentLine");m!==o.getProperty("line")&&o.setProperty("currentLine",o.getProperty("line"));var h=c(e,d,[p],o.getProperty("left"),o.getProperty("right"),m,n);o.setProperty("left",null),o.setProperty("right",null),u.setProperty(h,"inference",i),e.configuration.addNode("inference",h),o.Push(h)},f.Label=function(e,t,r){var o=e.stack.Top();if("proofTree"!==o.kind)throw new a.default("IllegalProofCommand","Proof commands only allowed in prooftree environment.");var n=l.default.internalMath(e,e.GetArgument(t),0),i=n.length>1?e.create("node","mrow",n,{}):n[0];o.setProperty(r,i)},f.SetLine=function(e,t,r,o){var n=e.stack.Top();if("proofTree"!==n.kind)throw new a.default("IllegalProofCommand","Proof commands only allowed in prooftree environment.");n.setProperty("currentLine",r),o&&n.setProperty("line",r)},f.RootAtTop=function(e,t,r){var o=e.stack.Top();if("proofTree"!==o.kind)throw new a.default("IllegalProofCommand","Proof commands only allowed in prooftree environment.");o.setProperty("rootAtTop",r)},f.AxiomF=function(e,t){var r=e.stack.Top();if("proofTree"!==r.kind)throw new a.default("IllegalProofCommand","Proof commands only allowed in prooftree environment.");var o=d(e,t);u.setProperty(o,"axiom",!0),r.Push(o)},f.FCenter=function(e,t){},f.InferenceF=function(e,t,r){var o=e.stack.Top();if("proofTree"!==o.kind)throw new a.default("IllegalProofCommand","Proof commands only allowed in prooftree environment.");if(o.Size()<r)throw new a.default("BadProofTree","Proof tree badly specified.");var n=o.getProperty("rootAtTop"),i=1!==r||o.Peek()[0].childNodes.length?r:0,l=[];do{l.length&&l.unshift(e.create("node","mtd",[],{})),l.unshift(e.create("node","mtd",[o.Pop()],{rowalign:n?"top":"bottom"})),r--}while(r>0);var f=e.create("node","mtr",l,{}),s=e.create("node","mtable",[f],{framespacing:"0 0"}),p=d(e,t),m=o.getProperty("currentLine");m!==o.getProperty("line")&&o.setProperty("currentLine",o.getProperty("line"));var h=c(e,s,[p],o.getProperty("left"),o.getProperty("right"),m,n);o.setProperty("left",null),o.setProperty("right",null),u.setProperty(h,"inference",i),e.configuration.addNode("inference",h),o.Push(h)},t.default=f},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=MathJax._.input.tex.TexError.default},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=MathJax._.input.tex.ParseUtil.default},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isObject=MathJax._.components.global.isObject,t.combineConfig=MathJax._.components.global.combineConfig,t.combineDefaults=MathJax._.components.global.combineDefaults,t.combineWithMathJax=MathJax._.components.global.combineWithMathJax,t.MathJax=MathJax._.components.global.MathJax},function(e,t,r){"use strict";var o;Object.defineProperty(t,"__esModule",{value:!0}),t.BussproofsConfiguration=void 0;var n=r(7),a=r(1),i=r(0);r(11),t.BussproofsConfiguration=n.Configuration.create("bussproofs",{handler:{macro:["Bussproofs-macros"],environment:["Bussproofs-environments"]},items:(o={},o[a.ProofTreeItem.prototype.kind]=a.ProofTreeItem,o),preprocessors:[[i.saveDocument,1]],postprocessors:[[i.clearDocument,3],[i.makeBsprAttributes,2],[i.balanceRules,1]]})},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Configuration=MathJax._.input.tex.Configuration.Configuration,t.ConfigurationHandler=MathJax._.input.tex.Configuration.ConfigurationHandler,t.ParserConfiguration=MathJax._.input.tex.Configuration.ParserConfiguration},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.MmlStack=MathJax._.input.tex.StackItem.MmlStack,t.BaseItem=MathJax._.input.tex.StackItem.BaseItem},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=MathJax._.input.tex.Stack.default},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=MathJax._.input.tex.NodeUtil.default},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r(2),n=r(13),a=r(14);new a.CommandMap("Bussproofs-macros",{AxiomC:"Axiom",UnaryInfC:["Inference",1],BinaryInfC:["Inference",2],TrinaryInfC:["Inference",3],QuaternaryInfC:["Inference",4],QuinaryInfC:["Inference",5],RightLabel:["Label","right"],LeftLabel:["Label","left"],AXC:"Axiom",UIC:["Inference",1],BIC:["Inference",2],TIC:["Inference",3],RL:["Label","right"],LL:["Label","left"],noLine:["SetLine","none",!1],singleLine:["SetLine","solid",!1],solidLine:["SetLine","solid",!1],dashedLine:["SetLine","dashed",!1],alwaysNoLine:["SetLine","none",!0],alwaysSingleLine:["SetLine","solid",!0],alwaysSolidLine:["SetLine","solid",!0],alwaysDashedLine:["SetLine","dashed",!0],rootAtTop:["RootAtTop",!0],alwaysRootAtTop:["RootAtTop",!0],rootAtBottom:["RootAtTop",!1],alwaysRootAtBottom:["RootAtTop",!1],fCenter:"FCenter",Axiom:"AxiomF",UnaryInf:["InferenceF",1],BinaryInf:["InferenceF",2],TrinaryInf:["InferenceF",3],QuaternaryInf:["InferenceF",4],QuinaryInf:["InferenceF",5]},o.default),new a.EnvironmentMap("Bussproofs-environments",n.default.environment,{prooftree:["Prooftree",null,!1]},o.default)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=MathJax._.input.tex.TexParser.default},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=MathJax._.input.tex.ParseMethods.default},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.AbstractSymbolMap=MathJax._.input.tex.SymbolMap.AbstractSymbolMap,t.RegExpMap=MathJax._.input.tex.SymbolMap.RegExpMap,t.AbstractParseMap=MathJax._.input.tex.SymbolMap.AbstractParseMap,t.CharacterMap=MathJax._.input.tex.SymbolMap.CharacterMap,t.DelimiterMap=MathJax._.input.tex.SymbolMap.DelimiterMap,t.MacroMap=MathJax._.input.tex.SymbolMap.MacroMap,t.CommandMap=MathJax._.input.tex.SymbolMap.CommandMap,t.EnvironmentMap=MathJax._.input.tex.SymbolMap.EnvironmentMap},function(e,t,r){"use strict";r.r(t);var o=r(5),n=r(6),a=r(1),i=r(2),l=r(0);Object(o.combineWithMathJax)({_:{input:{tex:{bussproofs:{BussproofsConfiguration:n,BussproofsItems:a,BussproofsMethods:i,BussproofsUtil:l}}}}})}]);