<template>
  <el-card>
    <component :is="Wiki" />
  </el-card>
</template>

<script setup lang="ts">
import "github-markdown-css/github-markdown.css";

import Wiki from "@/assets/docs/wiki.md";
</script>

<style scoped></style>
