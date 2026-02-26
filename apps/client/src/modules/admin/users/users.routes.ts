import { ROLES, SIDEBARGROUPS } from "@/constants";
import { useAuthStore } from "@/stores/auth.store";
import type { Subject } from "@casl/ability";
import { Users } from "lucide-vue-next";
import type { RouteRecordRaw } from "vue-router";
import { toast } from "vue-sonner";

const UsersPage = () => import("./Users.vue");

export const userRoutes: RouteRecordRaw[] = [
  {
    path: "/users",
    name: "Users",
    component: UsersPage,
    meta: {
      group: SIDEBARGROUPS.admin,
      icon: Users,
    },
    beforeEnter: async (to, _) => {
      const { getPermissions } = useAuthStore();
      if (!getPermissions.can("view", to.name as Subject))
        return { name: "Home" };
      return true;
    },
  },
];
