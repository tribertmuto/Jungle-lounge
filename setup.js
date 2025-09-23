#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🌱 Setting up Jungle Light Backend...\n');

// Check if Node.js is installed
try {
  const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
  console.log(`✅ Node.js version: ${nodeVersion}`);
} catch (error) {
  console.error('❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/');
  process.exit(1);
}

// Check if npm is available
try {
  const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
  console.log(`✅ npm version: ${npmVersion}`);
} catch (error) {
  console.error('❌ npm is not available. Please ensure npm is installed with Node.js');
  process.exit(1);
}

// Create .env.local file if it doesn't exist
const envPath = path.join(__dirname, '.env.local');
if (!fs.existsSync(envPath)) {
  const envContent = `# Environment variables for Jungle Light
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-in-production-${Date.now()}
DATABASE_URL=./database.sqlite
PORT=3000
`;
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created .env.local file');
} else {
  console.log('✅ .env.local file already exists');
}

// Install dependencies
console.log('\n📦 Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed successfully');
} catch (error) {
  console.error('❌ Failed to install dependencies');
  process.exit(1);
}

console.log('\n🚀 Setup complete! You can now run:');
console.log('   npm run dev        - Start development server');
console.log('   npm run build      - Build for production');
console.log('   npm start          - Start production server');
console.log('   npm run test:build - Test build process');
console.log('   npm run deploy     - Deploy to Vercel');
console.log('\n📖 Visit http://localhost:3000 to see your application');
console.log('🔗 API endpoints will be available at http://localhost:3000/api/');
console.log('\n🌐 For GitHub deployment:');
console.log('   1. Push your code to GitHub');
console.log('   2. Connect to Vercel/Netlify/Railway');
console.log('   3. Set environment variables');
console.log('   4. Deploy!');
console.log('\n📚 See DEPLOYMENT.md for detailed deployment instructions');
