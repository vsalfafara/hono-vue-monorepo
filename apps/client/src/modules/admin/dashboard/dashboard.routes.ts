import { SIDEBARGROUPS } from "@/constants";
import { useAuthStore } from "@/stores/auth.store";
import type { Subject } from "@casl/ability";
import { LayoutDashboard } from "lucide-vue-next";
import type { RouteRecordRaw } from "vue-router";

export const dashboardRoutes: RouteRecordRaw[] = [
  {
    path: "/dashboard",
    component: () => import("./pages/Dashboard.vue"),
    name: "Dashboard",
    meta: {
      group: SIDEBARGROUPS.admin,
      icon: LayoutDashboard,
      title: "Dashboard",
    },
    beforeEnter: async (to) => {
      const { getPermissions } = useAuthStore();
      if (!getPermissions.can("view", to.name as Subject))
        return { name: "Tasks" };
      return true;
    },
  },
];
