<template>
  <el-form label-width="120px">
    <el-form-item label="等级">
      <el-input-number v-model="tower.m_level" />
    </el-form-item>
    <!-- <el-form-item label="bId">
      <el-input />
    </el-form-item> -->
    <el-form-item label="damage">
      <el-input-number v-model="tower.towerData.damageA" />
      <el-input-number v-model="tower.towerData.damageB" />
      <el-input-number v-model="tower.towerData.damageC" />
    </el-form-item>
    <el-form-item label="rate">
      <el-input-number v-model="tower.towerData.rate" />
    </el-form-item>
    <el-form-item label="range">
      <el-input-number v-model="tower.towerData.range" />
    </el-form-item>
    <el-form-item label="buffEffect">
      <el-input-number v-model="tower.towerData.buffEffect" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { Tower } from "@/tdsheep/module/unit/Tower";

const props = defineProps<{ tower: Tower }>();
</script>

<style scoped></style>
