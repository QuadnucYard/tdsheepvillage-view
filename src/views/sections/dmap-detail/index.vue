<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="地图">
      <el-select-v2 v-model="form.mid" :options="allDreamMapOptions" style="max-width: 250px" />
      <el-tag effect="light" class="mx-1"> 难度系数：{{ mapData.hard_ness }}, {{ mapData.yield_val }} </el-tag>
    </el-form-item>
    <el-form-item label="进度">
      <el-input-number v-model="form.score" :min="0" />
      <el-tag effect="light" class="mx-1"> HpRate：{{ monsterHpRate }} </el-tag>
      <el-tag effect="light" class="mx-1"> Population：{{ wavePopu }} </el-tag>
    </el-form-item>
    <el-form-item>
      银币：
      <vue-latex :expression="`G(x) = (2+1.07p)(\\frac{L(x)}{0.39})^{2/3} = ${calcPKGold(monsterLevel, wavePopu)}`" />
    </el-form-item>
    <el-form-item>
      经验：
      <vue-latex :expression="`E(x) = (3.5+0.14p)(\\frac{L(x)}{0.39})^{2/3} = ${waveExp}`" />
    </el-form-item>
    <el-form-item>
      <div class="space-x-4">
        <span>总银币：{{ calcAccumulative.gold }}</span>
        <span>总经验：{{ calcAccumulative.exp }}</span>
      </div>
    </el-form-item>
    <wolf-hp-chart :hp-data="hpData" :height="300" />
  </el-form>
</template>

<script setup lang="ts">
import { GlobalData } from "@/tdsheep/ado/GlobalData";
import type { DreamMapId, MonsterId } from "@/tdsheep/ado/GlobalData";
import { MonsterManager } from "@/tdsheep/command/unit";
import { calcDreamExp, calcPKGold } from "@/utils/game-utils";
import { allDreamMapOptions } from "@/utils/ui-data";
import WolfHpChart from "@/views/components/WolfHpChart.vue";
import { useRouteQuery } from "@/hooks/route-query";

const form = useRouteQuery({
  mid: "m2A" as DreamMapId,
  score: 1,
});

const mapData = computed(() => GlobalData.dream_maps[form.mid]);

const getWaveKey = (score: int) => {
  if (score % 10 === 0) return ((score - 10) % 100) + 10;
  return score % 10;
};

const getWaveWolfs = (score: int): MonsterId[] => {
  const key = getWaveKey(score).toString();
  const waves = GlobalData.dream_waves[form.mid];
  if (score % 10 == 0) return waves.boss[key as keyof typeof waves.boss] as MonsterId[];
  return waves.wolf[key as keyof typeof waves.wolf] as MonsterId[];
};
const waveWolfs = computed(() => getWaveWolfs(form.score).map((t) => MonsterManager.getOnlyExample().getData(t)));

const getWavePopu = (mid: DreamMapId, score: int) => {
  const key = getWaveKey(score).toString();
  const waves = GlobalData.dream_waves[mid];
  return waves.popu[key as keyof typeof waves.popu];
};
const wavePopu = computed(() => getWavePopu(form.mid, form.score));

const getWaveExp = (score: int) =>
  calcDreamExp(score, getWavePopu(form.mid, score == 0 ? 1 : score == 9 ? 10 : getWaveKey(score)));
const waveExp = computed(() => getWaveExp(form.score));

const monsterLevel = computed(() => Math.sqrt(mapData.value.hard_ness * form.score + mapData.value.yield_val));
const monsterHpRate = computed(() => {
  for (const [k, v] of Object.entries(GlobalData.dream_data.dm_wolf_hard_ness)) {
    const [x, y] = k.split("_");
    if (form.score >= Number.parseInt(x) && form.score <= Number.parseInt(y)) return v;
  }
  return GlobalData.dream_data.dm_wolf_hard_ness.default;
});

const hpData = computed(() =>
  waveWolfs.value.map((t) => ({
    name: t.name,
    value: t.getHpMax(monsterLevel.value, monsterHpRate.value),
  }))
);

const calcAccumulative = computed(() => {
  let gold = 0;
  let exp = 0;
  for (let i = 1; i <= form.score; i++) {
    let level = Math.sqrt(mapData.value.yield_val + mapData.value.hard_ness * i);
    gold += calcPKGold(level, getWavePopu(form.mid, i));
    exp += getWaveExp(i);
  }
  return { gold, exp };
});
</script>

<style lang="scss">
.tag-button {
  cursor: pointer;
}
</style>
