/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: "#e6f7fa",
          100: "#b3e8f2",
          200: "#80d9ea",
          300: "#4dcae2",
          400: "#1abbda",
          500: "#0e9bbf",
          600: "#0a7a99",
          700: "#075a73",
          800: "#043a4d",
          900: "#011a26",
          950: "#010d13",
        },
        deep: {
          50: "#e8ecf7",
          100: "#c5cee9",
          200: "#9eafdb",
          300: "#7790cd",
          400: "#5071bf",
          500: "#3a5ba6",
          600: "#2d4785",
          700: "#1f3364",
          800: "#121f43",
          900: "#060b22",
          950: "#020641",
        },
        coral: {
          300: "#FFB7C5",
          400: "#FE9AAE",
          500: "#FEB6C9",
        },
        seafoam: {
          300: "#BAE0E3",
          400: "#8FC0D0",
          500: "#6AA8B5",
        },
        biolum: {
          300: "#CDA7FF",
          400: "#B085E6",
          500: "#9366CC",
        },
        sand: {
          200: "#F5FCCD",
          300: "#EEFAAD",
          400: "#E5F78E",
        },
        kelp: {
          300: "#BAE3C3",
          400: "#8DD49B",
          500: "#60C573",
        },
        sunset: {
          300: "#FFCFA3",
          400: "#FFBF89",
          500: "#FFAF6F",
        },
      },
      fontFamily: {
        display: ["Oswald", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "gradient-ocean":
          "linear-gradient(to bottom, rgb(1,116,152) 0%, rgb(2,6,65) 100%)",
        "gradient-deep":
          "linear-gradient(to bottom, rgb(9,86,147) 0%, rgb(2,52,108) 50%, rgb(2,6,65) 100%)",
        "gradient-abyss":
          "linear-gradient(to bottom, #043a4d 0%, #020641 50%, #010d13 100%)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2s linear infinite",
        "bubble": "bubble 4s ease-in infinite",
        "wave": "wave 8s ease-in-out infinite",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "fade-in-down": "fadeInDown 0.6s ease-out forwards",
        "slide-in-left": "slideInLeft 0.6s ease-out forwards",
        "slide-in-right": "slideInRight 0.6s ease-out forwards",
        "scale-in": "scaleIn 0.5s ease-out forwards",
        "count-up": "countUp 2s ease-out forwards",
        "ripple": "ripple 1.5s ease-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        bubble: {
          "0%": { transform: "translateY(100%) scale(0.4)", opacity: "0" },
          "50%": { opacity: "0.6" },
          "100%": { transform: "translateY(-100vh) scale(1)", opacity: "0" },
        },
        wave: {
          "0%, 100%": { transform: "translateX(0) translateY(0)" },
          "25%": { transform: "translateX(-5px) translateY(-3px)" },
          "50%": { transform: "translateX(0) translateY(-5px)" },
          "75%": { transform: "translateX(5px) translateY(-3px)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        ripple: {
          "0%": { transform: "scale(1)", opacity: "0.4" },
          "100%": { transform: "scale(2.5)", opacity: "0" },
        },
      },
      boxShadow: {
        "ocean": "0 4px 30px rgba(14, 155, 191, 0.15)",
        "ocean-lg": "0 10px 50px rgba(14, 155, 191, 0.25)",
        "glow": "0 0 20px rgba(14, 155, 191, 0.3)",
        "glow-lg": "0 0 40px rgba(14, 155, 191, 0.4)",
        "card": "0 8px 32px rgba(0, 0, 0, 0.2)",
        "card-hover": "0 16px 48px rgba(0, 0, 0, 0.3)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  important: true,
};
