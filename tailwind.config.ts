import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      display: ["webkit-box"],
      container: {
        center: true, // Optional: To center the container
        padding: "0 0.5rem", // Optional: Add padding around the container
        screens: {
          // Customize max-width for different breakpoints
          sm: "100%", // Example: 100% for small screens
          md: "720px",
          lg: "960px",
          xl: "1120px",
          // "2xl": "1440px",
        },
      },
      colors: {
        red: "var(--color-red)",
        background: "var(--background)",
        yellow: "var(--color-yellow)",
        green: "var(--color-green)",
        tertiary: "var(--tertiary)",
        blue: {
          DEFAULT: "var(--color-blue)",
        },
        duck: {
          DEFAULT: "var(--color-duck)",
        },
        "red-brown": {
          DEFAULT: "var(--color-red-brown)",
          background: "var(--color-red-brown)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          background: "var(--muted-background)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          background: "var(--color-blue)",
        },
        "cta-primary": {
          text: "var(--cta-primary-text)",
          "hover-text": "var(--cta-primary-hover-text)",
          "hover-bg": "var(--cta-primary-hover-bg)",
          bg: "var(--cta-primary-bg)",
          disable: "var(--cta-primary-disable)",
        },
        "cta-secondary": {
          text: "var(--cta-secondary-text)",
          "hover-text": "var(--cta-secondary-hover-text)",
          "hover-bg": "var(--cta-secondary-hover-bg)",
          bg: "var(--cta-secondary-bg)",
          disable: "var(--cta-secondary-disable)",
        },
        "cta-stroke": {
          text: "var(--cta-stroke-text)",
          "hover-text": "var(--cta-stroke-hover-text)",
          "hover-bg": "var(--cta-stroke-hover-bg)",
          bg: "var(--cta-stroke-bg)",
          disable: "var(--cta-stroke-disable)",
        },
        "cta-emphasize": {
          text: "var(--cta-emphasize-text)",
          "hover-text": "var(--cta-emphasize-hover-text)",
          "hover-bg": "var(--cta-emphasize-hover-bg)",
          bg: "var(--cta-emphasize-bg)",
          disable: "var(--cta-emphasize-disable)",
        },
        "cta-stroke-blue": {
          text: "var(--cta-stroke-blue-text)",
          "hover-text": "var(--cta-stroke-blue-hover-text)",
          "hover-bg": "var(--cta-stroke-blue-hover-bg)",
          bg: "var(--cta-stroke-blue-bg)",
          disable: "var(--cta-stroke-blue-disable)",
        },
        "light-gray": {
          DEFAULT: "var(--light-gray-background)",
          background: "var(--light-gray-background)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          background: "var(--secondary-background)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          background: "var(--accent-background)",
        },
        text: "rgb(var(--color-text) / <alpha-value>)",
        card: {
          DEFAULT: "var(--card)",
          background: "var(--card-background)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          background: "var(--popover-background)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          background: "var(--destructive-background)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
      },
      fontFamily: {
        "frutiger-bold": ["var(--font-frutiger-bold)"],
        helvetical: ["var(--font-helvetical)"],
        "helvetical-bold": ["var(--font-helvetical-bold)"],
        lora: ["var(--font-lora)"],
      },
      fontSize: {
        xs: "var(--text-xs)", // 12px
        sm: "var(--text-sm)", // 14px
        md: "var(--text-md)", // 16px
        lg: "var(--text-lg)", // 18px
        xl: "var(--text-xl)", // 20px
        "2xl": "var(--text-2xl)", // 24px
        "3xl": "var(--text-3xl)", // 32px
        "4xl": "var(--text-4xl)", // 56px
      },
      lineHeight: {
        sm: "var(--leading-sm)",
        md: "var(--leading-md)",
        lg: "var(--leading-lg)",
      },
      keyframes: {
        slideDown: {
          from: { height: '0', opacity: '0' },
          to: { height: "var(--radix-collapsible-content-height)", opacity: '1' },
        },
        slideUp: {
          from: { height: "var(--radix-collapsible-content-height)", opacity: '1' },
          to: { height: '0', opacity: '0' },
        },
      },
      animation: {
        slideDown: "slideDown 300ms ease-out",
        slideUp: "slideUp 300ms ease-out",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      width: {
        "content": "max-content",
      }
    },
  },
  plugins: [
    require("tailwindcss/plugin")(
      ({ addBase, theme }: { addBase: any; theme: any }) => {
        addBase({
          html: { color: theme("colors.text") },
        });
      }
    ),
    require("tailwindcss-animate"),
  ],
} satisfies Config;
