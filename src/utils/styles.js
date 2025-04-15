/**
 * Utilidades para trabajar con temas y estilos 
 * Facilita la integración de las variables CSS con componentes Astro 
 */

/**
 * Obtiene las variables CSS de tema actualmente aplicadas
 * @returns Objeto con las variables de tema
 */
export function getThemeVars() {
  if (typeof window === 'undefined') return {};
  
  const computedStyle = getComputedStyle(document.documentElement);
  
  return {
    background: computedStyle.getPropertyValue('--theme-background').trim(),
    foreground: computedStyle.getPropertyValue('--theme-foreground').trim(),
    primary: computedStyle.getPropertyValue('--theme-primary').trim(),
    accent: computedStyle.getPropertyValue('--theme-accent').trim(),
  };
}

/**
 * Alterna entre tema claro y oscuro
 * @param {boolean} isDark - Si true, activa el tema oscuro
 */
export function toggleTheme(isDark = false) {
  if (typeof window === 'undefined') return;
  
  const root = document.documentElement;
  
  if (isDark) {
    root.classList.add('theme-dark');
    root.classList.remove('theme-light');
    localStorage.setItem('theme', 'dark');
  } else {
    root.classList.add('theme-light');
    root.classList.remove('theme-dark');
    localStorage.setItem('theme', 'light');
  }
}

/**
 * Inicializa el tema basado en preferencias del usuario
 */
export function initTheme() {
  if (typeof window === 'undefined') return;
  
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    toggleTheme(true);
  } else {
    toggleTheme(false);
  }
}

/**
 * Genera clases CSS basadas en condiciones
 * @param {Record<string, boolean>} classes - Objeto con clases y condiciones
 * @returns {string} String de clases concatenadas
 */
export function classNames(classes) {
  return Object.entries(classes)
    .filter(([_, condition]) => Boolean(condition))
    .map(([className]) => className)
    .join(' ');
}