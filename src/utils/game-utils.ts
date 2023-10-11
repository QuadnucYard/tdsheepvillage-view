import { GlobalData, MapId, MonsterId } from "@/tdsheep/ado/GlobalData";
import _ from "lodash-es";

export function getPop(wid: MonsterId, bossAs?: int): int {
  const pop = GlobalData.$_wolfAtt_Obj[wid].pop;
  return pop < 99 ? pop : bossAs ?? pop;
}

export function generateWave(
  mid: MapId,
  reservation: int[] | null
): [string[], [string, int][]] | null {
  const umap = GlobalData.$_map_Obj[mid];
  const wp = umap.wolf_proportion as [number, MonsterId][];
  let pop = umap.pop_max;
  // console.log(pop);
  const wolfProp = wp.map(t => t[0]);
  const wolfPop = wp.map(t => getPop(t[1]));
  let wolfs = wp.map(t => t[1]);
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
      .sumBy(t => t[0]! * t[1]!)
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
      k = _.findIndex(wolfProp, t => p < t);
    } while (pop < wolfPop[k]);
    pop -= wolfPop[k];
    mlist.push(wolfs[k]);
    clist[k]++;
  }

  return [reservation ? _.shuffle(mlist) : mlist, _.zip(wolfs, clist) as [string, int][]];
}
