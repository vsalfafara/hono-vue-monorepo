import { parseEnv } from "./env";

//@ts-expect-error
export default parseEnv(import.meta.env || process.env);
