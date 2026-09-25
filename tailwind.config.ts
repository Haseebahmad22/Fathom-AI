import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark "space" marketing tokens (Section 5.2)
        space: {
          DEFAULT: "var(--bg-space, #0E0F1A)",
          2: "var(--bg-space-2, #1A1C2E)",
        },
        "text-on-dark": {
          DEFAULT: "var(--text-on-dark, #F5F5FA)",
          muted: "var(--text-on-dark-muted, #A6A6C1)",
        },
        coral: {
          DEFAULT: "var(--accent-coral, #FF6B5B)",
        },

        // App / product UI tokens (Section 5.2)
        app: {
          DEFAULT: "var(--bg-app, #FFFFFF)",
          subtle: "var(--bg-app-subtle, #F7F7FB)",
        },
        border: {
          subtle: "var(--border-subtle, #E7E7EF)",
        },
        text: {
          primary: "var(--text-primary, #171725)",
          secondary: "var(--text-secondary, #6B6B80)",
        },
        indigo: {
          DEFAULT: "var(--accent-indigo, #4E46DC)",
          light: "var(--accent-indigo-light, #8B85F5)",
          subtle: "var(--accent-indigo-subtle, #EEEDFC)",
        },

        // Functional states
        success: "var(--success, #1FA97A)",
        warning: "var(--warning, #F5A623)",
        danger: "var(--danger, #E8544E)",

        // Direct token mappings as CSS variables
        "bg-space": "var(--bg-space, #0E0F1A)",
        "bg-space-2": "var(--bg-space-2, #1A1C2E)",
        "accent-indigo": "var(--accent-indigo, #4E46DC)",
        "accent-indigo-light": "var(--accent-indigo-light, #8B85F5)",
        "accent-coral": "var(--accent-coral, #FF6B5B)",
        "bg-app": "var(--bg-app, #FFFFFF)",
        "bg-app-subtle": "var(--bg-app-subtle, #F7F7FB)",
        "border-subtle": "var(--border-subtle, #E7E7EF)",
        "text-primary": "var(--text-primary, #171725)",
        "text-secondary": "var(--text-secondary, #6B6B80)",
        "accent-indigo-subtle": "var(--accent-indigo-subtle, #EEEDFC)",
      },
      fontSize: {
        // Section 5.3 Typography scale
        "hero-headline": ["60px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "section-headline": ["36px", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "700" }],
        "card-title": ["17px", { lineHeight: "1.4", fontWeight: "600" }],
        "body-base": ["14.5px", { lineHeight: "1.6", fontWeight: "400" }],
        "meta-label": ["12.5px", { lineHeight: "1.4", fontWeight: "500" }],
      },
      spacing: {
        // Section 5.4 Base unit 4px, multiples of 8/12/16/24/32/48/64
        "0.5": "2px",
        "1": "4px",
        "2": "8px",
        "3": "12px",
        "4": "16px",
        "6": "24px",
        "8": "32px",
        "12": "48px",
        "16": "64px",
      },
      borderRadius: {
        // Section 5.4 Border radius
        btn: "8px",
        input: "8px",
        card: "12px",
        panel: "18px",
      },
      boxShadow: {
        // Section 5.4 Subtle shadows
        subtle: "0 1px 2px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.04)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
