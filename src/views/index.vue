<template>
  <main>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane v-for="sec in sections" :label="sec.label" :name="sec.name"></el-tab-pane>
    </el-tabs>
    <div class="content" v-if="loadComplete">
      <router-view v-slot="{ Component }">
        <!-- <transition name="fade-transform" mode="out-in"> -->
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        <!-- </transition> -->
      </router-view>
      <!-- <keep-alive><router-view /></keep-alive> -->
    </div>
  </main>
</template>

<script setup lang="ts">
import type { TabsPaneContext } from "element-plus";
import { init } from "@/tdsheep/InitLoad.js";
import { useRouter } from "vue-router";
import { sections } from "@/router";

const router = useRouter();

const loadComplete = ref(false);
init(() => (loadComplete.value = true));

const activeName = ref("first");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  // console.log(tab.paneName, event);
  router.push({ name: tab.paneName as string });
};
</script>

<style lang="scss">
.el-form-item {
  margin-bottom: 8px !important;
  //--font-size: 16px;
}

.content .el-form {
  max-width: 800px;
}
</style>
