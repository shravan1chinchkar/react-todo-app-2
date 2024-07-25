/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend:{
      screens:{
        'c3-xl':'1450px',
        'c1-xl':'1400px',
        'c2-xl':'1200px',
        'c1-lg':'1120px',
        'c-lg':'1000px',
        'c1-md':'900px',
        'c2-md':'800px',
        'c1-sm':'700px',
        'c2-sm':'600px',
        'c3-sm':'550px',
        'c4-sm':'450px',
        'c5-sm':'400px',
        'c6-sm':'340px',
        'c7-sm':'200px',
      },
      fontFamily:{
        'custom-font':["sans-serif"],
        'custom-font-2':["Josefin Sans"]
      },
      colors:{
        'custom-b':'hsl(220, 98%, 61%)',
        'custom-h':'hsl(235, 19%, 35%)',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, hsl(192, 100%, 67%), hsl(280, 87%, 65%))',
      },
    }
  },
  plugins: [],
}

