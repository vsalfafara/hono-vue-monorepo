import client from "@packages/rpc";
import { ref } from "vue";
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
  const loading = ref(false);

  const execute = async (fn: Function, params = {}) => {
    loading.value = true;

    let response = null;
    await delay(1000);
    if (params) response = await fn(params);
    else response = await fn();
    loading.value = false;

    if (!response.ok) {
      toast.error("Something went wrong");
      return;
    }
    return await response.json();
  };

  return {
    loading,
    execute,
  };
}
