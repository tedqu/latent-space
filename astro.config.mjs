import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static",
  trailingSlash: "always",
  site: "https://tedqu.cc",
  redirects: {
    "/perspectives/": "/signals/",
    "/lab/": "/signals/",
  },
  devToolbar: { enabled: false },
  server: { host: "127.0.0.1", port: 4321 },
});
