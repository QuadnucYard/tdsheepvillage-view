import { BaseUnitData } from "@/tdsheep/command/unit";
import { BaseDisplayModule } from "../BaseModule";
import { BaseSkill, MonsterSkill, SkillsPackage } from "../skill";
import { TowerSkill } from "../skill";
import type { Tower } from "./Tower";
import type { Monster } from "./Monster";

export class BaseUnit extends BaseDisplayModule {
  static readonly SKILL_ID = "skid";
  static readonly SKILL_LEVEL = "lev";
  static readonly STATUS_RATE = 200;
  static readonly STATUS_TIME = BaseUnit.STATUS_RATE / 1000;
  static readonly AOE_SILENCE_RANGE = 1000;
  static readonly AOE_SILENCE_TIME = 2;

  id: string = "";
  skills: { [key: string]: BaseSkill } = {};
  tag;

  constructor() {
    super();
    this.tag = "BaseUnit";
  }

  init() {
    this.initSkills();
    // this.initStatuses();
  }

  initSkills() {}

  get data() {
    return this.m_data as BaseUnitData;
  }
}
