/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'bleuElectrique': '#3932FF',
      'fuschia': '#FF00C8',
      'violet':'#A76ED2',
      'white': '#FFFFFF'
    },
    fontFamily: {
        Gelasio: ["Gelasio"],
      },
  },
  plugins: [],
}

