"use strict";(self.webpackChunknocobase=self.webpackChunknocobase||[]).push([[7153],{95480:function(Ar,on,m){m.d(on,{iz:function(){return dt},ck:function(){return Oe},BW:function(){return vt},sN:function(){return Oe},Wd:function(){return je},ZP:function(){return ar},Xl:function(){return be}});var V=m(87462),x=m(4942),w=m(1413),ye=m(74902),L=m(97685),W=m(91),ln=m(93967),se=m.n(ln),Pe=m(39983),ze=m(21770),Rt=m(91881),Zt=m(80334),t=m(67294),un=m(73935),xt=t.createContext(null);function Pt(r,e){return r===void 0?null:"".concat(r,"-").concat(e)}function Et(r){var e=t.useContext(xt);return Pt(e,r)}var sn=m(56982),cn=["children","locked"],J=t.createContext(null);function vn(r,e){var a=(0,w.Z)({},r);return Object.keys(e).forEach(function(i){var n=e[i];n!==void 0&&(a[i]=n)}),a}function Ee(r){var e=r.children,a=r.locked,i=(0,W.Z)(r,cn),n=t.useContext(J),l=(0,sn.Z)(function(){return vn(n,i)},[n,i],function(o,u){return!a&&(o[0]!==u[0]||!(0,Rt.Z)(o[1],u[1],!0))});return t.createElement(J.Provider,{value:l},e)}var dn=[],Kt=t.createContext(null);function Ge(){return t.useContext(Kt)}var Nt=t.createContext(dn);function be(r){var e=t.useContext(Nt);return t.useMemo(function(){return r!==void 0?[].concat((0,ye.Z)(e),[r]):e},[e,r])}var wt=t.createContext(null),fn=t.createContext({}),nt=fn,mn=m(88603),ae=m(15105),Ke=m(75164),rt=ae.Z.LEFT,at=ae.Z.RIGHT,it=ae.Z.UP,We=ae.Z.DOWN,He=ae.Z.ENTER,Dt=ae.Z.ESC,Ne=ae.Z.HOME,we=ae.Z.END,Ot=[it,We,rt,at];function pn(r,e,a,i){var n,l,o,u,c="prev",s="next",C="children",v="parent";if(r==="inline"&&i===He)return{inlineTrigger:!0};var b=(n={},(0,x.Z)(n,it,c),(0,x.Z)(n,We,s),n),I=(l={},(0,x.Z)(l,rt,a?s:c),(0,x.Z)(l,at,a?c:s),(0,x.Z)(l,We,C),(0,x.Z)(l,He,C),l),p=(o={},(0,x.Z)(o,it,c),(0,x.Z)(o,We,s),(0,x.Z)(o,He,C),(0,x.Z)(o,Dt,v),(0,x.Z)(o,rt,a?C:v),(0,x.Z)(o,at,a?v:C),o),K={inline:b,horizontal:I,vertical:p,inlineSub:b,horizontalSub:p,verticalSub:p},P=(u=K["".concat(r).concat(e?"":"Sub")])===null||u===void 0?void 0:u[i];switch(P){case c:return{offset:-1,sibling:!0};case s:return{offset:1,sibling:!0};case v:return{offset:-1,sibling:!1};case C:return{offset:1,sibling:!1};default:return null}}function hn(r){for(var e=r;e;){if(e.getAttribute("data-menu-list"))return e;e=e.parentElement}return null}function gn(r,e){for(var a=r||document.activeElement;a;){if(e.has(a))return a;a=a.parentElement}return null}function ot(r,e){var a=(0,mn.tS)(r,!0);return a.filter(function(i){return e.has(i)})}function At(r,e,a){var i=arguments.length>3&&arguments[3]!==void 0?arguments[3]:1;if(!r)return null;var n=ot(r,e),l=n.length,o=n.findIndex(function(u){return a===u});return i<0?o===-1?o=l-1:o-=1:i>0&&(o+=1),o=(o+l)%l,n[o]}var lt=function(e,a){var i=new Set,n=new Map,l=new Map;return e.forEach(function(o){var u=document.querySelector("[data-menu-id='".concat(Pt(a,o),"']"));u&&(i.add(u),l.set(u,o),n.set(o,u))}),{elements:i,key2element:n,element2key:l}};function Cn(r,e,a,i,n,l,o,u,c,s){var C=t.useRef(),v=t.useRef();v.current=e;var b=function(){Ke.Z.cancel(C.current)};return t.useEffect(function(){return function(){b()}},[]),function(I){var p=I.which;if([].concat(Ot,[He,Dt,Ne,we]).includes(p)){var K=l(),P=lt(K,i),N=P,h=N.elements,f=N.key2element,d=N.element2key,S=f.get(e),y=gn(S,h),D=d.get(y),M=pn(r,o(D,!0).length===1,a,p);if(!M&&p!==Ne&&p!==we)return;(Ot.includes(p)||[Ne,we].includes(p))&&I.preventDefault();var Q=function(T){if(T){var q=T,_=T.querySelector("a");_!=null&&_.getAttribute("href")&&(q=_);var ee=d.get(T);u(ee),b(),C.current=(0,Ke.Z)(function(){v.current===ee&&q.focus()})}};if([Ne,we].includes(p)||M.sibling||!y){var Z;!y||r==="inline"?Z=n.current:Z=hn(y);var U,A=ot(Z,h);p===Ne?U=A[0]:p===we?U=A[A.length-1]:U=At(Z,h,y,M.offset),Q(U)}else if(M.inlineTrigger)c(D);else if(M.offset>0)c(D,!0),b(),C.current=(0,Ke.Z)(function(){P=lt(K,i);var ie=y.getAttribute("aria-controls"),T=document.getElementById(ie),q=At(T,P.elements);Q(q)},5);else if(M.offset<0){var $=o(D,!0),H=$[$.length-2],B=f.get(H);c(H,!1),Q(B)}}s==null||s(I)}}function yn(r){Promise.resolve().then(r)}var ut="__RC_UTIL_PATH_SPLIT__",Lt=function(e){return e.join(ut)},bn=function(e){return e.split(ut)},st="rc-menu-more";function In(){var r=t.useState({}),e=(0,L.Z)(r,2),a=e[1],i=(0,t.useRef)(new Map),n=(0,t.useRef)(new Map),l=t.useState([]),o=(0,L.Z)(l,2),u=o[0],c=o[1],s=(0,t.useRef)(0),C=(0,t.useRef)(!1),v=function(){C.current||a({})},b=(0,t.useCallback)(function(f,d){var S=Lt(d);n.current.set(S,f),i.current.set(f,S),s.current+=1;var y=s.current;yn(function(){y===s.current&&v()})},[]),I=(0,t.useCallback)(function(f,d){var S=Lt(d);n.current.delete(S),i.current.delete(f)},[]),p=(0,t.useCallback)(function(f){c(f)},[]),K=(0,t.useCallback)(function(f,d){var S=i.current.get(f)||"",y=bn(S);return d&&u.includes(y[0])&&y.unshift(st),y},[u]),P=(0,t.useCallback)(function(f,d){return f.some(function(S){var y=K(S,!0);return y.includes(d)})},[K]),N=function(){var d=(0,ye.Z)(i.current.keys());return u.length&&d.push(st),d},h=(0,t.useCallback)(function(f){var d="".concat(i.current.get(f)).concat(ut),S=new Set;return(0,ye.Z)(n.current.keys()).forEach(function(y){y.startsWith(d)&&S.add(n.current.get(y))}),S},[]);return t.useEffect(function(){return function(){C.current=!0}},[]),{registerPath:b,unregisterPath:I,refreshOverflowKeys:p,isSubPathKey:P,getKeyPath:K,getKeys:N,getSubPathKeys:h}}function De(r){var e=t.useRef(r);e.current=r;var a=t.useCallback(function(){for(var i,n=arguments.length,l=new Array(n),o=0;o<n;o++)l[o]=arguments[o];return(i=e.current)===null||i===void 0?void 0:i.call.apply(i,[e].concat(l))},[]);return r?a:void 0}var Mn=Math.random().toFixed(5).toString().slice(2),$t=0;function Sn(r){var e=(0,ze.Z)(r,{value:r}),a=(0,L.Z)(e,2),i=a[0],n=a[1];return t.useEffect(function(){$t+=1;var l="".concat(Mn,"-").concat($t);n("rc-menu-uuid-".concat(l))},[]),i}var Rn=m(15671),Zn=m(43144),xn=m(32531),Pn=m(51630),kt=m(98423),En=m(42550);function Tt(r,e,a,i){var n=t.useContext(J),l=n.activeKey,o=n.onActive,u=n.onInactive,c={active:l===r};return e||(c.onMouseEnter=function(s){a==null||a({key:r,domEvent:s}),o(r)},c.onMouseLeave=function(s){i==null||i({key:r,domEvent:s}),u(r)}),c}function Ft(r){var e=t.useContext(J),a=e.mode,i=e.rtl,n=e.inlineIndent;if(a!=="inline")return null;var l=r;return i?{paddingRight:l*n}:{paddingLeft:l*n}}function Vt(r){var e=r.icon,a=r.props,i=r.children,n;return e===null||e===!1?null:(typeof e=="function"?n=t.createElement(e,(0,w.Z)({},a)):typeof e!="boolean"&&(n=e),n||i||null)}var Kn=["item"];function Be(r){var e=r.item,a=(0,W.Z)(r,Kn);return Object.defineProperty(a,"item",{get:function(){return(0,Zt.ZP)(!1,"`info.item` is deprecated since we will move to function component that not provides React Node instance in future."),e}}),a}var Nn=["title","attribute","elementRef"],wn=["style","className","eventKey","warnKey","disabled","itemIcon","children","role","onMouseEnter","onMouseLeave","onClick","onKeyDown","onFocus"],Dn=["active"],On=function(r){(0,xn.Z)(a,r);var e=(0,Pn.Z)(a);function a(){return(0,Rn.Z)(this,a),e.apply(this,arguments)}return(0,Zn.Z)(a,[{key:"render",value:function(){var n=this.props,l=n.title,o=n.attribute,u=n.elementRef,c=(0,W.Z)(n,Nn),s=(0,kt.Z)(c,["eventKey","popupClassName","popupOffset","onTitleClick"]);return(0,Zt.ZP)(!o,"`attribute` of Menu.Item is deprecated. Please pass attribute directly."),t.createElement(Pe.Z.Item,(0,V.Z)({},o,{title:typeof l=="string"?l:void 0},s,{ref:u}))}}]),a}(t.Component),An=t.forwardRef(function(r,e){var a,i=r.style,n=r.className,l=r.eventKey,o=r.warnKey,u=r.disabled,c=r.itemIcon,s=r.children,C=r.role,v=r.onMouseEnter,b=r.onMouseLeave,I=r.onClick,p=r.onKeyDown,K=r.onFocus,P=(0,W.Z)(r,wn),N=Et(l),h=t.useContext(J),f=h.prefixCls,d=h.onItemClick,S=h.disabled,y=h.overflowDisabled,D=h.itemIcon,M=h.selectedKeys,Q=h.onActive,Z=t.useContext(nt),U=Z._internalRenderMenuItem,A="".concat(f,"-item"),$=t.useRef(),H=t.useRef(),B=S||u,ie=(0,En.x1)(e,H),T=be(l),q=function(k){return{key:l,keyPath:(0,ye.Z)(T).reverse(),item:$.current,domEvent:k}},_=c||D,ee=Tt(l,B,v,b),ce=ee.active,ve=(0,W.Z)(ee,Dn),oe=M.includes(l),de=Ft(T.length),fe=function(k){if(!B){var te=q(k);I==null||I(Be(te)),d(te)}},F=function(k){if(p==null||p(k),k.which===ae.Z.ENTER){var te=q(k);I==null||I(Be(te)),d(te)}},j=function(k){Q(l),K==null||K(k)},Me={};r.role==="option"&&(Me["aria-selected"]=oe);var me=t.createElement(On,(0,V.Z)({ref:$,elementRef:ie,role:C===null?"none":C||"menuitem",tabIndex:u?null:-1,"data-menu-id":y&&N?null:N},P,ve,Me,{component:"li","aria-disabled":u,style:(0,w.Z)((0,w.Z)({},de),i),className:se()(A,(a={},(0,x.Z)(a,"".concat(A,"-active"),ce),(0,x.Z)(a,"".concat(A,"-selected"),oe),(0,x.Z)(a,"".concat(A,"-disabled"),B),a),n),onClick:fe,onKeyDown:F,onFocus:j}),s,t.createElement(Vt,{props:(0,w.Z)((0,w.Z)({},r),{},{isSelected:oe}),icon:_}));return U&&(me=U(me,r,{selected:oe})),me});function Ln(r,e){var a=r.eventKey,i=Ge(),n=be(a);return t.useEffect(function(){if(i)return i.registerPath(a,n),function(){i.unregisterPath(a,n)}},[n]),i?null:t.createElement(An,(0,V.Z)({},r,{ref:e}))}var Oe=t.forwardRef(Ln),$n=["className","children"],kn=function(e,a){var i=e.className,n=e.children,l=(0,W.Z)(e,$n),o=t.useContext(J),u=o.prefixCls,c=o.mode,s=o.rtl;return t.createElement("ul",(0,V.Z)({className:se()(u,s&&"".concat(u,"-rtl"),"".concat(u,"-sub"),"".concat(u,"-").concat(c==="inline"?"inline":"vertical"),i),role:"menu"},l,{"data-menu-list":!0,ref:a}),n)},Ut=t.forwardRef(kn);Ut.displayName="SubMenuList";var zt=Ut,Tn=m(50344);function ct(r,e){return(0,Tn.Z)(r).map(function(a,i){if(t.isValidElement(a)){var n,l,o=a.key,u=(n=(l=a.props)===null||l===void 0?void 0:l.eventKey)!==null&&n!==void 0?n:o,c=u==null;c&&(u="tmp_key-".concat([].concat((0,ye.Z)(e),[i]).join("-")));var s={key:u,eventKey:u};return t.cloneElement(a,s)}return a})}var Fn=m(40228),O={adjustX:1,adjustY:1},Vn={topLeft:{points:["bl","tl"],overflow:O},topRight:{points:["br","tr"],overflow:O},bottomLeft:{points:["tl","bl"],overflow:O},bottomRight:{points:["tr","br"],overflow:O},leftTop:{points:["tr","tl"],overflow:O},leftBottom:{points:["br","bl"],overflow:O},rightTop:{points:["tl","tr"],overflow:O},rightBottom:{points:["bl","br"],overflow:O}},Un={topLeft:{points:["bl","tl"],overflow:O},topRight:{points:["br","tr"],overflow:O},bottomLeft:{points:["tl","bl"],overflow:O},bottomRight:{points:["tr","br"],overflow:O},rightTop:{points:["tr","tl"],overflow:O},rightBottom:{points:["br","bl"],overflow:O},leftTop:{points:["tl","tr"],overflow:O},leftBottom:{points:["bl","br"],overflow:O}},Lr=null;function Gt(r,e,a){if(e)return e;if(a)return a[r]||a.other}var zn={horizontal:"bottomLeft",vertical:"rightTop","vertical-left":"rightTop","vertical-right":"leftTop"};function Gn(r){var e=r.prefixCls,a=r.visible,i=r.children,n=r.popup,l=r.popupStyle,o=r.popupClassName,u=r.popupOffset,c=r.disabled,s=r.mode,C=r.onVisibleChange,v=t.useContext(J),b=v.getPopupContainer,I=v.rtl,p=v.subMenuOpenDelay,K=v.subMenuCloseDelay,P=v.builtinPlacements,N=v.triggerSubMenuAction,h=v.forceSubMenuRender,f=v.rootClassName,d=v.motion,S=v.defaultMotions,y=t.useState(!1),D=(0,L.Z)(y,2),M=D[0],Q=D[1],Z=I?(0,w.Z)((0,w.Z)({},Un),P):(0,w.Z)((0,w.Z)({},Vn),P),U=zn[s],A=Gt(s,d,S),$=t.useRef(A);s!=="inline"&&($.current=A);var H=(0,w.Z)((0,w.Z)({},$.current),{},{leavedClassName:"".concat(e,"-hidden"),removeOnLeave:!1,motionAppear:!0}),B=t.useRef();return t.useEffect(function(){return B.current=(0,Ke.Z)(function(){Q(a)}),function(){Ke.Z.cancel(B.current)}},[a]),t.createElement(Fn.Z,{prefixCls:e,popupClassName:se()("".concat(e,"-popup"),(0,x.Z)({},"".concat(e,"-rtl"),I),o,f),stretch:s==="horizontal"?"minWidth":null,getPopupContainer:b,builtinPlacements:Z,popupPlacement:U,popupVisible:M,popup:n,popupStyle:l,popupAlign:u&&{offset:u},action:c?[]:[N],mouseEnterDelay:p,mouseLeaveDelay:K,onPopupVisibleChange:C,forceRender:h,popupMotion:H,fresh:!0},i)}var Wn=m(82225);function Hn(r){var e=r.id,a=r.open,i=r.keyPath,n=r.children,l="inline",o=t.useContext(J),u=o.prefixCls,c=o.forceSubMenuRender,s=o.motion,C=o.defaultMotions,v=o.mode,b=t.useRef(!1);b.current=v===l;var I=t.useState(!b.current),p=(0,L.Z)(I,2),K=p[0],P=p[1],N=b.current?a:!1;t.useEffect(function(){b.current&&P(!1)},[v]);var h=(0,w.Z)({},Gt(l,s,C));i.length>1&&(h.motionAppear=!1);var f=h.onVisibleChanged;return h.onVisibleChanged=function(d){return!b.current&&!d&&P(!0),f==null?void 0:f(d)},K?null:t.createElement(Ee,{mode:l,locked:!b.current},t.createElement(Wn.ZP,(0,V.Z)({visible:N},h,{forceRender:c,removeOnLeave:!1,leavedClassName:"".concat(u,"-hidden")}),function(d){var S=d.className,y=d.style;return t.createElement(zt,{id:e,className:S,style:y},n)}))}var Bn=["style","className","title","eventKey","warnKey","disabled","internalPopupClose","children","itemIcon","expandIcon","popupClassName","popupOffset","popupStyle","onClick","onMouseEnter","onMouseLeave","onTitleClick","onTitleMouseEnter","onTitleMouseLeave"],jn=["active"],Yn=function(e){var a,i=e.style,n=e.className,l=e.title,o=e.eventKey,u=e.warnKey,c=e.disabled,s=e.internalPopupClose,C=e.children,v=e.itemIcon,b=e.expandIcon,I=e.popupClassName,p=e.popupOffset,K=e.popupStyle,P=e.onClick,N=e.onMouseEnter,h=e.onMouseLeave,f=e.onTitleClick,d=e.onTitleMouseEnter,S=e.onTitleMouseLeave,y=(0,W.Z)(e,Bn),D=Et(o),M=t.useContext(J),Q=M.prefixCls,Z=M.mode,U=M.openKeys,A=M.disabled,$=M.overflowDisabled,H=M.activeKey,B=M.selectedKeys,ie=M.itemIcon,T=M.expandIcon,q=M.onItemClick,_=M.onOpenChange,ee=M.onActive,ce=t.useContext(nt),ve=ce._internalRenderSubMenuItem,oe=t.useContext(wt),de=oe.isSubPathKey,fe=be(),F="".concat(Q,"-submenu"),j=A||c,Me=t.useRef(),me=t.useRef(),pe=v??ie,k=b??T,te=U.includes(o),le=!$&&te,Ye=de(B,o),Se=Tt(o,j,d,S),he=Se.active,mt=(0,W.Z)(Se,jn),Wt=t.useState(!1),pt=(0,L.Z)(Wt,2),Le=pt[0],Xe=pt[1],Je=function(X){j||Xe(X)},ne=function(X){Je(!0),N==null||N({key:o,domEvent:X})},ht=function(X){Je(!1),h==null||h({key:o,domEvent:X})},$e=t.useMemo(function(){return he||(Z!=="inline"?Le||de([H],o):!1)},[Z,he,H,Le,o,de]),Qe=Ft(fe.length),gt=function(X){j||(f==null||f({key:o,domEvent:X}),Z==="inline"&&_(o,!te))},Re=De(function(re){P==null||P(Be(re)),q(re)}),ke=function(X){Z!=="inline"&&_(o,X)},Te=function(){ee(o)},Fe=D&&"".concat(D,"-popup"),Ze=t.createElement("div",(0,V.Z)({role:"menuitem",style:Qe,className:"".concat(F,"-title"),tabIndex:j?null:-1,ref:Me,title:typeof l=="string"?l:null,"data-menu-id":$&&D?null:D,"aria-expanded":le,"aria-haspopup":!0,"aria-controls":Fe,"aria-disabled":j,onClick:gt,onFocus:Te},mt),l,t.createElement(Vt,{icon:Z!=="horizontal"?k:void 0,props:(0,w.Z)((0,w.Z)({},e),{},{isOpen:le,isSubMenu:!0})},t.createElement("i",{className:"".concat(F,"-arrow")}))),Y=t.useRef(Z);if(Z!=="inline"&&fe.length>1?Y.current="vertical":Y.current=Z,!$){var xe=Y.current;Ze=t.createElement(Gn,{mode:xe,prefixCls:F,visible:!s&&le&&Z!=="inline",popupClassName:I,popupOffset:p,popupStyle:K,popup:t.createElement(Ee,{mode:xe==="horizontal"?"vertical":xe},t.createElement(zt,{id:Fe,ref:me},C)),disabled:j,onVisibleChange:ke},Ze)}var ge=t.createElement(Pe.Z.Item,(0,V.Z)({role:"none"},y,{component:"li",style:i,className:se()(F,"".concat(F,"-").concat(Z),n,(a={},(0,x.Z)(a,"".concat(F,"-open"),le),(0,x.Z)(a,"".concat(F,"-active"),$e),(0,x.Z)(a,"".concat(F,"-selected"),Ye),(0,x.Z)(a,"".concat(F,"-disabled"),j),a)),onMouseEnter:ne,onMouseLeave:ht}),Ze,!$&&t.createElement(Hn,{id:Fe,open:le,keyPath:fe},C));return ve&&(ge=ve(ge,e,{selected:Ye,active:$e,open:le,disabled:j})),t.createElement(Ee,{onItemClick:Re,mode:Z==="horizontal"?"vertical":Z,itemIcon:pe,expandIcon:k},ge)};function je(r){var e=r.eventKey,a=r.children,i=be(e),n=ct(a,i),l=Ge();t.useEffect(function(){if(l)return l.registerPath(e,i),function(){l.unregisterPath(e,i)}},[i]);var o;return l?o=n:o=t.createElement(Yn,r,n),t.createElement(Nt.Provider,{value:i},o)}var Xn=m(71002),Jn=["className","title","eventKey","children"],Qn=["children"],qn=function(e){var a=e.className,i=e.title,n=e.eventKey,l=e.children,o=(0,W.Z)(e,Jn),u=t.useContext(J),c=u.prefixCls,s="".concat(c,"-item-group");return t.createElement("li",(0,V.Z)({role:"presentation"},o,{onClick:function(v){return v.stopPropagation()},className:se()(s,a)}),t.createElement("div",{role:"presentation",className:"".concat(s,"-title"),title:typeof i=="string"?i:void 0},i),t.createElement("ul",{role:"group",className:"".concat(s,"-list")},l))};function vt(r){var e=r.children,a=(0,W.Z)(r,Qn),i=be(a.eventKey),n=ct(e,i),l=Ge();return l?n:t.createElement(qn,(0,kt.Z)(a,["warnKey"]),n)}function dt(r){var e=r.className,a=r.style,i=t.useContext(J),n=i.prefixCls,l=Ge();return l?null:t.createElement("li",{role:"separator",className:se()("".concat(n,"-item-divider"),e),style:a})}var _n=["label","children","key","type"];function ft(r){return(r||[]).map(function(e,a){if(e&&(0,Xn.Z)(e)==="object"){var i=e,n=i.label,l=i.children,o=i.key,u=i.type,c=(0,W.Z)(i,_n),s=o??"tmp-".concat(a);return l||u==="group"?u==="group"?t.createElement(vt,(0,V.Z)({key:s},c,{title:n}),ft(l)):t.createElement(je,(0,V.Z)({key:s},c,{title:n}),ft(l)):u==="divider"?t.createElement(dt,(0,V.Z)({key:s},c)):t.createElement(Oe,(0,V.Z)({key:s},c),n)}return null}).filter(function(e){return e})}function er(r,e,a){var i=r;return e&&(i=ft(e)),ct(i,a)}var tr=["prefixCls","rootClassName","style","className","tabIndex","items","children","direction","id","mode","inlineCollapsed","disabled","disabledOverflow","subMenuOpenDelay","subMenuCloseDelay","forceSubMenuRender","defaultOpenKeys","openKeys","activeKey","defaultActiveFirst","selectable","multiple","defaultSelectedKeys","selectedKeys","onSelect","onDeselect","inlineIndent","motion","defaultMotions","triggerSubMenuAction","builtinPlacements","itemIcon","expandIcon","overflowedIndicator","overflowedIndicatorPopupClassName","getPopupContainer","onClick","onOpenChange","onKeyDown","openAnimation","openTransitionName","_internalRenderMenuItem","_internalRenderSubMenuItem"],Ie=[],nr=t.forwardRef(function(r,e){var a,i,n=r,l=n.prefixCls,o=l===void 0?"rc-menu":l,u=n.rootClassName,c=n.style,s=n.className,C=n.tabIndex,v=C===void 0?0:C,b=n.items,I=n.children,p=n.direction,K=n.id,P=n.mode,N=P===void 0?"vertical":P,h=n.inlineCollapsed,f=n.disabled,d=n.disabledOverflow,S=n.subMenuOpenDelay,y=S===void 0?.1:S,D=n.subMenuCloseDelay,M=D===void 0?.1:D,Q=n.forceSubMenuRender,Z=n.defaultOpenKeys,U=n.openKeys,A=n.activeKey,$=n.defaultActiveFirst,H=n.selectable,B=H===void 0?!0:H,ie=n.multiple,T=ie===void 0?!1:ie,q=n.defaultSelectedKeys,_=n.selectedKeys,ee=n.onSelect,ce=n.onDeselect,ve=n.inlineIndent,oe=ve===void 0?24:ve,de=n.motion,fe=n.defaultMotions,F=n.triggerSubMenuAction,j=F===void 0?"hover":F,Me=n.builtinPlacements,me=n.itemIcon,pe=n.expandIcon,k=n.overflowedIndicator,te=k===void 0?"...":k,le=n.overflowedIndicatorPopupClassName,Ye=n.getPopupContainer,Se=n.onClick,he=n.onOpenChange,mt=n.onKeyDown,Wt=n.openAnimation,pt=n.openTransitionName,Le=n._internalRenderMenuItem,Xe=n._internalRenderSubMenuItem,Je=(0,W.Z)(n,tr),ne=t.useMemo(function(){return er(I,b,Ie)},[I,b]),ht=t.useState(!1),$e=(0,L.Z)(ht,2),Qe=$e[0],gt=$e[1],Re=t.useRef(),ke=Sn(K),Te=p==="rtl",Fe=(0,ze.Z)(Z,{value:U,postState:function(g){return g||Ie}}),Ze=(0,L.Z)(Fe,2),Y=Ze[0],xe=Ze[1],ge=function(g){var R=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;function z(){xe(g),he==null||he(g)}R?(0,un.flushSync)(z):z()},re=t.useState(Y),X=(0,L.Z)(re,2),ir=X[0],or=X[1],Ct=t.useRef(!1),lr=t.useMemo(function(){return(N==="inline"||N==="vertical")&&h?["vertical",h]:[N,!1]},[N,h]),Ht=(0,L.Z)(lr,2),qe=Ht[0],yt=Ht[1],Bt=qe==="inline",ur=t.useState(qe),jt=(0,L.Z)(ur,2),ue=jt[0],sr=jt[1],cr=t.useState(yt),Yt=(0,L.Z)(cr,2),vr=Yt[0],dr=Yt[1];t.useEffect(function(){sr(qe),dr(yt),Ct.current&&(Bt?xe(ir):ge(Ie))},[qe,yt]);var fr=t.useState(0),Xt=(0,L.Z)(fr,2),_e=Xt[0],mr=Xt[1],bt=_e>=ne.length-1||ue!=="horizontal"||d;t.useEffect(function(){Bt&&or(Y)},[Y]),t.useEffect(function(){return Ct.current=!0,function(){Ct.current=!1}},[]);var Ce=In(),Jt=Ce.registerPath,Qt=Ce.unregisterPath,pr=Ce.refreshOverflowKeys,qt=Ce.isSubPathKey,hr=Ce.getKeyPath,_t=Ce.getKeys,gr=Ce.getSubPathKeys,Cr=t.useMemo(function(){return{registerPath:Jt,unregisterPath:Qt}},[Jt,Qt]),yr=t.useMemo(function(){return{isSubPathKey:qt}},[qt]);t.useEffect(function(){pr(bt?Ie:ne.slice(_e+1).map(function(E){return E.key}))},[_e,bt]);var br=(0,ze.Z)(A||$&&((a=ne[0])===null||a===void 0?void 0:a.key),{value:A}),en=(0,L.Z)(br,2),Ve=en[0],It=en[1],Ir=De(function(E){It(E)}),Mr=De(function(){It(void 0)});(0,t.useImperativeHandle)(e,function(){return{list:Re.current,focus:function(g){var R,z=_t(),G=lt(z,ke),tt=G.elements,Mt=G.key2element,Dr=G.element2key,rn=ot(Re.current,tt),an=Ve??(rn[0]?Dr.get(rn[0]):(R=ne.find(function(Or){return!Or.props.disabled}))===null||R===void 0?void 0:R.key),Ue=Mt.get(an);if(an&&Ue){var St;Ue==null||(St=Ue.focus)===null||St===void 0||St.call(Ue,g)}}}});var Sr=(0,ze.Z)(q||[],{value:_,postState:function(g){return Array.isArray(g)?g:g==null?Ie:[g]}}),tn=(0,L.Z)(Sr,2),et=tn[0],Rr=tn[1],Zr=function(g){if(B){var R=g.key,z=et.includes(R),G;T?z?G=et.filter(function(Mt){return Mt!==R}):G=[].concat((0,ye.Z)(et),[R]):G=[R],Rr(G);var tt=(0,w.Z)((0,w.Z)({},g),{},{selectedKeys:G});z?ce==null||ce(tt):ee==null||ee(tt)}!T&&Y.length&&ue!=="inline"&&ge(Ie)},xr=De(function(E){Se==null||Se(Be(E)),Zr(E)}),nn=De(function(E,g){var R=Y.filter(function(G){return G!==E});if(g)R.push(E);else if(ue!=="inline"){var z=gr(E);R=R.filter(function(G){return!z.has(G)})}(0,Rt.Z)(Y,R,!0)||ge(R,!0)}),Pr=function(g,R){var z=R??!Y.includes(g);nn(g,z)},Er=Cn(ue,Ve,Te,ke,Re,_t,hr,It,Pr,mt);t.useEffect(function(){gt(!0)},[]);var Kr=t.useMemo(function(){return{_internalRenderMenuItem:Le,_internalRenderSubMenuItem:Xe}},[Le,Xe]),Nr=ue!=="horizontal"||d?ne:ne.map(function(E,g){return t.createElement(Ee,{key:E.key,overflowDisabled:g>_e},E)}),wr=t.createElement(Pe.Z,(0,V.Z)({id:K,ref:Re,prefixCls:"".concat(o,"-overflow"),component:"ul",itemComponent:Oe,className:se()(o,"".concat(o,"-root"),"".concat(o,"-").concat(ue),s,(i={},(0,x.Z)(i,"".concat(o,"-inline-collapsed"),vr),(0,x.Z)(i,"".concat(o,"-rtl"),Te),i),u),dir:p,style:c,role:"menu",tabIndex:v,data:Nr,renderRawItem:function(g){return g},renderRawRest:function(g){var R=g.length,z=R?ne.slice(-R):null;return t.createElement(je,{eventKey:st,title:te,disabled:bt,internalPopupClose:R===0,popupClassName:le},z)},maxCount:ue!=="horizontal"||d?Pe.Z.INVALIDATE:Pe.Z.RESPONSIVE,ssr:"full","data-menu-list":!0,onVisibleChange:function(g){mr(g)},onKeyDown:Er},Je));return t.createElement(nt.Provider,{value:Kr},t.createElement(xt.Provider,{value:ke},t.createElement(Ee,{prefixCls:o,rootClassName:u,mode:ue,openKeys:Y,rtl:Te,disabled:f,motion:Qe?de:null,defaultMotions:Qe?fe:null,activeKey:Ve,onActive:Ir,onInactive:Mr,selectedKeys:et,inlineIndent:oe,subMenuOpenDelay:y,subMenuCloseDelay:M,forceSubMenuRender:Q,builtinPlacements:Me,triggerSubMenuAction:j,getPopupContainer:Ye,itemIcon:me,expandIcon:pe,onItemClick:xr,onOpenChange:nn},t.createElement(wt.Provider,{value:yr},wr),t.createElement("div",{style:{display:"none"},"aria-hidden":!0},t.createElement(Kt.Provider,{value:Cr},ne)))))}),rr=nr,Ae=rr;Ae.Item=Oe,Ae.SubMenu=je,Ae.ItemGroup=vt,Ae.Divider=dt;var ar=Ae}}]);
