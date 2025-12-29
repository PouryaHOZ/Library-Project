import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
	  fontFamily: {
	    nahid: "var(--font-nahid)",
	    iransans: "var(--font-iransans)",
      bziba: "var(--font-bziba)",
      khodkar: "var(--font-khodkar)",
      morvarid: "var(--font-morvarid)",
	    iransansnum: "var(--font-iransans-num)",
	  },
    },
  },
  plugins: [],
};
export default config;
