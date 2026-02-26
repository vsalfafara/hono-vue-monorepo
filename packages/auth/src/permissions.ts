import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

const statement = {
  ...defaultStatements,
  tasks: ["create", "read", "list", "update", "delete"],
};

export const ac = createAccessControl(statement);

export const user = ac.newRole({
  tasks: ["create", "read", "list", "update", "delete"],
});

export const admin = ac.newRole({
  tasks: ["create", "read", "list", "update", "delete"],
  ...adminAc.statements,
});

/**
 * Type of data when passing permission data to adminMiddleware
 */
export type Permission = {
  [key: string]: string[];
};
