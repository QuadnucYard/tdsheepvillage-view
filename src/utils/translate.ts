import * as _ from "lodash-es";

import { GlobalData } from "@/tdsheep/ado/GlobalData";

const extractNames = (obj: any) =>
  _.mapValues(obj, (v) => {
    const _name: string = v["name"];
    return _name.includes("^") ? _name.substring(_name.indexOf("^") + 1) : _name;
  });

const dict = Object.assign(
  {},
  extractNames(GlobalData.$_map_Obj),
  extractNames(GlobalData.$_wolfAtt_Obj),
  extractNames(GlobalData.$_towerAtt_Obj),
  ...Object.values(GlobalData.$_global_properties).map((v) => extractNames(v))
);

console.log("dict", dict);

export function tr(_id: string): string;
export function tr(_id: string[]): string[];
export function tr(_id: string | string[]) {
  if (typeof _id === "string") {
    return dict[_id];
  } else {
    return _id.map((s) => dict[s]);
  }
}
