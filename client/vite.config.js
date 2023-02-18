import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";
// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()]
// })

export default ({ command, mode }) => {
  // Load app-level env vars to node-level env vars.
  // const env = loadEnv(mode, path.resolve(__dirname, "../"), "");
  // process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  return defineConfig({
    define: {
      // __APP_ENV__: env,
      "process.env": { ...process.env },
      global: 'window'
    },
    build: {
      target: ["es2020"],
    },
    optimizeDeps: {
      esbuildOptions: {
        target: "es2020",
        define: {
          global: 'globalThis'
        }
      },
    },
    envDir: path.resolve(__dirname, "../"),
    plugins: [react(), svgr()],
    resolve: {
      alias: [
        // node-fetch breaks with Vite because it's used on the client, and we should not.
        {
          find: "node-fetch",
          replacement: "axios",
        },
        { find: "@assets", replacement: path.resolve(__dirname, "src/assets") },
        { find: "@utils", replacement: path.resolve(__dirname, "src/utils") },
        { find: "@hooks", replacement: path.resolve(__dirname, "src/hooks") },
        {
          find: "@context",
          replacement: path.resolve(__dirname, "src/context"),
        },
        {
          find: "@contract",
          replacement: path.resolve(__dirname, "src/contract"),
        },
      ],
    },
    server: {
      host: "0.0.0.0",
    },
  });
};
