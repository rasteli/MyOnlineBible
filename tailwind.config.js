/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx", "./index.html"],
  theme: {
    colors: {
      "gray-50": "#F8F8F2",
      "gray-100": "#E1E1E1",
      "gray-300": "#D2D2D2",
      "gray-500": "#747474",
      "gray-600": "#535356",
      "gray-700": "#202024"
    },
    fontFamily: {
      serif: ["Averia Serif Libre", "serif"]
    },
    fontSize: {
      md: "1rem",
      lg: "1.25rem",
      xl: "1.5rem",
      "2xl": "2rem"
    },
    extend: {
      boxShadow: {
        mob: "2px 2px 8px 0px rgba(0,0,0,0.3)"
      },
      gridTemplateColumns: {
        "269-1fr": "269px 1fr"
      }
    }
  },
  plugins: []
}
