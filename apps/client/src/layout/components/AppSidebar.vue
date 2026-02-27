<template>
  <Sidebar>
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" @click="handleNavigate('Home')">
            <div
              class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
            >
              <ListStart class="size-4" />
            </div>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">Acme Inc</span>
              <span class="truncate text-xs">Enterprise</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup v-for="(group, index) in groupedRoutes" :key="group.name">
        <SidebarGroupLabel>{{ group.name }}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu v-for="route in group.routes" :key="route.name">
            <SidebarMenuItem>
              <SidebarMenuButton
                as-child
                :is-active="activeRoute.name === route.name"
                @click="handleNavigate(route.name)"
              >
                <div>
                  <component :is="route.meta?.icon" />
                  <span>{{ route.name }}</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <SidebarMenuButton>
                <User /> {{ session.data?.user.email }}
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              class="w-[--reka-popper-anchor-width]"
            >
              <DropdownMenuItem @click="authStore.logout"
                >Logout</DropdownMenuItem
              >
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>

<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { GalleryVerticalEnd, Home, ListStart, User } from "lucide-vue-next";
import { appRoutes } from "@/router";
import { useAuthStore } from "@/stores/auth.store";
import { computed, onBeforeMount, ref } from "vue";
import {
  isNavigationFailure,
  NavigationFailureType,
  useRoute,
  useRouter,
  type RouteRecordName,
  type RouteRecordRaw,
} from "vue-router";
import { SIDEBARGROUPS } from "@/constants";
import type { Subject } from "@casl/ability";
import { authClient } from "@/lib/auth.utils";
import { storeToRefs } from "pinia";

type GroupedRoute = {
  name: string;
  routes: RouteRecordRaw[];
};

const { openMobile, setOpenMobile } = useSidebar();
const session = authClient.useSession();
const authStore = useAuthStore();
const activeRoute = useRoute();
const router = useRouter();
const groupedRoutes = ref<GroupedRoute[]>([]);

onBeforeMount(async () => {
  await authStore.session.refetch();
  Object.values(SIDEBARGROUPS).forEach((group) => {
    const routes = {
      name: group,
      routes: appRoutes.filter((route) => {
        if (!authStore.getPermissions.can("view", route.name as Subject))
          return false;
        return route.meta ? route.meta.group === group : false;
      }),
    };
    if (routes.routes.length) groupedRoutes.value.push(routes);
  });
});

async function handleNavigate(name: RouteRecordName) {
  if (openMobile) setOpenMobile(false);
  router.push({ name });
}
</script>
