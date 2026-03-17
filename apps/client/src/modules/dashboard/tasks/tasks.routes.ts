import { ROLES, SIDEBARGROUPS } from "@/constants";
import { Home } from "lucide-vue-next";
import type { RouteRecordRaw } from "vue-router";

const TaskPage = async () => await import("./pages/Tasks.vue");

export const tasksRoutes: RouteRecordRaw[] = [
  {
    path: "/tasks",
    name: "Tasks",
    component: TaskPage,
    meta: {
      group: SIDEBARGROUPS.dashboard,
      icon: Home,
      title: "Tasks",
    },
  },
];
