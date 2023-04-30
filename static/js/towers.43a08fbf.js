var $=Object.defineProperty;var z=(E,i,t)=>i in E?$(E,i,{enumerable:!0,configurable:!0,writable:!0,value:t}):E[i]=t;var e=(E,i,t)=>(z(E,typeof i!="symbol"?i+"":i,t),t);import{g as W,t as X,v as K,x as P,c as V,w as s,u as n,y as j,o as T,k as a,j as x,p as U,F as H,m as _,z as g,A as N,B as J,C as q,D as Q,G as Z,H as tt,I as et,J as at}from"./.pnpm.c07ad16e.js";import{G as S}from"./GlobalData.16032a2d.js";import{G as k,B as lt,T as w,a as st,b as it,W as C,S as ot,c as B,d as b,C as nt,e as rt,f as ut,A as dt,g as mt,h as _t,i as ht}from"./unit.9857fd3d.js";import{B as O,G as v,f as ft,a as gt}from"./format.26b8f9ad.js";const M=class extends O{constructor(){super();e(this,"doneTime");e(this,"m_doneTimer");e(this,"m_fgUpgrade");e(this,"m_bgUpgrade");e(this,"m_upgradeComplete");e(this,"m_halo");e(this,"m_buildTime")}get buildingData(){return this.m_data}get range(){return this.buildingData.range}initBuilding(){}get skillInfo(){let t,l=0,o=null,D=null,p="";if(this.skills==null)return p;let u=[];for(t in this.skills)u.push(this.skills[t]);for(u.sort((r,R)=>r[v.DATA_KEY_INDEX]-R[v.DATA_KEY_INDEX]),l=0;l<u.length;l++)o=u[l],D=o.skillInfo,D!=""&&(p!=""&&(p+=`
`),p+=D);return p==""&&(p=this.buildingData.info),p}};let f=M;e(f,"RATE_TIME",1e5),e(f,"CHECK_RATE",k.REFRESH_RATE),e(f,"COOLDOWN_NUM",M.RATE_TIME/M.CHECK_RATE),e(f,"FIRE_TIME",.1),e(f,"BUILDING","building"),e(f,"STATUS_BUILD","statusBuild"),e(f,"FRAME_COMPLETE","com"),e(f,"RES_UPGRADE","upgradeTower"),e(f,"BUILD_SET",0),e(f,"BUILD_ING",1),e(f,"BUILD_HAD",2);class F extends O{constructor(t){super();e(this,"source");e(this,"target");e(this,"targetPoint");e(this,"damage");e(this,"range");e(this,"attackType");this.m_data=lt.getOnlyExample().getData(t),this.attackType=w.EFFECT_TYPE_ALL}get srcTower(){return this.source}get srcTrap(){return this.source}get bulletData(){return this.m_data}}e(F,"MAX_LIFE_FRAME",50),e(F,"MAX_HEIGHT",5e3);class c extends f{constructor(t){super();e(this,"m_dir");e(this,"castEvent");e(this,"m_cooldownNum");e(this,"target");e(this,"m_level");e(this,"upgradeLevel");e(this,"m_exp");e(this,"offer");e(this,"gem");e(this,"m_levelText");e(this,"m_gemComplete");e(this,"m_attackType");e(this,"slowf_tower",1);this.m_data=it.getOnlyExample().getData(t),this.initTower(),this.level=1}get towerData(){return this.m_data}initTower(){this.initSkills(),this.initStatuses(),this.statuses[C.KIND_DAMAGE]=1,this.statuses[C.KIND_RATE]=1,this.statuses[C.KIND_RANGE]=1,this.initBuilding()}initSkills(){let t=null,l=null,o;if(this.skills=new Object,this.data.skillPackageId!=""&&(t=new ot(this.data.skillPackageId,this.data.skillPackageLevel),t!=null&&t.skillsPackageData!=null))for(o of t.skillsPackageData.skillsList)l=new B(o,t.level,this).getSubClasses(),this.skills[l.data.kindId]=l;if(this.gem){if(t=this.gem.gemData.getSkillPackage(this.data.id),t!=null&&t.skillsPackageData!=null)for(o of t.skillsPackageData.skillsList)l=new B(o,t.level,this).getSubClasses(),this.skills[l.data.kindId]=l;this.skills[b.KIND_SCATTER_ATTACK]&&delete this.skills[b.KIND_DIVIDED_ATTACK]}this.updateAttackType()}get color(){return this.gem!=null?this.gem.gemData.color:6316128}get level(){return this.m_level}set level(t){this.m_level=t}get gemLevel(){return this.gem?this.gem.gemData.gemLevel:0}get ability(){var t=this.gemLevel;return this.towerData.isMagicTower?t==0?0:this.m_level*(.8+t/5)*2:this.m_level*(1+t/10)}get power(){let t=this.level,l=S.$_tower_worth_factor,o=this.gemLevel,D=this.valueCostConst(t);return Math.round((D+Math.pow(o,l[0])*l[1])*(l[2]+o/l[3]))}buildValue(t=-1){return t==-1&&(t=this.level),parseInt(this.towerData.buildValueA+this.towerData.buildValueB*t+this.towerData.buildValueC*t*t)}buildCost(t=-1){return t==-1&&(t=this.level),parseInt(this.towerData.buildCostA+this.towerData.buildCostB*t+this.towerData.buildCostC*t*t)}valueCost(t=-1){t==-1&&(t=this.level);let l=t*this.towerData.buildCostA+(t*t+t)/2*this.towerData.buildCostB+(t*t*t+t*t*3/2+t/2)/3*this.towerData.buildCostC+this.towerData.buildCost-this.towerData.buildCostA-this.towerData.buildCostB-this.towerData.buildCostC;return Math.round(l)}valueCostConst(t=-1){t==-1&&(t=this.level);let l=t*this.towerData.buildCostAConst+(t*t+t)/2*this.towerData.buildCostBConst+(t*t*t+t*t*3/2+t/2)/3*this.towerData.buildCostCConst+this.towerData.buildCostConst-this.towerData.buildCostAConst-this.towerData.buildCostBConst-this.towerData.buildCostCConst;return Math.round(l)}buffEffect(t=-1){return t==-1&&(t=this.level),this.towerData.buffEffect*t+1}damage(t=-1){let l=0;if(t==-1&&(t=this.level),this.skills[b.KIND_CHANGE_DAMAGE]instanceof nt){let o=this.skills[b.KIND_CHANGE_DAMAGE];o.isChangeBase()?l=Math.round((o.damageA+o.damageB*t+o.damageC*t*t)*o.damageRate+o.damageAdd):l=Math.round((this.towerData.damageA+this.towerData.damageB*t+this.towerData.damageC*t*t)*o.damageRate+o.damageAdd)}else l=Math.round(this.towerData.damageA+this.towerData.damageB*t+this.towerData.damageC*t*t);return l=Math.ceil(l*this.statuses[C.KIND_DAMAGE]),Math.max(l,0)}get range(){let t=0;if(this.skills[b.KIND_CHANGE_RANGE]instanceof rt){let l=this.skills[b.KIND_CHANGE_RANGE];l.isChangeBase()?t=l.range*l.rangeRate+l.rangeAdd:t=this.towerData.range*l.rangeRate+l.rangeAdd}else t=this.towerData.range;return t>0?t=Math.ceil(t*this.statuses[C.KIND_RANGE]):t=Math.floor(t*this.statuses[C.KIND_RANGE]),t}get rate(){let t=0;if(this.skills[b.KIND_CHANGE_RATE]instanceof ut){let l=this.skills[b.KIND_CHANGE_RATE];l.isChangeBase()?t=Math.round(l.rate*l.rateRate):t=Math.round(this.towerData.rate*l.rateRate)}else t=this.towerData.rate;return parseInt(Math.ceil(t*this.statuses[C.KIND_RATE]))}setGem(t){this.gem=t,this.initSkills()}updateAttackType(){let t=null;return this.m_attackType=w.EFFECT_TYPE_ALL,this.getBulletId()=="bullet100"?this.m_attackType=w.EFFECT_TYPE_LIGHTNING:this.skills[b.KIND_ATTACK_RATE]instanceof dt&&(t=this.skills[b.KIND_ATTACK_RATE],t.airRate<=0?this.m_attackType=w.EFFECT_TYPE_FLOOR:t.floorRate<=0&&(this.m_attackType=w.EFFECT_TYPE_AIR)),this.m_attackType}newBullet(){return new F(this.getBulletId())}getBulletId(){let t=null;return this.skills[b.KIND_CHANGE_BULLET]instanceof mt?(t=this.skills[b.KIND_CHANGE_BULLET],t.bulletId):this.towerData.bulletId}getInfoHtml(){return ft(this.skillInfo,this.color,!1,"14px")}}e(c,"TOWER","tower"),e(c,"GEM","gem"),e(c,"LEVEL_BUBBLE","levelBubble"),e(c,"RES_LEVEL_SECTION",5),e(c,"LEVEL_NAME",st.getLanguageStr(2003)),e(c,"STATUS_READY","statusReady"),e(c,"FRAME_REST","rest"),e(c,"FRAME_READY","ready"),e(c,"FRAME_FIRE","fire");class bt extends _t{constructor(i){super(),this.m_data=ht.getOnlyExample().getData(i)}get gemData(){return this.m_data}}const ct=["innerHTML"],Et=_("p",null,"注：升级经验为塔下一级的 buildValue 值",-1),kt=W({__name:"towers",setup(E){const i=X({isDefendMap:!1,towerId:"shaota",gemId:"",level:1,buildFrom:0,buildTo:1,buildPower:50}),t=K.map(S.$_towerAtt_Obj,(u,r)=>[u.name,r]),l=K.chain(S.$_global_properties.gem).toPairs().sortBy(u=>Number(Math.abs(u[1].index))).map(u=>[`${u[1].name} [${u[1].index}]`,u[0]]).value(),o=P(()=>{const u=new c(i.towerId);return u.level=i.level,i.gemId!==""&&u.setGem(new bt(i.gemId)),u}),D=()=>{k.currentMap=new k(i.isDefendMap?k.DEFEND_MAP_1:k.ENDLESS_MAP_1)},p=P(()=>{let u=0;if(i.buildFrom>i.buildTo)return NaN;for(let r=i.buildFrom+1;r<=i.buildTo;r++)u+=o.value.buildValue(r);return Math.round(u/i.buildPower)});return(u,r)=>{const R=J,d=q,L=Q,y=Z,h=tt,A=et,I=at,Y=j;return T(),V(Y,{model:n(i),"label-width":"120px"},{default:s(()=>[a(d,{label:"是否为防线"},{default:s(()=>[a(R,{modelValue:n(i).isDefendMap,"onUpdate:modelValue":r[0]||(r[0]=m=>n(i).isDefendMap=m),onChange:D},null,8,["modelValue"])]),_:1}),a(A,null,{default:s(()=>[a(h,{span:12},{default:s(()=>[a(d,{label:"塔"},{default:s(()=>[a(y,{modelValue:n(i).towerId,"onUpdate:modelValue":r[1]||(r[1]=m=>n(i).towerId=m)},{default:s(()=>[(T(!0),x(H,null,U(n(t),([m,G])=>(T(),V(L,{label:m,value:G},null,8,["label","value"]))),256))]),_:1},8,["modelValue"])]),_:1})]),_:1}),a(h,{span:12},{default:s(()=>[a(d,{label:"宝石"},{default:s(()=>[a(y,{modelValue:n(i).gemId,"onUpdate:modelValue":r[2]||(r[2]=m=>n(i).gemId=m)},{default:s(()=>[a(L,{label:"无",value:""}),(T(!0),x(H,null,U(n(l),([m,G])=>(T(),V(L,{label:m,value:G},null,8,["label","value"]))),256))]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1}),a(A,null,{default:s(()=>[a(h,{span:8},{default:s(()=>[a(d,{label:"等级"},{default:s(()=>[a(I,{modelValue:n(i).level,"onUpdate:modelValue":r[3]||(r[3]=m=>n(i).level=m),min:1},null,8,["modelValue"])]),_:1})]),_:1}),a(h,{span:8},{default:s(()=>[a(d,{label:"等级上限"},{default:s(()=>[_("label",null,g(n(o).towerData.levelMax),1)]),_:1})]),_:1}),a(h,{span:8},{default:s(()=>[a(d,{label:"升级经验"},{default:s(()=>[_("label",null,g(n(o).buildValue(n(o).level+1)),1)]),_:1})]),_:1})]),_:1}),a(A,null,{default:s(()=>[a(h,{span:8},{default:s(()=>[a(d,{label:"攻击力"},{default:s(()=>[_("label",null,g(n(o).damage()),1)]),_:1})]),_:1}),a(h,{span:8},{default:s(()=>[a(d,{label:"攻击频率"},{default:s(()=>[_("label",null,g(n(o).rate),1)]),_:1})]),_:1}),a(h,{span:8},{default:s(()=>[a(d,{label:"攻击范围"},{default:s(()=>[_("label",null,g(n(o).range),1)]),_:1})]),_:1})]),_:1}),a(d,{label:"简介"},{default:s(()=>[_("div",{innerHTML:n(o).getInfoHtml(),style:{"line-height":"1.5em"}},null,8,ct)]),_:1}),a(A,null,{default:s(()=>[a(h,{span:8},{default:s(()=>[a(d,{label:"ability"},{default:s(()=>[_("label",null,g(n(o).ability.toFixed(1)),1)]),_:1})]),_:1}),a(h,{span:8},{default:s(()=>[a(d,{label:"power"},{default:s(()=>[_("label",null,g(n(o).power),1)]),_:1})]),_:1}),a(h,{span:8},{default:s(()=>[a(d,{label:"buffEffect"},{default:s(()=>[_("label",null,g(n(o).buffEffect().toFixed(1)),1)]),_:1})]),_:1})]),_:1}),a(A,null,{default:s(()=>[a(h,{span:8},{default:s(()=>[a(d,{label:"buildValue"},{default:s(()=>[_("label",null,g(n(o).buildValue()),1)]),_:1})]),_:1}),a(h,{span:8},{default:s(()=>[a(d,{label:"buildCost"},{default:s(()=>[_("label",null,g(n(o).buildCost()),1)]),_:1})]),_:1}),a(h,{span:8},{default:s(()=>[a(d,{label:"valueCost"},{default:s(()=>[_("label",null,g(n(o).valueCost()),1)]),_:1})]),_:1})]),_:1}),_("div",null,[a(d,{label:"升级计算",style:{"margin-bottom":"0 !important"}},{default:s(()=>[N(" 从 "),a(I,{modelValue:n(i).buildFrom,"onUpdate:modelValue":r[4]||(r[4]=m=>n(i).buildFrom=m),size:"small","controls-position":"right",style:{width:"5em",margin:"0.5em"}},null,8,["modelValue"]),N(" 级到 "),a(I,{modelValue:n(i).buildTo,"onUpdate:modelValue":r[5]||(r[5]=m=>n(i).buildTo=m),size:"small","controls-position":"right",style:{width:"5em",margin:"0.5em"}},null,8,["modelValue"]),N(" 级， 苦工总力量 "),a(I,{modelValue:n(i).buildPower,"onUpdate:modelValue":r[6]||(r[6]=m=>n(i).buildPower=m),size:"small","controls-position":"right",style:{width:"8em",margin:"0.5em"}},null,8,["modelValue"])]),_:1}),a(d,{style:{"margin-bottom":"0 !important"}},{default:s(()=>[N(" 需要时间："),_("label",null,g(n(gt)(n(p))),1)]),_:1}),Et])]),_:1},8,["model"])}}});export{kt as default};
