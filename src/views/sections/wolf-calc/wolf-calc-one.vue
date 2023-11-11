<template>
  <el-form :label-width="80">
    <el-form-item label="狼">
      <wolf-select v-model="form.wid" @change="onWolfChanged" />
    </el-form-item>
    <el-form-item label="等级">
      <el-input-number v-model="wolf.m_level" :min="1" />
      <span class="ml-2">最高等级：{{ wolf.levelMax }}</span>
    </el-form-item>
    <el-form-item label="速度">
      {{ wolf.monsterData.speedBase }}
    </el-form-item>
    <el-form-item label="升级经验">
      {{ form.expMax }}
    </el-form-item>
    <el-form-item label="血量">
      {{ wolf.hpMax }}
    </el-form-item>
    <el-form-item label="实力">
      {{ wolf.power }}
    </el-form-item>
  </el-form>
  <div class="ml-8">
    <p>技能</p>
    <wolf-skill-table :wolf="wolf" />
  </div>
</template>

<script setup lang="ts">
import WolfSelect from "../components/WolfSelect.vue";
import { Monster } from "@/tdsheep/module/unit/Monster";
import _ from "lodash-es";
import WolfSkillTable from "./WolfSkillTable.vue";

const form = reactive({
  wid: "al",
  level: 1,
  expMax: 0,
});

const wolf = ref(new Monster("dahuil"));
refresh();

const onWolfChanged = (id: string) => {
  wolf.value = new Monster(id);
  refresh();
};

watch(() => wolf.value.level, refresh);

function refresh() {
  wolf.value.refreshLevel();
  form.expMax = wolf.value.expMax;
}
</script>

<style lang="scss" scoped></style>
