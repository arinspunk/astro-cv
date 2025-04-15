/**
 * Tipos y utilidades para el proyecto
 */

// Tipo para los idiomas soportados
export type SupportedLanguage = 'es' | 'en' | 'pt';

// Tipo para las áreas de experiencia
export type ExperienceArea = 'design' | 'frontend' | 'backend' | 'systems';

// Tipo para las categorías de habilidades
export type SkillCategory = 'knowledge' | 'languages' | 'tools';

// Interfaz para traducciones
export interface TranslationUrls {
  es?: string;
  en?: string;
  pt?: string;
}

// Función para formatear fechas consistentemente
export function formatDate(date: Date, lang: SupportedLanguage = 'es'): string {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  const locales = {
    es: 'es-ES',
    en: 'en-US',
    pt: 'pt-PT'
  };
  
  return date.toLocaleDateString(locales[lang], options);
}

// Función para obtener la URL de la versión en otro idioma
export function getLanguageUrl(currentPath: string, targetLang: SupportedLanguage, currentLang: SupportedLanguage): string {
  // Mapeo de rutas específicas (blog)
  const blogPathMap: Record<SupportedLanguage, string> = {
    es: '/blog',
    en: '/en/blog',
    pt: '/pt/blogue'
  };
  
  // Si estamos en la página de blog, usamos el mapeo específico
  if (currentPath.includes('/blog') || currentPath.includes('/blogue')) {
    return blogPathMap[targetLang];
  }
  
  // Si estamos en la página principal o CV
  if (currentPath === '/' || currentPath === '/index.html') {
    if (targetLang === 'es') return '/';
    return `/${targetLang}/cv`;
  }
  
  // Para las páginas en inglés o portugués
  if (currentPath.includes('/en/') || currentPath.includes('/pt/')) {
    if (targetLang === 'es') return '/';
    return currentPath.replace(`/${currentLang}/`, `/${targetLang}/`);
  }
  
  // Por defecto, añadimos el código de idioma
  return targetLang === 'es' ? currentPath : `/${targetLang}${currentPath}`;
}