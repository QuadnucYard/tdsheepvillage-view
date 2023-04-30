var T=Object.defineProperty;var N=(a,O,c)=>O in a?T(a,O,{enumerable:!0,configurable:!0,writable:!0,value:c}):a[O]=c;var t=(a,O,c)=>(N(a,typeof O!="symbol"?O+"":O,c),c);import{j as L,k as E,c as R}from"./unit.9857fd3d.js";class s{}t(s,"VERSION","?v="),t(s,"SNS_ID_XN","xn"),t(s,"SNS_ID_QQ","qq"),t(s,"ALIGN0","left"),t(s,"ALIGN1","center"),t(s,"ALIGN2","right"),t(s,"SOUND_SHEEP","sheep"),t(s,"SOUND_TELEPORT","teleport"),t(s,"SOUND_WOLF_DIE","wolfDie"),t(s,"SOUND_WOLF_COMING","wolfComing"),t(s,"SOUND_WIN","win"),t(s,"SOUND_FAIL","fail"),t(s,"SOUND_PASS_MAP","passMap"),t(s,"SOUND_MISS","miss"),t(s,"SOUND_SMALL_FIRE","smallFire"),t(s,"SOUND_BIG_FIRE","bigFire"),t(s,"SOUND_MIGIC_FIRE","magicFire"),t(s,"SOUND_SMALL_HIT","smallHit"),t(s,"SOUND_BIG_HIT","bigHit"),t(s,"SOUND_MIGIC_HIT","magicHit"),t(s,"SOUND_ALL_ATTACK","allAttack"),t(s,"SOUND_LIGHTNING","lightning"),t(s,"SOUND_BURN","burn"),t(s,"SOUND_COLD","cold"),t(s,"SOUND_POISON","poison"),t(s,"SOUND_CRIT","crit"),t(s,"SOUND_BeatBack","beatBack"),t(s,"SOUND_BUILD","build"),t(s,"SOUND_BUILD_UP","buildUp"),t(s,"SOUND_GEM","gem"),t(s,"SOUND_BUTTON","gem"),t(s,"SOUND_COUNT_DOWN","countDown"),t(s,"SOUND_GOLD","gold"),t(s,"SOUND_CLAMP","clamp"),t(s,"SOUND_SLOW","slow"),t(s,"SOUND_STAB","stab"),t(s,"SOUND_BLAST","blast"),t(s,"SOUND_REWARD","reward"),t(s,"MUSIC_FIGHT_001","fight001"),t(s,"MUSIC_FIGHT_002","fight010"),t(s,"MUSIC_FIGHT_003","fight005"),t(s,"MUSIC_FIGHT_004","fight004"),t(s,"MUSIC_FIGHT_005","fight011"),t(s,"MUSIC_FIGHT_006","fight012"),t(s,"INDEX_TAG_1",1),t(s,"INDEX_TAG_2",2),t(s,"YEAR","year"),t(s,"YELLOW","yellow"),t(s,"TOOLS_CARD_RMBBT","rmbbt"),t(s,"TOOLS_CARD_YBB","ybb"),t(s,"TOOLS_CARD_LQXFJ","lqxfj"),t(s,"TOOLS_CARD_DALIC","dalic"),t(s,"TOOLS_CARD_BAOXIANG","baoxiang"),t(s,"TOOLS_CARD_JINYANG","za_jinyang"),t(s,"TOOLS_CARD_SL","sl"),t(s,"TOOLS_CARD_DRWS","drws"),t(s,"TOOLS_CARD_TEXP","texp_"),t(s,"TOOLS_CARD_ZA","za_"),t(s,"TOOLS_CARD_TIEGAO","tiegao"),t(s,"TOOLS_CARD_JUZI","juzi"),t(s,"TOOLS_CARD_HAOJIAO","haojiao"),t(s,"TOOLS_CARD_ZHAIQU","gem_"),t(s,"TOOLS_CARD","card"),t(s,"TOOLS_GEM","gem"),t(s,"TOOLS_WC","wc"),t(s,"TOOLS_TAME","tame"),t(s,"TOOLS_SNARP","snarp"),t(s,"DATA_KEY_INDEX","index"),t(s,"DATA_KEY_CARD_ID","card_id"),t(s,"DATA_KEY_CARD_NAME","card_name"),t(s,"DATA_KEY_BAG_ID","bag_id"),t(s,"DATA_USER_WOLF_CYCLE","wolf_cycle"),t(s,"DATA_USER_WOLF_MAX","wolf_max"),t(s,"PANEL_BTN_OK","ok"),t(s,"PANEL_BTN_CLOSE","close"),t(s,"DREAM_ERROR_CLOSE",3e4),t(s,"DREAM_ERROR_UPDATA",30001),t(s,"ERROR_SERVICE_A",503),t(s,"ERROR_SERVICE_B",504),t(s,"CAMP_MANORS","manors");const I=class extends L{constructor(){super();t(this,"id");t(this,"subPosX");t(this,"subPosY");t(this,"height");t(this,"skills");t(this,"statuses");t(this,"effects");t(this,"m_buff");t(this,"m_shadow")}init(){this.initSkills(),this.initStatuses()}initSkills(){let c=null,A,i=null,e=null;if(this.skills=new Object,this.constructor.name=="Monster"&&(i=this.getAllSkills()),i==null&&(i=this.data.skills),i!=null){if(this.constructor.name=="Monster")for(let D=0;D<i.length;D++)i instanceof Array?c=new E(i[D][I.SKILL_ID],i[D][I.SKILL_LEVEL],this).getSubClasses():c=new E(D,i[D],this).getSubClasses(),this.skills[c.data.kindId]=c}else if(this.data.skillPackageId!=""&&(e=new SkillsPackage(this.data.skillPackageId,this.data.skillPackageLevel),e!=null&&e.skillsPackageData!=null))for(A of e.skillsPackageData.skillsList)this.constructor.name=="Tower"?c=new R(A,e.level,this).getSubClasses():this.constructor.name=="Monster"&&(c=new E(A,e.level,this).getSubClasses()),this.skills[c.data.kindId]=c}initStatuses(){this.statuses=new Object,this.effects=new Object}get data(){return this.m_data}};let _=I;t(_,"SKILL_ID","skid"),t(_,"SKILL_LEVEL","lev"),t(_,"FRAME_NAME_DOWN","d"),t(_,"FRAME_NAME_LEFT","l"),t(_,"FRAME_NAME_UP","u"),t(_,"FRAME_NAME_RIGHT","r"),t(_,"FRAME_DOWN",1),t(_,"FRAME_LEFT",2),t(_,"FRAME_UP",3),t(_,"FRAME_RIGHT",4),t(_,"SHADOW","shadow"),t(_,"STATUS_RATE",200),t(_,"STATUS_TIME",I.STATUS_RATE/1e3),t(_,"AOE_SILENCE_RANGE",1e3),t(_,"AOE_SILENCE_TIME",2),t(_,"INFO_HEIGHT",20);function f(a,O=0,c=!1,A="14",i=""){return`<span style="color:#${O.toString(16).padStart(6,"0")};${c?"font-weight:bold;":""}${A?`font-size:${A};`:""}${i?`font-family:${i};`:""}">${a.replaceAll(`
`,"<br>")}</span>`}function d(a){return Math.floor(a/3600)+":"+Math.floor(a/60%60).toString().padStart(2,"0")+":"+(a%60).toString().padStart(2,"0")}export{_ as B,s as G,d as a,f};
