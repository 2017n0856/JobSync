// Brand Colors
export const brandColors = {
  primary: '#1890ff',
  primaryHover: '#40a9ff',
  primaryActive: '#096dd9',
  
  secondary: '#722ed1',
  secondaryHover: '#9254de',
  secondaryActive: '#531dab',
  
  success: '#52c41a',
  successHover: '#73d13d',
  successActive: '#389e0d',
  
  warning: '#faad14',
  warningHover: '#ffc53d',
  warningActive: '#d48806',
  
  error: '#ff4d4f',
  errorHover: '#ff7875',
  errorActive: '#cf1322',
  
  info: '#1890ff',
  infoHover: '#40a9ff',
  infoActive: '#096dd9',
  
  // Neutral colors
  text: {
    primary: '#262626',
    secondary: '#595959',
    tertiary: '#8c8c8c',
    disabled: '#bfbfbf',
    inverse: '#ffffff',
  },
  
  background: {
    primary: '#ffffff',
    secondary: '#fafafa',
    tertiary: '#f0f2f5',
    hover: '#f5f5f5',
  },
  
  border: {
    light: '#d9d9d9',
    base: '#bfbfbf',
    dark: '#8c8c8c',
  },
  
  // Status colors
  status: {
    submitted: '#e0f5ff',
    deadlineWarning: '#fcf5cc',
    paymentComplete: '#e0f5ff',
  },
}

// Typography
export const typography = {
  fontFamily: {
    primary: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
    mono: "'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace",
  },
  
  fontSize: {
    xs: '10px',
    sm: '12px',
    base: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
    '5xl': '48px',
  },
  
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
  
  // Heading styles
  heading: {
    h1: {
      fontSize: '30px',
      fontWeight: 600,
      lineHeight: 1.25,
      color: brandColors.text.primary,
    },
    h2: {
      fontSize: '24px',
      fontWeight: 600,
      lineHeight: 1.3,
      color: brandColors.text.primary,
    },
    h3: {
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: 1.35,
      color: brandColors.text.primary,
    },
    h4: {
      fontSize: '18px',
      fontWeight: 600,
      lineHeight: 1.4,
      color: brandColors.text.primary,
    },
    h5: {
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: 1.45,
      color: brandColors.text.primary,
    },
    h6: {
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: 1.5,
      color: brandColors.text.primary,
    },
  },
  
  // Body text styles
  body: {
    small: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.5,
      color: brandColors.text.secondary,
    },
    base: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: 1.5,
      color: brandColors.text.primary,
    },
    large: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: 1.5,
      color: brandColors.text.primary,
    },
  },
}

// Spacing
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
}

// Border radius
export const borderRadius = {
  sm: '4px',
  base: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
}

// Shadows
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
}

// Export theme object
export const theme = {
  colors: brandColors,
  typography,
  spacing,
  borderRadius,
  shadows,
}

export default theme

