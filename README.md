# 📝 Modern React Blog Platform

A powerful, full-stack blogging platform built with React and Appwrite, featuring a modern UI and comprehensive user interactions. This platform enables content creators to publish, manage posts, and engage with readers through comments.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Appwrite](https://img.shields.io/badge/Appwrite-FF1E56?style=for-the-badge&logo=appwrite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

[View Demo](https://react-blog-project071.netlify.app) • [Report Bug](https://github.com/yourusername/project/issues) • [Request Feature](https://github.com/yourusername/project/issues)

## ✨ Features

- **Authentication & Authorization**
  - Secure user registration and login
  - Protected routes for authenticated users
  - Role-based access control

- **Post Management**
  - Create and publish blog posts with rich text editing
  - Update existing posts with version history
  - Delete posts with confirmation
  - Draft saving functionality

- **Interactive Elements**
  - Comment system with threading support
  - Like/bookmark functionality
  - Share posts on social media
  - User profiles with post history

- **Modern UI/UX**
  - Responsive design for all devices
  - Dark/Light mode toggle
  - Loading states and animations
  - Toast notifications

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Styling**: TailwindCSS
- **State Management**: React Context + Hooks
- **Backend Services**: Appwrite
- **Form Handling**: React Hook Form
- **Routing**: React Router v6
- **Deployment**: Netlify

## 🚀 Quick Start

### Prerequisites

```bash
# Required
node >= 14.0.0
npm >= 6.14.0

# Optional but recommended
bun >= 1.0.0
```

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/react-blog.git
cd react-blog
```

2. Install dependencies
```bash
# Using npm
npm install

# Using Bun (recommended)
bun install
```

3. Create environment variables
```bash
cp .env.example .env
```

4. Configure Appwrite
```bash
# Add your Appwrite credentials in .env
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_ENDPOINT=your_endpoint
VITE_APPWRITE_DATABASE_ID=your_database_id
```

5. Start development server
```bash
npm run dev
# or
bun dev
```

## 📚 Project Structure

```
src/
├── components/      # Reusable UI components
├── config/         # Configuration files
├── contexts/       # React contexts
├── hooks/          # Custom hooks
├── layouts/        # Layout components
├── lib/            # Utility functions
├── pages/          # Route pages
├── services/       # API services
└── styles/         # Global styles
```

## 🔧 Configuration

### Appwrite Setup

1. Create a project in Appwrite Console
2. Create a database
3. Add following collections:
   - `posts`
   - `comments`
   - `users`
4. Set up authentication methods
5. Configure security rules

### Environment Variables

```env
VITE_APPWRITE_PROJECT_ID=
VITE_APPWRITE_ENDPOINT=
VITE_APPWRITE_DATABASE_ID=
VITE_APPWRITE_STORAGE_ID=
VITE_APPWRITE_SAVES_COLLECTION_ID=
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- [Appwrite Documentation](https://appwrite.io/docs)
- [React Documentation](https://reactjs.org/docs)
- [TailwindCSS](https://tailwindcss.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

## 📧 Contact

Your Name - Muhammad Ali Shaikh - 071mohdali@gmail.com

Project Link: [https://github.com/Aleee071/React-Blog-Project](https://github.com/Aleee071react-blog)
