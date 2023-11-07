import lang from "@/assets/string_cn.xml?raw";
import data from "@/assets/sys_config.json";
import ddata from "@/assets/dream_config.json";
import dwaves from "@/assets/dream_waves.json";
import { compareNumber, isAlpha } from "@/utils";
import _ from "lodash-es";
import X2JS from "x2js";

interface IEntity {
  type: string;
  id: string;
}

function addObjAttribute_type_id<T extends object>(_obj: T) {
  return _.mapValues(_obj, (t, i) => addObjAttribute_type_id_one(t as any, i)) as {
    [P in keyof T]: { [Q in keyof T[P]]: T[P][Q] & IEntity };
  };
}

function addObjAttribute_type_id_one<T extends object>(_obj: T, _type: string) {
  return _.mapValues(_obj, (t, i) => add_type_id(t, _type, i)) as {
    [P in keyof T]: T[P] & IEntity;
  };
}

function add_type_id<T>(_obj: T, _type: string, _id: string): T & IEntity {
  return { ..._obj, type: _type, id: _id };
}

export const GlobalData = (function () {
  const x2js = new X2JS();
  let _pvp = data["camp_system_simple"];

  const parseMapId = (s: string) => parseInt(/(?<=m).+(?=[A-Z]*)/.exec(isAlpha(s[s.length - 1]) ? s : s + "A")![0], 36);
  const sortedIds = Object.keys(data.umaps).sort((k1, k2) =>
    compareNumber(parseMapId(k1), parseMapId(k2))
  ) as (keyof typeof data.umaps)[];

  const buildings = addObjAttribute_type_id(data.building);
  const skills = addObjAttribute_type_id(data.skill);
  const globalData = {
    $_global_language_str: x2js.xml2dom(lang),
    $_global_properties: addObjAttribute_type_id(data.properties),
    $_skillAtt_Obj: skills,
    $_skillPackage_Obj: data.skill_package,
    $_map_Obj: data.umaps,
    $_towerAtt_Obj: buildings.tower,
    $_bulletAtt_Obj: data.bullet,
    $_wolfAtt_Obj: addObjAttribute_type_id_one(data.wolfs, "wolf"),
    $_wallAtt_Obj: buildings.wall,
    $_barrierAtt_Obj: data.barrier,
    $_level_up_gift: data.level_up_gift,
    $_pass_map_gift: data.pass_map_gift,
    $Maps: data["version_ctrl"]["Maps"],
    $_wolfs_unlock_lv: _pvp["camp_wolf_lv_max_factor"],
    $_wolfs_unlock_gold: _pvp["camp_wolf_gold_max_factor"],
    $_camp_hold_time: _pvp["hold_time"],
    $_camp_pk_cd_time: _pvp["pk_cd_time"],
    $_camp_pk_times_max: _pvp["pk_times_max"],
    $_camp_defend_times_max: _pvp["defend_times_max"],
    $_camp_pk_arena_times_max: _pvp["pk_arena_times_max"],
    $_camp_defend_arena_times_max: _pvp["defend_arena_times_max"],
    $_camp_mining_rate: _pvp["mine_rate"],
    $_camp_sell_building_dis: _pvp["sell_building_dis"],
    $_tower_worth_factor: _pvp["tower_worth_factor"],
    $_wolf_worth_factor: _pvp["wolf_worth_factor"],
    $_defend_map_snarp_max: _pvp["defend_map_snarp_max"],
    $_defend_succ_factor: _pvp["defend_succ_factor"],
    $_defend_failed_factor: _pvp["defend_failed_factor"],
    $_defend_arena_succ_factor: _pvp["defend_arena_succ_factor"],
    $_defend_arena_failed_factor: _pvp["defend_arena_failed_factor"],
    $_conflict_skill_kind: _pvp["conflict_skill_kind"],
    $_skill_lvup_spend: _pvp["skill_lvup_spend"],
    $_skill_grade_score: _pvp["skill_grade_score"],
    $_camp_use_exp_wolf_max: _pvp["use_exp_wolf_max"],
    $_camp_use_exp_tower_max: _pvp["use_exp_tower_max"],
    $_camp_wolf_lv_max: _pvp["wolf_lv_max"],
    $_camp_need_user_level: _pvp["camp_need_user_level"],
    $_camp_arena_need_user_level: _pvp["arena_need_user_level"],
    $_camp_create_mine_help_max: _pvp["create_mine_help_max"],
    $_camp_create_mine_help_friends_num: _pvp["create_mine_help_friends_num"],
    umapsById: sortedIds.map(k => [k, data.umaps[k]]),
    dream_data: ddata,
    dream_maps: addObjAttribute_type_id_one(ddata["dmaps"], "dmaps"),
    dream_waves: dwaves,
    skillTemplates: _.chain(Object.values(skills.towerSkill))
      .groupBy(t => t.kindId)
      .mapValues(t => ({ id: t[0].id, params: t[0].params }))
      .value(),
  };

  console.log("init", globalData.umapsById);

  return globalData;
})();

export type MapId = keyof typeof GlobalData.$_map_Obj;
export type DreamMapId = keyof typeof GlobalData.dream_maps;
export type MonsterId = keyof typeof GlobalData.$_wolfAtt_Obj;
