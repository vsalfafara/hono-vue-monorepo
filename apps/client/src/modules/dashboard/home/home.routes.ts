import { ROLES, SIDEBARGROUPS } from "@/constants";
import { Home } from "lucide-vue-next";
import type { RouteRecordRaw } from "vue-router";

const HomePage = async () => await import("./Home.vue");

export const homeRoutes: RouteRecordRaw[] = [
  {
    path: "/home",
    name: "Home",
    component: HomePage,
    meta: {
      group: SIDEBARGROUPS.dashboard,
      icon: Home,
    },
  },
];
