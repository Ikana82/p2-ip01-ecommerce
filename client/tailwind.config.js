module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  darkMode: "media", // Coba ubah menjadi 'class' agar dark mode tidak aktif otomatis
};

export default {
  theme: {
    extend: {
      fontFamily: {
        hello: ["Hello", "sans-serif"],
      },
    },
  },
  plugins: [],
};
