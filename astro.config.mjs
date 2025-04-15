// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

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
    })
  ],
  // Configuración para procesar archivos markdown y mdx
  markdown: {
    syntaxHighlight: 'prism',
    remarkPlugins: [],
    rehypePlugins: []
  }
});
