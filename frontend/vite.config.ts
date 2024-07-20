import path from "path";
import react from "@vitejs/plugin-react";
import {defineConfig} from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://studious-halibut-j49p766x6rx2qrxr-5000.app.github.dev/",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, "/"),
      },
    },  
  },
});
