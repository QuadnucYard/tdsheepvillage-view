import data from "@/assets/sys_config.json";
import lang from "@/assets/string_cn.xml?raw";
import _ from "lodash-es";
import { isAlpha, compareNumber } from "@/utils";
import X2JS from "x2js";

export class GlobalData {
  static $_user_level_max;
  static $_global_language_str = null;
  static $_global_dataProfile_txt = null;
  static $_globalMaskSprite = null;
  static $_global_mixtrue_gem = 500;
  static $_global_gold_remind = 5000;
  static $_global_population_remind = 1.5;
  static $_global_speedup_level = 0;
  static $_wolfAtt_Obj;
  static $_towerAtt_Obj;
  static $_normal_towerAtt_Obj;
  static $_wallAtt_Obj;
  static $_normal_wallAtt_Obj;
  static $_barrierAtt_Obj;
  static $_bulletAtt_Obj;
  static $_bombAtt_Obj;
  static $_roadblockAtt_Obj;
  static $_exchange_properties;
  static $_exchange_all = [];
  static $_exchange_now = [];
  static $_skillAtt_Obj;
  static $_skillPackage_Obj;
  static $_map_Obj;
  static $_wave_hard_Obj;
  static $_task_Obj;
  static $_level_up_gift;
  static $_pass_map_gift;
  static $_tower_worth_factor;
  static $_wolf_worth_factor;
  static $_defend_map_snarp_max;
  static $_defend_succ_factor;
  static $_defend_failed_factor;
  static $_defend_arena_succ_factor;
  static $_defend_arena_failed_factor;
  static $_conflict_skill_kind;
  static $_skill_lvup_spend;
  static $_skill_grade_score;
  static $_global_properties;
  static $_camp_wolf_lv_max;
  static $Maps;
}

(function () {
  const x2js = new X2JS();
  GlobalData.$_global_language_str = x2js.xml2dom(lang);

  GlobalData.$_global_properties = data.properties;
  GlobalData.$_skillAtt_Obj = data.skill;
  GlobalData.$_skillPackage_Obj = data.skill_package;
  GlobalData.$_map_Obj = data.umaps;
  GlobalData.$_tower_worth_factor = data["camp_system_simple"]["tower_worth_factor"];
  GlobalData.$_wolf_worth_factor = data["camp_system_simple"]["wolf_worth_factor"];
  GlobalData.$_towerAtt_Obj = data.building.tower;
  GlobalData.$_bulletAtt_Obj = data.bullet;
  GlobalData.$_wolfAtt_Obj = data.wolfs;
  GlobalData.$_wallAtt_Obj = data.building["wall"];
  GlobalData.$_barrierAtt_Obj = data.barrier;
  GlobalData.$_level_up_gift = data.level_up_gift;
  GlobalData.$_pass_map_gift = data.pass_map_gift;
  GlobalData.$Maps = data["version_ctrl"]["Maps"];

  let _pvp = data["camp_system_simple"];
  if (_pvp) {
    GlobalData.$_wolfs_unlock_lv = _pvp["camp_wolf_lv_max_factor"];
    GlobalData.$_wolfs_unlock_gold = _pvp["camp_wolf_gold_max_factor"];
    GlobalData.$_wolfs_unlock_properties = _pvp["camp_wolf_properties_max_factor"];
    GlobalData.$_camp_hold_time = _pvp["hold_tim"];
    GlobalData.$_camp_pk_cd_time = _pvp["pk_cd_time"];
    GlobalData.$_camp_pk_times_max = _pvp["pk_times_max"];
    GlobalData.$_camp_defend_times_max = _pvp["defend_times_max"];
    GlobalData.$_camp_pk_arena_times_max = _pvp["pk_arena_times_max"];
    GlobalData.$_camp_defend_arena_times_max = _pvp["defend_arena_times_max"];
    GlobalData.$_camp_mining_rate = _pvp["mine_rate"];
    GlobalData.$_camp_sell_building_dis = _pvp["sell_building_dis"];
    GlobalData.$_tower_worth_factor = _pvp["tower_worth_factor"];
    GlobalData.$_wolf_worth_factor = _pvp["wolf_worth_factor"];
    GlobalData.$_defend_map_snarp_max = _pvp["defend_map_snarp_max"];
    GlobalData.$_defend_succ_factor = _pvp["defend_succ_factor"];
    GlobalData.$_defend_failed_factor = _pvp["defend_failed_factor"];
    GlobalData.$_defend_arena_succ_factor = _pvp["defend_arena_succ_factor"];
    GlobalData.$_defend_arena_failed_factor = _pvp["defend_arena_failed_factor"];
    GlobalData.$_conflict_skill_kind = _pvp["conflict_skill_kind"];
    GlobalData.$_skill_lvup_spend = _pvp["skill_lvup_spend"];
    GlobalData.$_skill_grade_score = _pvp["skill_grade_score"];
    GlobalData.$_camp_use_exp_wolf_max = _pvp["use_exp_wolf_max"];
    GlobalData.$_camp_use_exp_tower_max = _pvp["use_exp_tower_max"];
    GlobalData.$_camp_wolf_lv_max = _pvp["wolf_lv_max"];
    GlobalData.$_camp_need_user_level = _pvp["camp_need_user_level"];
    GlobalData.$_camp_arena_need_user_level = _pvp["arena_need_user_level"];
    GlobalData.$_camp_create_mine_help_max = _pvp["create_mine_help_max"];
    GlobalData.$_camp_create_mine_help_friends_num = _pvp["create_mine_help_friends_num"];
    GlobalData.$_camp_create_mine_help_reduce_time = _pvp["create_mine_help_reduce_time"];
  }

  GlobalData.umapsById = _.map(data.umaps, (t, k) => [k, t]).sort((p1, p2) => {
    return compareNumber(
      parseInt(/(?<=m).+(?=[A-Z]*)/.exec(isAlpha(p1[0][-1]) ? p1[0] : p1[0] + "A")[0], 36),
      parseInt(/(?<=m).+(?=[A-Z]*)/.exec(isAlpha(p2[0][-1]) ? p2[0] : p2[0] + "A")[0], 36)
    );
  });
  console.log(GlobalData.umapsById);
  console.log("init");
})();
