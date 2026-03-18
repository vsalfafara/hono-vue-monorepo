import { dashboardRoutes } from "./dashboard/dashboard.routes";
import { userRoutes } from "./users/users.routes";

export const adminRoutes = [...userRoutes, ...dashboardRoutes];
