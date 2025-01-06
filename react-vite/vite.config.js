import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig((mode) => ({
  plugins: [
    react(),
    eslintPlugin({
      lintOnStart: true,
      failOnError: mode === "production",
    }),
    nodePolyfills({protocolImports: true})
  ],
  server: {
    open: true,
    proxy: {
      "/api": "http://127.0.0.1:7000",
    },
  },
}));
