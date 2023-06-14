import { BaseData } from "../command/BaseData";

export class BaseModule {
  m_data: BaseData;

  constructor() {
    this.m_data = new BaseData({});
  }

  get baseData() {
    return this.m_data;
  }
}

export class BaseDisplayModule extends BaseModule {
  constructor() {
    super();
  }
}
