import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        "gray-700": 'rgb(64,65,78)',
        "gray-800": "rgba(52,53,65,1)",
        "gray-900": 'rgb(32,33,35)',
      },
      width: {
        '280': '280px',
      },
      backgroundImage: {
        'vert-dark-gradient': 'linear-gradient(180deg, rgba(53, 55, 64, 0), #353740 58.85%)',
      }
    },
  },
  plugins: [
    require('tailwind-icones-plugin'),
  ],
} satisfies Config;
