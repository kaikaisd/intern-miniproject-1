import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import mix from "vite-plugin-mix";
const path = require('path')

export default defineConfig({
  root: './',
  base: '/',
  mode: 'development',
  plugins: [
    vue(),
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
  // define: {
  //   'process.env': {
  //     "development": "true",
  //   }
  // },
  resolve: {
    alias: {
      vue: path.resolve(__dirname, 'node_modules/vue'),
    },
  },
});
