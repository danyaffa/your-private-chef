/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        chefBlack: "#111111",
        chefGold: "#c8a96a",
        chefCream: "#f7f1e8"
      }
    }
  },
  plugins: []
};
