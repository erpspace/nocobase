"use strict";(self.webpackChunknocobase=self.webpackChunknocobase||[]).push([[1835],{49685:function(V,D,S){S.d(D,{WT:function(){return F}});var Y=1e-6,F=typeof Float32Array<"u"?Float32Array:Array,j=Math.random;function B(w){F=w}var k=Math.PI/180;function J(w){return w*k}function W(w,N){return Math.abs(w-N)<=Y*Math.max(1,Math.abs(w),Math.abs(N))}Math.hypot||(Math.hypot=function(){for(var w=0,N=arguments.length;N--;)w+=arguments[N]*arguments[N];return Math.sqrt(w)})},35600:function(V,D,S){S.d(D,{Jp:function(){return Q},U_:function(){return N},Us:function(){return Z},vc:function(){return C},xJ:function(){return K}});function Y(){var r=new glMatrix.ARRAY_TYPE(9);return glMatrix.ARRAY_TYPE!=Float32Array&&(r[1]=0,r[2]=0,r[3]=0,r[5]=0,r[6]=0,r[7]=0),r[0]=1,r[4]=1,r[8]=1,r}function F(r,a){return r[0]=a[0],r[1]=a[1],r[2]=a[2],r[3]=a[4],r[4]=a[5],r[5]=a[6],r[6]=a[8],r[7]=a[9],r[8]=a[10],r}function j(r){var a=new glMatrix.ARRAY_TYPE(9);return a[0]=r[0],a[1]=r[1],a[2]=r[2],a[3]=r[3],a[4]=r[4],a[5]=r[5],a[6]=r[6],a[7]=r[7],a[8]=r[8],a}function B(r,a){return r[0]=a[0],r[1]=a[1],r[2]=a[2],r[3]=a[3],r[4]=a[4],r[5]=a[5],r[6]=a[6],r[7]=a[7],r[8]=a[8],r}function k(r,a,M,l,x,d,g,m,A){var y=new glMatrix.ARRAY_TYPE(9);return y[0]=r,y[1]=a,y[2]=M,y[3]=l,y[4]=x,y[5]=d,y[6]=g,y[7]=m,y[8]=A,y}function J(r,a,M,l,x,d,g,m,A,y){return r[0]=a,r[1]=M,r[2]=l,r[3]=x,r[4]=d,r[5]=g,r[6]=m,r[7]=A,r[8]=y,r}function W(r){return r[0]=1,r[1]=0,r[2]=0,r[3]=0,r[4]=1,r[5]=0,r[6]=0,r[7]=0,r[8]=1,r}function w(r,a){if(r===a){var M=a[1],l=a[2],x=a[5];r[1]=a[3],r[2]=a[6],r[3]=M,r[5]=a[7],r[6]=l,r[7]=x}else r[0]=a[0],r[1]=a[3],r[2]=a[6],r[3]=a[1],r[4]=a[4],r[5]=a[7],r[6]=a[2],r[7]=a[5],r[8]=a[8];return r}function N(r,a){var M=a[0],l=a[1],x=a[2],d=a[3],g=a[4],m=a[5],A=a[6],y=a[7],_=a[8],R=_*g-m*y,u=-_*d+m*A,z=y*d-g*A,i=M*R+l*u+x*z;return i?(i=1/i,r[0]=R*i,r[1]=(-_*l+x*y)*i,r[2]=(m*l-x*g)*i,r[3]=u*i,r[4]=(_*M-x*A)*i,r[5]=(-m*M+x*d)*i,r[6]=z*i,r[7]=(-y*M+l*A)*i,r[8]=(g*M-l*d)*i,r):null}function nr(r,a){var M=a[0],l=a[1],x=a[2],d=a[3],g=a[4],m=a[5],A=a[6],y=a[7],_=a[8];return r[0]=g*_-m*y,r[1]=x*y-l*_,r[2]=l*m-x*g,r[3]=m*A-d*_,r[4]=M*_-x*A,r[5]=x*d-M*m,r[6]=d*y-g*A,r[7]=l*A-M*y,r[8]=M*g-l*d,r}function ar(r){var a=r[0],M=r[1],l=r[2],x=r[3],d=r[4],g=r[5],m=r[6],A=r[7],y=r[8];return a*(y*d-g*A)+M*(-y*x+g*m)+l*(A*x-d*m)}function Q(r,a,M){var l=a[0],x=a[1],d=a[2],g=a[3],m=a[4],A=a[5],y=a[6],_=a[7],R=a[8],u=M[0],z=M[1],i=M[2],c=M[3],f=M[4],n=M[5],e=M[6],t=M[7],v=M[8];return r[0]=u*l+z*g+i*y,r[1]=u*x+z*m+i*_,r[2]=u*d+z*A+i*R,r[3]=c*l+f*g+n*y,r[4]=c*x+f*m+n*_,r[5]=c*d+f*A+n*R,r[6]=e*l+t*g+v*y,r[7]=e*x+t*m+v*_,r[8]=e*d+t*A+v*R,r}function X(r,a,M){var l=a[0],x=a[1],d=a[2],g=a[3],m=a[4],A=a[5],y=a[6],_=a[7],R=a[8],u=M[0],z=M[1];return r[0]=l,r[1]=x,r[2]=d,r[3]=g,r[4]=m,r[5]=A,r[6]=u*l+z*g+y,r[7]=u*x+z*m+_,r[8]=u*d+z*A+R,r}function H(r,a,M){var l=a[0],x=a[1],d=a[2],g=a[3],m=a[4],A=a[5],y=a[6],_=a[7],R=a[8],u=Math.sin(M),z=Math.cos(M);return r[0]=z*l+u*g,r[1]=z*x+u*m,r[2]=z*d+u*A,r[3]=z*g-u*l,r[4]=z*m-u*x,r[5]=z*A-u*d,r[6]=y,r[7]=_,r[8]=R,r}function er(r,a,M){var l=M[0],x=M[1];return r[0]=l*a[0],r[1]=l*a[1],r[2]=l*a[2],r[3]=x*a[3],r[4]=x*a[4],r[5]=x*a[5],r[6]=a[6],r[7]=a[7],r[8]=a[8],r}function C(r,a){return r[0]=1,r[1]=0,r[2]=0,r[3]=0,r[4]=1,r[5]=0,r[6]=a[0],r[7]=a[1],r[8]=1,r}function Z(r,a){var M=Math.sin(a),l=Math.cos(a);return r[0]=l,r[1]=M,r[2]=0,r[3]=-M,r[4]=l,r[5]=0,r[6]=0,r[7]=0,r[8]=1,r}function K(r,a){return r[0]=a[0],r[1]=0,r[2]=0,r[3]=0,r[4]=a[1],r[5]=0,r[6]=0,r[7]=0,r[8]=1,r}function ir(r,a){return r[0]=a[0],r[1]=a[1],r[2]=0,r[3]=a[2],r[4]=a[3],r[5]=0,r[6]=a[4],r[7]=a[5],r[8]=1,r}function $(r,a){var M=a[0],l=a[1],x=a[2],d=a[3],g=M+M,m=l+l,A=x+x,y=M*g,_=l*g,R=l*m,u=x*g,z=x*m,i=x*A,c=d*g,f=d*m,n=d*A;return r[0]=1-R-i,r[3]=_-n,r[6]=u+f,r[1]=_+n,r[4]=1-y-i,r[7]=z-c,r[2]=u-f,r[5]=z+c,r[8]=1-y-R,r}function tr(r,a){var M=a[0],l=a[1],x=a[2],d=a[3],g=a[4],m=a[5],A=a[6],y=a[7],_=a[8],R=a[9],u=a[10],z=a[11],i=a[12],c=a[13],f=a[14],n=a[15],e=M*m-l*g,t=M*A-x*g,v=M*y-d*g,h=l*A-x*m,s=l*y-d*m,E=x*y-d*A,p=_*c-R*i,P=_*f-u*i,q=_*n-z*i,L=R*f-u*c,O=R*n-z*c,I=u*n-z*f,T=e*I-t*O+v*L+h*q-s*P+E*p;return T?(T=1/T,r[0]=(m*I-A*O+y*L)*T,r[1]=(A*q-g*I-y*P)*T,r[2]=(g*O-m*q+y*p)*T,r[3]=(x*O-l*I-d*L)*T,r[4]=(M*I-x*q+d*P)*T,r[5]=(l*q-M*O-d*p)*T,r[6]=(c*E-f*s+n*h)*T,r[7]=(f*v-i*E-n*t)*T,r[8]=(i*s-c*v+n*e)*T,r):null}function cr(r,a,M){return r[0]=2/a,r[1]=0,r[2]=0,r[3]=0,r[4]=-2/M,r[5]=0,r[6]=-1,r[7]=1,r[8]=1,r}function fr(r){return"mat3("+r[0]+", "+r[1]+", "+r[2]+", "+r[3]+", "+r[4]+", "+r[5]+", "+r[6]+", "+r[7]+", "+r[8]+")"}function G(r){return Math.hypot(r[0],r[1],r[2],r[3],r[4],r[5],r[6],r[7],r[8])}function U(r,a,M){return r[0]=a[0]+M[0],r[1]=a[1]+M[1],r[2]=a[2]+M[2],r[3]=a[3]+M[3],r[4]=a[4]+M[4],r[5]=a[5]+M[5],r[6]=a[6]+M[6],r[7]=a[7]+M[7],r[8]=a[8]+M[8],r}function vr(r,a,M){return r[0]=a[0]-M[0],r[1]=a[1]-M[1],r[2]=a[2]-M[2],r[3]=a[3]-M[3],r[4]=a[4]-M[4],r[5]=a[5]-M[5],r[6]=a[6]-M[6],r[7]=a[7]-M[7],r[8]=a[8]-M[8],r}function Mr(r,a,M){return r[0]=a[0]*M,r[1]=a[1]*M,r[2]=a[2]*M,r[3]=a[3]*M,r[4]=a[4]*M,r[5]=a[5]*M,r[6]=a[6]*M,r[7]=a[7]*M,r[8]=a[8]*M,r}function hr(r,a,M,l){return r[0]=a[0]+M[0]*l,r[1]=a[1]+M[1]*l,r[2]=a[2]+M[2]*l,r[3]=a[3]+M[3]*l,r[4]=a[4]+M[4]*l,r[5]=a[5]+M[5]*l,r[6]=a[6]+M[6]*l,r[7]=a[7]+M[7]*l,r[8]=a[8]+M[8]*l,r}function sr(r,a){return r[0]===a[0]&&r[1]===a[1]&&r[2]===a[2]&&r[3]===a[3]&&r[4]===a[4]&&r[5]===a[5]&&r[6]===a[6]&&r[7]===a[7]&&r[8]===a[8]}function lr(r,a){var M=r[0],l=r[1],x=r[2],d=r[3],g=r[4],m=r[5],A=r[6],y=r[7],_=r[8],R=a[0],u=a[1],z=a[2],i=a[3],c=a[4],f=a[5],n=a[6],e=a[7],t=a[8];return Math.abs(M-R)<=glMatrix.EPSILON*Math.max(1,Math.abs(M),Math.abs(R))&&Math.abs(l-u)<=glMatrix.EPSILON*Math.max(1,Math.abs(l),Math.abs(u))&&Math.abs(x-z)<=glMatrix.EPSILON*Math.max(1,Math.abs(x),Math.abs(z))&&Math.abs(d-i)<=glMatrix.EPSILON*Math.max(1,Math.abs(d),Math.abs(i))&&Math.abs(g-c)<=glMatrix.EPSILON*Math.max(1,Math.abs(g),Math.abs(c))&&Math.abs(m-f)<=glMatrix.EPSILON*Math.max(1,Math.abs(m),Math.abs(f))&&Math.abs(A-n)<=glMatrix.EPSILON*Math.max(1,Math.abs(A),Math.abs(n))&&Math.abs(y-e)<=glMatrix.EPSILON*Math.max(1,Math.abs(y),Math.abs(e))&&Math.abs(_-t)<=glMatrix.EPSILON*Math.max(1,Math.abs(_),Math.abs(t))}var b=null,o=null},31437:function(V,D,S){S.d(D,{$X:function(){return w},AK:function(){return U},EU:function(){return a},Fp:function(){return H},Fv:function(){return G},I6:function(){return x},IH:function(){return W},TE:function(){return K},VV:function(){return X},bA:function(){return C},kE:function(){return $},kK:function(){return b},lu:function(){return m}});var Y=S(49685);function F(){var i=new Y.WT(2);return Y.WT!=Float32Array&&(i[0]=0,i[1]=0),i}function j(i){var c=new glMatrix.ARRAY_TYPE(2);return c[0]=i[0],c[1]=i[1],c}function B(i,c){var f=new glMatrix.ARRAY_TYPE(2);return f[0]=i,f[1]=c,f}function k(i,c){return i[0]=c[0],i[1]=c[1],i}function J(i,c,f){return i[0]=c,i[1]=f,i}function W(i,c,f){return i[0]=c[0]+f[0],i[1]=c[1]+f[1],i}function w(i,c,f){return i[0]=c[0]-f[0],i[1]=c[1]-f[1],i}function N(i,c,f){return i[0]=c[0]*f[0],i[1]=c[1]*f[1],i}function nr(i,c,f){return i[0]=c[0]/f[0],i[1]=c[1]/f[1],i}function ar(i,c){return i[0]=Math.ceil(c[0]),i[1]=Math.ceil(c[1]),i}function Q(i,c){return i[0]=Math.floor(c[0]),i[1]=Math.floor(c[1]),i}function X(i,c,f){return i[0]=Math.min(c[0],f[0]),i[1]=Math.min(c[1],f[1]),i}function H(i,c,f){return i[0]=Math.max(c[0],f[0]),i[1]=Math.max(c[1],f[1]),i}function er(i,c){return i[0]=Math.round(c[0]),i[1]=Math.round(c[1]),i}function C(i,c,f){return i[0]=c[0]*f,i[1]=c[1]*f,i}function Z(i,c,f,n){return i[0]=c[0]+f[0]*n,i[1]=c[1]+f[1]*n,i}function K(i,c){var f=c[0]-i[0],n=c[1]-i[1];return Math.hypot(f,n)}function ir(i,c){var f=c[0]-i[0],n=c[1]-i[1];return f*f+n*n}function $(i){var c=i[0],f=i[1];return Math.hypot(c,f)}function tr(i){var c=i[0],f=i[1];return c*c+f*f}function cr(i,c){return i[0]=-c[0],i[1]=-c[1],i}function fr(i,c){return i[0]=1/c[0],i[1]=1/c[1],i}function G(i,c){var f=c[0],n=c[1],e=f*f+n*n;return e>0&&(e=1/Math.sqrt(e)),i[0]=c[0]*e,i[1]=c[1]*e,i}function U(i,c){return i[0]*c[0]+i[1]*c[1]}function vr(i,c,f){var n=c[0]*f[1]-c[1]*f[0];return i[0]=i[1]=0,i[2]=n,i}function Mr(i,c,f,n){var e=c[0],t=c[1];return i[0]=e+n*(f[0]-e),i[1]=t+n*(f[1]-t),i}function hr(i,c){c=c||1;var f=glMatrix.RANDOM()*2*Math.PI;return i[0]=Math.cos(f)*c,i[1]=Math.sin(f)*c,i}function sr(i,c,f){var n=c[0],e=c[1];return i[0]=f[0]*n+f[2]*e,i[1]=f[1]*n+f[3]*e,i}function lr(i,c,f){var n=c[0],e=c[1];return i[0]=f[0]*n+f[2]*e+f[4],i[1]=f[1]*n+f[3]*e+f[5],i}function b(i,c,f){var n=c[0],e=c[1];return i[0]=f[0]*n+f[3]*e+f[6],i[1]=f[1]*n+f[4]*e+f[7],i}function o(i,c,f){var n=c[0],e=c[1];return i[0]=f[0]*n+f[4]*e+f[12],i[1]=f[1]*n+f[5]*e+f[13],i}function r(i,c,f,n){var e=c[0]-f[0],t=c[1]-f[1],v=Math.sin(n),h=Math.cos(n);return i[0]=e*h-t*v+f[0],i[1]=e*v+t*h+f[1],i}function a(i,c){var f=i[0],n=i[1],e=c[0],t=c[1],v=Math.sqrt(f*f+n*n)*Math.sqrt(e*e+t*t),h=v&&(f*e+n*t)/v;return Math.acos(Math.min(Math.max(h,-1),1))}function M(i){return i[0]=0,i[1]=0,i}function l(i){return"vec2("+i[0]+", "+i[1]+")"}function x(i,c){return i[0]===c[0]&&i[1]===c[1]}function d(i,c){var f=i[0],n=i[1],e=c[0],t=c[1];return Math.abs(f-e)<=glMatrix.EPSILON*Math.max(1,Math.abs(f),Math.abs(e))&&Math.abs(n-t)<=glMatrix.EPSILON*Math.max(1,Math.abs(n),Math.abs(t))}var g=null,m=w,A=null,y=null,_=null,R=null,u=null,z=function(){var i=F();return function(c,f,n,e,t,v){var h,s;for(f||(f=2),n||(n=0),e?s=Math.min(e*f+n,c.length):s=c.length,h=n;h<s;h+=f)i[0]=c[h],i[1]=c[h+1],t(i,i,v),c[h]=i[0],c[h+1]=i[1];return c}}()},77160:function(V,D,S){S.d(D,{kK:function(){return o}});var Y=S(49685);function F(){var n=new Y.WT(3);return Y.WT!=Float32Array&&(n[0]=0,n[1]=0,n[2]=0),n}function j(n){var e=new glMatrix.ARRAY_TYPE(3);return e[0]=n[0],e[1]=n[1],e[2]=n[2],e}function B(n){var e=n[0],t=n[1],v=n[2];return Math.hypot(e,t,v)}function k(n,e,t){var v=new glMatrix.ARRAY_TYPE(3);return v[0]=n,v[1]=e,v[2]=t,v}function J(n,e){return n[0]=e[0],n[1]=e[1],n[2]=e[2],n}function W(n,e,t,v){return n[0]=e,n[1]=t,n[2]=v,n}function w(n,e,t){return n[0]=e[0]+t[0],n[1]=e[1]+t[1],n[2]=e[2]+t[2],n}function N(n,e,t){return n[0]=e[0]-t[0],n[1]=e[1]-t[1],n[2]=e[2]-t[2],n}function nr(n,e,t){return n[0]=e[0]*t[0],n[1]=e[1]*t[1],n[2]=e[2]*t[2],n}function ar(n,e,t){return n[0]=e[0]/t[0],n[1]=e[1]/t[1],n[2]=e[2]/t[2],n}function Q(n,e){return n[0]=Math.ceil(e[0]),n[1]=Math.ceil(e[1]),n[2]=Math.ceil(e[2]),n}function X(n,e){return n[0]=Math.floor(e[0]),n[1]=Math.floor(e[1]),n[2]=Math.floor(e[2]),n}function H(n,e,t){return n[0]=Math.min(e[0],t[0]),n[1]=Math.min(e[1],t[1]),n[2]=Math.min(e[2],t[2]),n}function er(n,e,t){return n[0]=Math.max(e[0],t[0]),n[1]=Math.max(e[1],t[1]),n[2]=Math.max(e[2],t[2]),n}function C(n,e){return n[0]=Math.round(e[0]),n[1]=Math.round(e[1]),n[2]=Math.round(e[2]),n}function Z(n,e,t){return n[0]=e[0]*t,n[1]=e[1]*t,n[2]=e[2]*t,n}function K(n,e,t,v){return n[0]=e[0]+t[0]*v,n[1]=e[1]+t[1]*v,n[2]=e[2]+t[2]*v,n}function ir(n,e){var t=e[0]-n[0],v=e[1]-n[1],h=e[2]-n[2];return Math.hypot(t,v,h)}function $(n,e){var t=e[0]-n[0],v=e[1]-n[1],h=e[2]-n[2];return t*t+v*v+h*h}function tr(n){var e=n[0],t=n[1],v=n[2];return e*e+t*t+v*v}function cr(n,e){return n[0]=-e[0],n[1]=-e[1],n[2]=-e[2],n}function fr(n,e){return n[0]=1/e[0],n[1]=1/e[1],n[2]=1/e[2],n}function G(n,e){var t=e[0],v=e[1],h=e[2],s=t*t+v*v+h*h;return s>0&&(s=1/Math.sqrt(s)),n[0]=e[0]*s,n[1]=e[1]*s,n[2]=e[2]*s,n}function U(n,e){return n[0]*e[0]+n[1]*e[1]+n[2]*e[2]}function vr(n,e,t){var v=e[0],h=e[1],s=e[2],E=t[0],p=t[1],P=t[2];return n[0]=h*P-s*p,n[1]=s*E-v*P,n[2]=v*p-h*E,n}function Mr(n,e,t,v){var h=e[0],s=e[1],E=e[2];return n[0]=h+v*(t[0]-h),n[1]=s+v*(t[1]-s),n[2]=E+v*(t[2]-E),n}function hr(n,e,t,v,h,s){var E=s*s,p=E*(2*s-3)+1,P=E*(s-2)+s,q=E*(s-1),L=E*(3-2*s);return n[0]=e[0]*p+t[0]*P+v[0]*q+h[0]*L,n[1]=e[1]*p+t[1]*P+v[1]*q+h[1]*L,n[2]=e[2]*p+t[2]*P+v[2]*q+h[2]*L,n}function sr(n,e,t,v,h,s){var E=1-s,p=E*E,P=s*s,q=p*E,L=3*s*p,O=3*P*E,I=P*s;return n[0]=e[0]*q+t[0]*L+v[0]*O+h[0]*I,n[1]=e[1]*q+t[1]*L+v[1]*O+h[1]*I,n[2]=e[2]*q+t[2]*L+v[2]*O+h[2]*I,n}function lr(n,e){e=e||1;var t=glMatrix.RANDOM()*2*Math.PI,v=glMatrix.RANDOM()*2-1,h=Math.sqrt(1-v*v)*e;return n[0]=Math.cos(t)*h,n[1]=Math.sin(t)*h,n[2]=v*e,n}function b(n,e,t){var v=e[0],h=e[1],s=e[2],E=t[3]*v+t[7]*h+t[11]*s+t[15];return E=E||1,n[0]=(t[0]*v+t[4]*h+t[8]*s+t[12])/E,n[1]=(t[1]*v+t[5]*h+t[9]*s+t[13])/E,n[2]=(t[2]*v+t[6]*h+t[10]*s+t[14])/E,n}function o(n,e,t){var v=e[0],h=e[1],s=e[2];return n[0]=v*t[0]+h*t[3]+s*t[6],n[1]=v*t[1]+h*t[4]+s*t[7],n[2]=v*t[2]+h*t[5]+s*t[8],n}function r(n,e,t){var v=t[0],h=t[1],s=t[2],E=t[3],p=e[0],P=e[1],q=e[2],L=h*q-s*P,O=s*p-v*q,I=v*P-h*p,T=h*I-s*O,xr=s*L-v*I,yr=v*O-h*L,rr=E*2;return L*=rr,O*=rr,I*=rr,T*=2,xr*=2,yr*=2,n[0]=p+L+T,n[1]=P+O+xr,n[2]=q+I+yr,n}function a(n,e,t,v){var h=[],s=[];return h[0]=e[0]-t[0],h[1]=e[1]-t[1],h[2]=e[2]-t[2],s[0]=h[0],s[1]=h[1]*Math.cos(v)-h[2]*Math.sin(v),s[2]=h[1]*Math.sin(v)+h[2]*Math.cos(v),n[0]=s[0]+t[0],n[1]=s[1]+t[1],n[2]=s[2]+t[2],n}function M(n,e,t,v){var h=[],s=[];return h[0]=e[0]-t[0],h[1]=e[1]-t[1],h[2]=e[2]-t[2],s[0]=h[2]*Math.sin(v)+h[0]*Math.cos(v),s[1]=h[1],s[2]=h[2]*Math.cos(v)-h[0]*Math.sin(v),n[0]=s[0]+t[0],n[1]=s[1]+t[1],n[2]=s[2]+t[2],n}function l(n,e,t,v){var h=[],s=[];return h[0]=e[0]-t[0],h[1]=e[1]-t[1],h[2]=e[2]-t[2],s[0]=h[0]*Math.cos(v)-h[1]*Math.sin(v),s[1]=h[0]*Math.sin(v)+h[1]*Math.cos(v),s[2]=h[2],n[0]=s[0]+t[0],n[1]=s[1]+t[1],n[2]=s[2]+t[2],n}function x(n,e){var t=n[0],v=n[1],h=n[2],s=e[0],E=e[1],p=e[2],P=Math.sqrt(t*t+v*v+h*h),q=Math.sqrt(s*s+E*E+p*p),L=P*q,O=L&&U(n,e)/L;return Math.acos(Math.min(Math.max(O,-1),1))}function d(n){return n[0]=0,n[1]=0,n[2]=0,n}function g(n){return"vec3("+n[0]+", "+n[1]+", "+n[2]+")"}function m(n,e){return n[0]===e[0]&&n[1]===e[1]&&n[2]===e[2]}function A(n,e){var t=n[0],v=n[1],h=n[2],s=e[0],E=e[1],p=e[2];return Math.abs(t-s)<=glMatrix.EPSILON*Math.max(1,Math.abs(t),Math.abs(s))&&Math.abs(v-E)<=glMatrix.EPSILON*Math.max(1,Math.abs(v),Math.abs(E))&&Math.abs(h-p)<=glMatrix.EPSILON*Math.max(1,Math.abs(h),Math.abs(p))}var y=null,_=null,R=null,u=null,z=null,i=null,c=null,f=function(){var n=F();return function(e,t,v,h,s,E){var p,P;for(t||(t=3),v||(v=0),h?P=Math.min(h*t+v,e.length):P=e.length,p=v;p<P;p+=t)n[0]=e[p],n[1]=e[p+1],n[2]=e[p+2],s(n,n,E),e[p]=n[0],e[p+1]=n[1],e[p+2]=n[2];return e}}()}}]);
