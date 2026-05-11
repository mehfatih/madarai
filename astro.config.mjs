import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  output: "server",
  adapter: cloudflare({
    platformProxy: { enabled: true }
  }),
  integrations: [react(), mdx()],
  vite: {
    plugins: [tailwindcss()]
  },
  site: "https://madarai.co",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "tr", "ar"],
    routing: { prefixDefaultLocale: false }
  }
});