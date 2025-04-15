// Configuración de las Content Collections para Astro
import { defineCollection, z } from 'astro:content';

// Colección para artículos del blog
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.string().transform((str) => new Date(str)),
    updateDate: z.string().optional().transform((str) => str ? new Date(str) : undefined),
    image: z.string(),
    alt: z.string().optional(),
    tags: z.array(z.string()).default([]),
    lang: z.enum(['es', 'en', 'pt']),
    translations: z.record(z.string()).optional()
  })
});

// Colección para perfil/información personal
const profileCollection = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    title: z.string(),
    tagline: z.string(),
    bio: z.array(z.string()), // Párrafos de la bio
    currentPosition: z.object({
      company: z.string(),
      companyUrl: z.string().url(),
      description: z.string(),
    }),
    contactInfo: z.object({
      email: z.string().email(),
      linkedin: z.string().url(),
      github: z.string().url(),
    }),
    expertise: z.array(z.string()), // Lista de capacidades
    lang: z.enum(['es', 'en', 'pt']),
  }),
});

// Colección para habilidades técnicas
const skillsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    category: z.enum(['knowledge', 'languages', 'tools']),
    title: z.string(), // Título de la categoría
    items: z.string(), // Lista de habilidades (separadas por comas)
    lang: z.enum(['es', 'en', 'pt']),
  }),
});

// Colección para experiencia profesional
const experiencesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    area: z.enum(['design', 'frontend', 'backend', 'systems']),
    period: z.string(), // Ejemplo: "2019-2021"
    company: z.string(),
    companyUrl: z.string().url().optional(),
    position: z.string().optional(),
    description: z.array(z.string()), // Párrafos de descripción
    lang: z.enum(['es', 'en', 'pt']),
  }),
});

// Exportar las colecciones para que Astro las reconozca
export const collections = {
  'blog': blogCollection,
  'profile': profileCollection,
  'skills': skillsCollection,
  'experiences': experiencesCollection,
};