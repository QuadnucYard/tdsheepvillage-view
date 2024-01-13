import { GlobalData } from "../ado/GlobalData";
import { GameMap } from "../module/map/GameMap";
import { BaseData, BaseDisplayData, BaseManager } from "./BaseData";
import { BaseItemData } from "./item";

export class BaseUnitData extends BaseItemData {
  static readonly DATA_A = "a";
  static readonly DATA_B = "b";
  static readonly DATA_C = "c";
  static readonly DATA_D = "d";
  static readonly DATA_SKILL_PACKAGE_ID = "skill";
  static readonly DATA_SKILL_PACKAGE_LEVEL = "skillLv";
  static readonly DATA_SKILLS = "skills";
  static readonly DATA_X_GRID = "x_grid";
  static readonly DATA_Y_GRID = "y_grid";
  skillPackageId;
  skillPackageLevel;
  skills;
  xGrid;
  yGrid;

  constructor(_data: any) {
    super(_data);
    this.skillPackageId = _data[BaseUnitData.DATA_SKILL_PACKAGE_ID];
    this.skillPackageLevel = _data[BaseUnitData.DATA_SKILL_PACKAGE_LEVEL];
    if (_data[BaseUnitData.DATA_SKILLS] instanceof Array) {
      this.skills = _data[BaseUnitData.DATA_SKILLS];
    } else if (_data[BaseUnitData.DATA_SKILLS] instanceof Object) {
      this.skills = [];
      for (const k in _data[BaseUnitData.DATA_SKILLS]) {
        this.skills.push({
          skid: k,
          lev: _data[BaseUnitData.DATA_SKILLS][k],
        });
      }
    }
    if (_data[BaseUnitData.DATA_X_GRID]) {
      this.xGrid = _data[BaseUnitData.DATA_X_GRID];
    } else {
      this.xGrid = 1;
    }
    if (_data[BaseUnitData.DATA_Y_GRID]) {
      this.yGrid = _data[BaseUnitData.DATA_Y_GRID];
    } else {
      this.yGrid = 1;
    }
  }
}

export class BuildingData extends BaseUnitData {
  public static readonly DATA_BUILD_VALUE = "build_val";
  public static readonly DATA_EXP_VALUE = "exp_val";
  public static readonly DATA_CAMP_PRICE = "camp_price";
  public static readonly DATA_CAMP_BUILD_VALUE = "camp_build_val";
  public static readonly DATA_RANGE = "range";
  public static readonly DATA_RATE = "rate";
  public static readonly DATA_LIMIT_NUM = "limit_num";
  public m_buildValueA: number = 0;
  public m_buildValueB: number = 0;
  public m_buildValueC: number = 0;
  public m_campPrice: [string, number] = ["", 0];
  public m_campBuildValueA: number = 0;
  public m_campBuildValueB: number = 0;
  public m_campBuildValueC: number = 0;
  public range: number;
  public rate: number;
  public limitNum: number;

  constructor(_data: any) {
    super(_data);
    if (_data[BuildingData.DATA_BUILD_VALUE]) {
      this.m_buildValueA = _data[BuildingData.DATA_BUILD_VALUE][BaseUnitData.DATA_A];
      this.m_buildValueB = _data[BuildingData.DATA_BUILD_VALUE][BaseUnitData.DATA_B];
      this.m_buildValueC = _data[BuildingData.DATA_BUILD_VALUE][BaseUnitData.DATA_C];
    } else if (_data[BuildingData.DATA_EXP_VALUE]) {
      this.m_buildValueA = _data[BuildingData.DATA_EXP_VALUE][BaseUnitData.DATA_A];
      this.m_buildValueB = _data[BuildingData.DATA_EXP_VALUE][BaseUnitData.DATA_B];
      this.m_buildValueC = _data[BuildingData.DATA_EXP_VALUE][BaseUnitData.DATA_C];
    }
    if (_data[BuildingData.DATA_CAMP_PRICE]) {
      this.m_campPrice = _data[BuildingData.DATA_CAMP_PRICE];
    }
    if (_data[BuildingData.DATA_CAMP_BUILD_VALUE]) {
      this.m_campBuildValueA = _data[BuildingData.DATA_CAMP_BUILD_VALUE][BaseUnitData.DATA_A];
      this.m_campBuildValueB = _data[BuildingData.DATA_CAMP_BUILD_VALUE][BaseUnitData.DATA_B];
      this.m_campBuildValueC = _data[BuildingData.DATA_CAMP_BUILD_VALUE][BaseUnitData.DATA_C];
    }
    this.range = _data[BuildingData.DATA_RANGE];
    this.rate = Math.round(_data[BuildingData.DATA_RATE] * 10);
    this.limitNum = _data[BuildingData.DATA_LIMIT_NUM];
  }

