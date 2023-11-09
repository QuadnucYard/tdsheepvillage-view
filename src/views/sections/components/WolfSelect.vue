<template>
  <el-select>
    <el-option-group label="前线">
      <el-option v-for="item in wolfList0" :key="item.id" :label="item.label" :value="item.id" />
    </el-option-group>
    <el-option-group label="防线">
      <el-option v-for="item in wolfList1" :key="item.id" :label="item.label" :value="item.id" />
    </el-option-group>
    <el-option-group label="噩梦">
      <el-option v-for="item in wolfList2" :key="item.id" :label="item.label" :value="item.id" />
    </el-option-group>
  </el-select>
</template>

<script setup lang="ts">
import { wolfList0, wolfList1, wolfList2 } from "@/utils/ui-data";
</script>

<style scoped></style>
