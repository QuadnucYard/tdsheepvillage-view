import { SkillsPackageData, SkillsPackageManager } from "../command/skill-package";
import { BaseModule } from "./BaseModule";

export class SkillsPackage extends BaseModule {
  public level: number;

  constructor(_dataId: string, _level = 1) {
    super();
    this.m_data = SkillsPackageManager.getOnlyExample().getData(_dataId);
    this.level = _level;
  }

  get skillsPackageData() {
    return this.m_data as SkillsPackageData;
  }
}
