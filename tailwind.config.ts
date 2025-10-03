import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "home-img": "url('/images/home-img.jpg')",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        appear: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slide: {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0%)" },
        },
      },
      animation: {
        appear: "appear 1s ease-in-out",
        slide: "slide 750ms ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
