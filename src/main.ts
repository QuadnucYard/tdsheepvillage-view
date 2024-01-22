import "element-plus/theme-chalk/dark/css-vars.css";
import VueLatex from "vatex";
import { createApp } from "vue";
import VChart from "vue-echarts";
import "vue-json-pretty/lib/styles.css";

import i18n from "@/i18n";
import "@/utils/array-extensions";

import App from "./App.vue";
import router from "./router";
import "./styles/index.scss";

const app = createApp(App);
app.use(router).use(i18n).use(VueLatex);

app.component("VChart", VChart);

app.mount("#app");
