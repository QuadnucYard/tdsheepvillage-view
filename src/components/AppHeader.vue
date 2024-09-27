<template>
  <el-menu
    router
    :default-active="activeIndex"
    mode="horizontal"
    background-color="#ff9900"
    text-color="#fefefe"
    active-text-color="#ffd9a1"
    :ellipsis="false"
  >
    <el-menu-item v-for="(it, i) in menuItems" :key="it" :index="i.toString()" :route="{ name: it }">
      {{ $t(`page.${it}`) }}
    </el-menu-item>

    <div class="flex-grow" />

    <el-button circle :icon="UploadFilled" @click="configUploadDialogRef?.show()"></el-button>
    <el-switch v-model="isDark" :active-action-icon="Sunny" :inactive-action-icon="Sunny" class="no-menu-item" />
    <div class="no-menu-item">
      <el-dropdown class="align-middle" @command="changeLocale">
        <el-icon :size="24"><i-mdi-Translate /></el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="zh-CN">中文</el-dropdown-item>
            <el-dropdown-item command="en-US">English</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-menu>

  <ConfigUploadDialog ref="configUploadDialogRef" />
</template>

<script setup lang="ts">
import { Sunny, UploadFilled } from "@element-plus/icons-vue";
import { useDark } from "@vueuse/core";

import i18n, { type Locale } from "@/i18n";
import { pages } from "@/router/pages";

import ConfigUploadDialog from "./ConfigUploadDialog.vue";

const route = useRoute();
const isDark = useDark();

const activeIndex = ref("0");
const menuItems = pages;

let configUploadDialogRef = ref<InstanceType<typeof ConfigUploadDialog>>();

onMounted(() => {
  activeIndex.value = menuItems.indexOf(route.name as string).toString();
});

const changeLocale = (locale: Locale) => {
  i18n.global.locale.value = locale;
};
</script>

<style scoped>
.no-menu-item {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 0;
  padding: 0 10px;
}

@media (prefers-color-scheme: light) {
  .text {
    color: red;
  }
}
@media (prefers-color-scheme: dark) {
  .text {
    color: blue;
  }
}
</style>
