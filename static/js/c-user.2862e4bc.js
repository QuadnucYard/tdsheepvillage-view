import{g as b,t as i,x as n,c as x,w as a,u as l,y as V,o as w,k as o,m as s,z as u,J as g,C as h}from"./c-.pnpm.69d3e3e2.js";const E=b({__name:"user",setup(k){const e=i({level:1}),_=n(()=>((2*(e.level+1)+3)*(e.level+1)+4)*(e.level+1)+20),r=n(()=>Math.round((.015*e.level+.8)*e.level+2)),d=n(()=>Math.floor(e.level/4+1)),c=n(()=>(e.level+7)*r.value);return(B,m)=>{const p=g,t=h,f=V;return w(),x(f,{model:l(e),"label-width":"120px"},{default:a(()=>[o(t,{label:"等级"},{default:a(()=>[o(p,{modelValue:l(e).level,"onUpdate:modelValue":m[0]||(m[0]=v=>l(e).level=v),min:1},null,8,["modelValue"])]),_:1}),o(t,{label:"升级经验"},{default:a(()=>[s("label",null,u(l(_)),1)]),_:1}),o(t,{label:"力量"},{default:a(()=>[s("label",null,u(l(r)),1)]),_:1}),o(t,{label:"连升等级"},{default:a(()=>[s("label",null,u(l(d)),1)]),_:1}),o(t,{label:"苦工价格"},{default:a(()=>[s("label",null,u(l(c)),1)]),_:1})]),_:1},8,["model"])}}});export{E as default};