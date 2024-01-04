<template>
  <el-select-v2 v-model="model" :options="options" />
</template>

<script setup lang="ts">
import { GlobalData } from "@/tdsheep/ado/GlobalData";

const options = Object.entries(GlobalData.$_wave_hard_Obj).map(([k, v]) => ({
  value: parseFloat(k),
  label: `${v.desc.split("^")[1]} (x${k}, +${v.add_score})`,
}));
const model = defineModel<float>();
</script>

<style scoped></style>
