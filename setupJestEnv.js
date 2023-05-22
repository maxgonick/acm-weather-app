// __test__/setupEnv.js
import { loadEnvConfig } from "@next/env";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const projectDir = process.cwd();
  loadEnvConfig(projectDir);
};
