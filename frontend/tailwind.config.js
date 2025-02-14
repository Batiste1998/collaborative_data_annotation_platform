/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bleuElectrique': '#3932FF',
        'roseFond': '#D26EBD',
        'roseBordure': '#FF00C8',
        'violetFond': '#A76ED2',
        'violetBordure': '#AE00FF'
      }
    },
    fontFamily: {
      Gelasio: ["Gelasio"],
      Roboto: ["Roboto"]
    }
  },
  plugins: [],
}
