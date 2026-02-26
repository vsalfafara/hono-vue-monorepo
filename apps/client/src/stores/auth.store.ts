import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useStorage } from "@vueuse/core";
import { useRouter } from "vue-router";
import type { AbilityTuple, MongoAbility, MongoQuery } from "@casl/ability";
import { getUserPermissions } from "@/permissions/user.permissions";
import { authClient } from "@/lib/auth.utils";
import { toast } from "vue-sonner";
import type { Session, User } from "better-auth";
import type { Credentials } from "@/types/auth.types";
import type { UserWithRole } from "better-auth/plugins";

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();
  const session = authClient.useSession();
  const getSession = computed<Session | undefined>(
    () => authClient.useSession().value.data?.session,
  );
  const getUser = computed<User | undefined>(
    () => authClient.useSession().value.data?.user,
  );
  const isAuthenticated = computed<boolean>(
    () => !!authClient.useSession().value,
  );
  const getPermissions = computed(() =>
    getUserPermissions(session.value.data?.user.role),
  );

  async function login(credentials: Credentials) {
    const { email, password } = credentials;
    const response = await authClient.signIn.email({
      email,
      password,
    });

    if (response.error) {
      toast.error(response.error.message!);
      return;
    }
    router.replace({ name: "Home" });
  }

  async function logout() {
    await authClient.signOut();
    await router.replace({ name: "Login" });
  }

  return {
    session,
    getSession,
    getUser,
    isAuthenticated,
    getPermissions,
    login,
    logout,
  };
});
