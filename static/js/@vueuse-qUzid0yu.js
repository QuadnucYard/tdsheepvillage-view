import{s as se,w as ie,r as R,b as g,e as A,g as ae,f as ue,u as le,h as z,i as B,n as J,t as ge,j as be,k as T}from"./@vue-e7cqE0FH.js";var Oe=Object.defineProperty,_e=Object.defineProperties,Se=Object.getOwnPropertyDescriptors,H=Object.getOwnPropertySymbols,Pe=Object.prototype.hasOwnProperty,Ee=Object.prototype.propertyIsEnumerable,G=(e,t,n)=>t in e?Oe(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,Ae=(e,t)=>{for(var n in t||(t={}))Pe.call(t,n)&&G(e,n,t[n]);if(H)for(var n of H(t))Ee.call(t,n)&&G(e,n,t[n]);return e},Ie=(e,t)=>_e(e,Se(t));function dt(e,t){var n;const r=se();return ie(()=>{r.value=e()},Ie(Ae({},t),{flush:(n=t==null?void 0:t.flush)!=null?n:"sync"})),R(r)}var K;const x=typeof window<"u",Te=e=>typeof e=="string",C=()=>{},$e=x&&((K=window==null?void 0:window.navigator)==null?void 0:K.userAgent)&&/iP(ad|hone|od)/.test(window.navigator.userAgent);function j(e){return typeof e=="function"?e():le(e)}function ce(e,t){function n(...r){return new Promise((o,s)=>{Promise.resolve(e(()=>t.apply(this,r),{fn:t,thisArg:this,args:r})).then(o).catch(s)})}return n}function Ce(e,t={}){let n,r,o=C;const s=i=>{clearTimeout(i),o(),o=C};return i=>{const l=j(e),d=j(t.maxWait);return n&&s(n),l<=0||d!==void 0&&d<=0?(r&&(s(r),r=null),Promise.resolve(i())):new Promise((c,p)=>{o=t.rejectOnCancel?p:c,d&&!r&&(r=setTimeout(()=>{n&&s(n),r=null,c(i())},d)),n=setTimeout(()=>{r&&s(r),r=null,c(i())},l)})}}function je(e,t=!0,n=!0,r=!1){let o=0,s,a=!0,i=C,l;const d=()=>{s&&(clearTimeout(s),s=void 0,i(),i=C)};return p=>{const u=j(e),f=Date.now()-o,v=()=>l=p();return d(),u<=0?(o=Date.now(),v()):(f>u&&(n||!a)?(o=Date.now(),v()):t&&(l=new Promise((h,b)=>{i=r?b:h,s=setTimeout(()=>{o=Date.now(),a=!0,h(v()),d()},Math.max(0,u-f))})),!n&&!s&&(s=setTimeout(()=>a=!0,u)),a=!1,l)}}function De(e){return e}function V(e){return ae()?(ue(e),!0):!1}function Me(e,t=200,n={}){return ce(Ce(t,n),e)}function pt(e,t=200,n={}){const r=g(e.value),o=Me(()=>{r.value=e.value},t,n);return A(e,()=>o()),r}function mt(e,t=200,n=!1,r=!0,o=!1){return ce(je(t,n,r,o),e)}function Le(e,t=!0){z()?B(e):t?e():J(e)}function vt(e,t,n={}){const{immediate:r=!0}=n,o=g(!1);let s=null;function a(){s&&(clearTimeout(s),s=null)}function i(){o.value=!1,a()}function l(...d){a(),o.value=!0,s=setTimeout(()=>{o.value=!1,s=null,e(...d)},j(t))}return r&&(o.value=!0,x&&l()),V(i),{isPending:R(o),start:l,stop:i}}function E(e){var t;const n=j(e);return(t=n==null?void 0:n.$el)!=null?t:n}const L=x?window:void 0,Fe=x?window.document:void 0;function $(...e){let t,n,r,o;if(Te(e[0])||Array.isArray(e[0])?([n,r,o]=e,t=L):[t,n,r,o]=e,!t)return C;Array.isArray(n)||(n=[n]),Array.isArray(r)||(r=[r]);const s=[],a=()=>{s.forEach(c=>c()),s.length=0},i=(c,p,u,f)=>(c.addEventListener(p,u,f),()=>c.removeEventListener(p,u,f)),l=A(()=>[E(t),j(o)],([c,p])=>{a(),c&&s.push(...n.flatMap(u=>r.map(f=>i(c,u,f,p))))},{immediate:!0,flush:"post"}),d=()=>{l(),a()};return V(d),d}let U=!1;function yt(e,t,n={}){const{window:r=L,ignore:o=[],capture:s=!0,detectIframe:a=!1}=n;if(!r)return;$e&&!U&&(U=!0,Array.from(r.document.body.children).forEach(u=>u.addEventListener("click",C)));let i=!0;const l=u=>o.some(f=>{if(typeof f=="string")return Array.from(r.document.querySelectorAll(f)).some(v=>v===u.target||u.composedPath().includes(v));{const v=E(f);return v&&(u.target===v||u.composedPath().includes(v))}}),c=[$(r,"click",u=>{const f=E(e);if(!(!f||f===u.target||u.composedPath().includes(f))){if(u.detail===0&&(i=!l(u)),!i){i=!0;return}t(u)}},{passive:!0,capture:s}),$(r,"pointerdown",u=>{const f=E(e);f&&(i=!u.composedPath().includes(f)&&!l(u))},{passive:!0}),a&&$(r,"blur",u=>{var f;const v=E(e);((f=r.document.activeElement)==null?void 0:f.tagName)==="IFRAME"&&!(v!=null&&v.contains(r.document.activeElement))&&t(u)})].filter(Boolean);return()=>c.forEach(u=>u())}function fe(e,t=!1){const n=g(),r=()=>n.value=!!e();return r(),Le(r,t),n}const q=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},X="__vueuse_ssr_handlers__";q[X]=q[X]||{};function ht({document:e=Fe}={}){if(!e)return g("visible");const t=g(e.visibilityState);return $(e,"visibilitychange",()=>{t.value=e.visibilityState}),t}var Y=Object.getOwnPropertySymbols,ke=Object.prototype.hasOwnProperty,Ne=Object.prototype.propertyIsEnumerable,We=(e,t)=>{var n={};for(var r in e)ke.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&Y)for(var r of Y(e))t.indexOf(r)<0&&Ne.call(e,r)&&(n[r]=e[r]);return n};function wt(e,t,n={}){const r=n,{window:o=L}=r,s=We(r,["window"]);let a;const i=fe(()=>o&&"ResizeObserver"in o),l=()=>{a&&(a.disconnect(),a=void 0)},d=A(()=>E(e),p=>{l(),i.value&&o&&p&&(a=new ResizeObserver(t),a.observe(p,s))},{immediate:!0,flush:"post"}),c=()=>{l(),d()};return V(c),{isSupported:i,stop:c}}var Z=Object.getOwnPropertySymbols,Re=Object.prototype.hasOwnProperty,xe=Object.prototype.propertyIsEnumerable,Ve=(e,t)=>{var n={};for(var r in e)Re.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&Z)for(var r of Z(e))t.indexOf(r)<0&&xe.call(e,r)&&(n[r]=e[r]);return n};function gt(e,t,n={}){const r=n,{window:o=L}=r,s=Ve(r,["window"]);let a;const i=fe(()=>o&&"MutationObserver"in o),l=()=>{a&&(a.disconnect(),a=void 0)},d=A(()=>E(e),p=>{l(),i.value&&o&&p&&(a=new MutationObserver(t),a.observe(p,s))},{immediate:!0}),c=()=>{l(),d()};return V(c),{isSupported:i,stop:c}}var ee;(function(e){e.UP="UP",e.RIGHT="RIGHT",e.DOWN="DOWN",e.LEFT="LEFT",e.NONE="NONE"})(ee||(ee={}));var Qe=Object.defineProperty,te=Object.getOwnPropertySymbols,ze=Object.prototype.hasOwnProperty,Be=Object.prototype.propertyIsEnumerable,ne=(e,t,n)=>t in e?Qe(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,Je=(e,t)=>{for(var n in t||(t={}))ze.call(t,n)&&ne(e,n,t[n]);if(te)for(var n of te(t))Be.call(t,n)&&ne(e,n,t[n]);return e};const He={easeInSine:[.12,0,.39,0],easeOutSine:[.61,1,.88,1],easeInOutSine:[.37,0,.63,1],easeInQuad:[.11,0,.5,0],easeOutQuad:[.5,1,.89,1],easeInOutQuad:[.45,0,.55,1],easeInCubic:[.32,0,.67,0],easeOutCubic:[.33,1,.68,1],easeInOutCubic:[.65,0,.35,1],easeInQuart:[.5,0,.75,0],easeOutQuart:[.25,1,.5,1],easeInOutQuart:[.76,0,.24,1],easeInQuint:[.64,0,.78,0],easeOutQuint:[.22,1,.36,1],easeInOutQuint:[.83,0,.17,1],easeInExpo:[.7,0,.84,0],easeOutExpo:[.16,1,.3,1],easeInOutExpo:[.87,0,.13,1],easeInCirc:[.55,0,1,.45],easeOutCirc:[0,.55,.45,1],easeInOutCirc:[.85,0,.15,1],easeInBack:[.36,0,.66,-.56],easeOutBack:[.34,1.56,.64,1],easeInOutBack:[.68,-.6,.32,1.6]};Je({linear:De},He);function bt({window:e=L}={}){if(!e)return g(!1);const t=g(e.document.hasFocus());return $(e,"blur",()=>{t.value=!1}),$(e,"focus",()=>{t.value=!0}),t}function de(e){return ae()?(ue(e),!0):!1}function Q(e){return typeof e=="function"?e():le(e)}const Ge=typeof window<"u"&&typeof document<"u";typeof WorkerGlobalScope<"u"&&globalThis instanceof WorkerGlobalScope;const Ke=Object.prototype.toString,Ue=e=>Ke.call(e)==="[object Object]",pe=()=>{};function qe(e,t){function n(...r){return new Promise((o,s)=>{Promise.resolve(e(()=>t.apply(this,r),{fn:t,thisArg:this,args:r})).then(o).catch(s)})}return n}const me=e=>e();function Xe(e=me){const t=g(!0);function n(){t.value=!1}function r(){t.value=!0}const o=(...s)=>{t.value&&e(...s)};return{isActive:R(t),pause:n,resume:r,eventFilter:o}}function Ye(e){return e||z()}function Ze(...e){if(e.length!==1)return ge(...e);const t=e[0];return typeof t=="function"?R(be(()=>({get:t,set:pe}))):g(t)}function et(e,t,n={}){const{eventFilter:r=me,...o}=n;return A(e,qe(r,t),o)}function tt(e,t,n={}){const{eventFilter:r,...o}=n,{eventFilter:s,pause:a,resume:i,isActive:l}=Xe(r);return{stop:et(e,t,{...o,eventFilter:s}),pause:a,resume:i,isActive:l}}function ve(e,t=!0,n){Ye()?B(e,n):t?e():J(e)}function ye(e){var t;const n=Q(e);return(t=n==null?void 0:n.$el)!=null?t:n}const D=Ge?window:void 0;function re(...e){let t,n,r,o;if(typeof e[0]=="string"||Array.isArray(e[0])?([n,r,o]=e,t=D):[t,n,r,o]=e,!t)return pe;Array.isArray(n)||(n=[n]),Array.isArray(r)||(r=[r]);const s=[],a=()=>{s.forEach(c=>c()),s.length=0},i=(c,p,u,f)=>(c.addEventListener(p,u,f),()=>c.removeEventListener(p,u,f)),l=A(()=>[ye(t),Q(o)],([c,p])=>{if(a(),!c)return;const u=Ue(p)?{...p}:p;s.push(...n.flatMap(f=>r.map(v=>i(c,f,v,u))))},{immediate:!0,flush:"post"}),d=()=>{l(),a()};return de(d),d}function nt(){const e=g(!1);return z()&&B(()=>{e.value=!0}),e}function rt(e){const t=nt();return T(()=>(t.value,!!e()))}function ot(e,t={}){const{window:n=D}=t,r=rt(()=>n&&"matchMedia"in n&&typeof n.matchMedia=="function");let o;const s=g(!1),a=d=>{s.value=d.matches},i=()=>{o&&("removeEventListener"in o?o.removeEventListener("change",a):o.removeListener(a))},l=ie(()=>{r.value&&(i(),o=n.matchMedia(Q(e)),"addEventListener"in o?o.addEventListener("change",a):o.addListener(a),s.value=o.matches)});return de(()=>{l(),i(),o=void 0}),s}const N=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},W="__vueuse_ssr_handlers__",st=it();function it(){return W in N||(N[W]=N[W]||{}),N[W]}function he(e,t){return st[e]||t}function at(e){return e==null?"any":e instanceof Set?"set":e instanceof Map?"map":e instanceof Date?"date":typeof e=="boolean"?"boolean":typeof e=="string"?"string":typeof e=="object"?"object":Number.isNaN(e)?"any":"number"}const ut={boolean:{read:e=>e==="true",write:e=>String(e)},object:{read:e=>JSON.parse(e),write:e=>JSON.stringify(e)},number:{read:e=>Number.parseFloat(e),write:e=>String(e)},any:{read:e=>e,write:e=>String(e)},string:{read:e=>e,write:e=>String(e)},map:{read:e=>new Map(JSON.parse(e)),write:e=>JSON.stringify(Array.from(e.entries()))},set:{read:e=>new Set(JSON.parse(e)),write:e=>JSON.stringify(Array.from(e))},date:{read:e=>new Date(e),write:e=>e.toISOString()}},oe="vueuse-storage";function lt(e,t,n,r={}){var o;const{flush:s="pre",deep:a=!0,listenToStorageChanges:i=!0,writeDefaults:l=!0,mergeDefaults:d=!1,shallow:c,window:p=D,eventFilter:u,onError:f=m=>{console.error(m)},initOnMounted:v}=r,h=(c?se:g)(typeof t=="function"?t():t);if(!n)try{n=he("getDefaultStorage",()=>{var m;return(m=D)==null?void 0:m.localStorage})()}catch(m){f(m)}if(!n)return h;const b=Q(t),M=at(b),_=(o=r.serializer)!=null?o:ut[M],{pause:F,resume:w}=tt(h,()=>S(h.value),{flush:s,deep:a,eventFilter:u});return p&&i&&ve(()=>{re(p,"storage",O),re(p,oe,I),v&&O()}),v||O(),h;function S(m){try{if(m==null)n.removeItem(e);else{const y=_.write(m),P=n.getItem(e);P!==y&&(n.setItem(e,y),p&&p.dispatchEvent(new CustomEvent(oe,{detail:{key:e,oldValue:P,newValue:y,storageArea:n}})))}}catch(y){f(y)}}function k(m){const y=m?m.newValue:n.getItem(e);if(y==null)return l&&b!=null&&n.setItem(e,_.write(b)),b;if(!m&&d){const P=_.read(y);return typeof d=="function"?d(P,b):M==="object"&&!Array.isArray(P)?{...b,...P}:P}else return typeof y!="string"?y:_.read(y)}function I(m){O(m.detail)}function O(m){if(!(m&&m.storageArea!==n)){if(m&&m.key==null){h.value=b;return}if(!(m&&m.key!==e)){F();try{(m==null?void 0:m.newValue)!==_.write(h.value)&&(h.value=k(m))}catch(y){f(y)}finally{m?J(w):w()}}}}}function we(e){return ot("(prefers-color-scheme: dark)",e)}function ct(e={}){const{selector:t="html",attribute:n="class",initialValue:r="auto",window:o=D,storage:s,storageKey:a="vueuse-color-scheme",listenToStorageChanges:i=!0,storageRef:l,emitAuto:d,disableTransition:c=!0}=e,p={auto:"",light:"light",dark:"dark",...e.modes||{}},u=we({window:o}),f=T(()=>u.value?"dark":"light"),v=l||(a==null?Ze(r):lt(a,r,s,{window:o,listenToStorageChanges:i})),h=T(()=>v.value==="auto"?f.value:v.value),b=he("updateHTMLAttrs",(w,S,k)=>{const I=typeof w=="string"?o==null?void 0:o.document.querySelector(w):ye(w);if(!I)return;let O;if(c&&(O=o.document.createElement("style"),O.appendChild(document.createTextNode("*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}")),o.document.head.appendChild(O)),S==="class"){const m=k.split(/\s/g);Object.values(p).flatMap(y=>(y||"").split(/\s/g)).filter(Boolean).forEach(y=>{m.includes(y)?I.classList.add(y):I.classList.remove(y)})}else I.setAttribute(S,k);c&&(o.getComputedStyle(O).opacity,document.head.removeChild(O))});function M(w){var S;b(t,n,(S=p[w])!=null?S:w)}function _(w){e.onChanged?e.onChanged(w,M):M(w)}A(h,_,{flush:"post",immediate:!0}),ve(()=>_(h.value));const F=T({get(){return d?v.value:h.value},set(w){v.value=w}});try{return Object.assign(F,{store:v,system:f,state:h})}catch{return F}}function Ot(e={}){const{valueDark:t="dark",valueLight:n="",window:r=D}=e,o=ct({...e,onChanged:(i,l)=>{var d;e.onChanged?(d=e.onChanged)==null||d.call(e,i==="dark",l,i):l(i)},modes:{dark:t,light:n}}),s=T(()=>o.system?o.system.value:we({window:r}).value?"dark":"light");return T({get(){return o.value==="dark"},set(i){const l=i?"dark":"light";s.value===l?o.value="auto":o.value=l}})}export{wt as a,E as b,vt as c,mt as d,gt as e,ht as f,bt as g,dt as h,x as i,Ot as j,yt as o,pt as r,V as t,$ as u};
