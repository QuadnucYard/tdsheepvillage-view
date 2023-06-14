import { BaseDisplayData, BaseManager } from "./BaseData";
import { BuildingData } from "./unit";
import { GameMap } from "../module/map/GameMap";
import { GlobalData } from "../ado/GlobalData";
import { SkillsPackage } from "../module/skill";
import { ColorFilter } from "../utils/ColorFilter";

export class BaseItemData extends BaseDisplayData {
  public static DATA_PRICE = "price";
  public static DATA_UNLOCK_MAP_ID = "unlock_mid";
  public static DATA_COIN = "coin";
  public static DATA_GOLD = "gold";
  public static DATA_SCORE = "invite_score";
  public static DATA_INDEX = "index";
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
    if (this instanceof BuildingData) {
      if (GameMap.currentMap) {
        if (GameMap.currentMap.isDefendMap) {
          if (this.campPrice instanceof Array) {
            return this.campPrice;
          }
        }
      }
    }
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
  public static TYPE_PURE = "typePure";
  public static TYPE_MIX = "typeMix";
  public static DATA_GEM_LEVEL = "gamLevel";
  public static DATA_TOWER_SKILL_PACKAGE = "sp";
  public static DATA_NEXT_LEVEL_ID = "nextId";
  public static DATA_COLOR_INDEX = "color";
  public static SKILL_PACKAGE_ID = "id";
  public static SKILL_PACKAGE_LEVEL = "lv";
  public gemLevel;
  public towerSkillPackage;
  public nextLevelId;
  public colorIndex;

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
