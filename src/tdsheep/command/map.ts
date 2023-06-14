import { BaseDisplayData } from "./BaseData";
import { BaseManager } from "./BaseData";
import { GlobalData } from "../ado/GlobalData";
import { BaseData } from "./BaseData";

export class GameMapData extends BaseDisplayData {
  public static DEFAULT_SCORE_MAX = 100;
  public static DEFAULT_POPULATION_MAX = 10;
  public static RULE_MULTICAST = 1;
  public static DATA_SCORE_MAX = "pass_score";
  public static DATA_POPULATION_MAX = "pop_max";
  public static DATA_HARD_A = "yield_val";
  public static DATA_HARD_B = "hard_ness";
  public static DATA_PASS_BY = "passBy";
  public static DATA_UNKENNEL_RATE = "interval";
  public static DATA_UNKENNEL_RULE = "interval_rule";
  public static DATA_BOSS_LIST = "boss";
  public static DATA_MONSTER_LIST = "wolf_proportion";
  public static DATA_TELEPORT_RULE = "teleport_rule";
  public static DATA_DEBUG = "debug";

  public scoreMax: number;
  public populationMax: number;
  public hardA: number;
  public hardB: number;
  public passBy: string;
  public unkennelDelay: number;
  public unkennelRule: number;
  public bossList: string[];
  public monsterList: string[];
  public teleportRule: number;

  constructor(_data: any) {
    super(_data);

    this.scoreMax = _data[GameMapData.DATA_SCORE_MAX]
      ? _data[GameMapData.DATA_SCORE_MAX]
      : GameMapData.DEFAULT_SCORE_MAX;
    this.populationMax = _data[GameMapData.DATA_POPULATION_MAX]
      ? _data[GameMapData.DATA_POPULATION_MAX]
      : GameMapData.DEFAULT_POPULATION_MAX;
    this.hardA = _data[GameMapData.DATA_HARD_A];
    this.hardB = _data[GameMapData.DATA_HARD_B];
    this.passBy = _data[GameMapData.DATA_PASS_BY];
    this.unkennelDelay = _data[GameMapData.DATA_UNKENNEL_RATE];
    this.unkennelRule = _data[GameMapData.DATA_UNKENNEL_RULE];
    this.bossList = _data[GameMapData.DATA_BOSS_LIST];
    this.monsterList = _data[GameMapData.DATA_MONSTER_LIST]
      ? _data[GameMapData.DATA_MONSTER_LIST].map((t: any) => t[1])
      : [];
    this.teleportRule = _data[GameMapData.DATA_TELEPORT_RULE];
  }

  getDifficultyLevel(_score: number) {
    return Math.sqrt(this.hardA + this.hardB * _score);
  }
}

export class GameMapManager extends BaseManager {
  static DATA_COUNT = 6;
  static onlyExample: GameMapManager;

  constructor() {
    super();
    GameMapManager.onlyExample = this;
    this.loadData(GlobalData.$_map_Obj);
  }

  static getOnlyExample() {
    if (GameMapManager.onlyExample == null) {
      GameMapManager.onlyExample = new GameMapManager();
    }
    return GameMapManager.onlyExample;
  }

  loadData(_data: any) {
    for (const k in _data) {
      const _d = _data[k];
      _d[BaseData.DATA_ID] = k;
      this.m_manager[k] = new GameMapData(_data[k]);
    }
  }

  getData(_id: string) {
    return this.getDataById(_id) as GameMapData;
  }
}

export class WaveData {
  static UNKENNEL_RULE_RANDOM = -1;
  static UNKENNEL_RULE_SAME_TIME = 0;
  static UNKENNEL_RULE_FOLLOWED = 1;
  static RETURN_TAG_NO = 0;
  static RETURN_TAG_IN = 1;
  static RETURN_TAG_OUT = 2;
  static DENSITY_DIFFICULTY = 0.25;
  static SOLO_DIFFICULTY = 0.25;
  static DATA_MONSTER_LIST = "data";
  static DATA_DIFFICULTY = "hard_ness";
  static DATA_GIFT = "gift";
  static DATA_UNKENNEL_DENSITY = "density";
  static DATA_UNKENNEL_SOLO = "solo";
  static DATA_UNKENNEL_RETURN = "return";
  monsterList: any;
  difficulty: number;
  gift: any;
  unkennelDensity: number;
  unkennelSolo: number;
  unkennelReturn: number;
  tameList: any;

  constructor(_data: any) {
    if (_data instanceof Array) {
      this.tameList = _data;
    }
    this.monsterList = _data[WaveData.DATA_MONSTER_LIST];
    if (_data[WaveData.DATA_DIFFICULTY]) {
      this.difficulty = _data[WaveData.DATA_DIFFICULTY];
    } else {
      this.difficulty = 1;
    }
    this.gift = _data[WaveData.DATA_GIFT];
    this.unkennelDensity = 1;
    this.unkennelSolo = -1;
    this.unkennelReturn = 0;
  }

  get densityDifficulty() {
    return 1 / Math.pow(this.unkennelDensity, WaveData.DENSITY_DIFFICULTY);
  }

  get isSolo() {
    if (this.unkennelSolo < 0) {
      return false;
    }
    return true;
  }

  get isReturn() {
    if (this.unkennelReturn == 0) {
      return false;
    }
    return true;
  }

  get difficultyScore() {
    let _num = Math.floor((this.difficulty - 0.75) / 0.2);
    return 1 + _num;
  }

  get isTame() {
    return this.tameList instanceof Array;
  }
}
