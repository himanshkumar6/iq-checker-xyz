import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import Sitemap from "vite-plugin-sitemap";
import { BLOG_ARTICLES } from "./constants";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  
  const staticRoutes = [
    '/iq-test',
    '/reaction-test',
    '/mental-age-test',
    '/username-iq-checker',
    '/brain-games',
    '/brain-games/pattern-recognition',
    '/brain-games/speed-math',
    '/brain-games/memory-grid',
    '/blog',
    '/about-us',
    '/privacy-policy',
    '/terms',
    '/disclaimer',
    '/contact',
    '/dmca',
  ];

  const dynamicRoutes = BLOG_ARTICLES.map(article => `/blog/${article.slug}`);

  return {
    server: {
      port: 3000,
      host: "0.0.0.0",
    },
    plugins: [
      react(), 
      tailwindcss(),
      Sitemap({
        hostname: 'https://iqcheckerxyz.compresspdfto200kb.online',
        dynamicRoutes: [...staticRoutes, ...dynamicRoutes],
        readable: true,
      })
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
  };
});

