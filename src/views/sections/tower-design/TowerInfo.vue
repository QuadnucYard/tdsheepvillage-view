<template>
  <el-card>
    <el-form label-width="80px">
      <el-form-item label="damage">
        {{ tower.damage() }}
      </el-form-item>
      <el-form-item label="rate">
        {{ tower.rate }}
      </el-form-item>
      <el-form-item label="range">
        {{ tower.range }}
      </el-form-item>
      <el-form-item label="简介">
        <div v-html="tower.getInfoHtml()" style="line-height: 1.5em"></div>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { Tower } from "@/tdsheep/module/unit/Tower";

const props = defineProps<{ tower: Tower }>();
</script>

<style scoped></style>
