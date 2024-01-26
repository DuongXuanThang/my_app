// vite.config.ts
import { defineConfig } from "file:///home/vgm/frappe-bench/apps/my_app/VGM-project/node_modules/vite/dist/node/index.js";
import react from "file:///home/vgm/frappe-bench/apps/my_app/VGM-project/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "/home/vgm/frappe-bench/apps/my_app/VGM-project";
var vite_config_default = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "src"),
      "tailwind.config.js": path.resolve(__vite_injected_original_dirname, "tailwind.config.js")
    }
  },
  build: {
    outDir: `../mbw_dms/public/mbw_fe`,
    emptyOutDir: true,
    target: "es2021",
    commonjsOptions: {
      include: [/tailwind.config.js/, /node_modules/]
    }
  },
  optimizeDeps: {
    include: ["feather-icons", "showdown", "tailwind.config.js"]
  },
  server: {
    port: 8001
  },
  preview: {
    port: 8080
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS92Z20vZnJhcHBlLWJlbmNoL2FwcHMvbXlfYXBwL1ZHTS1wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS92Z20vZnJhcHBlLWJlbmNoL2FwcHMvbXlfYXBwL1ZHTS1wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3ZnbS9mcmFwcGUtYmVuY2gvYXBwcy9teV9hcHAvVkdNLXByb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjXCIpLFxuICAgICAgXCJ0YWlsd2luZC5jb25maWcuanNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJ0YWlsd2luZC5jb25maWcuanNcIiksXG4gICAgfSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICBvdXREaXI6IGAuLi9tYndfZG1zL3B1YmxpYy9tYndfZmVgLFxuICAgIGVtcHR5T3V0RGlyOiB0cnVlLFxuICAgIHRhcmdldDogJ2VzMjAyMScsXG4gICAgY29tbW9uanNPcHRpb25zOiB7XG4gICAgICBpbmNsdWRlOiBbL3RhaWx3aW5kLmNvbmZpZy5qcy8sIC9ub2RlX21vZHVsZXMvXSxcbiAgICB9LFxuICB9LFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBpbmNsdWRlOiBbJ2ZlYXRoZXItaWNvbnMnLCAnc2hvd2Rvd24nLFwidGFpbHdpbmQuY29uZmlnLmpzXCJdLFxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiA4MDAxXG4gIH0sXG4gIHByZXZpZXc6IHtcbiAgICBwb3J0OiA4MDgwXG4gIH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTRULFNBQVMsb0JBQW9CO0FBQ3pWLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFGakIsSUFBTSxtQ0FBbUM7QUFJekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLEtBQUs7QUFBQSxNQUNsQyxzQkFBc0IsS0FBSyxRQUFRLGtDQUFXLG9CQUFvQjtBQUFBLElBQ3BFO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsYUFBYTtBQUFBLElBQ2IsUUFBUTtBQUFBLElBQ1IsaUJBQWlCO0FBQUEsTUFDZixTQUFTLENBQUMsc0JBQXNCLGNBQWM7QUFBQSxJQUNoRDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNaLFNBQVMsQ0FBQyxpQkFBaUIsWUFBVyxvQkFBb0I7QUFBQSxFQUM1RDtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxFQUNSO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
