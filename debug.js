console.log('Checking Tailwind setup...');
console.log('Node version:', process.version);

const fs = require('fs');
const path = require('path');

// Check if files exist
const filesToCheck = [
  'tailwind.config.js',
  'postcss.config.js',
  'src/styles/globals.css',
  'src/pages/_app.js'
];

filesToCheck.forEach(file => {
  const exists = fs.existsSync(path.join(process.cwd(), file));
  console.log(`${file}: ${exists ? '✅' : '❌'}`);
});

// Check package.json
const pkg = require('./package.json');
console.log('\nDependencies:');
console.log('tailwindcss:', pkg.devDependencies?.tailwindcss || 'not found');
console.log('postcss:', pkg.devDependencies?.postcss || 'not found');
console.log('autoprefixer:', pkg.devDependencies?.autoprefixer || 'not found');
