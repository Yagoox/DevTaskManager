// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { crx } from '@crxjs/vite-plugin';
import manifest from './frontend/src/manifest.config';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    crx({ manifest }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './frontend/src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        background: 'frontend/src/pages/background/index.ts',
        main: path.resolve(__dirname, 'frontend/src/pages/Panel/index.html'),
      }
    }
  },
  server: {
    port: Number(process.env.VITE_PORT) || 5173, // Define a porta do servidor
    host: process.env.VITE_HOST || 'localhost', // Define o host do servidor
    hmr: {
      protocol: 'ws',
      host: process.env.VITE_HOST || 'localhost',
      port: Number(process.env.VITE_PORT) || 5173,
    },
  },
});
