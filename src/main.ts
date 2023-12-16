import "element-plus/theme-chalk/src/message.scss";
import "tailwindcss/tailwind.css";
import VueLatex from "vatex";
import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import "./styles/index.scss";

const app = createApp(App);
app.use(router).use(VueLatex);

app.mount("#app");
