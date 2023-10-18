import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import ElementPlus from "element-plus";
import "element-plus/theme-chalk/src/message.scss";

import "./styles/index.scss";
import "tailwindcss/tailwind.css";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";

import VueLatex from "vatex";
import VChart from "vue-echarts";

const app = createApp(App);
app.use(router).use(ElementPlus).use(VueLatex);
console.log(app);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.component("VChart", VChart);

app.mount("#app");
