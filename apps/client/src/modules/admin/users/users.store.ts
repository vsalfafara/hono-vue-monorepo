import { defineStore } from "pinia";
import { ref } from "vue";
import type { User } from "./users.types";
import { apiClient, useApi } from "@/lib/api.utils";

export const useUserStore = defineStore("users", () => {
  const data = ref<User[]>([]);
  const { loading, execute } = useApi();

  async function fetchUsers() {
    data.value = await execute(apiClient.users.$get);
  }

  function $reset() {
    data.value = [];
  }

  return {
    data,
    loading,
    execute,
    fetchUsers,
    $reset,
  };
});
