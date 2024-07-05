import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
 
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // server:{
  //   proxy:{
  //     "/api":{
  //       target:"https://potential-space-succotash-j7x4wrqqphpp4v-5000.app.github.dev"
  //     }
  //   }
  // }
})