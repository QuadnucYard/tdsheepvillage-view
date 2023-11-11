import { GlobalData } from "../../ado/GlobalData";
import { GlobalDataGetValue } from "../../ado/GlobalDataGetValue";
import type { MonsterData } from "../../command/unit";
import { MonsterManager } from "../../command/unit";
import { GameMap } from "../map/GameMap";
import { MonsterSkill } from "../skill";
import { BaseUnit } from "./BaseUnit";

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
  public static readonly WEIGHTILY_SIZE = 487500;
  private static COUNT: int = 0;
  public index: number = 0;
  public m_level: number = 0;
  public exp: number = 0;
  public hp: number = 0;
  public hpMax: number = 0;
  public hpRate: number;
  public skillList: MonsterSkill[] = [];

  constructor(_dataId: any, _level = 1, _difficulty = 1, _exp = 0) {
    super();
    this.tag = "Monster";
    this.updateData(_dataId);
    this.hpRate = _difficulty;
    this.updateLevelExp(_level, _exp);
    this.index = Monster.COUNT++;
  }

  updateData(_dataId: any) {
    if (_dataId == "") {
      _dataId = "dahuil";
    }
    let _index = _dataId.indexOf("|");
    if (_index != -1) {
      _dataId = _dataId.slice(0, _index);
    }
    this.m_data = MonsterManager.getOnlyExample().getData(_dataId);
    if (this.m_data == null) {
      this.m_data = MonsterManager.getOnlyExample().getData("dahuil");
    }
  }

  createSkills(_skills: any[]) {
    return _skills.map(_sk =>
      new MonsterSkill(_sk[BaseUnit.SKILL_ID], _sk[BaseUnit.SKILL_LEVEL], this).getSubClasses()
    );
  }

  override initSkills() {
    this.skills = {};
    const _skills = this.data.skills;
    if (_skills != null) {
      this.skillList = this.createSkills(_skills);
      for (const _skill of this.skillList) {
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

  get allSkillsScore() {
    let _allSkillsScore = 1;
    for (const _skill of this.skillList) {
      if (_skill.enabled) _allSkillsScore *= this.getSkillScore(_skill.data.id, _skill.level);
    }
    return _allSkillsScore;
  }

  getSkillScore(_skillId: string, _skillLevel: number): number {
    let _grade = null;
    let _powerObj = GlobalData.$_skill_grade_score as { [k: string]: { [k: string]: number } };
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
    // if (this.isTame) {
    return GlobalData.$_camp_wolf_lv_max;
    // }
    // return Number.MAX_SAFE_INTEGER;
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

  get skillInfo() {
    if (this.skills == null) {
      return "";
    }
    const _skillList = Object.values(this.skills);
    _skillList.sort((a, b) => a.index - b.index);
    return _skillList.map(t => t.skillInfo).join("");
  }
}
