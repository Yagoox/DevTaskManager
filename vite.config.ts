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
    port: Number(process.env.VITE_PORT) || 5173, // Porta do servidor frontend
    host: process.env.VITE_HOST || 'localhost', // Host do servidor frontend
    hmr: {
      protocol: 'ws',
      host: process.env.VITE_HOST || 'localhost',
      port: Number(process.env.VITE_PORT) || 5173,
    },
    proxy: { // Adicione esta seção para configurar o proxy
      '/api': {
        target: 'http://127.0.0.1:5146', // URL do backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
