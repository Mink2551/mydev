import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // https://colorhunt.co/palette/fbf5e5c890a7a35c7a212121
        palette1: "#212121",
        palette2: "#A35C7A",
        palette3: "#C890A7",
        palette4: "#FBF5E5",
      },
    },
  },
  plugins: [],
} satisfies Config;
