import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import ElementPlus from "element-plus";

import "tailwindcss/tailwind.css";
import "element-plus/theme-chalk/src/message.scss";
import "./styles/index.scss";

import VueLatex from "vatex";

const app = createApp(App);
app.use(router).use(ElementPlus).use(VueLatex);

app.mount("#app");
