import{r as v,o as p,c as _,w,K as h,a as y,b as E,d as g,e as b,f as P,i as O,E as L}from"./c-.pnpm.9643bc8d.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const R=(o,r)=>{const n=o.__vccOpts||o;for(const[s,e]of r)n[s]=e;return n},A={};function D(o,r){const n=v("router-view");return p(),_(n,null,{default:w(({Component:s})=>[(p(),_(h,null,[(p(),_(y(s)))],1024))]),_:1})}const I=R(A,[["render",D]]),T="modulepreload",x=function(o,r){return new URL(o,r).href},f={},a=function(r,n,s){if(!n||n.length===0)return r();const e=document.getElementsByTagName("link");return Promise.all(n.map(t=>{if(t=x(t,s),t in f)return;f[t]=!0;const i=t.endsWith(".css"),d=i?'[rel="stylesheet"]':"";if(!!s)for(let c=e.length-1;c>=0;c--){const u=e[c];if(u.href===t&&(!i||u.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${t}"]${d}`))return;const l=document.createElement("link");if(l.rel=i?"stylesheet":T,i||(l.as="script",l.crossOrigin=""),l.href=t,document.head.appendChild(l),i)return new Promise((c,u)=>{l.addEventListener("load",c),l.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${t}`)))})})).then(()=>r())},k=(o,r)=>{const n=o[r];return n?typeof n=="function"?n():Promise.resolve(n):new Promise((s,e)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(e.bind(null,new Error("Unknown variable dynamic import: "+r)))})},V=[{name:"user",label:"User"},{name:"towers",label:"Towers"},{name:"wolfs",label:"Wolfs"},{name:"umaps",label:"Umaps"},{name:"umapdetail",label:"Umap Detail"},{name:"wolf-calc",label:"Wolf Calculation"},{name:"baoxiang",label:"Baoxiang Properties"}],C=[{path:"/",name:"index",component:()=>a(()=>import("./c-index.a68a3aa7.js"),["./c-index.a68a3aa7.js","./c-.pnpm.9643bc8d.js","../css/a-.pnpm.85d96a99.css","../css/a-index.3f3aff83.css"],import.meta.url),children:V.map(o=>({path:"/"+o.name,name:o.name,meta:{keepAlive:!0},component:()=>k(Object.assign({"../views/sections/baoxiang.vue":()=>a(()=>import("./c-baoxiang.c4497a29.js"),["./c-baoxiang.c4497a29.js","./c-.pnpm.9643bc8d.js","../css/a-.pnpm.85d96a99.css","./c-GlobalData.ece1efc6.js","./c-translate.62430902.js"],import.meta.url),"../views/sections/towers.vue":()=>a(()=>import("./c-towers.719093e6.js"),["./c-towers.719093e6.js","./c-.pnpm.9643bc8d.js","../css/a-.pnpm.85d96a99.css","./c-GlobalData.ece1efc6.js","./c-unit.b99f82b2.js","./c-BaseUnit.337c31ff.js"],import.meta.url),"../views/sections/umapdetail.vue":()=>a(()=>import("./c-umapdetail.61f0b247.js"),["./c-umapdetail.61f0b247.js","./c-.pnpm.9643bc8d.js","../css/a-.pnpm.85d96a99.css","./c-GlobalData.ece1efc6.js","./c-unit.b99f82b2.js","./c-translate.62430902.js","../css/a-umapdetail.d845eada.css"],import.meta.url),"../views/sections/umaps.vue":()=>a(()=>import("./c-umaps.6717946b.js"),["./c-umaps.6717946b.js","./c-.pnpm.9643bc8d.js","../css/a-.pnpm.85d96a99.css","./c-GlobalData.ece1efc6.js","./c-unit.b99f82b2.js","../css/a-umaps.dc580cbb.css"],import.meta.url),"../views/sections/user.vue":()=>a(()=>import("./c-user.bdf4da41.js"),["./c-user.bdf4da41.js","./c-.pnpm.9643bc8d.js","../css/a-.pnpm.85d96a99.css"],import.meta.url),"../views/sections/wolf-calc.vue":()=>a(()=>import("./c-wolf-calc.a3c829f8.js"),["./c-wolf-calc.a3c829f8.js","./c-.pnpm.9643bc8d.js","../css/a-.pnpm.85d96a99.css","./c-GlobalData.ece1efc6.js","./c-unit.b99f82b2.js","./c-Monster.2b62eafb.js","./c-BaseUnit.337c31ff.js","./c-translate.62430902.js","../css/a-wolf-calc.b185692e.css"],import.meta.url),"../views/sections/wolfs.vue":()=>a(()=>import("./c-wolfs.c66ea1f7.js"),["./c-wolfs.c66ea1f7.js","./c-.pnpm.9643bc8d.js","../css/a-.pnpm.85d96a99.css","./c-GlobalData.ece1efc6.js","./c-Monster.2b62eafb.js","./c-BaseUnit.337c31ff.js","./c-unit.b99f82b2.js","../css/a-wolfs.db0b326c.css"],import.meta.url)}),`../views/sections/${o.name}.vue`)}))}],B=E({history:g("/tdsheepvillage-view/"),routes:C}),S=b({state:{},mutations:{},actions:{}});const m=P(I);m.use(B).use(O).use(S);console.log(m);for(const[o,r]of Object.entries(L))m.component(o,r);m.mount("#app");export{R as _,V as s};
