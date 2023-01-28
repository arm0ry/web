import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()]
// })

export default ({command, mode }) => {
  // Load app-level env vars to node-level env vars.
  // const env = loadEnv(mode, process.cwd(), "");
  // process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig({
    // define: {
    //   __APP_ENV__: env.APP_ENV,
    // },
    envDir: path.resolve(__dirname, "../"),
    plugins: [react()],
    resolve: {
      alias: [
        // node-fetch breaks with Vite because it's used on the client, and we should not.
        {
          find: "node-fetch",
          replacement: "axios",
        },
        { find: '@utils', replacement: path.resolve(__dirname, 'src/utils') },
        { find: '@context', replacement: path.resolve(__dirname, 'src/context') },
        { find: '@contract', replacement: path.resolve(__dirname, 'src/contract') },
    ],
  },
  });
};

