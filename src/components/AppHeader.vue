<template>
  <el-menu router :default-active="activeIndex" mode="horizontal" class="inline-block">
    <el-menu-item v-for="(it, i) in menuItems" :key="it" :index="i.toString()" :route="{ name: it }">
      {{ $t(`page.${it}`) }}
    </el-menu-item>
    <!-- <div class="flex-grow" /> -->
    <el-switch v-model="isDark" :active-action-icon="Sunny" :inactive-action-icon="Sunny" />
    <div class="inline-block h-full">
      <el-dropdown class="align-middle" @command="changeLocale">
        <el-icon :size="24"><i-ep-HelpFilled /></el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="zh-CN">中文</el-dropdown-item>
            <el-dropdown-item command="en-US">English</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script setup lang="ts">
import { Sunny } from "@element-plus/icons-vue";
import { useDark } from "@vueuse/core";

import i18n, { type Locale } from "@/i18n";
import { pages } from "@/router/pages";

const route = useRoute();
const isDark = useDark();

const activeIndex = ref("0");
const menuItems = pages;

onMounted(() => {
  activeIndex.value = menuItems.indexOf(route.name as string).toString();
});

const changeLocale = (locale: Locale) => {
  i18n.global.locale.value = locale;
};
</script>

<style scoped></style>
