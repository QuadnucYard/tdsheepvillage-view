<template>
  <el-container>
    <el-header>
      <el-menu router :default-active="activeIndex" mode="horizontal" ellipsis class="inline-block">
        <el-menu-item v-for="(sec, i) in sections" :key="sec" :index="i.toString()" :route="sec">
          {{ $t(`section.${sec.replace("-", "_")}`) }}
        </el-menu-item>
        <div class="flex-grow" />
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
    </el-header>

    <el-main class="content sm:mx-8">
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
  <dialog-export />
  <dialog-import />
</template>

<script setup lang="ts">
import { Sunny } from "@element-plus/icons-vue";
import { useDark } from "@vueuse/core";

import i18n, { type Locale } from "@/i18n";
import { sections } from "@/router/sections";
import DialogExport from "@/views/components/DialogExport.vue";
import DialogImport from "@/views/components/DialogImport.vue";

const activeIndex = ref("0");

const isDark = useDark();

const changeLocale = (locale: Locale) => {
  i18n.global.locale.value = locale;
};
</script>

<style scoped></style>
