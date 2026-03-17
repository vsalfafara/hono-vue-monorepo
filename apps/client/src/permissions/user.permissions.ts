import { ROLES } from "@/constants";
import { AbilityBuilder, createMongoAbility } from "@casl/ability";

export function getUserPermissions(role: string | null | undefined) {
  const {
    build,
    can: allow,
    cannot: forbid,
  } = new AbilityBuilder(createMongoAbility);

  allow("view", "Tasks");
  if (role === ROLES.ADMIN) allow("view", "Users");

  return build();
}
