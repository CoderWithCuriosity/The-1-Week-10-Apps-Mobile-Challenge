export const theme = {
  colors: {
    brand: {
      primary: "#6366F1",        // Indigo for minimalist feel
      primaryHover: "#4F46E5",
      onPrimary: "#FFFFFF",
      gradientStart: "#4F46E5",
      gradientEnd: "#6366F1"
    },
    neutrals: {
      white: "#FFFFFF",
      black: "#111827",
      gray50: "#F9FAFB",
      gray100: "#F3F4F6",
      gray200: "#6B7280",
      gray300: "#6B7280",
      gray400: "#6B7280",
      gray500: "#6B7280",
      gray600: "#6B7280",
      gray700: "#6B7280",
      gray900: "#111827"
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
      md: 8,
      lg: 12,
      full: 9999
    },
    width: {
      thin: 1,
      thick: 2
    }
  },
  shadows: {
    soft: "0 1px 3px rgba(0, 0, 0, 0.05)",
    medium: "0 4px 6px rgba(0, 0, 0, 0.07)",
    strong: "0 10px 15px rgba(0, 0, 0, 0.1)"
  }
};

export type Theme = typeof theme;