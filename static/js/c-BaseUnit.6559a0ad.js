var D=Object.defineProperty;var R=(c,A,i)=>A in c?D(c,A,{enumerable:!0,configurable:!0,writable:!0,value:i}):c[A]=i;var s=(c,A,i)=>(R(c,typeof A!="symbol"?A+"":A,i),i);import{o as I,n as L,S as k,b as d}from"./c-unit.eeae5d78.js";class t{}s(t,"SNS_ID_XN","xn"),s(t,"SNS_ID_QQ","qq"),s(t,"INDEX_TAG_1",1),s(t,"INDEX_TAG_2",2),s(t,"TOOLS_CARD_RMBBT","rmbbt"),s(t,"TOOLS_CARD_YBB","ybb"),s(t,"TOOLS_CARD_LQXFJ","lqxfj"),s(t,"TOOLS_CARD_DALIC","dalic"),s(t,"TOOLS_CARD_BAOXIANG","baoxiang"),s(t,"TOOLS_CARD_JINYANG","za_jinyang"),s(t,"TOOLS_CARD_SL","sl"),s(t,"TOOLS_CARD_DRWS","drws"),s(t,"TOOLS_CARD_TEXP","texp_"),s(t,"TOOLS_CARD_ZA","za_"),s(t,"TOOLS_CARD_TIEGAO","tiegao"),s(t,"TOOLS_CARD_JUZI","juzi"),s(t,"TOOLS_CARD_HAOJIAO","haojiao"),s(t,"TOOLS_CARD_ZHAIQU","gem_"),s(t,"TOOLS_CARD","card"),s(t,"TOOLS_GEM","gem"),s(t,"TOOLS_WC","wc"),s(t,"TOOLS_TAME","tame"),s(t,"TOOLS_SNARP","snarp"),s(t,"DATA_KEY_INDEX","index"),s(t,"DATA_KEY_CARD_ID","card_id"),s(t,"DATA_KEY_CARD_NAME","card_name"),s(t,"DATA_KEY_BAG_ID","bag_id"),s(t,"DATA_USER_WOLF_CYCLE","wolf_cycle"),s(t,"DATA_USER_WOLF_MAX","wolf_max");const T=class extends I{constructor(){super();s(this,"id","");s(this,"skills",{});s(this,"tag");this.tag="BaseUnit"}init(){this.initSkills(),this.initStatuses()}initSkills(){let i=null,E,a=null,e=null;if(this.skills={},this.tag=="Monster"&&(a=this.getAllSkills()),a==null&&(a=this.data.skills),a!=null){if(this.tag=="Monster")for(let O=0;O<a.length;O++)a instanceof Array?i=new L(a[O][T.SKILL_ID],a[O][T.SKILL_LEVEL],this).getSubClasses():i=new L(O,a[O],this).getSubClasses(),this.skills[i.data.kindId]=i}else if(this.data.skillPackageId!=""&&(e=new k(this.data.skillPackageId,this.data.skillPackageLevel),e!=null&&e.skillsPackageData!=null))for(E of e.skillsPackageData.skillsList)this.tag=="Tower"?i=new d(E,e.level,this).getSubClasses():this.tag=="Monster"&&(i=new L(E,e.level,this).getSubClasses()),this.skills[i.data.kindId]=i}initStatuses(){}get data(){return this.m_data}};let _=T;s(_,"SKILL_ID","skid"),s(_,"SKILL_LEVEL","lev"),s(_,"FRAME_NAME_DOWN","d"),s(_,"FRAME_NAME_LEFT","l"),s(_,"FRAME_NAME_UP","u"),s(_,"FRAME_NAME_RIGHT","r"),s(_,"FRAME_DOWN",1),s(_,"FRAME_LEFT",2),s(_,"FRAME_UP",3),s(_,"FRAME_RIGHT",4),s(_,"SHADOW","shadow"),s(_,"STATUS_RATE",200),s(_,"STATUS_TIME",T.STATUS_RATE/1e3),s(_,"AOE_SILENCE_RANGE",1e3),s(_,"AOE_SILENCE_TIME",2),s(_,"INFO_HEIGHT",20);export{_ as B,t as G};
