<template>
  <Button variant="ghost" size="icon" @click="toggleDark()">
    <component :is="isDark ? Moon : Sun" />
  </Button>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { useDark, useToggle } from "@vueuse/core";
import { Moon, Sun } from "lucide-vue-next";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>
