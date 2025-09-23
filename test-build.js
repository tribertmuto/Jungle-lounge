#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🧪 Testing build process...\n');

try {
  // Check if node_modules exists
  if (!fs.existsSync('node_modules')) {
    console.log('📦 Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });
  }

  // Test TypeScript compilation
  console.log('🔍 Checking TypeScript compilation...');
  execSync('npx tsc --noEmit', { stdio: 'inherit' });
  console.log('✅ TypeScript compilation successful');

  // Test Next.js build
  console.log('🏗️ Testing Next.js build...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Next.js build successful');

  console.log('\n🎉 All tests passed! The project is ready to run.');
  console.log('\nTo start the development server:');
  console.log('   npm run dev');
  console.log('\nTo start the production server:');
  console.log('   npm start');

} catch (error) {
  console.error('\n❌ Build test failed:');
  console.error(error.message);
  process.exit(1);
}
