import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import manifest from './src/manifest.config'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    crx({ manifest }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/pages/Panel/PrinciPanel.html'),
      }
    }
  },
  //server: {
    //host: '0.0.0.0', // Permite conexões de qualquer IP
   // port: 2000,
   // cors: {
    //  origin: '*', // Considere restrições em produção
     // methods: ['GET', 'POST', 'PUT', 'DELETE'],
     // allowedHeaders: ['Content-Type', 'Authorization'],
      //credentials: true
   // },
   // hmr: {
    //  port: 2000, // Certifique-se de que a porta do HMR está correta
   // },
  //}
});