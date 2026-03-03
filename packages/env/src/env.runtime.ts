import { parseEnv } from "./env";

//@ts-expect-error
export default parseEnv(process.env);
