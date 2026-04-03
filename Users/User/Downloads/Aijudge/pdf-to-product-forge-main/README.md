# AI Judge - Vaquill SDE Intern Assignment

An intelligent courtroom simulation application where an AI acts as an impartial judge to resolve disputes between two parties. The system analyzes case details, supporting documents, and arguments from both sides to deliver fair verdicts.

## 🎯 Project Overview

AI Judge is a full-stack web application that simulates a courtroom environment where:
- **Side A** and **Side B** submit their case details and supporting documents
- An **AI Judge** analyzes the submissions and delivers an initial verdict
- Both parties can present **follow-up arguments** (up to 5 rounds each)
- The AI Judge provides a **final verdict** after considering all arguments

## 🚀 Features

### ✅ Implemented Features
- **Dual-Side Case Submission**: Both parties can submit their case details independently
- **Document Upload**: Support for PDF, DOC, DOCX, and TXT files
- **AI Verdict Display**: Clear presentation of the judge's decision with reasoning
- **Interactive Argument Phase**: Up to 5 follow-up arguments per side
- **Professional Legal UI**: Courtroom-inspired design with judicial color scheme
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **SEO Optimized**: Meta tags and semantic HTML for better discoverability

### 🔮 Future Enhancements
- Real AI integration with LLM APIs (Claude, GPT, Gemini)
- Document parsing and content extraction
- Case history and database storage
- PDF report generation
- User authentication system

## 🛠️ Technologies Used

