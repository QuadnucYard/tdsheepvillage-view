import { GlobalString } from "../../ado/GlobalString";
import { BaseUnit } from "./BaseUnit";
import { BuildingData } from "@/tdsheep/command/unit";

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

  initBuilding() {}

  get skillInfo() {
    let k = undefined;
    let i = 0;
    let _skill = null;
    let _info = null;
    let _skillInfo = "";
    if (this.skills == null) {
      return _skillInfo;
    }
    let _skillList = [];
    for (k in this.skills) {
      _skillList.push(this.skills[k]);
    }
    _skillList.sort(
      (a: any, b: any) => a[GlobalString.DATA_KEY_INDEX] - b[GlobalString.DATA_KEY_INDEX]
    );
    for (i = 0; i < _skillList.length; i++) {
      _skill = _skillList[i];
      _info = _skill.skillInfo;
      if (_info != "") {
        if (_skillInfo != "") {
          _skillInfo += "\n";
        }
        _skillInfo += _info;
      }
    }
    if (_skillInfo == "") {
      _skillInfo = this.buildingData.info;
    }
    return _skillInfo;
  }
}
