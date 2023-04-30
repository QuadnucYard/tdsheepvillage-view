import { GlobalData } from "@/tdsheep/ado/GlobalData.js";
import _ from "lodash-es";

export function generateWave(mid: int, reservation: int[] | null): string[] | null {
  const umap = GlobalData.$_map_Obj[mid];
  let pop = umap.pop_max;
  // console.log(pop);
  const wolfProp: float[] = umap.wolf_proportion.map(t => t[0]);
  const wolfPop: int[] = umap.wolf_proportion.map(t => GlobalData.$_wolfAtt_Obj[t[1]].pop);
  let wolfs: string[] = umap.wolf_proportion.map(t => t[1]);
  let n = wolfPop.length;
  if (n == 0) return [];

  let mlist = <string[]>[]; // 狼组成
  let clist = new Array<int>(n).fill(0); // 各种狼数量
  if (reservation) {
    mlist = reservation.flatMap((t, i) => new Array(t).fill(wolfs[i]));
    clist = reservation;
    reservation.length = wolfPop.length;
    pop -= _(wolfPop)
      .zip(reservation)
      .sumBy(t => t[0]! * t[1]!);
    if (pop < 0) {
      return null;
    }
  }
  console.log(mlist, clist, pop);

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

  return reservation ? _.shuffle(mlist) : mlist;
}
