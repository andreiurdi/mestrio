# Project Architecture

## Overview

Mestrio follows a **Feature-Based Architecture** with clear separation of concerns:

```
src/
├── app/                    # Next.js App Router (routing & pages)
├── features/              # Feature modules (auth, landing, client, provider, admin)
├── components/            # Reusable UI components
├── lib/                   # Shared utilities, types, and helpers
└── middleware.ts          # Next.js middleware
```

## Directory Structure

### `src/app/` - Next.js App Router

```
app/
├── (auth)/                        # Auth route group
│   ├── layout.tsx                # Auth layout wrapper
│   └── [locale]/
│       ├── login/page.tsx
│       ├── register/page.tsx
│       ├── select-role/page.tsx
│       ├── forgot-password/page.tsx
│       └── reset-password/page.tsx
├── (dashboard)/                   # Protected dashboard group
│   └── [locale]/
│       ├── (client)/             # Client routes
│       ├── (provider)/           # Provider routes
│       └── (admin)/              # Admin routes
├── (public)/                      # Public/landing pages
│   └── [locale]/
│       ├── layout.tsx
│       └── page.tsx
└── api/                           # API routes
    └── auth/
        ├── register/route.ts
        ├── login/route.ts
        ├── logout/route.ts
        └── set-role/route.ts
```

**Principles:**
- Use route groups `()` for layout sharing and organization
- Keep pages as thin as possible - they should use components from features
- API routes are co-located with their domain (e.g., auth routes in `api/auth/`)
- `[locale]` dynamic segment for i18n support

### `src/features/` - Feature Modules

Each feature is self-contained with its own:
- **components/** - Feature-specific UI components
- **hooks/** - Custom React hooks
- **services/** - API service layer (calls to axios)
- **schemas/** - Validation schemas (Zod)
- **types/** - TypeScript definitions
- **context/** - React Context (if needed)

```
features/
├── auth/                          # Authentication feature
│   ├── components/
│   │   ├── AuthLayout.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── SocialLoginButtons.tsx
│   │   ├── FormFieldError.tsx
│   │   └── index.ts               # Barrel export
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   └── index.ts
│   ├── hooks/
│   │   └── index.ts               # Re-exports useAuth from context
│   ├── services/
│   │   ├── auth.service.ts        # API calls for auth
│   │   └── index.ts
│   ├── schemas/
│   │   └── auth-schemas.ts
│   ├── types/
│   │   └── index.ts
│   └── index.ts                   # Feature barrel export
├── landing/                       # Landing page feature
│   ├── components/
│   │   ├── HeroSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── HowItWorksSection.tsx
│   │   ├── CTASection.tsx
│   │   ├── Footer.tsx
│   │   └── index.ts
│   └── types/
│       └── index.ts
├── client/                        # Client-specific feature
│   ├── components/
│   ├── hooks/
│   ├── services/
│   └── types/
├── provider/                      # Provider-specific feature
│   ├── components/
│   ├── hooks/
│   ├── services/
│   └── types/
└── admin/                         # Admin-specific feature
    ├── components/
    ├── hooks/
    ├── services/
    └── types/
```

**Best Practices:**
- Each feature is independent and can be developed/tested in isolation
- Feature `index.ts` files export public API (interfaces and components to use)
- Services layer handles all API calls using axios
- Schemas are placed near where they're validated (auth feature)
- Hooks are specific to the feature's needs

### `src/components/` - Shared Components

```
components/
├── ui/                            # Base/primitives (Shadcn/UI)
│   ├── button.tsx
│   ├── input.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   ├── dropdown-menu.tsx
│   ├── avatar.tsx
│   ├── tabs.tsx
│   ├── badge.tsx
│   ├── sonner.tsx                # Toast notifications
│   └── index.ts
├── common/                        # Shared components across features
│   ├── LanguageSwitcher.tsx
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   └── index.ts
└── index.ts                       # Main barrel export
```

**Guidelines:**
- `ui/` - Unstyled/minimally styled primitives from Shadcn
- `common/` - Components used across multiple features/pages
- Avoid putting feature-specific components here; keep them in features folder

### `src/lib/` - Utilities & Helpers

```
lib/
├── api/                           # API utilities
│   ├── axios.ts                  # Configured axios instance
│   └── index.ts
├── hooks/                         # Global hooks (non-feature specific)
│   ├── useRequireAuth.ts         # Route protection hook
│   └── index.ts
├── utils/                         # General utility functions
│   └── index.ts
├── constants/                     # App constants
│   └── index.ts
├── types/                         # Global types
│   ├── user.ts
│   └── index.ts
├── validators/                    # Shared validators (not Zod schemas)
│   └── index.ts
└── auth.ts                        # DEPRECATED - use features/auth instead
```

**Guidelines:**
- `api/` - Only axios instance and API configuration
- `hooks/` - Only non-feature-specific hooks (like useRequireAuth)
- `utils/` - Pure utility functions with no domain knowledge
- Avoid duplicating feature services here; use features/[feature]/services/

### `src/middleware.ts` - Next.js Middleware

Handles:
- Internationalization (i18n) routing
- Basic cookie validation
- Request logging (optional)

## Naming Conventions

### Files
- **Components**: PascalCase (e.g., `AuthLayout.tsx`)
- **Utilities/Functions**: camelCase (e.g., `auth.service.ts`)
- **Pages**: lowercase with hyphen (e.g., `login/page.tsx`)
- **Hooks**: `use` prefix + camelCase (e.g., `useAuth.ts`)
- **Types**: PascalCase for interfaces/types
- **Barrel exports**: `index.ts`

### Imports

**Good:**
```typescript
import { AuthLayout, ProtectedRoute } from '@/features/auth/components';
import { useAuth } from '@/features/auth/hooks';
import { authService } from '@/features/auth/services';
import type { User, UserRole } from '@/features/auth/types';
import { Button } from '@/components/ui';
import axiosInstance from '@/lib/api/axios';
```

**Bad:**
```typescript
import AuthLayout from '@/features/auth/components/AuthLayout.tsx';
import { useAuth } from '@/features/auth/context/AuthContext';
import { api } from '@/lib/axios';
```

## Data Flow

### Authentication Flow
```
User Input (Page)
    ↓
Form Component (feature/auth/components)
    ↓
API Call (feature/auth/services/auth.service.ts)
    ↓
Axios Instance (lib/api/axios.ts)
    ↓
API Route (app/api/auth/*.ts)
    ↓
Response → AuthContext (feature/auth/context)
    ↓
Page redirects based on auth state
```

### Component Usage Flow
```
Page (app/)
    ↓
Feature Components (features/[feature]/components)
    ↓
Shared Components (components/common or components/ui)
    ↓
Props + Styles (Tailwind CSS)
```

## Dependency Graph

```
Pages (app/)
  └── Features (features/)
      ├── Components (features/*/components)
      ├── Hooks (features/*/hooks)
      ├── Services (features/*/services)
      ├── Context (features/*/context)
      └── Types (features/*/types)
          └── Shared Components (components/)
              ├── Common (components/common)
              └── UI (components/ui)
                  └── Lib Utilities (lib/)
