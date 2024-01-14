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
        <tower-skill-info :tower="tower" />
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { Tower } from "@/tdsheep/module/unit/Tower";
import TowerSkillInfo from "@/views/components/TowerSkillInfo.vue";

defineProps<{ tower: Tower }>();
</script>

<style scoped></style>
