/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        shine: {
          "0%": { "background-position": "100%" },
          "100%": { "background-position": "-100%" },
        },
        gradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-20%)" },
        },
      },
      animation: {
        shine: "shine 1s linear infinite",
        gradient: "gradient 8s linear infinite",
        marquee: "marquee 30s linear infinite",
      },
      backgroundColor: {
        glass: "rgba(0, 0, 0, 0.2)",
      },
      borderColor: {
        glass: "rgba(255, 255, 255, 0.1)",
      },
    },
  },
  plugins: [],
};
