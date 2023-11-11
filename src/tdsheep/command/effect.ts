import { BaseDisplayData } from "./BaseData";

export class EffectData extends BaseDisplayData {
  static readonly KIND_HIT = "hit";
  static readonly KIND_INVASION = "invasion";
  static readonly KIND_TELEPORT = "teleport";
  static readonly KIND_BUFF_TOP = "buffTop";
  static readonly KIND_BUFF_MID = "buffMid";
  static readonly KIND_BUFF_BOT = "buffBot";
  static readonly KIND_MAGIC = "effectMagic";
  static readonly KIND_PATH = "effectPath";
  static readonly KIND_CRIT = "effectCrit";
  static readonly KIND_SUMMON = "effectSummon";
  static readonly KIND_CLOUD = "effectCloud";
  static readonly KIND_MIRROR = "effectMirror";
  static readonly KIND_CURE = "effectCure";
  static readonly KIND_CURE_ONE = "effectCureOne";
  static readonly KIND_SNEER = "effectSneer";
  static readonly KIND_LINKS = "effectLinks";
  static readonly KIND_RELIVE = "effectRelive";
  static readonly KIND_SUICIDE = "effectSuicide";
  static readonly KIND_BLINK_IN = "effectBlinkIn";
  static readonly KIND_BLINK_OUT = "effectBlinkOut";
  static readonly KIND_LIGHTNING = "lightning";
  static readonly KIND_FIELD_ATTACK = "allAttack";
  static readonly KIND_FIELD_ATTACK_AOE = "allAttackAOE";
  static readonly KIND_CUSS = "effectCuss";
  static readonly KIND_CUSS_BREAK = "effectCussBreak";
  static readonly KIND_SIGN_SUMMON = "signSummon";
  static readonly KIND_SIGN_CURE = "signCure";
  static readonly KIND_SIGN_CLOUD = "signCloud";
  static readonly KIND_SIGN_SHIELD = "signShield";
  static readonly KIND_SIGN_TRANSFORM = "signTransform";
  static readonly KIND_BOSS = "effectBoss";

  constructor(_data: any) {
    super(_data);
  }
}
