module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary-deep': '#1B2A31',
        'primary-med': '#38475C',
        'primary-light': '#8CA5B1',
        'accent-teal': '#33897F',
        'accent-green': '#6D7841',
        'secondary-text': '#464646',
        'tertiary-text': '#A0A0A0',
        'background-colour': '#F5F5F5'
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"]
      }
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }
}
