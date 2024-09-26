// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default {
  content: ['./frontend/src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6', // Azul principal
        secondary: '#6366F1', // Azul secundário para destaques
        background: '#F3F4F6', // Cinza claro para o fundo
        surface: '#FFFFFF', // Branco para cartões e modais
        textPrimary: '#1F2937', // Cinza escuro para textos
        textSecondary: '#4B5563', // Cinza médio para textos secundários
        accent: '#10B981', // Verde para sucesso
        error: '#EF4444', // Vermelho para erros
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Fonte moderna e limpa
      },
    },
  },
  plugins: [],
} satisfies Config;
