/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Roboto Mono, monospace",
          { fontFeatureSettings: '"cv11", "ss01"' },
        ],
      },
    },
  },
  plugins: [],
};
