import { BaseData, BaseDisplayData } from "./BaseData";
import { BaseManager } from "./BaseData";
import { GlobalData } from "../ado/GlobalData";

export class BaseSkillData extends BaseDisplayData {
  static readonly TYPE_TOWER_SKILL = "typeTowerSkill";
  static readonly TYPE_MONSTER_SKILL = "typeMonsterSkill";
  static readonly DATA_PARAMETER = "params";
  static readonly DATA_LEVELS = "levels";
  parameter;
  levels;

  constructor(_data: any) {
    super(_data);
    this.parameter = _data[BaseSkillData.DATA_PARAMETER];
    this.levels = _data[BaseSkillData.DATA_LEVELS];
  }

  getLevelParam(_level: number, _index: number) {
    if (this.parameter != null) {
      return this.parameter[_index];
    }
    if (this.levels != null) {
      _level = Math.min(Math.max(0, _level - 1), this.levels.length - 1);
      return this.levels[_level][_index];
    }
    return null;
  }

  hasLevel() {
    if (this.parameter == null) {
      return true;
    }
    return false;
  }
}

export class TowerSkillData extends BaseSkillData {
  static readonly KIND_AURA = "Aura";
  static readonly KIND_CHANGE_BULLET = "Bultype";
  static readonly KIND_CHANGE_DAMAGE = "ChangeDam";
  static readonly KIND_CHANGE_RATE = "ChangeRate";
  static readonly KIND_CHANGE_RANGE = "ChangeRange";
  static readonly KIND_FIELD_ATTACK = "ALLAP";
  static readonly KIND_DIVIDED_ATTACK = "DivAP";
  static readonly KIND_SCATTER_ATTACK = "ScaAP";
  static readonly KIND_COMBO_ATTACK = "ComAP";
  static readonly KIND_GUIDED_BULLET = "GuidedBul";
  static readonly KIND_ATTACK_RATE = "AttackRate";
  static readonly KIND_AOE_ATTACK = "AoeAP";
  static readonly KIND_THROUGHOUT_ATTACK = "ThoAP";
  static readonly KIND_BOUNCE_ATTACK = "BouAP";
  static readonly KIND_FLOAT_DAMAGE = "FloatDam";
  static readonly KIND_CRIT = "Crit";
  static readonly KIND_REDUCED_DEFENSE = "RedDef";
  static readonly KIND_POISON = "Poison";
  static readonly KIND_SLOW = "Slow";
  static readonly KIND_BURN_COLD = "BC";
  static readonly KIND_BEAT_BACK = "Beat";
  static readonly KIND_SILENCE = "Silence";
  static readonly KIND_VERTIGO = "Vertigo";
  static readonly KIND_INTIMIDATE = "Intimidate";
  static readonly KIND_CUSS = "Cuss";
  static readonly KIND_BURN = "Burn";
  static readonly KIND_COLD = "Cold";

  constructor(_data: any) {
    super(_data);
    _data[BaseData.DATA_TYPE_ID] = BaseSkillData.TYPE_TOWER_SKILL;
  }
}

export class MonsterSkillData extends BaseSkillData {
  static readonly EVENT_RED = 1;
  static readonly EVENT_YELLOW = 2;
  static readonly EVENT_GREEN = 3;
  static readonly EVENT_FULL = 4;
  static readonly EVENT_INTIMIDATE = 20;
  static readonly EVENT_VERTIGO = 21;
  static readonly EVENT_SILENCE = 22;
  static readonly EVENT_SLOW = 23;
  static readonly EVENT_REDUCED_DEFENSE = 24;
  static readonly EVENT_POISON = 25;
  static readonly EVENT_BURN = 26;
  static readonly EVENT_COLD = 27;
  static readonly EVENT_HIT = 40;
  static readonly EVENT_CRIT = 41;
  static readonly EVENT_BEAT_BACK = 42;
  static readonly EVENT_FRIENT_DIE = 43;
  static readonly EVENT_DIE = 44;
  static readonly KIND_FLY = "fly";
  static readonly KIND_AIRBORNE = "airborne";
  static readonly KIND_ISOLATION = "isolation";
  static readonly KIND_RELIVE = "revive";
  static readonly KIND_SUICIDE = "burst";
  static readonly KIND_REINCARNATE = "reborn";
  static readonly KIND_SLOWF = "slowf";
  static readonly KIND_RESIST_FIRE = "resistFire";
  static readonly KIND_RESIST_FROST = "resistFrost";
  static readonly KIND_RESIST_POISON = "resistPoison";
  static readonly KIND_RESIST_SLOW = "resistSlow";
  static readonly KIND_RESIST_BEAT = "resistBeat";
  static readonly KIND_RESIST_SILENCE = "resistSilence";
  static readonly KIND_RESIST_VERTIGO = "resistVertigo";
  static readonly KIND_RESIST_CRIT = "resistCrit";
  static readonly KIND_RESIST_LIGHT = "resistLight";
  static readonly KIND_RESIST_INTIMIDATE = "resistIntimidate";
  static readonly KIND_WEAK_FIRE = "weakFire";
  static readonly KIND_WEAK_FROST = "weakFrost";
  static readonly KIND_WEAK_POISON = "weakPoison";
  static readonly KIND_WEAK_SLOW = "weakSlow";
  static readonly KIND_WEAK_BEAT = "weakBeat";
  static readonly KIND_WEAK_SILENCE = "weakSilence";
  static readonly KIND_WEAK_VERTIGO = "weakVertigo";
  static readonly KIND_WEAK_CRIT = "weakCrit";
  static readonly KIND_WEAK_LIGHT = "weakLight";
  static readonly KIND_WEAK_INTIMIDATE = "weakIntimidate";
  static readonly KIND_RESIST_STRSMOOTH = "strsmooth";
  static readonly KIND_RUN = "sprint";
  static readonly KIND_MIRROR = "divide";
  static readonly KIND_SUMMON = "summon";
  static readonly KIND_CLOUD = "cloud";
  static readonly KIND_CURE = "massTreatment";
  static readonly KIND_BLINK = "blink";
  static readonly KIND_HIDE = "invisible";
  static readonly KIND_SHIELD = "shield";
  static readonly KIND_SNEER = "taunt";
  static readonly KIND_TRANSFORM = "morph";
  static readonly KIND_LINKS = "links";

