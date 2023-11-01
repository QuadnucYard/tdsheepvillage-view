import { BaseUnit } from "./BaseUnit";
import { GlobalData } from "../../ado/GlobalData.js";
import { GlobalDataGetValue } from "../../ado/GlobalDataGetValue.js";
import { MonsterData, MonsterManager } from "../../command/unit";
import { GameMap } from "../map/GameMap";
import { GlobalString } from "../../ado/GlobalString.js";
import { MonsterSkill } from "../skill";

export class Monster extends BaseUnit {
  static readonly MONSTER_SAY_ARRAY = [
    GlobalDataGetValue.getLanguageStr(1250),
    GlobalDataGetValue.getLanguageStr(1251),
    GlobalDataGetValue.getLanguageStr(1252),
    GlobalDataGetValue.getLanguageStr(1253),
    GlobalDataGetValue.getLanguageStr(1254),
    GlobalDataGetValue.getLanguageStr(1255),
    GlobalDataGetValue.getLanguageStr(1256),
    GlobalDataGetValue.getLanguageStr(1257),
    GlobalDataGetValue.getLanguageStr(1258),
    GlobalDataGetValue.getLanguageStr(1259),
  ];
  public static readonly MONSTER = "monster";
  public static readonly FRAME_NAME_DEAD = "dead";
  public static readonly STATUS_MOVE = "statusMove";
  public static readonly RES_AIMING = "aiming";
  public static readonly PATH_PATH = "pathPath";
  public static readonly PHOTO_WIDTH = 66;
  public static readonly PHOTO_HEIGHT = 64;
  public static readonly PHOTO_ROUND = 50;
  public static readonly PHOTO_SIZE = 800;
  public static readonly WEIGHTILY_SIZE = 487500;
  public static readonly CARD_RATIO = 2;
  public static readonly CARD_WIDTH = 32;
  public static readonly CARD_HEIGHT = 40;
  public static readonly CARD_ROUND = 10;
  public static readonly CARD_SIZE = 400;
  public static readonly CARD_ROTATION = -10;
  public static readonly ICON_RATIO = 1.5;
  public static readonly ICON_WIDTH = 44;
  public static readonly ICON_HEIGHT = 44;
  public static readonly ICON_ROUND = 20;
  public static readonly ICON_SIZE = 400;
  public static readonly ICON_ROTATION = -10;
  public static readonly PATH_NUM = 5;
  public static readonly PATH_RATE = 0.01;
  public static readonly RE_FIND_PATH_STEP = 2500;
  public index: number = 0;
  public keyId: string = "";
  public m_level: number = 0;
  public exp: number = 0;
  public hp: number = 0;
  public hpMax: number = 0;
  public hpRate: number;
  public dowerSkills: any[] | null = null;
  public learnSkills: any[] | null = null;

  constructor(
    _dataId: any,
    _level = 1,
    _difficulty = 1,
    _exp = 0,
    _dowerSkills: any[] | null = null,
    _learnSkills: any[] | null = null
  ) {
    super();
    this.tag = "Monster";
    if (_dataId == "") {
      _dataId = "dahuil";
    }
    let _index = _dataId.indexOf("|");
    if (_index != -1) {
      this.keyId = _dataId;
      _dataId = _dataId.slice(0, _index);
    }
    this.m_data = MonsterManager.getOnlyExample().getData(_dataId);
    if (this.m_data == null) {
      this.m_data = MonsterManager.getOnlyExample().getData("dahuil");
    }
    this.hpRate = _difficulty;
    this.updateLevelExp(_level, _exp);
    this.updateSkills(_dowerSkills, _learnSkills);
  }

  static newMonster(_dataObj: any) {
    let _wolf = null;
    if (_dataObj) {
      _wolf = new Monster(
        _dataObj["wids"],
        _dataObj["level"],
        1,
        _dataObj["experience"],
        _dataObj["init_skills"],
        _dataObj["skills"]
      );
    }
    return _wolf;
  }

  override initSkills() {
    this.skills = {};
    const _skills = this.getAllSkills() ?? this.data.skills;
    if (_skills != null) {
      for (const _sk of _skills) {
        const _skill = new MonsterSkill(
          _sk[BaseUnit.SKILL_ID],
          _sk[BaseUnit.SKILL_LEVEL],
          this
        ).getSubClasses();
        this.skills[_skill.data.kindId] = _skill;
      }
    }
  }

  conflictSkillList(_newSkill: MonsterSkill) {
    const _kindNameList = [];
    if (_newSkill == null) {
      return [];
    }
    const _conflict = GlobalData.$_conflict_skill_kind;
    const _newSkillKindId = _newSkill.data.kindId;
    if (this.skills[_newSkillKindId]) {
      _kindNameList.push(MonsterSkill.getKindName(_newSkillKindId));
    }
    for (const _conflictList of _conflict) {
      if (_conflictList.indexOf(_newSkillKindId) != -1) {
        for (let j = 0; j < _conflictList.length; j++) {
          if (_newSkillKindId != _conflictList[j]) {
            if (this.skills[_conflictList[j]]) {
              _kindNameList.push(MonsterSkill.getKindName(_conflictList[j]));
            }
          }
        }
      }
    }
    return _kindNameList;
  }

