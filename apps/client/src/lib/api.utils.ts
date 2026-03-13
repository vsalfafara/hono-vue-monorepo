import client from "@packages/rpc";
import { ref, watchEffect } from "vue";
import { toast } from "vue-sonner";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const apiClient = client("/api", {
  init: {
    credentials: "include",
  },
});

export function useApi() {
  const error = ref<{ message: string } | null>(null);
  const loading = ref(false);

  const execute = async (fn: Function) => {
    loading.value = true;
    error.value = null;

    const response = await fn();
    loading.value = false;

    if (!response.ok) {
      error.value = await response.json();
      return;
    }
    return await response.json();
  };

  watchEffect(() => {
    if (error.value) toast.error(error.value.message);
  });

  return {
    error,
    loading,
    execute,
  };
}
