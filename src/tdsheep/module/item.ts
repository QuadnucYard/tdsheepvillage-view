import type { GemData } from "../command/item";
import { GemManager } from "../command/item";
import { BaseModule } from "./BaseModule";

export class GemItem extends BaseModule {
  constructor(_dataId: string) {
    super();
    this.m_data = GemManager.getOnlyExample().getData(_dataId);
  }

  get gemData() {
    return this.m_data as GemData;
  }
}
