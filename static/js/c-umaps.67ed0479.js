import{g as v,v as c,j as d,k as l,w as r,l as u,F as b,n,a1 as w,o as i,A as m,z as s,q as B,a2 as k,c as E,$ as M}from"./c-.pnpm.f4627d78.js";import{h as g,M as j}from"./c-unit.eeae5d78.js";const D=n("p",null,"前排解释：",-1),L=n("p",null,"狼的等级随进度增加而增加。难度系数 hardA 影响初始狼等级，hardB 影响等级增长速率。",-1),N=n("p",null,"population 影响一波狼的容量。每只狼都会占用一定容量。",-1),T=n("p",null,"不同随机boss有出现权重。出现率、难度、奖励水平是相对应的，难的比较稀有，奖励也会比较好。",-1),O=v({__name:"umaps",setup(A){const f=c.map(g.$_map_Obj,(t,a)=>c.extend(t,{id:a})),h=(t,a)=>{let e=t.need_lev||0,p=a.need_lev||0;return e-p},x=t=>t.map(a=>{const e=j.getOnlyExample().getData(a[1]);return{prob:a[0],name:e.name,pop:e.population}});return(t,a)=>{const e=k,p=M,y=w;return i(),d(b,null,[D,L,N,T,l(y,{data:u(f),"default-sort":{prop:"index",order:"ascending"},"table-layout":"auto",stripe:"","header-cell-style":{"text-align":"center"},height:"600px",style:{width:"100%","font-size":"80%"},class:"testbox"},{default:r(()=>[l(e,{prop:"index",label:"index",sortable:"",align:"center",fixed:"",width:"70"}),l(e,{prop:"id",label:"id",sortable:"",align:"center",fixed:"",width:"80"}),l(e,{prop:"name",label:"name",sortable:"",align:"center",fixed:"",width:"80"}),l(e,{prop:"pass_score",label:"scoreMax",sortable:"",align:"center"}),l(e,{label:"hardnessFactor"},{default:r(()=>[l(e,{prop:"yield_val",label:"hardA",sortable:"",align:"center"}),l(e,{prop:"hard_ness",label:"hardB",sortable:"",align:"center"})]),_:1}),l(e,{prop:"pop_max",label:"populationMax",sortable:"",align:"center"}),l(e,{prop:"interval",label:"unkennelDelay",sortable:"",align:"center"}),l(e,{prop:"interval_rule",label:"unkennelRule",sortable:"",align:"center"}),l(e,{prop:"teleport_rule",label:"teleportRule",sortable:"",align:"center"}),l(e,{prop:"need_lev",label:"needLevel",sortable:"","sort-method":h,align:"center"}),l(e,{prop:"pass_by",label:"passBy",align:"center"},{default:r(_=>[m(s(_.row.pass_by.map(o=>u(g).$_map_Obj[o].name).join(", ")),1)]),_:1}),l(e,{prop:"wolf_proportion",label:"monsterList","cell-style":{"text-align":"left"}},{default:r(_=>[(i(!0),d(b,null,B(x(_.row.wolf_proportion),o=>(i(),E(p,{class:"ml-2"},{default:r(()=>[n("sub",null,s(o.prob),1),m(" "+s(o.name)+" ",1),n("sup",null,s(o.pop),1)]),_:2},1024))),256))]),_:1})]),_:1},8,["data"])],64)}}});export{O as default};
