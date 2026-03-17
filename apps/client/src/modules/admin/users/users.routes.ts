import { ROLES, SIDEBARGROUPS } from "@/constants";
import { useAuthStore } from "@/stores/auth.store";
import type { Subject } from "@casl/ability";
import { Users } from "lucide-vue-next";
import type { RouteRecordRaw } from "vue-router";
import { toast } from "vue-sonner";

const UsersPage = () => import("./pages/Users.vue");

export const userRoutes: RouteRecordRaw[] = [
  {
    path: "/users",
    name: "Users",
    component: UsersPage,
    meta: {
      group: SIDEBARGROUPS.admin,
      icon: Users,
      title: "Users",
    },
    beforeEnter: async (to, _) => {
      const { getPermissions } = useAuthStore();
      if (!getPermissions.can("view", to.name as Subject))
        return { name: "Tasks" };
      return true;
    },
  },
];
