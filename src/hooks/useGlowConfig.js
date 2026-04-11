import { useState, useEffect, useMemo } from 'react';

/**
 * Detects dark mode from root element class.
 */
function useIsDark() {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'));
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);
  return isDark;
}

/**
 * Returns a theme-aware BorderGlow config object.
 * Dark mode: vibrant purple/pink/blue glow on near-black card.
 * Light mode: softer violet/rose/sky glow, lower intensity (visible on white page bg).
 *
 * @param {'desktop' | 'mobile'} [variant='desktop'] – adjusts radius for mobile.
 * @returns {Object} Props to spread onto a <BorderGlow> component.
 */
export function useGlowConfig(variant = 'desktop') {
  const isDark = useIsDark();
  const isMobile = variant === 'mobile';

  return useMemo(() => ({
    edgeSensitivity: 30,
    // Pure dark background for dark mode, white for light mode
    backgroundColor: isDark ? '#050505' : '#ffffff',
    borderRadius: isMobile ? 16 : 20,
    glowRadius: isMobile ? 60 : 80,
    coneSpread: 45,
    animated: false,
    
    // Theme-aware glow logic
    // Light mode uses higher intensity and bolder colors to remain visible on bright backgrounds.
    glowColor: isDark ? '40 80 80' : '280 80 60',
    glowIntensity: isDark ? 3 : 5,
    colors: isDark
      ? ['#c084fc', '#f472b6', '#38bdf8']   // vibrant purple / pink / cyan for dark mode
      : ['#7c3aed', '#db2777', '#0284c7'],   // bolder violet / deep pink / strong blue for light mode
  }), [isDark, isMobile]);
}
