import { createRouter, createWebHistory, RouteRecordRaw, Router } from "vue-router";

export const sections = [
  { name: "user", label: "User" },
  { name: "towers", label: "Towers" },
  { name: "wolfs", label: "Wolfs" },
  { name: "umaps", label: "Umaps" },
  { name: "umapdetail", label: "Umap Detail" },
  { name: "dmaps", label: "Dream Maps" },
  { name: "wolf-calc", label: "Wolf Calculation" },
  { name: "baoxiang", label: "Baoxiang Properties" },
];

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    component: () => import("@/views/index.vue"),
    children: sections.map(sec => {
      return {
        path: "/" + sec.name,
        name: sec.name,
        meta: { keepAlive: true },
        component: () => import(`../views/sections/${sec.name}.vue`),
      };
    }),
  },
];

const router: Router = createRouter({
  history: createWebHistory("/tdsheepvillage-view/"),
  routes,
});

export default router;
