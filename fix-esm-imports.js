#!/usr/bin/env node
/**
 * ESM Import Fixer - Add .js extensions to all relative imports
 * Usage: node fix-esm-imports.js <directory>
 */

const fs = require('fs');
const path = require('path');

const targetDir = process.argv[2] || './dist';

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (file.endsWith('.js')) {
      fixFile(fullPath);
    }
  }
}

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const original = content;
  
  // Fix imports: from "./path" → from "./path.js"
  // but NOT if already ending with .js, .json, or a package name
  content = content.replace(/from\s+["'](\.\.[\/][^"']+)["']/g, (match, importPath) => {
    if (!importPath.endsWith('.js') && !importPath.endsWith('.json')) {
      return `from "${importPath}.js"`;
    }
    return match;
  });

  // Also handle export * from
  content = content.replace(/export\s+\*\s+from\s+["'](\.\.[\/][^"']+)["']/g, (match, importPath) => {
    if (!importPath.endsWith('.js') && !importPath.endsWith('.json')) {
      return `export * from "${importPath}.js"`;
    }
    return match;
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✓ Fixed: ${path.relative(process.cwd(), filePath)}`);
  }
}

console.log(`Fixing ESM imports in ${targetDir}...`);
walkDir(targetDir);
console.log('Done!');
