import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import { useAuthStore } from "@/stores/auth.store";
import { dashboardRoutes } from "@/modules/dashboard/dashboard.routes";
import { adminRoutes } from "@/modules/admin/admin.routes";
import { authClient } from "@/lib/auth.utils";

export const appRoutes: RouteRecordRaw[] = [...dashboardRoutes, ...adminRoutes];

const layout: RouteRecordRaw = {
  path: "/",
  component: () => import("@/layout/AppLayout.vue"),
  redirect: { name: "Home" },
  children: [...appRoutes],
  beforeEnter: async (_, __) => {
    const { data } = await authClient.getSession();
    if (!data) return { name: "Login" };
    return;
  },
};

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/modules/auth/Auth.vue"),
    beforeEnter: async (_, __) => {
      const { data } = await authClient.getSession();
      if (data) return { name: "Home" };
      return true;
    },
  },
  layout,
  {
    path: "/:pathMatch(.*)*",
    redirect: "/login",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
