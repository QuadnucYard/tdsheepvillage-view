<template>
  <el-tabs>
    <el-tab-pane label="设计大赛">
      <el-card>
        <component :is="DesignContest" />
      </el-card>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import "github-markdown-css/github-markdown.css";

import DesignContest from "@/assets/docs/design-contest.md";
</script>

<style scoped></style>
