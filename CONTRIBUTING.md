# Contributing to Jungle Light

Thank you for your interest in contributing to Jungle Light! This document provides guidelines and information for contributors.

## 🚀 Quick Start

1. **Fork the repository** on GitHub
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Jungle-light.git
   cd Jungle-light
   ```
3. **Install dependencies**:
   ```bash
   npm run setup
   # or
   npm install
   ```
4. **Start development server**:
   ```bash
   npm run dev
   ```

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Environment Setup
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Update environment variables as needed
3. Run the setup script:
   ```bash
   npm run setup
   ```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run setup` - Initial project setup

## 📝 Making Changes

### Code Style
- Use TypeScript for all new code
- Follow existing code patterns
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### Commit Messages
Use conventional commit format:
```
type(scope): description

feat(auth): add JWT token refresh
fix(api): resolve database connection issue
docs(readme): update installation instructions
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### Pull Request Process
1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. **Make your changes**
3. **Test your changes**:
   ```bash
   npm run build
   npm run lint
   ```
4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add your feature"
   ```
5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Create a Pull Request** on GitHub

## 🧪 Testing

### Manual Testing
- Test all API endpoints
- Verify authentication flows
- Check responsive design
- Test error handling

### API Testing
Use tools like Postman or curl to test endpoints:
```bash
# Health check
curl http://localhost:3000/api/hello

# Register user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"password123"}'
```

## 🏗️ Project Structure

```
src/
├── lib/                 # Utility libraries
│   ├── api.ts          # Frontend API client
│   ├── auth.ts         # Authentication utilities
│   ├── config.ts       # Configuration
│   ├── database.ts     # Database setup
│   └── middleware.ts   # Custom middleware
├── pages/
│   ├── api/            # Backend API routes
│   │   ├── auth/       # Authentication endpoints
│   │   ├── posts/      # Posts CRUD
│   │   ├── comments/   # Comments
│   │   └── users/      # User management
│   └── index.tsx       # Main frontend page
└── styles/
    └── globals.css     # Global styles
```

## 🎯 Areas for Contribution

### High Priority
- [ ] Add unit tests
- [ ] Improve error handling
- [ ] Add input validation
- [ ] Implement file uploads
- [ ] Add real-time features (WebSocket)
- [ ] Improve mobile responsiveness

### Medium Priority
- [ ] Add dark/light theme toggle
- [ ] Implement search functionality
- [ ] Add user profiles with avatars
- [ ] Create admin dashboard
- [ ] Add email notifications
- [ ] Implement post categories/tags

### Low Priority
- [ ] Add internationalization (i18n)
- [ ] Implement caching strategies
- [ ] Add analytics integration
- [ ] Create mobile app
- [ ] Add social login options

## 🐛 Bug Reports

When reporting bugs, please include:
1. **Description** of the issue
2. **Steps to reproduce**
3. **Expected behavior**
4. **Actual behavior**
5. **Environment details** (OS, Node.js version, browser)
6. **Screenshots** if applicable

## 💡 Feature Requests

For feature requests, please:
1. Check existing issues first
2. Provide clear description
3. Explain the use case
4. Consider implementation complexity
5. Discuss with maintainers before starting

## 📚 Documentation

### Code Documentation
- Add JSDoc comments for functions
- Update README.md for new features
- Document API changes
- Include examples in documentation

### API Documentation
- Document all endpoints
- Include request/response examples
- Specify authentication requirements
- Document error responses

## 🔒 Security

### Security Guidelines
- Never commit secrets or API keys
- Use environment variables for sensitive data
- Validate all user inputs
- Use parameterized queries
- Implement proper authentication
- Follow OWASP guidelines

### Reporting Security Issues
For security vulnerabilities, please:
1. **DO NOT** create public issues
2. Email security concerns privately
3. Provide detailed information
4. Allow time for fixes before disclosure

## 🎨 Design Guidelines

### UI/UX
- Follow existing design patterns
- Use Tailwind CSS classes
- Ensure accessibility (a11y)
- Test on multiple devices
- Maintain consistent spacing and colors

### Component Structure
- Keep components small and focused
- Use TypeScript interfaces
- Implement proper error boundaries
- Follow React best practices

## 📊 Performance

### Performance Guidelines
- Optimize images and assets
- Use Next.js optimizations
- Implement proper caching
- Minimize bundle size
- Monitor Core Web Vitals

## 🌍 Internationalization

### i18n Guidelines
- Use descriptive keys
- Support RTL languages
- Consider cultural differences
- Test with different languages
- Use proper date/time formatting

## 📱 Mobile Development

### Mobile Guidelines
- Test on real devices
- Use responsive design
- Optimize for touch interactions
- Consider offline functionality
- Test performance on slower devices

## 🤝 Community Guidelines

### Code of Conduct
- Be respectful and inclusive
- Help others learn and grow
- Provide constructive feedback
- Follow the golden rule
- Report inappropriate behavior

### Communication
- Use clear and concise language
- Be patient with newcomers
- Ask questions when unsure
- Share knowledge and resources
- Celebrate contributions

## 📞 Getting Help

### Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Community
- GitHub Discussions for questions
- Issues for bug reports
- Pull Requests for contributions
- Discord/Slack for real-time chat

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- GitHub contributors page
- Project documentation

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Jungle Light! 🎉
