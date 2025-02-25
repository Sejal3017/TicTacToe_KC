/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Ensures Tailwind scans JSX and TSX files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
