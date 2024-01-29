import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "tailwind.config.js": path.resolve(__dirname, "tailwind.config.js"),
    },
  },
  build: {
    outDir: `../my_app/public/vgm_project`,
    emptyOutDir: true,
    target: 'es2021',
    commonjsOptions: {
      include: [/tailwind.config.js/, /node_modules/],
    },
  },
  optimizeDeps: {
    include: ['feather-icons', 'showdown',"tailwind.config.js"],
  },
  server: {
    port: 8001
  },
  preview: {
    port: 8080
  }
})