  get buildValueA() {
    if (GameMap.currentMap) {
      if (GameMap.currentMap.isDefendMap) {
        return this.m_campBuildValueA;
      }
    }
    return this.m_buildValueA;
  }

  get buildValueB() {
    if (GameMap.currentMap) {
      if (GameMap.currentMap.isDefendMap) {
        return this.m_campBuildValueB;
      }
    }
    return this.m_buildValueB;
  }

  get buildValueC() {
    if (GameMap.currentMap) {
      if (GameMap.currentMap.isDefendMap) {
        return this.m_campBuildValueC;
      }
    }
    return this.m_buildValueC;
  }

  override get price(): [string, number] {
    if (GameMap.currentMap?.isDefendMap) {
      if (this.campPrice instanceof Array) {
        return this.campPrice;
      }
    }
    return this.m_price;
  }

  get campPrice() {
    return this.m_campPrice;
  }

  get buildCostPrice() {
    return this.price[0];
  }

  get buildCost() {
    return this.price[1];
  }

  get buildValueAConst() {
    return this.m_buildValueA;
  }

  get buildValueBConst() {
    return this.m_buildValueB;
  }

  get buildValueCConst() {
    return this.m_buildValueC;
  }

  get buildCostPriceConst() {
    return this.m_price[0];
  }

  get buildCostConst() {
    return this.m_price[1];
  }
}

export class TrapData extends BuildingData {
  public static readonly KIND_BLAST = "1";
  public static readonly KIND_DAMAGE = "2";
  public static readonly KIND_VERTIGO = "3";
  public static readonly KIND_SLOW = "4";
  public static readonly KIND_BEAT_BACK = "5";
  public static readonly KIND_COLD_BULLET = "50";
  public static readonly KIND_BULLET = "100";
  public static readonly KIND_BULLET_RANDOM = "101";
  public static readonly EFFECT_TYPE_FLOOR = "1";
  public static readonly EFFECT_TYPE_AIR = "2";
  public static readonly EFFECT_TYPE_ALL = "3";
  public static readonly EFFECT_TYPE_LIGHTNING = "4";
  public static readonly EFFECT_KIND_SINGLE = "1";
  public static readonly EFFECT_KIND_MULTI = "2";
  public static readonly DATA_VALUE_LIST = "value";
  public static readonly DATA_EFFECT_TYPE = "effectType";
  public static readonly DATA_EFFECT_KIND = "effectKind";
  public static readonly DATA_EFFECT_RANGE = "effectRange";
  public static readonly DATA_USE_NUM = "use_times";
  public static readonly DATA_COLDDOWN = "colddown";
  public static readonly DATA_DELAY = "delay";
  public static readonly DATA_EFFECT = "effect";
  public valueList: any[];
  public effectType: string;
  public effectKind: string;
  public effectRange: number;
  public useNum: number;
  public colddown: number;
  public delay: number;
  public attackEffectId: string;

  constructor(_data: any) {
    super(_data);
    this.typeId = BaseDisplayData.TYPE_TRAP_ITEM;
    this.valueList = _data[TrapData.DATA_VALUE_LIST];
    this.effectType = _data[TrapData.DATA_EFFECT_TYPE];
    this.effectKind = _data[TrapData.DATA_EFFECT_KIND];
    if (_data[TrapData.DATA_USE_NUM]) {
      this.useNum = _data[TrapData.DATA_USE_NUM];
    } else {
      this.useNum = 1;
    }
    if (_data[TrapData.DATA_COLDDOWN]) {
      this.colddown = _data[TrapData.DATA_COLDDOWN];
    } else {
      this.colddown = 0.1;
    }
    if (_data[TrapData.DATA_DELAY]) {
      this.delay = _data[TrapData.DATA_DELAY];
    } else {
      this.delay = 0;
    }
    if (_data[TrapData.DATA_EFFECT_RANGE]) {
      this.effectRange = _data[TrapData.DATA_EFFECT_RANGE];
    } else {
      this.effectRange = this.range;
    }
    this.attackEffectId = _data[TrapData.DATA_EFFECT];
  }
}

