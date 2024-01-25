import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import mix from "vite-plugin-mix";

export default defineConfig({
  root: './',
  base: '/',
  mode: 'development',
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ["md-linedivider"].includes(tag),
        },
      },
    }),
    mix({
      handler: "./server.mjs",
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        // list all HTML files that contain Vue components
        index: "./index.html",
      },
    },
  },
});
