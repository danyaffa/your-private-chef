/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F5F0EB",
        warmWhite: "#FFFDF9",
        gold: "#C8986E",
        goldLight: "#E8C9A0",
        goldDark: "#A67744",
        sage: "#7A9E7E",
        sageDark: "#5B7D5F",
        sageLight: "#B5D4B8",
        terracotta: "#C67D5B",
        terracottaLight: "#E8A88A",
        warm: "#8B6F4E",
        warmLight: "#A68B6B",
        charcoal: "#1C1C1C",
        softBrown: "#A09688",
        darkBg: "#1C1C1C",
        darkCard: "#242424",
        darkBorder: "#3A3530",
      },
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "Cambria", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        ultrawide: "0.35em",
      },
    },
  },
  plugins: [],
};