export class TowerData extends BuildingData {
  public m_buildCostA: number;
  public m_buildCostB: number;
  public m_buildCostC: number;
  public m_campBuildCostA: number;
  public m_campBuildCostB: number;
  public m_campBuildCostC: number;
  public damageA: number;
  public damageB: number;
  public damageC: number;
  public bulletId: string = "";
  public buffEffect: number;
  public levelMax: number;

  constructor(_data: any) {
    super(_data);
    this.m_buildCostA = _data["build_cost"]["a"];
    this.m_buildCostB = _data["build_cost"]["b"];
    this.m_buildCostC = _data["build_cost"]["c"];
    this.m_campBuildCostA = _data["camp_build_cost"]["a"];
    this.m_campBuildCostB = _data["camp_build_cost"]["b"];
    this.m_campBuildCostC = _data["camp_build_cost"]["c"];
    this.damageA = _data["damage"]["a"];
    this.damageB = _data["damage"]["b"];
    this.damageC = _data["damage"]["c"];
    this.buffEffect = _data["buffEffect"];
    this.levelMax = _data["lev_max"];
    this.bulletId = _data["bId"];
  }

  get buildCostA() {
    return GameMap.currentMap?.isDefendMap ? this.m_campBuildCostA : this.m_buildCostA;
  }
  get buildCostB() {
    return GameMap.currentMap?.isDefendMap ? this.m_campBuildCostB : this.m_buildCostB;
  }
  get buildCostC() {
    return GameMap.currentMap?.isDefendMap ? this.m_campBuildCostC : this.m_buildCostC;
  }
  get buildCostAConst() {
    return this.m_buildCostA;
  }
  get buildCostBConst() {
    return this.m_buildCostB;
  }
  get buildCostCConst() {
    return this.m_buildCostC;
  }

  get buildCostPriceConst() {
    return this.m_price[0];
  }

  get buildCostConst() {
    return this.m_price[1];
  }

  get isMagicTower() {
    return this.id == "xiangqianta";
  }
}

export class TowerManager extends BaseManager {
  static onlyExample: TowerManager;

  constructor() {
    super();
    TowerManager.onlyExample = this;
    this.loadData(GlobalData.$_towerAtt_Obj);
  }

  static getOnlyExample() {
    if (TowerManager.onlyExample == null) {
      TowerManager.onlyExample = new TowerManager();
    }
    return TowerManager.onlyExample;
  }

  loadData(_data: any) {
    for (const k in _data) {
      const _d = _data[k];
      _d[BaseData.DATA_ID] = k;
      this.m_manager[k] = new TowerData(_data[k]);
    }
  }

  getData(_id: string) {
    return this.getDataById(_id) as TowerData;
  }
}

export class WallData extends BuildingData {
  public static readonly KIND_DAMAGE = "damage";
  public static readonly KIND_RATE = "rate";
  public static readonly KIND_RANGE = "range";
  public static readonly DATA_VALUE_LIST = "value";
  public valueList: any[];

  constructor(_data: any) {
    super(_data);
    this.typeId = BaseDisplayData.TYPE_WALL;
    this.valueList = _data[WallData.DATA_VALUE_LIST];
  }
}

export class BulletData extends BaseUnitData {
  public static readonly SHAPE_COMMON = 0;
  public static readonly SHAPE_DIRECTION = 1;
  public static readonly SHAPE_ROLL = 2;
  public static readonly DAMAGE_NULL = 0;
  public static readonly DAMAGE_COMMON = 1;
  public static readonly DAMAGE_PERFORATIVE = 2;
  public static readonly DAMAGE_MAGICAL = 3;
  public static readonly DAMAGE_SIEGE = 4;
  public static readonly DAMAGE_MIXED = 5;
  public static readonly FALL_ACC_SPEED_THRESHOLD = -7;
  public static readonly DATA_SHAPE_MODE = "shapeMode";
  public static readonly DATA_DAMAGE_MODE = "damageMode";
  public static readonly DATA_RADII = "radii";
  public static readonly DATA_SHADOW = "shadow";
  public static readonly DATA_FALL_ACC_SPEED = "fallAcc";
  public static readonly DATA_FLOOR_PATH_ID = "path";
  public static readonly DATA_HIT_EFFECT_ID = "effect";
  public shapeMode: number;
  public damageMode: number;
  public radii: number;
  public shadow: number;
  public fallAccSpeed: number;
  public floorPathId: string;
  public hitEffectId: string;

