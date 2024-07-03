/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend:{
      fontFamily:{
        'custom-font':["sans-serif"],
        'custom-font-2':["Josefin Sans"]
      },
      colors:{
        'custom-b':'hsl(220, 98%, 61%)',
        'custom-h':'hsl(235, 19%, 35%)',
      },
    }
  },
  plugins: [],
}

