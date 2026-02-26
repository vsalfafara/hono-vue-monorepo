<template>
  <header
    class="bg-sidebar sticky top-0 flex h-16 w-full shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
  >
    <div class="flex w-full items-center justify-between gap-2 px-4">
      <Button
        data-sidebar="trigger"
        data-slot="sidebar-trigger"
        variant="ghost"
        size="icon"
        @click="toggleSidebar"
      >
        <PanelLeftClose v-if="open" />
        <PanelLeftOpen v-else />
        <span class="sr-only">Toggle Sidebar</span>
      </Button>
      <DarkMode />
    </div>
  </header>
</template>

<script setup lang="ts">
import { DarkMode } from "@/components/custom/dark-mode";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftClose, PanelLeftOpen } from "lucide-vue-next";
const { toggleSidebar, open } = useSidebar();
</script>
