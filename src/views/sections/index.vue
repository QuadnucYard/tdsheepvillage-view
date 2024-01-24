<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane v-for="sec in sections" :key="sec" :label="$t(`section.${sec.replaceAll('-', '_')}`)" :name="sec" />
    </el-tabs>
    <div class="content">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
  <dialog-export />
  <dialog-import />
</template>

<script setup lang="ts">
import type { TabsPaneContext } from "element-plus";

import { sections } from "@/router/pages";
import DialogExport from "@/views/components/DialogExport.vue";
import DialogImport from "@/views/components/DialogImport.vue";

const router = useRouter();
const route = useRoute();

const activeName = ref("");

onMounted(() => {
  activeName.value = route.name as string;
});

const handleClick = (tab: TabsPaneContext) => {
  router.push({ name: tab.paneName as string });
};
</script>

<style scoped></style>
