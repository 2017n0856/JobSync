# JobSync Frontend

A modern React TypeScript frontend for the JobSync platform, built with Ant Design and styled-components.

## 🚀 Features

- **Authentication System**: Login and signup with JWT tokens
- **Protected Routes**: Secure access to dashboard and other pages
- **Modern UI**: Clean, responsive design using Ant Design
- **State Management**: Zustand for global state management
- **TypeScript**: Full type safety throughout the application
- **Environment Configuration**: Configurable API endpoints

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Ant Design** for UI components
- **Styled-components** for custom styling
- **React Router** for navigation
- **Zustand** for state management
- **Vite** for build tooling

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Update the `.env` file with your configuration:
```env
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_NAME=JobSync
```

## 🚀 Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Build

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── LoginScreen.tsx
│   │   ├── SignupScreen.tsx
│   │   └── ProtectedRoute.tsx
│   ├── layout/
│   │   ├── DashboardLayout.tsx
│   │   └── Sidebar.tsx
│   └── dashboard/
│       ├── DashboardHome.tsx
│       ├── ClientsPage.tsx
│       ├── WorkersPage.tsx
│       ├── TasksPage.tsx
│       ├── InstitutesPage.tsx
│       └── StatsPage.tsx
├── constants/
│   └── api.ts
├── store/
│   └── authStore.ts
├── App.tsx
└── main.tsx
```

## 🔐 Authentication

The application uses JWT tokens for authentication. The auth flow includes:

1. **Login**: Users can login with email/username and password
2. **Signup**: New users can create accounts with required fields
3. **Protected Routes**: Only authenticated users can access dashboard
4. **Persistent State**: Authentication state persists across browser sessions

### Required Fields for Signup:
- **Name**: Full name of the user
- **Email**: Valid email address
- **Username**: Unique username (3+ characters, alphanumeric + underscore)
- **Password**: Minimum 6 characters
- **Phone Number**: Optional, international format

## 🌐 API Integration

The frontend connects to the backend API with the following endpoints:

- **Authentication**: `/auth/login`, `/auth/signup`
- **Users**: `/users/*`
- **Clients**: `/clients/*`
- **Workers**: `/workers/*`
- **Tasks**: `/tasks/*`
- **Institutes**: `/institutes/*`

API base URL is configured via environment variables.

## 🎨 UI Components

The application uses Ant Design components for a consistent and professional look:

- **Forms**: Login and signup forms with validation
- **Layout**: Responsive sidebar and content area
- **Navigation**: Menu-based navigation with active states
- **Cards**: Dashboard statistics and content cards
- **Buttons**: Consistent button styling throughout

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:3000` |
| `VITE_APP_NAME` | Application name | `JobSync` |

### API Constants

API endpoints are centralized in `src/constants/api.ts` for easy maintenance and updates.

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔒 Security Features

- **Protected Routes**: Automatic redirection for unauthenticated users
- **Form Validation**: Client-side validation for all forms
- **Secure Storage**: JWT tokens stored securely in localStorage
- **Input Sanitization**: Proper validation and sanitization of user inputs

## 🚀 Deployment

The application can be deployed to any static hosting service:

1. Build the application: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Ensure environment variables are configured in production

## 🤝 Contributing

1. Follow the existing code style and patterns
2. Use TypeScript for all new components
3. Add proper error handling and loading states
4. Test thoroughly before submitting changes

## 📄 License

This project is part of the JobSync platform.
