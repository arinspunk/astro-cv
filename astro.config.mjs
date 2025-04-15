// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import i18n from 'astro-i18n-aut';

// https://astro.build/config
export default defineConfig({
  site: 'https://xulioze.com',
  integrations: [
    // Integración de MDX para trabajar con Markdown extendido
    mdx(),
    
    // Integración de sitemap para generar automáticamente el mapa del sitio
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-ES',
          en: 'en-US',
          pt: 'pt-PT'
        }
      }
    }),
    
    // Integración de i18n para manejar el multilingüismo
    i18n({
      defaultLangCode: 'es',
      supportedLangCodes: ['en', 'pt'],
      showDefaultLangCode: false,
      translations: {},
      pages: {
        // Mapeamos las páginas que tienen equivalentes en otros idiomas
        'index': {
          en: 'en/cv',
          pt: 'pt/cv'
        },
        'blog/index': {
          en: 'en/blog',
          pt: 'pt/blogue'
        }
      }
    })
  ],
  // Configuración para procesar archivos markdown y mdx
  markdown: {
    syntaxHighlight: 'prism',
    remarkPlugins: [],
    rehypePlugins: []
  }
});
