import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  base: "./",
  server: {
    watch: {
      ignored: [
        "**/.gradle/**",
        "**/.jdks/**",
        "**/Android/**",
      ],
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
