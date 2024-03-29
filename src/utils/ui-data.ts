import _ from "lodash-es";

import { GlobalData } from "@/tdsheep/ado/GlobalData";

import { tr } from "./translate";

export const wolfList = _.sortBy(
  _.map(GlobalData.$_wolfAtt_Obj, (v, k) => ({ id: k, name: v.name, label: `${tr(k)} [${k}]` })),
  "id"
);
export const wolfList1 = wolfList.filter((t) => t.name.startsWith("camp_"));
export const wolfList2 = wolfList.filter((t) => t.id.startsWith("D_"));
export const wolfList0 = _.difference(wolfList, wolfList1, wolfList2);

export const skillTemplates = _.chain(Object.values(GlobalData.$_skillAtt_Obj.towerSkill))
  .groupBy((t) => t.kindId)
  .mapValues((t) => ({ id: t[0].id, params: t[0].params }))
  .value();

export const dreamWaveKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

export const allGameMaps = _.chain(GlobalData.$_map_Obj)
  .map((t, id) => _.extend(t, { id }))
  .toArray()
  .sortBy("index")
  .value();

export const allDreamMaps = _.chain(GlobalData.dream_maps).toArray().sortBy("index").value();

export const allGameMapOptions = allGameMaps.map((t) => ({ label: `${t.id} ${t.name}`, value: t.id }));

export const allDreamMapOptions = allDreamMaps.map((t) => ({ label: `${t.id} ${t.name}`, value: t.id }));

export const allTowerOptions = _.chain(GlobalData.$_towerAtt_Obj)
  .sortBy((t) => Math.abs(t.index))
  .map((t) => ({ label: t.name, value: t.id }))
  .value();

export const allMonsterOptions = _.chain(GlobalData.$_wolfAtt_Obj)
  .map((t) => ({ value: t.id, label: `${tr(t.id)} [${t.id}]` }))
  .sortBy("id")
  .value();

export const allNormalMonsterOptions = _.chain(GlobalData.$_wolfAtt_Obj)
  .filter((t) => t.pop < 99)
  .map((t) => ({ value: t.id, label: `${tr(t.id)} [${t.id}]` }))
  .sortBy("id")
  .value();

export const allBossMonsterOptions = _.chain(GlobalData.$_wolfAtt_Obj)
  .filter((t) => t.pop >= 99)
  .map((t) => ({ value: t.id, label: `${tr(t.id)} [${t.id}]` }))
  .sortBy("id")
  .value();
