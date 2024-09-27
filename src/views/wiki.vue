<template>
  <el-card>
    <component :is="Wiki" :color-theme="isDark ? 'dark' : 'light'" />
  </el-card>
</template>

<script setup lang="ts">
import { useDark } from "@vueuse/core";

import Wiki from "@/assets/docs/wiki.md";

const isDark = useDark();
</script>

<style scoped></style>
