import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#12141A",
        cloud: "#EDEAE2",
        paper: "#FAF9F6",
        marigold: {
          DEFAULT: "#E8A33D",
          dim: "#C9862A",
        },
        teal: {
          DEFAULT: "#2F7A78",
          dim: "#215857",
        },
        slate: {
          DEFAULT: "#4B5160",
          light: "#8A8F9C",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-plex)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1180px",
      },
    },
  },
  plugins: [],
};
export default config;
