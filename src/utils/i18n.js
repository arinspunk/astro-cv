/**
 * i18n utilities
 * Functions to handle translations and locale-related operations
 */

// Import translations
import esTranslations from '../i18n/es/index.js';
import enTranslations from '../i18n/en/index.js';
import ptTranslations from '../i18n/pt/index.js';

// Map of all translations by locale
const translations = {
  'es': esTranslations,
  'en': enTranslations,
  'pt': ptTranslations
};

/**
 * Get translation by key
 * Supports dot notation for nested objects (e.g. 'common.footer.copyright')
 * 
 * @param {string} key - Translation key using dot notation
 * @param {string} locale - Locale code (e.g. 'es', 'en', 'pt')
 * @param {Object} params - Optional parameters to replace in the translation
 * @returns {string} - Translated text
 */
export function t(key, locale = 'es', params = {}) {
  // Get the translation object for the given locale
  const localeTranslations = translations[locale] || translations['es'];
  
  // Split the key by dots to navigate the nested objects
  const keys = key.split('.');
  
  // Navigate through the nested objects
  let value = localeTranslations;
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // If key not found, try with the default locale
      if (locale !== 'es') {
        console.warn(`Translation key '${key}' not found in locale '${locale}', falling back to 'es'`);
        return t(key, 'es', params);
      }
      console.error(`Translation key '${key}' not found`);
      return key; // Return the key itself as fallback
    }
  }
  
  // If the value is not a string, return it as is
  if (typeof value !== 'string') {
    return value;
  }
  
  // Replace parameters in the string (e.g. {year} with 2023)
  return value.replace(/{([^}]+)}/g, (_, p) => {
    return params[p] !== undefined ? params[p] : `{${p}}`;
  });
}

/**
 * Format a localized date
 * 
 * @param {Date} date - Date to format
 * @param {string} locale - Locale code (e.g. 'es', 'en', 'pt')
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} - Formatted date
 */
export function formatDate(date, locale = 'es', options = {}) {
  const localeMap = {
    'es': 'es-ES',
    'en': 'en-US',
    'pt': 'pt-PT'
  };

  const formattingLocale = localeMap[locale] || localeMap['es'];
  
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  return new Intl.DateTimeFormat(
    formattingLocale, 
    { ...defaultOptions, ...options }
  ).format(date);
}

/**
 * Get the locale from the URL
 * 
 * @param {string} pathname - URL pathname
 * @returns {string} - Locale code (e.g. 'es', 'en', 'pt')
 */
export function getLocaleFromURL(pathname) {
  const segments = pathname.split('/').filter(Boolean);
  
  if (segments.length > 0) {
    const firstSegment = segments[0];
    if (['en', 'pt'].includes(firstSegment)) {
      return firstSegment;
    }
  }
  
  // Default locale is 'es'
  return 'es';
}

/**
 * Get URL for the same page in another locale
 * 
 * @param {string} targetLocale - Target locale code
 * @param {string} currentLocale - Current locale code
 * @param {string} pathname - Current pathname
 * @returns {string} - URL with the target locale
 */
export function getLocalizedURL(targetLocale, currentLocale, pathname) {
  // Remove the current locale from the pathname if present
  let cleanPath = pathname;
  if (currentLocale !== 'es') {
    cleanPath = cleanPath.replace(new RegExp(`^/${currentLocale}`), '');
  }
  
  // Special case for empty path
  if (cleanPath === '') {
    cleanPath = '/';
  }
  
  // Handle blog paths with special naming
  if (cleanPath.startsWith('/blog') && targetLocale === 'pt') {
    cleanPath = cleanPath.replace('/blog', '/blogue');
  } else if (cleanPath.startsWith('/blogue') && targetLocale !== 'pt') {
    cleanPath = cleanPath.replace('/blogue', '/blog');
  }
  
  // For default locale (es), don't add prefix
  if (targetLocale === 'es') {
    return cleanPath;
  }
  
  // Add the target locale as prefix
  return `/${targetLocale}${cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`}`;
}

/**
 * Check if the browser prefers dark mode
 * 
 * @returns {boolean} - True if dark mode is preferred
 */
export function prefersDarkMode() {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false;
}

export default {
  t,
  formatDate,
  getLocaleFromURL,
  getLocalizedURL,
  prefersDarkMode
};