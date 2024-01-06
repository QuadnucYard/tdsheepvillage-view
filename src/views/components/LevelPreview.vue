<template>
  <el-form-item label="狼">
    <el-select-v2 v-model="wid" :options="allMonsterOptions" />
    <el-tag effect="light">
      血量系数：{{ monsterData.hpMaxA }},{{ monsterData.hpMaxB }},{{ monsterData.hpMaxC }}
    </el-tag>
  </el-form-item>
  <el-form-item label="进度">
    <el-input-number v-model="score" :min="0" />
    <el-tag effect="light" class="tag-button" @click="score = mapData.scoreMax">
      通关进度：{{ mapData.scoreMax }}
    </el-tag>
  </el-form-item>
  <el-form-item label="难度">
    <DifficultySelect v-model="diff" />
  </el-form-item>
  <el-form-item>
    <div class="space-x-8">
      <span>
        等级：
        <vue-latex :expression="`L(x)=\\sqrt{h_a + h_b x}=${monsterLevel.toFixed(2)}`" />
      </span>
      <span>最大血量：{{ monsterHpMax }}</span>
    </div>
  </el-form-item>
  <el-form-item>
    银币：
    <vue-latex :expression="`G(x) = (2+1.07p)(\\frac{L(x)}{0.39})^{2/3} = ${mapData.calcPKGold(monsterLevel)}`" />
  </el-form-item>
  <el-form-item>
    经验：
    <vue-latex :expression="`E(x) = (3.5+0.14p)(\\frac{L(x)}{0.39})^{2/3} = ${mapData.calcPKExp(monsterLevel)}`" />
  </el-form-item>
  <el-form-item>
    <div class="space-x-4">
      <span>总银币：{{ mapData.calcAccumulative().gold }}</span>
      <span>总经验：{{ mapData.calcAccumulative().exp }}</span>
      <span>（假设每波+2且不引狼）</span>
    </div>
  </el-form-item>

  <WolfHpChart :hp-data="hpData" :height="100 * Math.sqrt(mapMonsterData.length)" />
</template>

<script setup lang="ts">
import { GameMapData } from "@/tdsheep/command/map";
import { MonsterData, MonsterManager } from "@/tdsheep/command/unit";
import { allMonsterOptions } from "@/utils/ui-data";
import DifficultySelect from "@/views/components/DifficultySelect.vue";
import WolfHpChart from "@/views/components/WolfHpChart.vue";

const props = defineProps<{ mapData: GameMapData; mapMonsterData: MonsterData[] }>();

const wid = defineModel<string>("wid", { default: "dahuil" });
const score = defineModel<int>("score", { default: 0 });
const diff = defineModel<float>("diff", { default: 1.0 });

const monsterData = computed(() => MonsterManager.getOnlyExample().getData(wid.value));

const monsterLevel = computed(() => props.mapData.getDifficultyLevel(score.value));
const monsterHpMax = computed(() => monsterData.value.getHpMax(monsterLevel.value, diff.value));

const hpData = computed(() =>
  props.mapMonsterData.map((t) => ({
    name: t.name,
    value: t.getHpMax(monsterLevel.value, diff.value),
  }))
);

watch(hpData, () => console.log(hpData.value));
</script>

<style scoped></style>
