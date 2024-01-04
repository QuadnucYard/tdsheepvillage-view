import "element-plus/theme-chalk/src/message.scss";
import "tailwindcss/tailwind.css";
import VueLatex from "vatex";
import { createApp } from "vue";
import VChart from "vue-echarts";

import "@/utils/array-extensions";

import App from "./App.vue";
import router from "./router";
import "./styles/index.scss";

const app = createApp(App);
app.use(router).use(VueLatex);

app.component("VChart", VChart);

app.mount("#app");
