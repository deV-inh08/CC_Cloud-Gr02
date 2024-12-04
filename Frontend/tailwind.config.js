/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.htlm', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins'],
     },
     colors: {
      primaryColor: "#DB4444",
      bgProducts: '#F5F5F5'
     }
    },
  },
  plugins: [],
}

