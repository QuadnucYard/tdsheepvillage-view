import { GlobalData } from "../ado/GlobalData";
import { SkillsPackage } from "../module/skill-package";
import { ColorFilter } from "../utils/ColorFilter";
import { BaseDisplayData, BaseManager } from "./BaseData";

export class BaseItemData extends BaseDisplayData {
  public static readonly DATA_PRICE = "price";
  public static readonly DATA_UNLOCK_MAP_ID = "unlock_mid";
  public static readonly DATA_COIN = "coin";
  public static readonly DATA_GOLD = "gold";
  public static readonly DATA_SCORE = "invite_score";
  public static readonly DATA_INDEX = "index";
  public m_price: [string, number];
  public priceCoin = 0;
  public priceGold = 0;
  public priceScore = 0;
  public unlockMapId = "";
  public index = 0;

  constructor(_data: any) {
    super(_data);
    this.m_price = _data[BaseItemData.DATA_PRICE];
    this.initPrice();
    this.unlockMapId = _data[BaseItemData.DATA_UNLOCK_MAP_ID];
    this.index = _data[BaseItemData.DATA_INDEX];
  }

  get price(): [string, number] {
    return this.m_price;
  }

  initPrice() {
    let _price = this.price;
    if (!_price) {
      return;
    }
    if (_price instanceof Array) {
      const _priceArr = _price;
      if (_priceArr[0] == BaseItemData.DATA_COIN) {
        this.priceCoin = _priceArr[1];
      } else if (_priceArr[0] == BaseItemData.DATA_GOLD) {
        this.priceGold = _priceArr[1];
      } else if (_priceArr[0] == BaseItemData.DATA_SCORE) {
        this.priceScore = _priceArr[1];
      }
    } else {
      this.priceCoin = _price[BaseItemData.DATA_COIN];
      this.priceGold = _price[BaseItemData.DATA_GOLD];
      this.priceScore = _price[BaseItemData.DATA_SCORE];
    }
  }

  get isRare() {
    if (this.priceCoin > 0) {
      if (this.priceCoin >= GlobalData.$_rare_item_coin) {
        return true;
      }
      if (this.index < 0) {
        return true;
      }
    } else if (this.priceScore > 0) {
      if (this.priceScore >= GlobalData.$_rare_item_invite_score) {
        return true;
      }
      if (this.index < 0) {
        return true;
      }
    }
    return false;
  }
}

export class GemData extends BaseItemData {
  public static readonly TYPE_PURE = "typePure";
  public static readonly TYPE_MIX = "typeMix";
  public static readonly DATA_GEM_LEVEL = "gamLevel";
  public static readonly DATA_TOWER_SKILL_PACKAGE = "sp";
  public static readonly DATA_NEXT_LEVEL_ID = "nextId";
  public static readonly DATA_COLOR_INDEX = "color";
  public static readonly SKILL_PACKAGE_ID = "id";
  public static readonly SKILL_PACKAGE_LEVEL = "lv";
  public gemLevel: int;
  public towerSkillPackage: any;
  public nextLevelId: string;
  public colorIndex: int;

  constructor(_data: any) {
    super(_data);
    this.typeId = BaseDisplayData.TYPE_GEM_ITEM;
    this.gemLevel = _data[GemData.DATA_GEM_LEVEL];
    this.towerSkillPackage = _data[GemData.DATA_TOWER_SKILL_PACKAGE];
    this.nextLevelId = _data[GemData.DATA_NEXT_LEVEL_ID];
    this.colorIndex = _data[GemData.DATA_COLOR_INDEX];
    this.res = this.resString;
  }

  getSkillPackage(_towerDataId: string) {
    if (this.towerSkillPackage == null) {
      return null;
    }
    let _regExp = /\D/gi;
    _towerDataId = _towerDataId.match(_regExp)!.join("");
    let _spObj = this.towerSkillPackage[_towerDataId];
    if (_spObj == null) {
      return null;
    }
    return new SkillsPackage(_spObj[GemData.SKILL_PACKAGE_ID], _spObj[GemData.SKILL_PACKAGE_LEVEL]);
  }

  get color() {
    return ColorFilter.COLOR_LIST[this.colorIndex];
  }

  get resString() {
    return "hong" + this.gemLevel;
  }
}

export class GemManager extends BaseManager {
  static onlyExample: GemManager;

  constructor() {
    super();
    GemManager.onlyExample = this;
    this.loadData(GlobalData.$_global_properties[BaseDisplayData.TYPE_GEM_ITEM]);
  }

  static getOnlyExample() {
    if (GemManager.onlyExample == null) {
      GemManager.onlyExample = new GemManager();
    }
    return GemManager.onlyExample;
  }

  loadData(_data: any) {
    let k = undefined;
    for (k in _data) {
      this.m_manager[k] = new GemData(_data[k]);
    }
  }

  initData() {}

  getData(_id: string) {
    return this.getDataById(_id);
  }
}
