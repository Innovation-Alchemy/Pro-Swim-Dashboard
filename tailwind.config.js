/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1e5c97",
        secondary: "#a0cffc"
      }
    },
  },
  plugins: [],
};
