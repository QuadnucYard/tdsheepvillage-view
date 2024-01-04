<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="等级">
      <el-input-number v-model="form.level" :min="1" />
    </el-form-item>
    <el-form-item label="升级经验">
      <label>{{ expMax }}</label>
    </el-form-item>
    <el-form-item label="力量">
      <label>{{ power }}</label>
    </el-form-item>
    <el-form-item label="连升等级">
      <label>{{ upgradeLevel }}</label>
    </el-form-item>
    <el-form-item label="苦工价格">
      <label>{{ slaveGold }}</label>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
const form = reactive({
  level: 1,
});

const expMax = computed(() => ((2 * (form.level + 1) + 3) * (form.level + 1) + 4) * (form.level + 1) + 20);
const power = computed(() => Math.round((0.015 * form.level + 0.8) * form.level + 2));
const upgradeLevel = computed(() => Math.floor(form.level / 4 + 1));
const slaveGold = computed(() => (form.level + 7) * power.value);
</script>

<style lang="scss"></style>