  constructor(_data: any) {
    super(_data);
    this.shapeMode = _data[BulletData.DATA_SHAPE_MODE];
    this.damageMode = _data[BulletData.DATA_DAMAGE_MODE];
    this.radii = _data[BulletData.DATA_RADII];
    if (_data[BulletData.DATA_SHADOW]) {
      this.shadow = _data[BulletData.DATA_SHADOW];
    } else {
      this.shadow = 1;
    }
    this.fallAccSpeed = _data[BulletData.DATA_FALL_ACC_SPEED];
    this.floorPathId = _data[BulletData.DATA_FLOOR_PATH_ID];
    this.hitEffectId = _data[BulletData.DATA_HIT_EFFECT_ID];
  }
}

export class BulletManager extends BaseManager {
  static onlyExample: BulletManager;

  constructor() {
    super();
    BulletManager.onlyExample = this;
    this.loadData(GlobalData.$_bulletAtt_Obj);
  }

  static getOnlyExample() {
    if (BulletManager.onlyExample == null) {
      BulletManager.onlyExample = new BulletManager();
    }
    return BulletManager.onlyExample;
  }

  loadData(_data: any) {
    for (const k in _data) {
      const _d = _data[k];
      _d[BaseData.DATA_ID] = k;
      this.m_manager[k] = new BulletData(_data[k]);
    }
  }

  getData(_id: string) {
    return this.getDataById(_id) as BulletData;
  }
}

export class MonsterData extends BaseUnitData {
  public static readonly SPEAK_ENTER = 0;
  public static readonly SPEAK_IDLE = 1;
  public static readonly SPEAK_INJURY = 2;
  public static readonly SPEAK_DIE = 3;
  public static readonly SPEAK_INVADE = 4;
  public static readonly SPEAK_CAST = 5;
  public static readonly DEFENSE_NULL = 0;
  public static readonly DEFENSE_LIGHT = 1;
  public static readonly DEFENSE_COMMON = 2;
  public static readonly DEFENSE_HEAVY = 3;
  public static readonly DEFENSE_BUILDING = 4;
  public static readonly DEFENSE_BOSS = 5;
  public static readonly DEFENSE_HOLY = 6;
  public static readonly DEFENSE_INVINCIBLE = 7;
  public static readonly DATA_HP_MAX = "hp_factor";
  public static readonly DATA_EXP_MAX = "explev";
  public static readonly DATA_HP_MAX_A = "ha";
  public static readonly DATA_HP_MAX_B = "hb";
  public static readonly DATA_HP_MAX_C = "hc";
  public static readonly DATA_SPEED_BASE = "speed";
  public static readonly DATA_CHARM = "charm";
  public static readonly DATA_HEIGHT = "height";
  public static readonly DATA_WIDTH = "width";
  public static readonly DATA_SPEAK_LIST = "speak";
  public static readonly DATA_POPULATION = "pop";
  public hpMaxA: number;
  public hpMaxB: number;
  public hpMaxC: number;
  public expMaxA: number = 0;
  public expMaxB: number = 0;
  public expMaxC: number = 0;
  public expMaxD: number = 0;
  public speedBase: number;
  public charm: number;
  public height: number;
  public width: number;
  public speakList: string[] | string[][] = [];
  public population: number;

