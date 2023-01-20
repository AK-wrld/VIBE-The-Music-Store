import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from 'path'
export default defineConfig({
  resolve: {
    alias: [
      {
        find: "common",
        replacement: resolve(__dirname, "src/common"),
        '~bootstrap': resolve(__dirname, 'node_modules/bootstrap'),
      },
    ],
  },

  plugins: [react()],
});