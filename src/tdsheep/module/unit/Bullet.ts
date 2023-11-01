import { BulletData, BulletManager } from "../../command/unit";
import { BaseUnit } from "./BaseUnit";
import { TrapData } from "../../command/unit";

export class Bullet extends BaseUnit {
  public damage: number = 0;
  public range: number = 0;
  public attackType: string;

  constructor(_dataId: string) {
    super();
    this.m_data = BulletManager.getOnlyExample().getData(_dataId);
    this.attackType = TrapData.EFFECT_TYPE_ALL;
  }

  get bulletData() {
    return this.m_data as BulletData;
  }
}
