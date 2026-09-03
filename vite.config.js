import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

// Serve admin.html when /admin is requested (SPA dev + preview)
function adminRoutePlugin() {
  return {
    name: 'admin-route',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/admin' || req.url === '/admin/') {
          res.setHeader('Content-Type', 'text/html');
          res.end(fs.readFileSync(resolve(__dirname, 'admin.html')));
          return;
        }
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/admin' || req.url === '/admin/') {
          res.setHeader('Content-Type', 'text/html');
          res.end(fs.readFileSync(resolve(__dirname, 'dist/admin.html')));
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig({
  root: '.',
  publicDir: 'public',
  server: { port: 5173, host: true },
  preview: { port: 4173, host: true },
  build: {
    outDir: 'dist',
    target: 'es2020',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin.html'),
      },
    },
  },
  plugins: [adminRoutePlugin()],
});
