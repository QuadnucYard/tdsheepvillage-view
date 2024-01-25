import{g as _}from"./@xmldom-d9eUxd-a.js";var C={exports:{}};/**
 * @license Fraction.js v4.3.0 20/08/2023
 * https://www.xarg.org/2014/03/rational-numbers-in-javascript/
 *
 * Copyright (c) 2023, Robert Eisele (robert@raw.org)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 **/(function(D,B){(function(S){var L=2e3,s={s:1,n:0,d:1};function c(t,i){if(isNaN(t=parseInt(t,10)))throw g();return t*i}function u(t,i){if(i===0)throw y();var r=Object.create(d.prototype);r.s=t<0?-1:1,t=t<0?-t:t;var n=N(t,i);return r.n=t/n,r.d=i/n,r}function E(t){for(var i={},r=t,n=2,f=4;f<=r;){for(;r%n===0;)r/=n,i[n]=(i[n]||0)+1;f+=1+2*n++}return r!==t?r>1&&(i[r]=(i[r]||0)+1):i[t]=(i[t]||0)+1,i}var v=function(t,i){var r=0,n=1,f=1,a=0,o=0,F=0,m=1,w=1,e=0,h=1,M=1,l=1,b=1e7,x;if(t!=null)if(i!==void 0){if(r=t,n=i,f=r*n,r%1!==0||n%1!==0)throw I()}else switch(typeof t){case"object":{if("d"in t&&"n"in t)r=t.n,n=t.d,"s"in t&&(r*=t.s);else if(0 in t)r=t[0],1 in t&&(n=t[1]);else throw g();f=r*n;break}case"number":{if(t<0&&(f=t,t=-t),t%1===0)r=t;else if(t>0){for(t>=1&&(w=Math.pow(10,Math.floor(1+Math.log(t)/Math.LN10)),t/=w);h<=b&&l<=b;)if(x=(e+M)/(h+l),t===x){h+l<=b?(r=e+M,n=h+l):l>h?(r=M,n=l):(r=e,n=h);break}else t>x?(e+=M,h+=l):(M+=e,l+=h),h>b?(r=M,n=l):(r=e,n=h);r*=w}else(isNaN(t)||isNaN(i))&&(n=r=NaN);break}case"string":{if(h=t.match(/\d+|./g),h===null)throw g();if(h[e]==="-"?(f=-1,e++):h[e]==="+"&&e++,h.length===e+1?o=c(h[e++],f):h[e+1]==="."||h[e]==="."?(h[e]!=="."&&(a=c(h[e++],f)),e++,(e+1===h.length||h[e+1]==="("&&h[e+3]===")"||h[e+1]==="'"&&h[e+3]==="'")&&(o=c(h[e],f),m=Math.pow(10,h[e].length),e++),(h[e]==="("&&h[e+2]===")"||h[e]==="'"&&h[e+2]==="'")&&(F=c(h[e+1],f),w=Math.pow(10,h[e+1].length)-1,e+=3)):h[e+1]==="/"||h[e+1]===":"?(o=c(h[e],f),m=c(h[e+2],1),e+=3):h[e+3]==="/"&&h[e+1]===" "&&(a=c(h[e],f),o=c(h[e+2],f),m=c(h[e+4],1),e+=5),h.length<=e){n=m*w,f=r=F+n*a+w*o;break}}default:throw g()}if(n===0)throw y();s.s=f<0?-1:1,s.n=Math.abs(r),s.d=Math.abs(n)};function O(t,i,r){for(var n=1;i>0;t=t*t%r,i>>=1)i&1&&(n=n*t%r);return n}function P(t,i){for(;i%2===0;i/=2);for(;i%5===0;i/=5);if(i===1)return 0;for(var r=10%i,n=1;r!==1;n++)if(r=r*10%i,n>L)return 0;return n}function j(t,i,r){for(var n=1,f=O(10,r,i),a=0;a<300;a++){if(n===f)return a;n=n*10%i,f=f*10%i}return 0}function N(t,i){if(!t)return i;if(!i)return t;for(;;){if(t%=i,!t)return i;if(i%=t,!i)return t}}function d(t,i){if(v(t,i),this instanceof d)t=N(s.d,s.n),this.s=s.s,this.n=s.n/t,this.d=s.d/t;else return u(s.s*s.n,s.d)}var y=function(){return new Error("Division by Zero")},g=function(){return new Error("Invalid argument")},I=function(){return new Error("Parameters must be integer")};d.prototype={s:1,n:0,d:1,abs:function(){return u(this.n,this.d)},neg:function(){return u(-this.s*this.n,this.d)},add:function(t,i){return v(t,i),u(this.s*this.n*s.d+s.s*this.d*s.n,this.d*s.d)},sub:function(t,i){return v(t,i),u(this.s*this.n*s.d-s.s*this.d*s.n,this.d*s.d)},mul:function(t,i){return v(t,i),u(this.s*s.s*this.n*s.n,this.d*s.d)},div:function(t,i){return v(t,i),u(this.s*s.s*this.n*s.d,this.d*s.n)},clone:function(){return u(this.s*this.n,this.d)},mod:function(t,i){if(isNaN(this.n)||isNaN(this.d))return new d(NaN);if(t===void 0)return u(this.s*this.n%this.d,1);if(v(t,i),s.n===0&&this.d===0)throw y();return u(this.s*(s.d*this.n)%(s.n*this.d),s.d*this.d)},gcd:function(t,i){return v(t,i),u(N(s.n,this.n)*N(s.d,this.d),s.d*this.d)},lcm:function(t,i){return v(t,i),s.n===0&&this.n===0?u(0,1):u(s.n*this.n,N(s.n,this.n)*N(s.d,this.d))},ceil:function(t){return t=Math.pow(10,t||0),isNaN(this.n)||isNaN(this.d)?new d(NaN):u(Math.ceil(t*this.s*this.n/this.d),t)},floor:function(t){return t=Math.pow(10,t||0),isNaN(this.n)||isNaN(this.d)?new d(NaN):u(Math.floor(t*this.s*this.n/this.d),t)},round:function(t){return t=Math.pow(10,t||0),isNaN(this.n)||isNaN(this.d)?new d(NaN):u(Math.round(t*this.s*this.n/this.d),t)},inverse:function(){return u(this.s*this.d,this.n)},pow:function(t,i){if(v(t,i),s.d===1)return s.s<0?u(Math.pow(this.s*this.d,s.n),Math.pow(this.n,s.n)):u(Math.pow(this.s*this.n,s.n),Math.pow(this.d,s.n));if(this.s<0)return null;var r=E(this.n),n=E(this.d),f=1,a=1;for(var o in r)if(o!=="1"){if(o==="0"){f=0;break}if(r[o]*=s.n,r[o]%s.d===0)r[o]/=s.d;else return null;f*=Math.pow(o,r[o])}for(var o in n)if(o!=="1"){if(n[o]*=s.n,n[o]%s.d===0)n[o]/=s.d;else return null;a*=Math.pow(o,n[o])}return s.s<0?u(a,f):u(f,a)},equals:function(t,i){return v(t,i),this.s*this.n*s.d===s.s*s.n*this.d},compare:function(t,i){v(t,i);var r=this.s*this.n*s.d-s.s*s.n*this.d;return(0<r)-(r<0)},simplify:function(t){if(isNaN(this.n)||isNaN(this.d))return this;t=t||.001;for(var i=this.abs(),r=i.toContinued(),n=1;n<r.length;n++){for(var f=u(r[n-1],1),a=n-2;a>=0;a--)f=f.inverse().add(r[a]);if(Math.abs(f.sub(i).valueOf())<t)return f.mul(this.s)}return this},divisible:function(t,i){return v(t,i),!(!(s.n*this.d)||this.n*s.d%(s.n*this.d))},valueOf:function(){return this.s*this.n/this.d},toFraction:function(t){var i,r="",n=this.n,f=this.d;return this.s<0&&(r+="-"),f===1?r+=n:(t&&(i=Math.floor(n/f))>0&&(r+=i,r+=" ",n%=f),r+=n,r+="/",r+=f),r},toLatex:function(t){var i,r="",n=this.n,f=this.d;return this.s<0&&(r+="-"),f===1?r+=n:(t&&(i=Math.floor(n/f))>0&&(r+=i,n%=f),r+="\\frac{",r+=n,r+="}{",r+=f,r+="}"),r},toContinued:function(){var t,i=this.n,r=this.d,n=[];if(isNaN(i)||isNaN(r))return n;do n.push(Math.floor(i/r)),t=i%r,i=r,r=t;while(i!==1);return n},toString:function(t){var i=this.n,r=this.d;if(isNaN(i)||isNaN(r))return"NaN";t=t||15;var n=P(i,r),f=j(i,r,n),a=this.s<0?"-":"";if(a+=i/r|0,i%=r,i*=10,i&&(a+="."),n){for(var o=f;o--;)a+=i/r|0,i%=r,i*=10;a+="(";for(var o=n;o--;)a+=i/r|0,i%=r,i*=10;a+=")"}else for(var o=t;i&&o--;)a+=i/r|0,i%=r,i*=10;return a}},Object.defineProperty(d,"__esModule",{value:!0}),d.default=d,d.Fraction=d,D.exports=d})()})(C);var A=C.exports;const Z=_(A);export{Z as F};