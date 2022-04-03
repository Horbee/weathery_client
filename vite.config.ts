import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";


import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      workbox: {
        sourcemap: true,
      },
      includeAssets: ["favicon.png", "favicon.ico", "robots.txt"],
      manifest: {
        name: "Weathery",
        short_name: "Weathery",
        description: "What is the weather like today?",
        theme_color: "#ffffff",
        icons: [
          {
            src: "favicon.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "favicon.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "favicon.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
