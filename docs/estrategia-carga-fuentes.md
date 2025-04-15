# Estrategia de Carga de Fuentes

Este documento describe la estrategia de carga de fuentes implementada en la migración a Astro.

## Resumen de la Implementación

Se ha creado un componente dedicado `FontLoader.astro` que gestiona centralizadamente todas las fuentes del proyecto, utilizando técnicas avanzadas para optimizar el rendimiento, evitar CLS (Cumulative Layout Shift) y mejorar la experiencia de usuario.

## Características principales

- **Precarga de fuentes críticas**: Utilizamos `<link rel="preload">` para cargar anticipadamente las fuentes más importantes.
- **Font Display Swap**: Aseguramos que el texto sea visible inmediatamente usando fuentes de sistema mientras se cargan las fuentes web.
- **Prevención de CLS**: Implementamos técnicas para evitar saltos en el layout durante la carga de la página.
- **Optimización de Google Fonts**: Preconexión a servidores y carga optimizada de la fuente Space Mono.
- **Font Synthesis None**: Evitamos versiones sintéticas de las fuentes que podrían afectar negativamente la experiencia.

## Estructura

El sistema funciona con estos componentes:

1. **FontLoader.astro**: Componente que centraliza la carga de fuentes y se incluye en el Layout principal.
2. **Layout.astro**: Incluye el componente FontLoader en la sección `<head>`.
3. **SCSS Settings**: Las declaraciones `@font-face` se han movido desde los archivos SCSS al componente FontLoader.

## Archivos de Fuentes

Las fuentes web utilizadas en el proyecto son:

- **Fuentes locales**:
  - `sawtonindustrial-thin-webfont.woff2`
  - `sawtonindustrial-thin-webfont.woff`
  - `sawtonbauhaus-thin-webfont.woff2`
  - `sawtonbauhaus-thin-webfont.woff`

- **Fuentes externas**:
  - Space Mono (Google Fonts)

## Consideraciones futuras

- Considerar utilizar la técnica de subsetting para reducir aún más el tamaño de los archivos de fuentes.
- Evaluar el uso de formato WOFF2 exclusivamente en navegadores modernos para mejorar velocidad.
- Monitorizar métricas de Web Vitals para validar la eficacia de esta implementación.
2. **Reducción del CLS**: Menor desplazamiento de contenido durante la carga
3. **Experiencia de usuario mejorada**: Texto visible durante toda la carga

## Referencias y buenas prácticas

- [Web Fonts | web.dev](https://web.dev/articles/font-best-practices)
- [Optimizing Web Fonts | MDN](https://developer.mozilla.org/en-US/docs/Web/Performance/Optimizing_Web_Fonts)
- [Controlling Font Performance with Font-Display | CSS-Tricks](https://css-tricks.com/font-display-masses/)