  constructor(_data: any) {
    super(_data);
    _data[BaseData.DATA_TYPE_ID] = BaseSkillData.TYPE_MONSTER_SKILL;
  }

  static get allMonsterSkill() {
    return [
      MonsterSkillData.KIND_FLY,
      MonsterSkillData.KIND_AIRBORNE,
      MonsterSkillData.KIND_ISOLATION,
      MonsterSkillData.KIND_RELIVE,
      MonsterSkillData.KIND_SUICIDE,
      MonsterSkillData.KIND_REINCARNATE,
      MonsterSkillData.KIND_RESIST_FIRE,
      MonsterSkillData.KIND_RESIST_FROST,
      MonsterSkillData.KIND_RESIST_POISON,
      MonsterSkillData.KIND_RESIST_BEAT,
      MonsterSkillData.KIND_RESIST_SILENCE,
      MonsterSkillData.KIND_RESIST_VERTIGO,
      MonsterSkillData.KIND_RESIST_CRIT,
      MonsterSkillData.KIND_RESIST_LIGHT,
      MonsterSkillData.KIND_RESIST_STRSMOOTH,
      MonsterSkillData.KIND_SLOWF,
      MonsterSkillData.KIND_WEAK_FIRE,
      MonsterSkillData.KIND_WEAK_FROST,
      MonsterSkillData.KIND_WEAK_POISON,
      MonsterSkillData.KIND_WEAK_BEAT,
      MonsterSkillData.KIND_WEAK_SILENCE,
      MonsterSkillData.KIND_WEAK_VERTIGO,
      MonsterSkillData.KIND_WEAK_CRIT,
      MonsterSkillData.KIND_WEAK_LIGHT,
      MonsterSkillData.KIND_RUN,
      MonsterSkillData.KIND_MIRROR,
      MonsterSkillData.KIND_SUMMON,
      MonsterSkillData.KIND_CLOUD,
      MonsterSkillData.KIND_CURE,
      MonsterSkillData.KIND_BLINK,
      MonsterSkillData.KIND_HIDE,
      MonsterSkillData.KIND_SHIELD,
      MonsterSkillData.KIND_SNEER,
      MonsterSkillData.KIND_TRANSFORM,
      MonsterSkillData.KIND_LINKS,
    ];
  }
}

export class SkillManager extends BaseManager {
  static onlyExample: SkillManager;
  static readonly TOWER_SKILL = "towerSkill";
  static readonly MONSTER_SKILL = "monsterSkill";
  static readonly TRAP_SKILL = "trapSkill";

  constructor() {
    super();
    SkillManager.onlyExample = this;
    this.loadData(GlobalData.$_skillAtt_Obj);
  }

  static getOnlyExample() {
    if (SkillManager.onlyExample == null) {
      SkillManager.onlyExample = new SkillManager();
    }
    return SkillManager.onlyExample;
  }

  loadData(_data: any) {
    for (const k in _data[SkillManager.TOWER_SKILL]) {
      const _d = _data[SkillManager.TOWER_SKILL][k];
      _d[BaseData.DATA_ID] = k;
      this.m_manager[k] = new TowerSkillData(_d);
    }
    for (const k in _data[SkillManager.MONSTER_SKILL]) {
      const _d = _data[SkillManager.MONSTER_SKILL][k];
      _d[BaseData.DATA_ID] = k;
      this.m_manager[k] = new MonsterSkillData(_d);
    }
  }

  getData(_id: string) {
    return this.getDataById(_id);
  }
}

export class SkillsPackageData extends BaseData {
  static readonly DATA_SKILLS_LIST = "skills";
  skillsList;

  constructor(_data: any) {
    super(_data);
    if (_data[SkillsPackageData.DATA_SKILLS_LIST] instanceof Array) {
      this.skillsList = _data[SkillsPackageData.DATA_SKILLS_LIST];
    } else if (_data[SkillsPackageData.DATA_SKILLS_LIST] instanceof String) {
      this.skillsList = [_data[SkillsPackageData.DATA_SKILLS_LIST]];
    }
  }
}

export class SkillsPackageManager extends BaseManager {
  static onlyExample: SkillsPackageManager;

  constructor() {
    super();
    SkillsPackageManager.onlyExample = this;
    this.loadData(GlobalData.$_skillPackage_Obj);
  }

  static getOnlyExample() {
    if (SkillsPackageManager.onlyExample == null) {
      SkillsPackageManager.onlyExample = new SkillsPackageManager();
    }
    return SkillsPackageManager.onlyExample;
  }

  loadData(_data: any) {
    for (const k in _data) {
      const _d = _data[k];
      _d[BaseData.DATA_ID] = k;
      this.m_manager[k] = new SkillsPackageData(_data[k]);
    }
  }

  getData(_id: string) {
    return this.getDataById(_id);
  }
}

//export {BaseSkillData, TowerSkillData, MonsterSkillData, SkillsPackageData, SkillManager, SkillsPackageManager}
