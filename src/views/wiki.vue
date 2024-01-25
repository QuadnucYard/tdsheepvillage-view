<template>
  <el-card>
    <component :is="Wiki" color-theme="dark" />
  </el-card>
</template>

<script setup lang="ts">
import Wiki from "@/assets/docs/wiki.md";
</script>

<style scoped></style>
