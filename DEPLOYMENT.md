# Deployment Guide for Jungle Light

This guide covers multiple deployment options for the Jungle Light application.

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications with built-in support for API routes.

#### Steps:
1. **Fork this repository** on GitHub
2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with your GitHub account
   - Click "New Project"
   - Import your forked repository
3. **Configure Environment Variables**:
   ```
   NODE_ENV=production
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   DATABASE_URL=./database.sqlite
   ```
4. **Deploy**: Click "Deploy" and your app will be live!

#### Vercel Features:
- ✅ Automatic deployments on git push
- ✅ Custom domains
- ✅ HTTPS by default
- ✅ Global CDN
- ✅ Serverless functions for API routes

### Option 2: Netlify

#### Steps:
1. **Fork this repository** on GitHub
2. **Connect to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Sign up/login with your GitHub account
   - Click "New site from Git"
   - Choose your forked repository
3. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. **Environment Variables**:
   ```
   NODE_ENV=production
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   DATABASE_URL=./database.sqlite
   ```
5. **Deploy**: Click "Deploy site"

### Option 3: Railway

#### Steps:
1. **Fork this repository** on GitHub
2. **Connect to Railway**:
   - Go to [railway.app](https://railway.app)
   - Sign up/login with your GitHub account
   - Click "New Project" → "Deploy from GitHub repo"
   - Choose your forked repository
3. **Environment Variables**:
   ```
   NODE_ENV=production
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   DATABASE_URL=./database.sqlite
   ```
4. **Deploy**: Railway will automatically deploy your app

### Option 4: Render

#### Steps:
1. **Fork this repository** on GitHub
2. **Connect to Render**:
   - Go to [render.com](https://render.com)
   - Sign up/login with your GitHub account
   - Click "New" → "Web Service"
   - Connect your GitHub repository
3. **Build Settings**:
   - Build command: `npm install && npm run build`
   - Start command: `npm start`
4. **Environment Variables**:
   ```
   NODE_ENV=production
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   DATABASE_URL=./database.sqlite
   ```
5. **Deploy**: Click "Create Web Service"

## 🔧 Manual Deployment

### Using Docker

1. **Create Dockerfile**:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

2. **Build and run**:
```bash
docker build -t jungle-light .
docker run -p 3000:3000 -e JWT_SECRET=your-secret jungle-light
```

### Using PM2

1. **Install PM2**:
```bash
npm install -g pm2
```

2. **Create ecosystem file** (`ecosystem.config.js`):
```javascript
module.exports = {
  apps: [{
    name: 'jungle-light',
    script: 'npm',
    args: 'start',
    env: {
      NODE_ENV: 'production',
      JWT_SECRET: 'your-super-secret-jwt-key-change-in-production',
      DATABASE_URL: './database.sqlite',
      PORT: 3000
    }
  }]
}
```

3. **Deploy**:
```bash
npm run build
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## 🌐 Custom Domain Setup

### Vercel
1. Go to your project dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### Netlify
1. Go to your site dashboard
2. Click "Domain settings"
3. Add custom domain
4. Update DNS records

## 🔐 Environment Variables

### Required Variables:
- `NODE_ENV`: Set to `production` for production builds
- `JWT_SECRET`: A secure random string for JWT token signing
- `DATABASE_URL`: Path to SQLite database file
- `PORT`: Server port (default: 3000)

### Optional Variables:
- `CORS_ORIGIN`: Allowed CORS origins (default: '*')
- `RATE_LIMIT_WINDOW`: Rate limiting window in ms
- `RATE_LIMIT_MAX`: Maximum requests per window

## 📊 Monitoring & Analytics

### Vercel Analytics
- Built-in analytics available in Vercel dashboard
- Real-time performance metrics
- User behavior tracking

### Custom Monitoring
- Add monitoring tools like Sentry for error tracking
- Use services like LogRocket for session replay
- Implement custom analytics with Google Analytics

## 🔄 Continuous Deployment

The repository includes GitHub Actions workflows for:
- **CI/CD Pipeline**: Automated testing and building
- **Deployment**: Automatic deployment to Vercel
- **Quality Checks**: Linting and type checking

### Setting up GitHub Actions:
1. Fork the repository
2. Go to repository Settings → Secrets and variables → Actions
3. Add required secrets:
   - `VERCEL_TOKEN`: Your Vercel API token
   - `ORG_ID`: Your Vercel organization ID
   - `PROJECT_ID`: Your Vercel project ID
   - `JWT_SECRET`: Your JWT secret key

## 🚨 Troubleshooting

### Common Issues:

1. **Build Failures**:
   - Check Node.js version compatibility
   - Ensure all dependencies are installed
   - Verify environment variables are set

2. **Database Issues**:
   - SQLite files may not persist on serverless platforms
   - Consider using external database for production
   - Check file permissions

3. **API Route Issues**:
   - Verify API routes are in correct directory structure
   - Check CORS configuration
   - Ensure proper error handling

4. **Authentication Issues**:
   - Verify JWT_SECRET is set correctly
   - Check token expiration settings
   - Ensure proper CORS headers

## 📈 Performance Optimization

### Production Optimizations:
- Enable Next.js production optimizations
- Use CDN for static assets
- Implement caching strategies
- Optimize database queries
- Use connection pooling for database

### Monitoring:
- Set up performance monitoring
- Track API response times
- Monitor database performance
- Set up alerts for errors

## 🔒 Security Considerations

### Production Security:
- Use strong JWT secrets
- Enable HTTPS
- Implement rate limiting
- Validate all inputs
- Use environment variables for secrets
- Regular security updates

### Database Security:
- Use parameterized queries
- Implement proper access controls
- Regular backups
- Consider encryption for sensitive data

---

For more help, check the [main README.md](./README.md) or open an issue on GitHub.