- **Frontend Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite (Fast development server and optimized builds)
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Routing**: React Router DOM v6
- **State Management**: React Query (TanStack Query)
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Notifications**: Sonner (toast notifications)

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js**: Version 16.x or higher (LTS version recommended)
  - Check version: `node --version`
  - Download from: [nodejs.org](https://nodejs.org/)
- **npm**: Version 7.x or higher (comes with Node.js)
  - Check version: `npm --version`
- **Git**: For cloning the repository
  - Check version: `git --version`
  - Download from: [git-scm.com](https://git-scm.com/)

## 📥 Installation Guide

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd ai-judge
```

### Step 2: Install Dependencies

```bash
# Install all required packages
npm install

# This will install all dependencies listed in package.json including:
# - React and React DOM
# - TypeScript and type definitions
# - Tailwind CSS and plugins
# - shadcn/ui components
# - React Router and React Query
# - Form handling libraries
# - And more...
```

**Note**: The installation process may take 2-5 minutes depending on your internet connection.

### Step 3: Verify Installation

```bash
# Check if all dependencies are installed correctly
npm list --depth=0
```

You should see a list of all installed packages without any errors.

## 🚀 Running the Project

### Development Mode

Start the development server with hot-reload:

```bash
npm run dev
```

**What happens:**
- Vite development server starts on port 8080
- The application will automatically open in your default browser
- Navigate to: `http://localhost:8080`
- Any code changes will automatically reload the page

**Console Output:**
```
VITE v5.x.x  ready in XXX ms

➜  Local:   http://localhost:8080/
➜  Network: http://[your-ip]:8080/
➜  press h + enter to show help
```

### Production Build

Create an optimized production build:

```bash
# Build the project
npm run build

# Preview the production build locally
npm run preview
```

**What happens:**
- TypeScript code is compiled and type-checked
- React components are optimized and bundled
- CSS is minified and purged of unused styles
- Assets are optimized and hashed for caching
- Output is generated in the `dist/` directory

## 📁 Project Structure

```
ai-judge/
├── public/                      # Static assets
│   ├── robots.txt              # SEO crawling instructions
│   └── favicon.ico             # Website icon
├── src/
│   ├── components/             # Reusable React components
│   │   ├── ui/                # shadcn/ui components
│   │   │   ├── button.tsx     # Button component
│   │   │   ├── card.tsx       # Card component
│   │   │   ├── input.tsx      # Input component
│   │   │   ├── textarea.tsx   # Textarea component
│   │   │   └── ...            # Other UI components
│   │   └── NavLink.tsx        # Navigation link component
│   ├── pages/                 # Page components (routes)
│   │   ├── Index.tsx          # Landing page
│   │   ├── CaseSubmission.tsx # Case submission form
│   │   ├── Verdict.tsx        # Verdict and arguments page
│   │   └── NotFound.tsx       # 404 error page
│   ├── hooks/                 # Custom React hooks
│   │   ├── use-mobile.tsx     # Mobile detection hook
│   │   └── use-toast.ts       # Toast notification hook
│   ├── lib/                   # Utility functions
│   │   └── utils.ts           # Helper functions
│   ├── App.tsx                # Main app component with routing
│   ├── main.tsx               # Application entry point
│   ├── index.css              # Global styles and design tokens
│   └── vite-env.d.ts          # TypeScript declarations
├── index.html                 # HTML entry point
├── vite.config.ts             # Vite configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
├── package.json               # Project dependencies
└── README.md                  # This file
```

## 🎨 Design System

The application uses a custom design system with semantic color tokens:

### Color Palette
- **Judicial**: Deep navy (#1a1f3a) - Professional legal tone
- **Gold**: Warm gold (#d4af37) - Authority and prestige
- **Side A**: Blue (#3b82f6) - Represents first party
- **Side B**: Purple (#8b5cf6) - Represents second party

### Usage in Code
```tsx
// ✅ CORRECT: Use semantic tokens
<div className="bg-judicial text-judicial-foreground">

// ❌ WRONG: Don't use direct colors
<div className="bg-blue-900 text-white">
```

## 🔄 Application Flow

1. **Landing Page** (`/`)
   - Introduction to AI Judge concept
   - "Begin Case Submission" button

2. **Case Submission** (`/case`)
   - Side A submits: Name, case title, description, documents
   - Side B submits: Name, case title, description, documents
   - Both sides must complete submission
   - Click "Submit Case to AI Judge"

3. **Verdict Page** (`/verdict`)
   - Display AI Judge's initial verdict
   - Show reasoning and analysis
   - Enter argument phase (5 rounds max per side)
   - View final verdict after all arguments

## 🧪 Development Workflow

### Making Changes

1. **Edit files** in the `src/` directory
2. **Save your changes** - Vite will automatically reload
3. **Check the browser** for updates
4. **Check the console** for any errors

### Adding New Components

```bash
# shadcn/ui components are already installed
# To add a new page:
# 1. Create a new file in src/pages/
# 2. Add the route in src/App.tsx
```

### Styling Guidelines

- Use Tailwind utility classes
- Follow the design system tokens
- Keep components responsive
- Use semantic HTML tags

## 🐛 Troubleshooting

### Common Issues

**Port 8080 already in use:**
```bash
# Kill the process using port 8080
# On Windows:
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# On Mac/Linux:
lsof -ti:8080 | xargs kill -9
```

**Dependencies not installing:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors:**
```bash
# Restart TypeScript server in VSCode
# Press: Ctrl+Shift+P (Cmd+Shift+P on Mac)
# Type: "TypeScript: Restart TS Server"
```

**Build fails:**
```bash
# Check for TypeScript errors
npx tsc --noEmit

# Check for linting errors
npm run lint
```

## 📝 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter (if configured)
npm run lint
```

## 🌐 Deployment

### Deploy with Lovable

1. Visit the [Lovable Project](https://lovable.dev/projects/115288b3-5289-441b-8d9b-980676e243e5)
2. Click **Share → Publish**
3. Your app will be deployed with a lovable.app subdomain

### Deploy to Other Platforms

The production build (`dist/` folder) can be deployed to:
- **Vercel**: Connect GitHub repo or drag-and-drop `dist/`
- **Netlify**: Connect GitHub repo or drag-and-drop `dist/`
- **GitHub Pages**: Push `dist/` to gh-pages branch
- **AWS S3**: Upload `dist/` to S3 bucket with static hosting

## 🔒 Environment Variables

Currently, the app doesn't require environment variables. When adding AI integration or backend features, create a `.env` file:

```env
VITE_API_KEY=your_api_key_here
VITE_API_URL=https://api.example.com
```

Access in code:
```typescript
const apiKey = import.meta.env.VITE_API_KEY;
```

## 📚 Learning Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Lovable Documentation](https://docs.lovable.dev/)

## 🤝 Contributing

This is an assignment project. For production use:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is part of the Vaquill SDE Intern Assignment.

## 💡 Need Help?

- **Lovable Support**: [docs.lovable.dev](https://docs.lovable.dev/)
- **Issues**: Check the console in browser DevTools (F12)
- **Community**: [Lovable Discord](https://discord.com/channels/1119885301872070706/1280461670979993613)

---

**Built with ❤️ for Vaquill SDE Intern Assignment**
