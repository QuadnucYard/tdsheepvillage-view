import { GlobalDataGetValue } from "../ado/GlobalDataGetValue";

export class BaseData {
  public static DATA_TYPE_ID: string = "typeId";
  public static DATA_KIND_ID: string = "kindId";
  public static DATA_ID: string = "id";
  public static DATA_NAME: string = "name";
  public static DATA_INFO: string = "info";
  public static DATA_HELP: string = "help";
  public typeId: string;
  public kindId: string;
  public id: string;
  public name: string;
  public info: string;
  public help: string;

  constructor(_data: any) {
    this.typeId = _data[BaseData.DATA_TYPE_ID];
    this.kindId = _data[BaseData.DATA_KIND_ID];
    this.id = _data[BaseData.DATA_ID];
    this.name = GlobalDataGetValue.getDataProfileTxt(_data[BaseData.DATA_NAME]);
    this.info = GlobalDataGetValue.getDataProfileTxt(_data[BaseData.DATA_INFO]);
    this.help = _data[BaseData.DATA_HELP]
      ? GlobalDataGetValue.getDataProfileTxt(_data[BaseData.DATA_HELP])
      : "";
  }
}

export class BaseDisplayData extends BaseData {
  public static TYPE_MONSTER = "wolf";
  public static TYPE_TOWER = "tower";
  public static TYPE_WALL = "wall";
  public static TYPE_BARRIER = "barrier";
  public static TYPE_ENTRANCE = "typeEntrance";
  public static TYPE_EXPORT = "typeExport";
  public static TYPE_BOX = "box";
  public static TYPE_GEM_ITEM = "gem";
  public static TYPE_TRAP_ITEM = "snarp";
  public static TYPE_CARD_ITEM = "card";
  public static TYPE_WOLF_CARD_ITEM = "wc";
  public static TYPE_TAME_ITEM = "tame";
  public static TYPE_FIX_ITEM = "bomb";
  public static TYPE_MONSTER_SKILL = "monsterSkill";
  public static ID_SPADE_ITEM = "mc";
  public static ID_GEM_HAMMER = "gem_hammer";
  public static ID_GEM_OPENER = "gem_opener";
  public static DATA_RESOURCE_CLASS = "res";
  public static DATA_RESOURCE_COLOR_CLASS = "resColor";

  public res: string;
  public resColor;

  constructor(_data: any) {
    super(_data);
    if (_data[BaseDisplayData.DATA_RESOURCE_CLASS] == null) {
      this.res = _data[BaseData.DATA_ID];
    } else {
      this.res = _data[BaseDisplayData.DATA_RESOURCE_CLASS];
    }
    this.resColor = _data[BaseDisplayData.DATA_RESOURCE_COLOR_CLASS];
  }
}

export class BaseManager {
  protected m_manager: { [k: string]: any } = {};

  constructor() {
    this.clearData();
  }

  getDataById(_id: string) {
    return this.m_manager[_id];
  }

  get manager() {
    return this.m_manager;
  }

  clearData() {
    this.m_manager = new Object();
  }
}
