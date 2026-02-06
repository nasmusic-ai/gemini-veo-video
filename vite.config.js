import { defineConfig } from "vite";

export default defineConfig({
  server: {
    watch: {
      ignored: [
        "**/.gradle/**",
        "**/.jdks/**",
        "**/Android/**",
      ],
    },
  },
});
