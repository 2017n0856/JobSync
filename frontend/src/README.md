# JobSync Frontend - Feature-First Architecture

This project follows a **Feature-First Architecture** pattern, which organizes code by business features rather than technical concerns.

## Directory Structure

```
src/
├── features/                    # Feature-based modules
│   ├── auth/                   # Authentication feature
│   │   ├── components/         # Auth-specific components
│   │   ├── hooks/             # Auth-specific hooks
│   │   ├── services/          # Auth-specific services
│   │   ├── types/             # Auth-specific types
│   │   └── index.ts           # Feature exports
│   ├── dashboard/             # Dashboard feature
│   │   ├── components/        # Dashboard components
│   │   ├── hooks/            # Dashboard hooks
│   │   ├── services/         # Dashboard services
│   │   ├── types/            # Dashboard types
│   │   └── index.ts          # Feature exports
│   ├── clients/              # Client management feature
│   ├── workers/              # Worker management feature
│   ├── tasks/                # Task management feature
│   └── institutes/           # Institute management feature
├── shared/                   # Shared across features
│   ├── components/           # Reusable components
│   │   ├── ui/              # UI components (buttons, inputs, etc.)
│   │   ├── layout/          # Layout components
│   │   └── common/          # Common components
│   ├── hooks/               # Shared hooks
│   ├── utils/               # Utility functions
│   ├── types/               # Shared types
│   ├── constants/           # Shared constants
│   ├── services/            # Shared services
│   └── index.ts             # Shared exports
├── app/                     # App-level concerns
│   ├── providers/           # Context providers
│   ├── store/               # Global state management
│   ├── router/              # Routing configuration
│   ├── styles/              # Global styles
│   ├── App.tsx              # Main App component
│   └── index.ts             # App exports
├── assets/                  # Static assets
├── main.tsx                 # Application entry point
└── vite-env.d.ts           # Vite environment types
```

## Key Principles

### 1. Feature Isolation
Each feature is self-contained with its own:
- Components
- Hooks
- Services
- Types
- Tests (when added)

### 2. Shared Code
Common utilities, components, and types are placed in the `shared/` directory:
- Reusable UI components
- Utility functions
- API clients
- Type definitions
- Constants

### 3. App-Level Concerns
Application-wide concerns are in the `app/` directory:
- Global state management (Zustand stores)
- Routing configuration
- Context providers
- Main App component

## Import Patterns

### Feature Imports
```typescript
// Import from feature index
import { LoginScreen, useAuthRedirect } from '../features/auth'
import { ClientsPage } from '../features/clients'
```

### Shared Imports
```typescript
// Import from shared index
import { DashboardLayout, apiClient } from '../shared'
```

### App Imports
```typescript
// Import from app index
import { useAuthStore } from '../app'
```

## Benefits

1. **Scalability**: Easy to add new features without affecting existing ones
2. **Maintainability**: Related code is co-located
3. **Team Collaboration**: Different teams can work on different features
4. **Clear Boundaries**: Each feature is self-contained
5. **Easy Testing**: Features can be tested in isolation
6. **Code Splitting**: Natural boundaries for lazy loading

## Adding New Features

1. Create a new directory in `features/`
2. Add the standard subdirectories: `components/`, `hooks/`, `services/`, `types/`
3. Create an `index.ts` file to export the feature's public API
4. Update the main App component to include the new feature

## Adding Shared Code

1. Place in appropriate `shared/` subdirectory
2. Export from `shared/index.ts`
3. Import using the shared index

## Migration Notes

This structure was migrated from a flat organization to improve maintainability and scalability. All existing functionality has been preserved while improving the overall architecture. 