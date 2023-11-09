import { GlobalData } from "@/tdsheep/ado/GlobalData";
import _ from "lodash-es";
import { tr } from "./translate";

export const wolfList = _.sortBy(
  _.map(GlobalData.$_wolfAtt_Obj, (v, k) => ({ id: k, name: v.name, label: `${tr(k)} [${k}]` })),
  "id"
);
export const wolfList1 = wolfList.filter(t => t.name.startsWith("camp_"));
export const wolfList2 = wolfList.filter(t => t.id.startsWith("D_"));
export const wolfList0 = _.difference(wolfList, wolfList1, wolfList2);
