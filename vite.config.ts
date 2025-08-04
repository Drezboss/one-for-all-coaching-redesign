import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      // Expose the public assets directory to the source code (if ever needed)
      "@assets": path.resolve(__dirname, "public", "attached_assets"),
    },
  },
  // root: path.resolve(__dirname, "client"), // <-- REMOVE or COMMENT OUT this line
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu']
        }
      }
    }
  },
  // Ensure Vite copies everything from the standard public folder (including `attached_assets`) to the build output
  publicDir: path.resolve(__dirname, "public")
});
