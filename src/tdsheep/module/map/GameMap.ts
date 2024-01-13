import { GameMapManager } from "../../command/map";
import type { GameMapData } from "../../command/map";
import { BaseModule } from "../BaseModule";

export class GameMap extends BaseModule {
  static readonly DEFEND_MAP_1 = "mfx1";
  static readonly ENDLESS_MAP_1 = "m11";
  static currentMap: GameMap;

  score: number = 0;
  isDream: boolean = false;
  isDefendMap: boolean = false;

  constructor(_dataId: string, _initMap = true) {
    super();
    this.m_data = GameMapManager.getOnlyExample().getData(_dataId);
  }

  static getMapData(_mid: string): GameMapData {
    return GameMapManager.getOnlyExample().getData(_mid);
  }

  get gameMapData() {
    return this.m_data as GameMapData;
  }

  get canUnkennelAdjust() {
    /* if (this.wave && !this.isDefendMap && !this.isDream && !this.isRandomBoss && !this.isBoss) {
      return true;
    } */
    return false;
  }

  /*
  get scoreMax() {
    if (this.isEndlessMap) {
      return this.gameMapData.scoreMax * this.award;
    }
    return this.gameMapData.scoreMax;
  }

  get isEndlessMap() {
    if (this.gameMapData.id == GameMap.ENDLESS_MAP_1) {
      return true;
    }
    return false;
  }

  get isDefendMap() {
    if (this.gameMapData.id == GameMap.DEFEND_MAP_1) {
      return true;
    }
    return false;
  }
  */
}
