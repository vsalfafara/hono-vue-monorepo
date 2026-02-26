import { parseEnv } from "./env";

//@ts-ignore
export default parseEnv(import.meta.env || process.env);
