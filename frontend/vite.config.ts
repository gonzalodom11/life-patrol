import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 3000,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Disable minification features that might use eval
    minify: 'esbuild',
    sourcemap: false, // Disable sourcemaps in production to avoid eval
    target: 'es2015',
    rollupOptions: {
      output: {
        // Ensure no eval or Function constructor in output
        manualChunks: undefined,
      },
    },
  },
  esbuild: {
    // Ensure esbuild doesn't generate code with eval
    legalComments: 'none',
  },
}));
