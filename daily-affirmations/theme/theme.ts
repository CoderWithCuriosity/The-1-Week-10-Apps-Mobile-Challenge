// theme/theme.ts
export const theme = {
  colors: {
    brand: {
      primary: "#9D50BB",        // The vibrant purple in the logo
      primaryHover: "#6E48AA",   // Darker violet for interactions
      onPrimary: "#FFFFFF",      // White text on purple
      gradientStart: "#4A148C",  // Deep background purple
      gradientEnd: "#7B1FA2"     // Lighter background purple
    },
    neutrals: {
      white: "#FFFFFF",
      black: "#0D0B14",          // Very dark purple-tinted black
      gray50: "#F5F3F7",
      gray100: "#EBE8F0",
      gray500: "#8E869C",
      gray900: "#1A1625"         // Card background/Dark mode surface
    },
    feedback: {
      success: "#00E676",
      warning: "#FFD600",
      error: "#FF5252",
      info: "#7C4DFF"           // Adjusted to match the purple theme
    }
  },
  typography: {
    fontFamily: "'Inter', -apple-system, sans-serif",
    scales: {
      display: "48px",
      h1: "32px",
      h2: "24px",
      body: "16px",
      caption: "12px"
    },
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  },
  spacing: {
    unit: 4,
    scales: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 40,
      xxl: 64
    }
  },
  borders: {
    radius: {
      sm: 4,
      md: 12,                  // Slightly rounder for a "smooth" UI
      lg: 24,                  // Very round for buttons/cards
      full: 9999
    },
    width: {
      thin: 1,
      thick: 2
    }
  },
  shadows: {
    soft: "0 4px 20px rgba(74, 20, 140, 0.08)",   // Hint of purple in the shadow
    medium: "0 8px 30px rgba(74, 20, 140, 0.12)",
    strong: "0 12px 40px rgba(0, 0, 0, 0.25)"
  }
};

export type Theme = typeof theme;