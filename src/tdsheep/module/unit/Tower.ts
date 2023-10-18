import { TowerData, TowerManager, TrapData, WallData } from "../../command/unit";
import { GlobalData } from "../../ado/GlobalData.js";
import { BaseBuilding } from "./BaseBuilding";
import { GlobalDataGetValue } from "../../ado/GlobalDataGetValue.js";
import {
  TowerSkill,
  SkillsPackage,
  AttackRateSkill,
  ChangeBulletSkill,
  ChangeDamageSkill,
  ChangeRangeSkill,
  ChangeRateSkill,
} from "../skill";
import { TowerSkillData } from "../../command/skill";
import { Bullet } from "./Bullet";
import { formatHtml } from "@/utils/format";
import { GemItem } from "../item";

export class Tower extends BaseBuilding {
  public static TOWER = "tower";
  public static GEM = "gem";
  public static LEVEL_BUBBLE = "levelBubble";
  public static RES_LEVEL_SECTION = 5;
  public static LEVEL_NAME = GlobalDataGetValue.getLanguageStr(2003);
  public static STATUS_READY = "statusReady";
  public static FRAME_REST = "rest";
  public static FRAME_READY = "ready";
  public static FRAME_FIRE = "fire";
  public m_level: number = 0;
  public gem: GemItem | null = null;
  public m_attackType: string = "";

  constructor(_dataId: any) {
    super();
    this.tag = "Tower";
    this.m_data = TowerManager.getOnlyExample().getData(_dataId);
    this.initTower();
    this.level = 1;
  }

  get towerData() {
    return this.m_data as TowerData;
  }

  initTower() {
    this.initSkills();
    this.initStatuses();
    this.initBuilding();
  }

  initSkills() {
    let _sp = null;
    let _skill = null;
    let k = undefined;
    let _landform = null;
    this.skills = {};
    if (this.towerData.skillPackageId != "") {
      _sp = new SkillsPackage(this.towerData.skillPackageId, this.towerData.skillPackageLevel);
      if (_sp != null && _sp.skillsPackageData != null) {
        for (k of _sp.skillsPackageData.skillsList) {
          _skill = new TowerSkill(k, _sp.level, this).getSubClasses();
          this.skills[_skill.data.kindId] = _skill;
        }
      }
    }
    if (this.gem) {
      _sp = this.gem.gemData.getSkillPackage(this.data.id);
      if (_sp != null && _sp.skillsPackageData != null) {
        for (k of _sp.skillsPackageData.skillsList) {
          _skill = new TowerSkill(k, _sp.level, this).getSubClasses();
          this.skills[_skill.data.kindId] = _skill;
        }
      }
      if (this.skills[TowerSkillData.KIND_SCATTER_ATTACK]) {
        delete this.skills[TowerSkillData.KIND_DIVIDED_ATTACK];
      }
    }
    this.updateAttackType();
  }

  get color() {
    if (this.gem != null) {
      return this.gem.gemData.color;
    }
    return 6316128;
  }

  get level() {
    return this.m_level;
  }
  set level(_level) {
    this.m_level = _level;
  }

  get gemLevel() {
    return this.gem ? this.gem.gemData.gemLevel : 0;
  }

  get ability() {
    var _gemLevel = this.gemLevel;
    if (this.towerData.isMagicTower) {
      if (_gemLevel == 0) {
        return 0;
      }
      return this.m_level * (0.8 + _gemLevel / 5) * 2;
    }
    return this.m_level * (1 + _gemLevel / 10);
  }

  get power() {
    let _level = this.level;
    let _paramList = GlobalData.$_tower_worth_factor;
    let _gemLevel = this.gemLevel;
    let _valueCost = this.valueCostConst(_level);
    return Math.round(
      (_valueCost + Math.pow(_gemLevel, _paramList[0]) * _paramList[1]) *
        (_paramList[2] + _gemLevel / _paramList[3])
    );
  }

  buildValue(_level = -1) {
    if (_level == -1) _level = this.level;
    return Math.floor(
      this.towerData.buildValueA +
        this.towerData.buildValueB * _level +
        this.towerData.buildValueC * _level * _level
    );
  }

  buildCost(_level = -1) {
    if (_level == -1) _level = this.level;
    return Math.floor(
      this.towerData.buildCostA +
        this.towerData.buildCostB * _level +
        this.towerData.buildCostC * _level * _level
    );
  }

  valueCost(_level = -1) {
    if (_level == -1) _level = this.level;
    let _value =
      _level * this.towerData.buildCostA +
      ((_level * _level + _level) / 2) * this.towerData.buildCostB +
      ((_level * _level * _level + (_level * _level * 3) / 2 + _level / 2) / 3) *
        this.towerData.buildCostC +
      this.towerData.buildCost -
      this.towerData.buildCostA -
      this.towerData.buildCostB -
      this.towerData.buildCostC;
    return Math.round(_value);
  }

