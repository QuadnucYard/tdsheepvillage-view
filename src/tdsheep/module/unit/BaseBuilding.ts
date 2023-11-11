import { BaseUnit } from "./BaseUnit";
import type { BuildingData } from "@/tdsheep/command/unit";

export class BaseBuilding extends BaseUnit {
  constructor() {
    super();
  }

  get buildingData() {
    return this.m_data as BuildingData;
  }

  get range() {
    return this.buildingData.range;
  }

  get skillInfo() {
    const _skillList = Object.values(this.skills);
    _skillList.sort((a, b) => a.index - b.index);
    const _skillInfo = _skillList
      .map(_skill => _skill.skillInfo)
      .filter(_info => _info != "")
      .join("\n");
    if (_skillInfo == "") {
      return this.buildingData.info;
    }
    return _skillInfo;
  }
}
