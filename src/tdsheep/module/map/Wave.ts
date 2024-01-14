import { GlobalData } from "@/tdsheep/ado/GlobalData";
import { Tools } from "@/tdsheep/utils/Tools";

import type { WaveData } from "../../command/map";
import { Monster } from "../unit/Monster";
import { GameMap } from "./GameMap";

export class Wave {
  waveData: WaveData;

  constructor(data: WaveData) {
    this.waveData = data;
  }

  generate(_monsterList: string[]) {
    return _monsterList.map((t) => new Monster(t, this.difficultyLevel, this.difficultyValue));
  }

  get difficultyDream() {
    return Tools.getValueByIndex(GameMap.currentMap.score, GlobalData.$_dream_wolf_hard_ness);
  }

  get difficultyValue() {
    let _value = this.waveData.difficulty;
    if (GameMap.currentMap.isDream) {
      _value *= this.difficultyDream;
    }
    if (GameMap.currentMap.canUnkennelAdjust) {
      _value *= this.waveData.densityDifficulty;
    }
    return _value;
  }

  get difficultyLevel() {
    const _gameMap = GameMap.currentMap;
    return Math.sqrt(_gameMap.gameMapData.hardA + _gameMap.gameMapData.hardB * _gameMap.score);
  }

  get difficultyColor() {
    if (this.waveData.difficulty < 0.9) {
      return 5263440;
    }
    if (this.waveData.difficulty < 1) {
      return 5273640;
    }
    if (this.waveData.difficulty < 1.1) {
      return 5283840;
    }
    if (this.waveData.difficulty < 1.2) {
      return 7895040;
    }
    if (this.waveData.difficulty < 1.3) {
      return 10506240;
    }
    return 13117440;
  }
}
