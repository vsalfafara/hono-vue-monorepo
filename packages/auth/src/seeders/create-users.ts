import auth from "../auth.runtime";

/** Use this type as the createUser function gets a type error otherwise */
type Body = {
  name: string;
  email: string;
  password: string | undefined;
  role: "admin" | "user";
};

/**
 * Seeder function to create the first user account
 */
async function createUser() {
  try {
    const body: Body = {
      name: "User",
      email: "user@localhost.test",
      password: "password",
      role: "user",
    };
    await auth.api.createUser({
      body,
    });
    console.log("User account created");
  } catch (error) {
    console.error("Error creating user account: ", error);
    process.exit(1);
  }
}

/**
 * Seeder function to create the first user account
 */
async function createAdmin() {
  try {
    const body: Body = {
      name: "Admin",
      email: "admin@localhost.test",
      password: "password",
      role: "admin",
    };
    await auth.api.createUser({
      body,
    });
    console.log("Admin account created");
  } catch (error) {
    console.error("Error creating admin account: ", error);
    process.exit(1);
  }
}

async function run() {
  await createAdmin();
  await createUser();
  process.exit(0);
}

run();
