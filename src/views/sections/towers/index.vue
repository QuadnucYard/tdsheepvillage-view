<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="是否为防线">
      <el-switch v-model="form.isDefendMap" @change="onMapChanged" />
    </el-form-item>
    <el-row>
      <el-col :span="12">
        <el-form-item label="塔">
          <el-select-v2 v-model="form.towerId" :options="allTowerOptions" style="max-width: 150px" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="宝石">
          <el-select v-model="form.gemId" style="max-width: 200px">
            <el-option label="无" value=""></el-option>
            <el-option v-for="[t, k] in allGems" :key="k" :label="t" :value="k" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="等级">
          <el-input-number v-model="form.level" :min="1" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="等级上限">
          <label>{{ tower.towerData.levelMax }}</label>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="升级经验">
          <label>{{ tower.buildValue(tower.level + 1) }}</label>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="攻击力">
          <label>{{ tower.damage() }}</label>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="攻击频率">
          <label>{{ tower.rate }}</label>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="攻击范围">
          <label>{{ tower.range }}</label>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="简介">
      <tower-skill-info :tower="tower" />
    </el-form-item>
    <el-row>
      <el-col :span="8">
        <el-form-item label="ability">
          <label>{{ tower.ability.toFixed(1) }}</label>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="power">
          <label>{{ tower.power }}</label>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="buffEffect">
          <label>{{ tower.buffEffect().toFixed(1) }}</label>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="buildValue">
          <label>{{ tower.buildValue() }}</label>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="buildCost">
          <label>{{ tower.buildCost() }}</label>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="valueCost">
          <label>{{ tower.valueCost() }}</label>
        </el-form-item>
      </el-col>
    </el-row>
    <div>
      <el-form-item label="升级计算" style="margin-bottom: 0 !important">
        从
        <el-input-number
          v-model="form.buildFrom"
          size="small"
          controls-position="right"
          style="width: 5em; margin: 0.5em"
        />
        级到
        <el-input-number
          v-model="form.buildTo"
          size="small"
          controls-position="right"
          style="width: 5em; margin: 0.5em"
        />
        级， 苦工总力量
        <el-input-number
          v-model="form.buildPower"
          size="small"
          controls-position="right"
          style="width: 8em; margin: 0.5em"
        />
      </el-form-item>
      <el-form-item style="margin-bottom: 0 !important">
        需要时间：<label> {{ formatTimeSpan(buildTime) }}</label>
      </el-form-item>
      <p>注：升级经验为塔下一级的 buildValue 值</p>
    </div>
    <!-- <p name="bv-formula"></p>
                <p name="bc-formula"></p>
                <p name="vc-formula"></p>
                <p>其中 $[x]$ 为四舍五入取整。前两者是升级逐级累加后四舍五入取整。</p>
                <br></p> -->
  </el-form>
</template>

<script setup lang="ts">
import _ from "lodash-es";

import { GlobalData } from "@/tdsheep/ado/GlobalData";
import { GemItem } from "@/tdsheep/module/item";
import { GameMap } from "@/tdsheep/module/map/GameMap";
import { Tower } from "@/tdsheep/module/unit/Tower";
import { formatTimeSpan } from "@/utils/format";
import { allTowerOptions } from "@/utils/ui-data";
import TowerSkillInfo from "@/views/components/TowerSkillInfo.vue";

const form = reactive({
  isDefendMap: false,
  towerId: "shaota",
  gemId: "",
  level: 1,
  buildFrom: 0,
  buildTo: 1,
  buildPower: 50,
});

const allGems = _.chain(GlobalData.$_global_properties.gem)
  .toPairs()
  .sortBy((t) => Number(Math.abs(t[1].index)))
  .map((t) => [`${t[1].name} [${t[1].index}]`, t[0]])
  .value();

const tower = computed(() => {
  const _tower = new Tower(form.towerId);
  _tower.level = form.level;
  if (form.gemId !== "") _tower.setGem(new GemItem(form.gemId));
  return _tower;
});

const onMapChanged = () => {
  // TODO: 更改地图类型并不会导致重新计算。
  GameMap.currentMap = new GameMap(form.isDefendMap ? GameMap.DEFEND_MAP_1 : GameMap.ENDLESS_MAP_1);
};

const buildTime = computed(() => {
  let _buildTime = 0;
  if (form.buildFrom > form.buildTo) return NaN;
  for (let i = form.buildFrom + 1; i <= form.buildTo; i++) {
    _buildTime += tower.value.buildValue(i);
  }
  return Math.round(_buildTime / form.buildPower);
});
</script>

<style lang="scss"></style>
