const getThemeColor = (variable: string) => {
  if (typeof window === 'undefined') return '#0ea5e9'; // Fallback para SSR
  return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
};

export default getThemeColor;