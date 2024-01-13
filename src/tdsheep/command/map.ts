import { GlobalData } from "../ado/GlobalData";
import { BaseDisplayData } from "./BaseData";
import { BaseManager } from "./BaseData";
import { BaseData } from "./BaseData";

export class GameMapData extends BaseDisplayData {
  public static readonly DEFAULT_SCORE_MAX = 100;
  public static readonly DEFAULT_POPULATION_MAX = 10;
  public static readonly RULE_MULTICAST = 1;
  public static readonly DATA_SCORE_MAX = "pass_score";
  public static readonly DATA_POPULATION_MAX = "pop_max";
  public static readonly DATA_HARD_A = "yield_val";
  public static readonly DATA_HARD_B = "hard_ness";
  public static readonly DATA_PASS_BY = "passBy";
  public static readonly DATA_UNKENNEL_RATE = "interval";
  public static readonly DATA_UNKENNEL_RULE = "interval_rule";
  public static readonly DATA_BOSS_LIST = "boss";
  public static readonly DATA_MONSTER_LIST = "wolf_proportion";
  public static readonly DATA_TELEPORT_RULE = "teleport_rule";
  public static readonly DATA_DEBUG = "debug";

  public scoreMax: number;
  public populationMax: number;
  public hardA: number;
  public hardB: number;
  public passBy: string;
  public unkennelDelay: number;
  public unkennelRule: number;
  public bossList: string[];
  public monsterList: string[];
  public monsterProportion: [number, string][];
  public teleportRule: number;
  public randomBossList: [number, string, string, any][];

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
    this.monsterProportion = _data[GameMapData.DATA_MONSTER_LIST];
    this.teleportRule = _data[GameMapData.DATA_TELEPORT_RULE];
    this.randomBossList = _data["random_boss"] ?? [];
  }

  public getDifficultyLevel(_score: number) {
    return Math.sqrt(this.hardA + this.hardB * _score);
  }

  public calcPKGold(_level: float) {
    const p = this.populationMax;
    return Math.round((2 + 1.07 * p) * Math.pow(_level / 0.39, 2 / 3));
  }

  public calcPKExp(_level: float) {
    const p = this.populationMax;
    return Math.round((3.5 + 0.14 * p) * Math.pow(_level / 0.39, 2 / 3));
  }

  public calcAccumulative() {
    let gold = 0;
    let exp = 0;
    for (let i = 0; i <= this.scoreMax; i += 2) {
      let _level = this.getDifficultyLevel(i);
      gold += this.calcPKGold(_level);
      exp += this.calcPKExp(_level);
    }
    return { gold, exp };
  }
}

export class GameMapManager extends BaseManager {
  static readonly DATA_COUNT = 6;
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
  static readonly UNKENNEL_RULE_RANDOM = -1;
  static readonly UNKENNEL_RULE_SAME_TIME = 0;
  static readonly UNKENNEL_RULE_FOLLOWED = 1;
  static readonly RETURN_TAG_NO = 0;
  static readonly RETURN_TAG_IN = 1;
  static readonly RETURN_TAG_OUT = 2;
  static readonly DENSITY_DIFFICULTY = 0.25;
  static readonly SOLO_DIFFICULTY = 0.25;
  static readonly DATA_MONSTER_LIST = "data";
  static readonly DATA_DIFFICULTY = "hard_ness";
  static readonly DATA_GIFT = "gift";
  static readonly DATA_UNKENNEL_DENSITY = "density";
  static readonly DATA_UNKENNEL_SOLO = "solo";
  static readonly DATA_UNKENNEL_RETURN = "return";
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
