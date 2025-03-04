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
        'banner1': "url('/images/banner1.jpg')",
        "banner2": "url('/images/banner2.jpg')",
        'vban1':"url('/images/vban1.jpg')",
        'vban2':"url('/images/vban2.jpg')",
        'patternBg':"url('/images/pattern.png')",
      },
      colors:{
        customBlue:"#08194A",
        customeRed:"#EE0D09"
        
      },
      boxShadow: {
        'full': '0 0 13px 0 rgba(0, 0, 0, 0.1)', // Custom shadow for all four sides
      },
    },
   
  },
  plugins: [],
};
export default config;
