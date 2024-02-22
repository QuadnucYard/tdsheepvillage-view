<template>
  <div class="p-4">
    <el-carousel :interval="4000" type="card" height="600px">
      <el-carousel-item v-for="img in images" :key="img">
        <el-image fit="cover" :src="img" style="width: 628px; height: 540px" />
      </el-carousel-item>
    </el-carousel>
    <div class="absolute text-center mt-20 top-32 z-10 p-8 left-0 right-0 space-y-8 bg-black bg-opacity-50">
      <div class="text-4xl text-orange-200">欢迎来到保卫羊村小工具！</div>
      <div>
        <router-link :to="{ name: 'notice' }">
          <el-button type="primary" size="large" style="width: 120px">🚀公告</el-button>
        </router-link>
      </div>
      <div>
        <router-link :to="{ name: 'section' }">
          <el-button type="primary" size="large" style="width: 120px">🧰小工具</el-button>
        </router-link>
      </div>
      <div>
        <router-link :to="{ name: 'wiki' }">
          <el-button type="primary" size="large" style="width: 120px">🌟百科</el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import _ from "lodash-es";

const images = _.range(1, 9).map((i) => import.meta.env.VITE_BASE_URL + `img/carousel/${i}.png`);

console.log(images);
</script>

<style scoped></style>
