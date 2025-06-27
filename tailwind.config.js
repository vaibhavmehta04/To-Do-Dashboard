/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")], // 👈 Add this line
  daisyui: {
    themes: ["light", "dark"], // 👈 Optional, DaisyUI themes
  },
};
