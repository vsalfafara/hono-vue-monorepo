import { ROLES, SIDEBARGROUPS } from "@/constants";
import { Home } from "lucide-vue-next";
import type { RouteRecordRaw } from "vue-router";

export const tasksRoutes: RouteRecordRaw[] = [
  {
    path: "/tasks",
    name: "Tasks",
    component: () => import("./pages/Tasks.vue"),
    meta: {
      group: SIDEBARGROUPS.dashboard,
      icon: Home,
      title: "Tasks",
    },
  },
];
