import { GlobalData } from "../ado/GlobalData";
import { BaseData, BaseManager } from "./BaseData";

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
