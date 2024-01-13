import { RouteRecordRaw, Router, createRouter, createWebHistory } from "vue-router";

import { sections } from "./sections";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    component: () => import("@/views/index.vue"),
    children: sections.map((sec) => {
      return {
        path: "/" + sec.name,
        name: sec.name,
        meta: { keepAlive: true },
        component: () => import(`@/views/sections/${sec.name}/index.vue`),
      };
    }),
    redirect: "notice",
  },
];

const router: Router = createRouter({
  history: createWebHistory("/tdsheepvillage-view/"),
  routes,
});

export default router;
