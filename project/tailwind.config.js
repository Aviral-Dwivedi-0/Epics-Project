/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      minHeight: {
        screen: ["100vh", "calc(var(--vh, 1vh) * 100)"],
      },
    },
  },
  plugins: [],
};
