import * as _ from "lodash-es";
import * as math from "mathjs";

import { GlobalData, MonsterId } from "@/tdsheep/ado/GlobalData";
import { GameMapData } from "@/tdsheep/command/map";
import { MonsterData, MonsterManager } from "@/tdsheep/command/unit";

import { zeros } from ".";

export function getPop(wid: MonsterId, bossAs?: int): int {
  const pop = GlobalData.$_wolfAtt_Obj[wid].pop;
  return pop < 99 ? pop : bossAs ?? pop;
}

export function getTotalPop(wolfs: MonsterId[], bossAs: int = 1): int {
  return _.sumBy(wolfs, (t: MonsterId) => getPop(t, bossAs));
}

export function calcPKGold(level: float, pop: int) {
  return Math.round((2 + 1.07 * pop) * Math.pow(level / 0.39, 2 / 3));
}

export function calcPKExp(level: float, pop: int) {
  return Math.round((3.5 + 0.14 * pop) * Math.pow(level / 0.39, 2 / 3));
}

export function calcDreamExp(score: float, pop: int) {
  const _opt = GlobalData.dream_data.dm_opt_cfg.tower_sum_exp;
  return Math.round(pop * Math.pow(score, _opt.power) * _opt.popu + _opt.p);
}

export function generateWave(
  mapData: GameMapData,
  reservation: readonly int[]
): { mlist: MonsterData[]; clist: { data: MonsterData; num: int }[] } | null {
  const candidates = mapData.monsterProportion.map((t) => ({
    prop: t[0],
    data: MonsterManager.get(t[1]),
  }));

  let n = candidates.length;
  if (n == 0) return { mlist: [], clist: [] };

  const clist = reservation.slice(0, n); // 各种狼数量
  const mlist = clist.flatMap((t, i) => new Array<MonsterData>(t).fill(candidates[i].data)); // 狼组成
  let pop = mapData.populationMax - _.sumBy(mlist, (t) => t.population);

  if (pop < 0) return null;

  while (pop > 0) {
    while (n > 0 && pop < candidates[n - 1].data.population) n--;
    if (n == 0) break;
    const p = Math.random() * candidates[n - 1].prop;
    const k = _.findIndex(candidates, (t) => p < t.prop);

    pop -= candidates[k].data.population;
    mlist.push(candidates[k].data);
    clist[k]++;
  }

  return {
    mlist: _.shuffle(mlist),
    clist: _.zip(candidates, clist).map((t) => ({ data: t[0]!.data, num: t[1]! })),
  };
}

export function proportionToWeight(prop: readonly float[]) {
  if (prop.length == 0) return [];
  const weights = prop.map((t) => t * 1000);
  const g = math.gcd(...weights);
  for (let i = weights.length - 1; i >= 0; i--) {
    weights[i] = (weights[i] - (i == 0 ? 0 : weights[i - 1])) / g;
  }
  return weights;
}

export function weightToProportion(weights: readonly float[]) {
  const accWeight: int[] = [];
  for (const weight of weights) {
    accWeight.push(accWeight.length == 0 ? weight : accWeight.at(-1)! + weight);
  }
  const sumWeight = accWeight.at(-1)!;
  return accWeight.map((t) => t / sumWeight);
}

export type WaveComposition = {
  all: number[];
  each: number[][];
};

export function calcWaveComposition(mapData: GameMapData): WaveComposition {
  const n = mapData.monsterProportion.length;
  const prob = mapData.monsterProportion.map((t, i) => t[0] - (i == 0 ? 0 : mapData.monsterProportion[i - 1][0]));
  const wolfPop = mapData.monsterList.map((t) => getPop(t as MonsterId));
  // 初始化某pop的proportion总量
  const pop = mapData.populationMax;
  const one = zeros(pop + 1);
  for (let i = 0; i <= pop; i++) {
    for (let j = 0; j < n; j++) {
      if (wolfPop[j] <= i) {
        one[i] += prob[j];
      }
    }
  }

  // 先计算整体分布
  // f[i][j]：pop为i，数量为j
  const f = zeros(pop + 1, pop + 1);
  f[0][0] = 1;

  for (let i = 1; i <= pop; i++) {
    //枚举当前pop
    for (let j = 1; j <= pop; j++) {
      // 枚举要求的狼的数量
      for (let k = 0; k < n; k++) {
        // 枚举狼
        if (i >= wolfPop[k]) {
          f[i][j] += f[i - wolfPop[k]][j - 1] * (prob[k] / one[i]);
        }
      }
    }
  }
  const M = f[pop].findLastIndex((t) => t > 1e-6);
  const g0 = [...f[pop].slice(0, M + 1)];

  // 计算每种狼的分布
  const g: number[][] = [];
  for (let I = 0; I < n; I++) {
    const m = Math.min(M, Math.floor(pop / wolfPop[I]));
    for (let i = 0; i <= pop; i++) f[i].fill(0);
    f[0][0] = 1;

    for (let i = 1; i <= pop; i++) {
      //枚举当前pop
      for (let j = 0; j <= m; j++) {
        // 枚举要求的狼的数量
        for (let k = 0; k < n; k++) {
          // 枚举狼
          if (i < wolfPop[k]) continue;
          if (k != I) {
            f[i][j] += f[i - wolfPop[k]][j] * (prob[k] / one[i]);
          } else if (j > 0) {
            f[i][j] += f[i - wolfPop[k]][j - 1] * (prob[k] / one[i]);
          }
        }
      }
    }
    g.push([...f[pop].slice(0, m + 1)]);
  }
  return { all: g0, each: g };
}
