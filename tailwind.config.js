import { keyframes } from 'motion';

export default {content:['./index.html','./src/**/*.{js,jsx,ts,tsx}'],theme:{extend:{}},plugins:[]};
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {

        // card-bg
        devotion: {
          bg: "#0F1117",
          surface: "rgba(255, 255, 255, 0.05)",
          gold: "#EAB308",
          purple: "#A855F7",
        },

        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        "card-border": "hsl(var(--card-border))",
        sidebar: "hsl(var(--sidebar))",
        "sidebar-foreground": "hsl(var(--sidebar-foreground))",
        "sidebar-border": "hsl(var(--sidebar-border))",
        "sidebar-primary": "hsl(var(--sidebar-primary))",
        "sidebar-primary-foreground": "hsl(var(--sidebar-primary-foreground))",
        "sidebar-accent": "hsl(var(--sidebar-accent))",
        "sidebar-accent-foreground": "hsl(var(--sidebar-accent-foreground))",
        "sidebar-ring": "hsl(var(--sidebar-ring))",
        popover: "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",
        "popover-border": "hsl(var(--popover-border))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        "primary-border": "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        "secondary-border": "hsl(var(--secondary))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        "muted-border": "hsl(var(--muted))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        "accent-border": "hsl(var(--accent))",
        destructive: "hsl(var(--destructive))",
        "destructive-foreground": "hsl(var(--destructive-foreground))",
        "destructive-border": "hsl(var(--destructive))",
        "chart-1": "hsl(var(--chart-1))",
        "chart-2": "hsl(var(--chart-2))",
        "chart-3": "hsl(var(--chart-3))",
        "chart-4": "hsl(var(--chart-4))",
        "chart-5": "hsl(var(--chart-5))",
      },
      fontFamily: {
        sans: "var(--app-font-sans)",
        serif: "var(--app-font-serif)",
        mono: "var(--app-font-mono)",
      },
      borderRadius: {
        sm: "calc(var(--radius) - 4px)",
        md: "calc(var(--radius) - 2px)",
        lg: "var(--radius)",
        xl: "calc(var(--radius) + 4px)",
      },
      boxShadow: {
        "2xs": "var(--shadow-2xs)",
        xs: "var(--shadow-xs)",
        sm: "var(--shadow-sm)",
        DEFAULT: "var(--shadow)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        "2xl": "var(--shadow-2xl)",
      },

      backgroundImage: {
        'devotion-gradient': "radial-gradient(circle at 50% -20%, rgba(234, 179, 8, 0.15), transparent 50%), radial-gradient(circle at 0% 0%, rgba(168, 85, 247, 0.1), transparent 40%)",
      },
      keyframes: {
        shimmer: {
          '0%': { left: '-100%' },
          '100%': { left: '150%' },
        },
      },
      animation: {
        'spin-slow': 'spin 10s linear infinite',
        shimmer: 'shimmer 3.5s ease-out infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'), // nếu bạn dùng tw-animate-css
    require('tailwind-scrollbar')({ nocompatible: true }), // nếu bạn dùng tw-animate-css
  ],
};