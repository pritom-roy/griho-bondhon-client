/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF5A58',
        mytext: '#383126',
      },
      backgroundImage: {
        aboutus: "url('/aboutus.jpg')",
        contactus: "url('/contactus.jpg')",
      }

    },
  },
  plugins: [],
}