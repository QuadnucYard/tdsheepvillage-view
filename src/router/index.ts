import { type Router, createRouter, createWebHistory } from "vue-router";

import routes from "./routes";

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

export default router;
