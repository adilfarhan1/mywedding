/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gold: {
          DEFAULT: "#D4AF37",
          light: "#E5C158",
          dark: "#B5952F",
        },
        ivory: "#FFFFF0",
        blush: "#FFB6C1",
        beige: "#F5F5DC",
        charcoal: "#1A1A1A",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        serif: ["var(--font-playfair)"],
        arabic: ["var(--font-arabic)"],
      },
    },
  },
  plugins: [],
};
