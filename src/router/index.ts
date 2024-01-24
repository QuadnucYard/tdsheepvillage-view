import { type Router, createRouter, createWebHistory } from "vue-router";

import routes from "./routes";

const router: Router = createRouter({
  history: createWebHistory("/tdsheepvillage-view/"),
  routes,
});

export default router;
