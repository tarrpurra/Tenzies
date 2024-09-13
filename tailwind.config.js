/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'main-color':'#C7FFDA',
        'border-colors':'#9BB291',
        'Text-C':'#483C46',
        'back':'#E8E1EF',
        'one-more-Text':'#4a8fe7',
        'mint':'#D9FFF8'
      }
    },
  },
  plugins: [],
}

