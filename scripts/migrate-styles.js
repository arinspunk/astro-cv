/**
 * Script de migración de estilos SCSS
 * Este script copia y adapta los archivos SCSS desde el proyecto original
 * a la estructura del proyecto Astro, manteniendo la arquitectura ITCSS.
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// Obtener el directorio actual en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rutas
const SOURCE_DIR = path.resolve(__dirname, '../../scss');
const TARGET_DIR = path.resolve(__dirname, '../src/styles');

// Función para crear un directorio si no existe
function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Directorio creado: ${dir}`);
  }
}

// Función para copiar un archivo
function copyFile(source, target) {
  fs.copyFileSync(source, target);
  console.log(`✅ Archivo copiado: ${target}`);
}

// Función para copiar un directorio completo
function copyDirectory(source, target) {
  ensureDirectoryExists(target);
  
  // Leer archivos en el directorio fuente
  const files = fs.readdirSync(source);
  
  for (const file of files) {
    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);
    
    const stats = fs.statSync(sourcePath);
    
    if (stats.isDirectory()) {
      copyDirectory(sourcePath, targetPath);
    } else if (stats.isFile()) {
      copyFile(sourcePath, targetPath);
    }
  }
}

// Función para crear el archivo principal de estilos
function createMainStyleFile() {
  const mainStyleContent = `/*
 * Estilos principales del sitio
 * Organizado con arquitectura ITCSS
 */

// Settings: Variables, configuraciones, etc.
@import '00-settings/settings';

// Tools: Mixins, funciones, etc.
@import '01-tools/mixins';
@import '01-tools/functions';

// Generic: Estilos de reset, normalización, etc.
@import '02-generic/normalize';
@import '02-generic/generic';

// Elements: Estilos para elementos HTML básicos
@import '03-elements/elements';

// Objects: Patrones de diseño sin decoración
@import '04-objects/objects';

// Components: Componentes específicos de la UI
@import '05-components/components';

// Utilities: Clases utilitarias
@import '06-utilities/utilities';
`;

  fs.writeFileSync(path.join(TARGET_DIR, 'main.scss'), mainStyleContent);
  console.log(`✅ Archivo principal de estilos creado: ${path.join(TARGET_DIR, 'main.scss')}`);
}

// Función principal
function migrateStyles() {
  try {
    console.log('🚀 Iniciando migración de estilos SCSS...');
    
    // Asegurar que exista el directorio destino
    ensureDirectoryExists(TARGET_DIR);
    
    // Copiar todas las carpetas ITCSS
    for (let i = 0; i <= 6; i++) {
      const folderPrefix = String(i).padStart(2, '0');
      const sourceFolder = path.join(SOURCE_DIR, `${folderPrefix}-${getFolderSuffix(i)}`);
      const targetFolder = path.join(TARGET_DIR, `${folderPrefix}-${getFolderSuffix(i)}`);
      
      if (fs.existsSync(sourceFolder)) {
        copyDirectory(sourceFolder, targetFolder);
      } else {
        console.warn(`⚠️ Directorio no encontrado: ${sourceFolder}`);
      }
    }
    
    // Crear archivo principal de estilos
    createMainStyleFile();
    
    console.log('✨ Migración de estilos SCSS completada con éxito!');
  } catch (error) {
    console.error('❌ Error durante la migración de estilos:', error);
    process.exit(1);
  }
}

// Función auxiliar para obtener el sufijo de la carpeta según su índice
function getFolderSuffix(index) {
  const suffixes = [
    'settings',
    'tools',
    'generic',
    'elements',
    'objects',
    'components',
    'utilities'
  ];
  
  return suffixes[index] || '';
}

// Ejecutar la migración
migrateStyles();