  constructor(_data: any) {
    super(_data);
    if (_data[MonsterData.DATA_HP_MAX]) {
      this.hpMaxA = _data[MonsterData.DATA_HP_MAX][BaseUnitData.DATA_A];
      this.hpMaxB = _data[MonsterData.DATA_HP_MAX][BaseUnitData.DATA_B];
      this.hpMaxC = _data[MonsterData.DATA_HP_MAX][BaseUnitData.DATA_C];
    } else {
      this.hpMaxA = _data[MonsterData.DATA_HP_MAX_A];
      this.hpMaxB = _data[MonsterData.DATA_HP_MAX_B];
      this.hpMaxC = _data[MonsterData.DATA_HP_MAX_C];
    }
    if (_data[MonsterData.DATA_EXP_MAX]) {
      this.expMaxA = _data[MonsterData.DATA_EXP_MAX][BaseUnitData.DATA_A];
      this.expMaxB = _data[MonsterData.DATA_EXP_MAX][BaseUnitData.DATA_B];
      this.expMaxC = _data[MonsterData.DATA_EXP_MAX][BaseUnitData.DATA_C];
      this.expMaxD = _data[MonsterData.DATA_EXP_MAX][BaseUnitData.DATA_D];
    }
    this.speedBase = _data[MonsterData.DATA_SPEED_BASE];
    this.charm = _data[MonsterData.DATA_CHARM];
    this.height = _data[MonsterData.DATA_HEIGHT];
    this.width = _data[MonsterData.DATA_WIDTH];
    if (_data[MonsterData.DATA_SPEAK_LIST] instanceof Array) {
      this.speakList = _data[MonsterData.DATA_SPEAK_LIST];
    }
    this.population = _data[MonsterData.DATA_POPULATION];
  }

  getSpeak(_period = 0) {
    if (this.speakList instanceof Array) {
      if (this.speakList.length > _period) {
        if (this.speakList[_period] instanceof String) {
          return this.speakList[_period];
        }
        if (this.speakList[_period] instanceof Array) {
          const _arr = this.speakList[_period];
          return _arr[Math.floor(Math.random() * _arr.length)];
        }
      }
    }
    return "";
  }

  getSpeakEnter() {
    return this.getSpeak(MonsterData.SPEAK_ENTER);
  }

  getSpeakIdle() {
    return this.getSpeak(MonsterData.SPEAK_IDLE);
  }

  getSpeakInjury() {
    return this.getSpeak(MonsterData.SPEAK_INJURY);
  }

  getSpeakDie() {
    return this.getSpeak(MonsterData.SPEAK_DIE);
  }

  getSpeakInvade() {
    return this.getSpeak(MonsterData.SPEAK_INVADE);
  }

  getSpeakCast() {
    return this.getSpeak(MonsterData.SPEAK_CAST);
  }

  get isBoss() {
    if (this.population >= 100) {
      return true;
    }
    return false;
  }

  get isRandomBoss() {
    if (this.population == 99) {
      return true;
    }
    return false;
  }

  getHpMax(_level: number, _hpRate = 1.0) {
    return Math.floor((this.hpMaxA + _level * (this.hpMaxB + _level * this.hpMaxC)) * _hpRate);
  }
}

export class MonsterManager extends BaseManager {
  static onlyExample: MonsterManager;

  constructor() {
    super();
    MonsterManager.onlyExample = this;
    this.loadData(GlobalData.$_wolfAtt_Obj);
  }

  static getOnlyExample() {
    if (MonsterManager.onlyExample == null) {
      MonsterManager.onlyExample = new MonsterManager();
    }
    return MonsterManager.onlyExample;
  }

  loadData(_data: any) {
    for (const k in _data) {
      const _d = _data[k];
      _d[BaseData.DATA_ID] = k;
      this.m_manager[k] = new MonsterData(_d);
    }
  }

  getBossList(_monsterList: string[]) {
    const _bossList: string[] = [];
    if (!(_monsterList instanceof Array)) {
      return _bossList;
    }
    for (let i = 0; i < _monsterList.length; i++) {
      const _monsterData = this.getData(_monsterList[i]);
      if (_monsterData) {
        if (_monsterData.isBoss) {
          _bossList.push(_monsterList[i]);
        }
      }
    }
    return _bossList;
  }

  getRandomBossList(_monsterList: string[]) {
    const _bossList: string[] = [];
    if (!(_monsterList instanceof Array)) {
      return _bossList;
    }
    for (let i = 0; i < _monsterList.length; i++) {
      const _monsterData = this.getData(_monsterList[i]);
      if (_monsterData) {
        if (_monsterData.isRandomBoss) {
          _bossList.push(_monsterList[i]);
        }
      }
    }
    return _bossList;
  }

  getData(_id: string) {
    return this.getDataById(_id) as MonsterData;
  }

  static get(_id: string) {
    return this.getOnlyExample().getData(_id);
  }
}
