# Jungle Light - Full-Stack Next.js Application

A modern full-stack web application built with Next.js, featuring a complete backend API with authentication, database integration, and a beautiful frontend interface.

## 🚀 Features

### Backend
- **RESTful API** with comprehensive endpoints
- **JWT Authentication** with secure login/register
- **SQLite Database** with automatic schema creation
- **User Management** with profile updates
- **Posts System** with CRUD operations
- **Comments System** for posts
- **Middleware** for CORS, rate limiting, and error handling
- **TypeScript** for type safety

### Frontend
- **Modern UI** with Tailwind CSS
- **Authentication Flow** with login/register modals
- **Real-time Data** fetching from API
- **Responsive Design** for all devices
- **Dark Mode** support
- **Interactive Components** with loading states

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, SQLite3, JWT
- **Authentication**: bcryptjs, jsonwebtoken
- **Database**: SQLite with automatic migrations
- **Security**: CORS, rate limiting, input validation

## 📁 Project Structure

```
src/
├── lib/
│   ├── api.ts          # API client for frontend
│   ├── auth.ts         # Authentication utilities
│   ├── config.ts       # Application configuration
│   ├── database.ts     # Database connection and setup
│   └── middleware.ts   # Custom middleware functions
├── pages/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login.ts        # User login endpoint
│   │   │   └── register.ts     # User registration endpoint
│   │   ├── posts/
│   │   │   ├── index.ts        # Posts CRUD operations
│   │   │   └── [id].ts         # Individual post operations
│   │   ├── comments/
│   │   │   └── index.ts        # Comments creation
│   │   ├── users/
│   │   │   └── profile.ts      # User profile management
│   │   └── hello.ts            # Health check endpoint
│   └── index.tsx               # Main application page
└── styles/
    └── globals.css             # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Quick Start (Local Development)

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Jungle-light.git
   cd Jungle-light
   ```

2. **Run the setup script**
   ```bash
   npm run setup
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Manual Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NODE_ENV=development
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   DATABASE_URL=./database.sqlite
   PORT=3000
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

### 🌐 Deploy to Production

**One-Click Deploy:**
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/Jungle-light)

**Other Deployment Options:**
- [Netlify](https://netlify.com) - [Deploy Guide](./DEPLOYMENT.md#option-2-netlify)
- [Railway](https://railway.app) - [Deploy Guide](./DEPLOYMENT.md#option-3-railway)
- [Render](https://render.com) - [Deploy Guide](./DEPLOYMENT.md#option-4-render)

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "johndoe",
  "password": "password123"
}
```

### Posts Endpoints

#### Get All Posts
```http
GET /api/posts
```

#### Get Single Post
```http
GET /api/posts/[id]
```

#### Create Post (Authenticated)
```http
POST /api/posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My Post Title",
  "content": "This is the post content..."
}
```

#### Update Post (Authenticated)
```http
PUT /api/posts/[id]
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content..."
}
```

#### Delete Post (Authenticated)
```http
DELETE /api/posts/[id]
Authorization: Bearer <token>
```

### Comments Endpoints

#### Create Comment (Authenticated)
```http
POST /api/comments
Authorization: Bearer <token>
Content-Type: application/json

{
  "post_id": 1,
  "content": "This is a comment..."
}
```

### User Endpoints

#### Get User Profile (Authenticated)
```http
GET /api/users/profile
Authorization: Bearer <token>
```

#### Update User Profile (Authenticated)
```http
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "username": "newusername",
  "email": "newemail@example.com"
}
```

### Health Check

#### API Status
```http
GET /api/hello
```

## 🗄️ Database Schema

The application automatically creates the following tables:

### Users Table
- `id` (INTEGER PRIMARY KEY)
- `username` (TEXT UNIQUE)
- `email` (TEXT UNIQUE)
- `password` (TEXT - hashed)
- `created_at` (DATETIME)
- `updated_at` (DATETIME)

### Posts Table
- `id` (INTEGER PRIMARY KEY)
- `title` (TEXT)
- `content` (TEXT)
- `author_id` (INTEGER - Foreign Key)
- `created_at` (DATETIME)
- `updated_at` (DATETIME)

### Comments Table
- `id` (INTEGER PRIMARY KEY)
- `content` (TEXT)
- `post_id` (INTEGER - Foreign Key)
- `author_id` (INTEGER - Foreign Key)
- `created_at` (DATETIME)

## 🔒 Security Features

- **Password Hashing**: Uses bcryptjs for secure password storage
- **JWT Tokens**: Secure authentication with configurable expiration
- **CORS Protection**: Configurable cross-origin resource sharing
- **Input Validation**: Server-side validation for all inputs
- **Rate Limiting**: Protection against brute force attacks
- **SQL Injection Protection**: Parameterized queries

## 🎨 Frontend Features

- **Modern Design**: Clean, responsive interface with Tailwind CSS
- **Authentication UI**: Modal-based login/register forms
- **Real-time Updates**: Automatic data refresh after operations
- **Loading States**: User-friendly loading indicators
- **Error Handling**: Comprehensive error display and handling
- **Dark Mode**: Built-in dark theme support

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Variables for Production
```env
NODE_ENV=production
JWT_SECRET=your-production-secret-key
DATABASE_URL=./production.sqlite
PORT=3000
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Quick Contribution Steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test your changes (`npm run build && npm run lint`)
5. Commit your changes (`git commit -m 'feat: add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Setup:
```bash
git clone https://github.com/YOUR_USERNAME/Jungle-light.git
cd Jungle-light
npm run setup
npm run dev
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support & Troubleshooting

### Common Issues

#### Build Errors
```bash
# If you get TypeScript errors, try:
npm run test:build

# If dependencies are missing:
npm install

# Clear Next.js cache:
rm -rf .next
npm run build
```

#### Database Issues
- SQLite database is created automatically on first run
- Database file: `database.sqlite` in project root
- For production, consider using PostgreSQL or MySQL

#### Authentication Issues
- Ensure JWT_SECRET is set in environment variables
- Check that passwords meet validation requirements
- Verify CORS settings for cross-origin requests

#### API Issues
- Check that all required environment variables are set
- Verify database connection
- Check server logs for detailed error messages

### Getting Help

If you encounter any issues or have questions, please:
1. Check the existing issues on GitHub
2. Run `npm run test:build` to verify setup
3. Create a new issue with detailed information
4. Contact the maintainers

---

**Jungle Light** - A modern full-stack application showcasing Next.js capabilities with a complete backend implementation.