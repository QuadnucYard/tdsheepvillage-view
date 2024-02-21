<template>
  <el-container>
    <el-header>
      <app-header />
    </el-header>

    <el-main>
      <router-view v-slot="{ Component }">
        <!-- <transition name="fade-transform" mode="out-in"> -->
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
        <!-- </transition> -->
      </router-view>
      <!-- <keep-alive><router-view /></keep-alive> -->
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { useDark } from "@vueuse/core";
import { THEME_KEY } from "vue-echarts";

const isDark = useDark();
const theme = computed(() => (isDark.value ? "dark" : "light"));

provide(THEME_KEY, theme);
</script>

<style scoped></style>
