import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5', // Soft Indigo
        secondary: '#64748B', // Cool Slate
        accent: '#F43F5E', // Rosy Pink
        lightBackground: '#F3F4F6', // Light Grayish White
        darkBackground: '#1E293B', // Deep Slate
        surface: '#D1D5DB', // Muted Light Gray
        primaryText: '#374151', // Deep Charcoal
        mutedText: '#9CA3AF', // Warm Gray
        success: '#22C55E', // Vibrant Green
        warning: '#EAB308', // Golden Yellow
        error: '#DC2626', // Crimson Red
      },
    },
  },
  
  plugins: [],
} satisfies Config;