  valueCostConst(_level = -1) {
    if (_level == -1) _level = this.level;
    let _value =
      _level * this.towerData.buildCostAConst +
      ((_level * _level + _level) / 2) * this.towerData.buildCostBConst +
      ((_level * _level * _level + (_level * _level * 3) / 2 + _level / 2) / 3) *
        this.towerData.buildCostCConst +
      this.towerData.buildCostConst -
      this.towerData.buildCostAConst -
      this.towerData.buildCostBConst -
      this.towerData.buildCostCConst;
    return Math.round(_value);
  }

  buffEffect(_level = -1) {
    if (_level == -1) _level = this.level;
    return this.towerData.buffEffect * _level + 1;
  }

  damage(_level = -1) {
    let _damage = 0;
    if (_level == -1) {
      _level = this.level;
    }
    if (this.skills[TowerSkillData.KIND_CHANGE_DAMAGE] instanceof ChangeDamageSkill) {
      let _cds = this.skills[TowerSkillData.KIND_CHANGE_DAMAGE] as ChangeDamageSkill;
      if (_cds.isChangeBase()) {
        _damage = Math.round(
          (_cds.damageA + _cds.damageB * _level + _cds.damageC * _level * _level) *
            _cds.damageRate +
            _cds.damageAdd
        );
      } else {
        _damage = Math.round(
          (this.towerData.damageA +
            this.towerData.damageB * _level +
            this.towerData.damageC * _level * _level) *
            _cds.damageRate +
            _cds.damageAdd
        );
      }
    } else {
      _damage = Math.round(
        this.towerData.damageA +
          this.towerData.damageB * _level +
          this.towerData.damageC * _level * _level
      );
    }
    // _damage = Math.ceil(_damage * this.statuses[WallData.KIND_DAMAGE]);
    return Math.max(_damage, 0);
  }

  get range() {
    let _range = 0;
    if (this.skills[TowerSkillData.KIND_CHANGE_RANGE] instanceof ChangeRangeSkill) {
      let _crs = this.skills[TowerSkillData.KIND_CHANGE_RANGE] as ChangeRangeSkill;
      if (_crs.isChangeBase()) {
        _range = _crs.range * _crs.rangeRate + _crs.rangeAdd;
      } else {
        _range = this.towerData.range * _crs.rangeRate + _crs.rangeAdd;
      }
    } else {
      _range = this.towerData.range;
    }
    /* if (_range > 0) {
      _range = Math.ceil(_range * this.statuses[WallData.KIND_RANGE]);
    } else {
      _range = Math.floor(_range * this.statuses[WallData.KIND_RANGE]);
    } */
    return _range;
  }

  get rate() {
    let _rate = 0;
    if (this.skills[TowerSkillData.KIND_CHANGE_RATE] instanceof ChangeRateSkill) {
      let _crs = this.skills[TowerSkillData.KIND_CHANGE_RATE] as ChangeRateSkill;
      if (_crs.isChangeBase()) {
        _rate = Math.round(_crs.rate * _crs.rateRate);
      } else {
        _rate = Math.round(this.towerData.rate * _crs.rateRate);
      }
    } else {
      _rate = this.towerData.rate;
    }
    // _rate = Math.ceil(_rate * this.statuses[WallData.KIND_RATE]);
    return _rate;
  }

  setGem(_gem: GemItem) {
    this.gem = _gem;
    this.initSkills();
  }

  updateAttackType() {
    let _attackRateSkill = null;
    this.m_attackType = TrapData.EFFECT_TYPE_ALL;
    if (this.getBulletId() == "bullet100") {
      this.m_attackType = TrapData.EFFECT_TYPE_LIGHTNING;
    } else if (this.skills[TowerSkillData.KIND_ATTACK_RATE] instanceof AttackRateSkill) {
      _attackRateSkill = this.skills[TowerSkillData.KIND_ATTACK_RATE] as AttackRateSkill;
      if (_attackRateSkill.airRate <= 0) {
        this.m_attackType = TrapData.EFFECT_TYPE_FLOOR;
      } else if (_attackRateSkill.floorRate <= 0) {
        this.m_attackType = TrapData.EFFECT_TYPE_AIR;
      }
    }
    return this.m_attackType;
  }

  newBullet() {
    return new Bullet(this.getBulletId());
  }

  getBulletId() {
    let _changeBulletSkill = null;
    if (this.skills[TowerSkillData.KIND_CHANGE_BULLET] instanceof ChangeBulletSkill) {
      _changeBulletSkill = this.skills[TowerSkillData.KIND_CHANGE_BULLET] as ChangeBulletSkill;
      return _changeBulletSkill.bulletId;
    }
    return this.towerData.bulletId;
  }

  getInfoHtml() {
    return formatHtml(this.skillInfo, this.color, false, "14px");
  }
}