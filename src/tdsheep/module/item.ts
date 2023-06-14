import { BaseModule } from "./BaseModule";
import { GemData, GemManager } from "../command/item";

export class GemItem extends BaseModule {
  constructor(_dataId: string) {
    super();
    this.m_data = GemManager.getOnlyExample().getData(_dataId);
  }

  get gemData() {
    return this.m_data as GemData;
  }
}
