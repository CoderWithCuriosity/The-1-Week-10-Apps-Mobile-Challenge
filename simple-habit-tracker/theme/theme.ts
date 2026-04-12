export const theme = {
  colors: {
    brand: {
      primary: "#10B981",        // Emerald green for growth
      primaryHover: "#059669",
      onPrimary: "#FFFFFF",
      gradientStart: "#064E3B",
      gradientEnd: "#10B981"
    },
    neutrals: {
      white: "#FFFFFF",
      black: "#0F172A",
      gray50: "#F8FAFC",
      gray100: "#F1F5F9",
      gray500: "#64748B",
      gray900: "#0F172A"
    },
    feedback: {
      success: "#10B981",
      warning: "#F59E0B",
      error: "#EF4444",
      info: "#3B82F6"
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
      md: 12,
      lg: 24,
      full: 9999
    },
    width: {
      thin: 1,
      thick: 2
    }
  },
  shadows: {
    soft: "0 4px 20px rgba(0, 0, 0, 0.08)",
    medium: "0 8px 30px rgba(0, 0, 0, 0.12)",
    strong: "0 12px 40px rgba(0, 0, 0, 0.25)"
  }
};

export type Theme = typeof theme;