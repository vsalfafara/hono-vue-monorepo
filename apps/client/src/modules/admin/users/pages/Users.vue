<template>
  <div>
    <PageHeader title="Users" description="Here's a list of all users" />
    <UsersTable />
  </div>
</template>

<script setup lang="ts">
import { PageHeader } from "@/components/custom/page-header";
import UsersTable from "../components/UsersTable.vue";
</script>
