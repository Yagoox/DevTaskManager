// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default {
  content: ['./frontend/src/**/*.{html,js,jsx,ts,tsx}'], 
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        primary: 'hsl(var(--primary))',
        'primary-foreground': 'hsl(var(--primary-foreground))',
        'primary-hover': 'hsl(var(--primary-hover))',

        secondary: 'hsl(var(--secondary))',
        'secondary-foreground': 'hsl(var(--secondary-foreground))',
        'secondary-hover': 'hsl(var(--secondary-hover))',

        surface: 'hsl(var(--surface))',
        input: 'hsl(var(--input))',

        textPrimary: 'hsl(var(--textPrimary))',
        textSecondary: 'hsl(var(--textSecondary))',

        accent: 'hsl(var(--accent))',
        'accent-foreground': 'hsl(var(--accent-foreground))',

        error: 'hsl(var(--error))',
        'error-foreground': 'hsl(var(--error-foreground))',

        
        status: {
          todo: '#A855F7', // roxo
          inProgress: '#F97316', // laranja
          completed: '#10B981', // vverde
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