```

**Rule:** Avoid circular dependencies. Features should not depend on each other.

## Adding a New Feature

1. Create folder: `src/features/[feature-name]/`
2. Create subfolders: `components/`, `hooks/`, `services/`, `types/`
3. Create `index.ts` in each subfolder for barrel exports
4. Create feature `index.ts` that exports public API
5. Add pages under `src/app/(dashboard)/[locale]/([feature-name])/`
6. Add API routes under `src/app/api/[feature-name]/` if needed

Example for new "Messages" feature:
```
features/messages/
├── components/
│   ├── MessageList.tsx
│   ├── MessageForm.tsx
│   └── index.ts
├── hooks/
│   ├── useMessages.ts
│   └── index.ts
├── services/
│   ├── messages.service.ts
│   └── index.ts
├── types/
│   └── index.ts
└── index.ts

app/(dashboard)/[locale]/(messages)/
├── messages/
│   └── page.tsx
```

## File Size Guidelines

- **Components**: 100-300 lines (split if larger)
- **Pages**: 50-100 lines (delegate to components)
- **Services**: 50-150 lines per service
- **Hooks**: 30-100 lines (extract to services if logic heavy)

## Performance Optimization

- Use code splitting: Place heavy features in separate bundles
- Use dynamic imports for non-critical features
- Keep components small and focused
- Memoize expensive computations
- Use services layer for API caching (if needed)

## Testing

Test structure mirrors source structure:
```
__tests__/
├── features/
│   └── auth/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       └── context/
├── lib/
└── components/
```

## Common Patterns

### Feature Service Pattern
```typescript
// features/auth/services/auth.service.ts
import axiosInstance from '@/lib/api/axios';
import type { User } from '../types';

export const authService = {
  register: async (data: RegisterInput): Promise<User> => {
    const { data: response } = await axiosInstance.post('/api/auth/register', data);
    return response.user;
  },
  login: async (data: LoginInput): Promise<User> => {
    const { data: response } = await axiosInstance.post('/api/auth/login', data);
    return response.user;
  },
};
```

### Feature Hook Pattern
```typescript
// features/auth/hooks/useAuthForm.ts
import { authService } from '../services';

export function useAuthForm() {
  const { register } = useAuth();
  
  const handleSubmit = async (data) => {
    const user = await authService.register(data);
    register(user);
  };
  
  return { handleSubmit };
}
```

### Feature Component Pattern
```typescript
// features/auth/components/RegisterForm.tsx
import { useAuthForm } from '../hooks';

export function RegisterForm() {
  const { handleSubmit } = useAuthForm();
  
  return (
    <form onSubmit={handleSubmit}>
      {/* form content */}
    </form>
  );
}
```

## Migration Checklist

- [x] Create feature folder structure
- [x] Create barrel exports
- [x] Move auth files to features/auth
- [ ] Move services to features/*/services
- [ ] Update all imports
- [ ] Test complete flow
- [ ] Document any breaking changes