  getSkillById(_skillId: string) {
    let k = undefined;
    let _skill = null;
    for (k in this.skills) {
      _skill = this.skills[k];
      if (_skill.data.id == _skillId) {
        return _skill;
      }
    }
    return null;
  }

  updateLevelExp(_level = 0, _exp = 0) {
    this.level = _level;
    this.exp = _exp;
  }

  updateSkills(_dowerSkills: any[] | null = null, _learnSkills: any[] | null = null) {
    this.dowerSkills = _dowerSkills;
    this.learnSkills = _learnSkills;
    if (this.isTame) {
      this.initSkills();
    }
  }

  getAllSkills(_dowerSkills: any[] | null = null, _learnSkills: any[] | null = null) {
    let _allSkills = [];
    if (!_dowerSkills) {
      _dowerSkills = this.dowerSkills;
    }
    if (!_learnSkills) {
      _learnSkills = this.learnSkills;
    }
    if (this.isTame && _dowerSkills && _learnSkills) {
      for (let i = 0; i < _dowerSkills.length; i++) {
        _allSkills.push(_dowerSkills[i]);
      }
      for (let i = 0; i < _learnSkills.length; i++) {
        _allSkills.push(_learnSkills[i]);
      }
    } else {
      _allSkills = this.monsterData.skills;
    }
    return _allSkills;
  }

  get allSkillsScore() {
    let i = 0;
    let _allSkillsScore = 1;
    let _allSkills = this.getAllSkills();
    for (i = 0; i < _allSkills.length; i++) {
      _allSkillsScore *= this.getSkillScore(
        _allSkills[i][BaseUnit.SKILL_ID],
        _allSkills[i][BaseUnit.SKILL_LEVEL]
      );
    }
    return _allSkillsScore;
  }

  getSkillScore(_skillId: string, _skillLevel: number): number {
    let _grade = null;
    let _powerObj = GlobalData.$_skill_grade_score;
    let _index = _skillId.indexOf("_");
    if (_skillId.indexOf("_") == -1) {
      return 1;
    }
    _grade = _skillId.slice(_index + 1, _skillId.length);
    if (_powerObj[_grade]) {
      if (_powerObj[_grade][String(_skillLevel)]) {
        return _powerObj[_grade][String(_skillLevel)];
      }
    }
    return 1;
  }

  get levelMax() {
    if (this.isTame) {
      return GlobalData.$_camp_wolf_lv_max;
    }
    return Number.MAX_SAFE_INTEGER;
  }

  get expMax() {
    let _level = this.m_level + 1;
    return Math.round(
      this.monsterData.expMaxA +
        this.monsterData.expMaxB * _level +
        this.monsterData.expMaxC * _level * _level +
        this.monsterData.expMaxD * _level * _level * _level
    );
  }

  get level() {
    return this.m_level;
  }

  set level(_level) {
    this.m_level = Math.max(Math.min(_level, this.levelMax), 0);
    if (GameMap.currentMap && GameMap.currentMap) {
      this.hpMax = Math.floor(
        (this.monsterData.hpMaxA +
          this.monsterData.hpMaxB * this.m_level +
          this.monsterData.hpMaxC * this.m_level * this.m_level) *
          this.hpRate
      );
    }
    if (this.hpMax <= 1) {
      this.hpMax = 1;
    }
  }

  refreshLevel() {
    this.hpMax = Math.floor(
      (this.monsterData.hpMaxA +
        this.monsterData.hpMaxB * this.m_level +
        this.monsterData.hpMaxC * this.m_level * this.m_level) *
        this.hpRate *
        1
    );
    if (this.hpMax <= 1) {
      this.hpMax = 1;
    }
  }

  get monsterData() {
    return this.m_data as MonsterData;
  }

  get power() {
    let _paramList = GlobalData.$_wolf_worth_factor;
    let _hpMax = this.hpMax;
    let _speed = this.monsterData.speedBase;
    let _skillPower = this.allSkillsScore;
    return Math.round(_hpMax * _speed * _skillPower * _paramList[2]);
  }

  initMonsterSkills() {
    if (!this.isTame) {
      this.initSkills();
    }
  }

  initMonster() {
    this.initMonsterSkills();
    // this.initStatuses();
  }

  get skillInfo() {
    if (this.skills == null) {
      return "";
    }
    const _skillList = Object.values(this.skills);
    _skillList.sort(
      (a: any, b: any) => a[GlobalString.DATA_KEY_INDEX] - b[GlobalString.DATA_KEY_INDEX]
    );
    return _skillList.map(t => t.skillInfo).join("");
  }

  get isTame() {
    if (this.dowerSkills || this.learnSkills) {
      return true;
    }
    return false;
  }
}
