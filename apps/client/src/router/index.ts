import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import { dashboardRoutes } from "@/modules/dashboard/dashboard.routes";
import { adminRoutes } from "@/modules/admin/admin.routes";
import { authClient } from "@/lib/auth.utils";
import { APPNAME } from "@/constants";

export const appRoutes: RouteRecordRaw[] = [...dashboardRoutes, ...adminRoutes];

const layout: RouteRecordRaw = {
  path: "/",
  component: () => import("@/layout/AppLayout.vue"),
  redirect: { name: "Tasks" },
  children: [...appRoutes],
  beforeEnter: async (to, __) => {
    const { data } = await authClient.getSession();
    if (!data) return { name: "Login" };
    return true;
  },
};

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/modules/auth/Auth.vue"),
    beforeEnter: async (_, __) => {
      const { data } = await authClient.getSession();
      if (data) return { name: "Tasks" };
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

router.beforeEach((to) => {
  document.title = `${to.meta.title} - ${APPNAME}`;
  return;
});

export default router;
