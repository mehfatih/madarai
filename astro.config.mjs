// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://madarai.co",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "tr", "ar"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    react(),
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en-US",
          tr: "tr-TR",
          ar: "ar-SA",
        },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});