import * as _ from "lodash-es";

import { GlobalData } from "@/tdsheep/ado/GlobalData";

import { tr } from "./translate";

export const wolfList = _.sortBy(
  _.map(GlobalData.$_wolfAtt_Obj, (v, k) => ({ id: k, name: v.name, label: `${tr(k)} [${k}]` })),
  "id"
);
export const wolfList1 = wolfList.filter((t) => t.name.startsWith("camp_"));
export const wolfList2 = wolfList.filter((t) => t.id.startsWith("D_"));
export const wolfList0 = _.difference(wolfList, wolfList1, wolfList2);

export const skillTemplates = _.mapValues(
  _.groupBy(Object.values(GlobalData.$_skillAtt_Obj.towerSkill), (t) => t.kindId),
  (t) => ({ id: t[0].id, params: t[0].params })
);

export const dreamWaveKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

export const allGameMaps = _.sortBy(_.toArray(_.map(GlobalData.$_map_Obj, (t, id) => _.extend(t, { id }))), "index");

export const allDreamMaps = _.sortBy(Object.values(GlobalData.dream_maps), "index");

export const allGameMapOptions = allGameMaps.map((t) => ({ label: `${t.id} ${t.name}`, value: t.id }));

export const allDreamMapOptions = allDreamMaps.map((t) => ({ label: `${t.id} ${t.name}`, value: t.id }));

export const allTowerOptions = _.sortBy(GlobalData.$_towerAtt_Obj, (t) => Math.abs(t.index)).map((t) => ({
  label: t.name,
  value: t.id,
}));

export const allMonsterOptions = _.sortBy(GlobalData.$_wolfAtt_Obj, "id").map((t) => ({
  value: t.id,
  label: `${tr(t.id)} [${t.id}]`,
}));

export const allNormalMonsterOptions = _.sortBy(GlobalData.$_wolfAtt_Obj, "id")
  .filter((t) => t.pop < 99)
  .map((t) => ({ value: t.id, label: `${tr(t.id)} [${t.id}]` }));

export const allBossMonsterOptions = _.sortBy(GlobalData.$_wolfAtt_Obj, "id")
  .filter((t) => t.pop >= 99)
  .map((t) => ({ value: t.id, label: `${tr(t.id)} [${t.id}]` }));
