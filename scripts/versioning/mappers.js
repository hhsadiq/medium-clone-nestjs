const fs = require('fs');
const path = require('path');

const name = process.argv[2]; // 'restaurants' or another folder name
const version = process.argv[3]; // 'v2', 'v3', etc.
const cwd = process.cwd();
const isV2 = version === 'v2';

// Define source and target directories
const sourceDir = path.join(
  cwd,
  'src',
  name,
  isV2 ? '' : `v${parseInt(version.slice(1)) - 1}`,
  'infrastructure',
  'persistence',
  'relational',
  'mappers',
);
const targetDir = path.join(
  cwd,
  'src',
  name,
  version,
  'infrastructure',
  'persistence',
  'relational',
  'mappers',
);

try {
  // Ensure target directory exists
  fs.mkdirSync(targetDir, { recursive: true });

  // Copy files from source to target
  const files = fs.readdirSync(sourceDir);
  files.forEach((file) => {
    const srcPath = path.join(sourceDir, file);
    const destPath = path.join(targetDir, file);
    fs.copyFileSync(srcPath, destPath);
  });

  // Rename files and update class names in target directory
  files.forEach((file) => {
    const oldFilePath = path.join(targetDir, file);
    const baseName = path.basename(file, '.ts');
    const newFileName = isV2
      ? `${baseName}.v2.ts`
      : `${baseName.replace(/\.[vV]\d+$/, '')}.${version}.ts`;

    const newFilePath = path.join(targetDir, newFileName);

    // Rename file
    fs.renameSync(oldFilePath, newFilePath);
    // Read, update class name, and rewrite file content
    const classSuffix = isV2 ? 'V2' : version.toUpperCase();
    let content = fs.readFileSync(newFilePath, 'utf8');
    content = content.replace(
      /export class ([A-Za-z0-9_]+?)(V\d+)?\b/,
      `export class $1${classSuffix}`,
    );
    fs.writeFileSync(newFilePath, content, 'utf8');
  });
} catch (error) {
  console.error('An error occurred:', error);
}
