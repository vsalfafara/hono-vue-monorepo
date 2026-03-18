import client from "@packages/rpc";
import { ref } from "vue";
import { toast } from "vue-sonner";

function delay(seconds: number) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
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
    response = params ? await fn(params) : await fn();
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
