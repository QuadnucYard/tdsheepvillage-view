import type { RouteRecordRaw } from "vue-router";

import { sections } from "./pages";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    component: () => import("@/views/index.vue"),
    children: [
      {
        path: "home",
        name: "home",
        alias: "",
        component: () => import("@/views/home.vue"),
      },
      {
        path: "notice",
        name: "notice",
        component: () => import("@/views/notice.vue"),
      },
      {
        path: "wiki",
        name: "wiki",
        component: () => import("@/views/wiki.vue"),
      },
      {
        path: "section",
        name: "section",
        redirect: { name: sections[0] },
        component: () => import("@/views/sections/index.vue"),
        children: sections.map((sec) => {
          return {
            path: sec,
            name: sec,
            meta: { keepAlive: true },
            component: () => import(`@/views/sections/${sec}/index.vue`),
          };
        }),
      },
    ],
  },
];

export default routes;
