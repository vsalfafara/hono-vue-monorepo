import path from "node:path";
import vue from "@vitejs/plugin-vue";
import { defineConfig, loadEnv } from "vite";
import vueDevTools from "vite-plugin-vue-devtools";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: "../server/public",
    emptyOutDir: true,
  },
  plugins: [
    vue(),
    tailwindcss(),
    process.env.NODE_ENV === "development" ? vueDevTools() : undefined,
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:9999",
        changeOrigin: true,
      },
    },
  },
});
