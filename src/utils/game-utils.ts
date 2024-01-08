import _ from "lodash-es";
import * as math from "mathjs";

import { GlobalData, MapId, MonsterId } from "@/tdsheep/ado/GlobalData";

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

export function generateWave(mid: MapId, reservation: int[] | null): [string[], [string, int][]] | null {
  const umap = GlobalData.$_map_Obj[mid];
  const wp = umap.wolf_proportion as [number, MonsterId][];
  let pop = umap.pop_max;
  // console.log(pop);
  const wolfProp = wp.map((t) => t[0]);
  const wolfPop = wp.map((t) => getPop(t[1]));
  let wolfs = wp.map((t) => t[1]);
  let n = wolfPop.length;
  if (n == 0) return [[], []];

  let mlist: string[] = []; // 狼组成
  let clist = new Array<int>(n).fill(0); // 各种狼数量
  if (reservation) {
    mlist = reservation.flatMap((t, i) => new Array(t).fill(wolfs[i]));
    clist = reservation;
    reservation.length = wolfPop.length;
    pop -= _.chain(wolfPop)
      .zip(reservation)
      .sumBy((t) => t[0]! * t[1]!)
      .value();
    if (pop < 0) {
      return null;
    }
  }
  // console.log(mlist, clist, pop);

  while (pop > 0) {
    while (n > 0 && pop < wolfPop[n - 1]) n--;
    if (n == 0) break;
    let k: int;
    do {
      const p = Math.random() * wolfProp[n - 1];
      k = _.findIndex(wolfProp, (t) => p < t);
    } while (pop < wolfPop[k]);
    pop -= wolfPop[k];
    mlist.push(wolfs[k]);
    clist[k]++;
  }

  return [reservation ? _.shuffle(mlist) : mlist, _.zip(wolfs, clist) as [string, int][]];
}

export function proportionToWeight(prop: float[]) {
  const weights = prop.map((t) => t * 1000);
  const g = math.gcd(...weights);
  for (let i = weights.length - 1; i >= 0; i--) {
    weights[i] = (weights[i] - (i == 0 ? 0 : weights[i - 1])) / g;
  }
  return weights;
}

export function weightToProportion(weights: float[]) {
  const accWeight: int[] = [];
  for (const weight of weights) {
    accWeight.push(accWeight.length == 0 ? weight : accWeight.at(-1)! + weight);
  }
  const sumWeight = accWeight.at(-1)!;
  return accWeight.map((t) => t / sumWeight);
}
