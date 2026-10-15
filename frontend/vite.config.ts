import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import {sanityContentUrl} from "./server/worker.js";

const sanityContent = {
  name: "sanity-content",
  configureServer(server: {middlewares: {use: (path: string, handler: (request: unknown, response: import("node:http").ServerResponse) => void) => void}}) {
    server.middlewares.use("/api/content", async (_request, response) => {
      try {
        const sanity = await fetch(sanityContentUrl, {headers: {accept: "application/json"}});
        response.statusCode = sanity.status;
        response.setHeader("content-type", "application/json; charset=utf-8");
        response.end(await sanity.text());
      } catch {
        response.statusCode = 502;
        response.end(JSON.stringify({error: "No fue posible consultar el contenido."}));
      }
    });
  },
};

export default defineConfig({
  plugins: [react(), tailwindcss(), sanityContent],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: false,
    host: true,
    allowedHosts: ["localhost", "127.0.0.1"],
    fs: { strict: true, deny: ["**/.*"] },
  },
});
