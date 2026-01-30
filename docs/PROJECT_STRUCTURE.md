# Project Structure Overview

## Final Structure

This document shows the organized project structure after implementing a feature-based architecture.

### Directory Tree

```
src/
├── app/                           # Next.js App Router (Pages & Routes)
│   ├── layout.tsx                # Root layout
│   ├── favicon.ico
│   ├── globals.css
│   ├── api/                       # API Routes
│   │   └── auth/
│   │       ├── register/route.ts
│   │       ├── login/route.ts
│   │       ├── logout/route.ts
│   │       └── set-role/route.ts
│   ├── (auth)/                    # Auth route group
│   │   └── [locale]/
│   │       └── (public)/
│   │           └── auth/
│   │               ├── layout.tsx
│   │               ├── login/page.tsx
│   │               ├── register/page.tsx
│   │               ├── select-role/page.tsx
│   │               ├── forgot-password/page.tsx
│   │               └── reset-password/page.tsx
│   ├── (public)/                  # Public pages route group
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── [locale]/                  # i18n dynamic segment
│       ├── layout.tsx
│       └── (public)/
│           ├── layout.tsx
│           ├── page.tsx
│           ├── PublicHeader.tsx
│           └── auth/
│               └── ...auth pages
│
├── features/                      # Feature Modules (Domain Logic)
│   ├── auth/                      # Authentication Feature
│   │   ├── components/            # Auth-specific components
│   │   │   ├── AuthLayout.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   ├── SocialLoginButtons.tsx
│   │   │   └── index.ts           # Barrel export
│   │   ├── context/               # React Context
│   │   │   ├── AuthContext.tsx
│   │   │   └── index.ts
│   │   ├── hooks/                 # Feature hooks
│   │   │   └── index.ts           # Re-exports useAuth
│   │   ├── services/              # API service layer
│   │   │   ├── auth.service.ts
│   │   │   └── index.ts
│   │   ├── schemas/               # Validation schemas (Zod)
│   │   │   ├── auth-schemas.ts
│   │   │   └── index.ts
│   │   ├── types/                 # Auth-specific types
│   │   │   └── index.ts
│   │   └── index.ts               # Feature barrel export
│   │
│   ├── landing/                   # Landing Page Feature
│   │   ├── components/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── HowItWorksSection.tsx
│   │   │   ├── CTASection.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Logo.tsx
│   │   │   └── index.ts
│   │   └── types/
│   │       └── index.ts
│   │
│   ├── client/                    # Client-specific Feature (future)
│   ├── provider/                  # Provider-specific Feature (future)
│   └── admin/                     # Admin-specific Feature (future)
│
├── components/                    # Shared Components (Not domain-specific)
│   ├── index.ts                   # Main barrel export
│   ├── LanguageSwitcher.tsx
│   ├── ui/                        # Base primitives (Shadcn/UI)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── avatar.tsx
│   │   ├── tabs.tsx
│   │   ├── badge.tsx
│   │   ├── sonner.tsx
│   │   └── index.ts               # Barrel export
│   ├── auth/                      # Auth-related shared components
│   │   ├── FormFieldError.tsx
│   │   └── index.ts
│   ├── common/                    # Common shared components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── index.ts
│   ├── layout/                    # Layout components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── index.ts
│   └── mestrio/                   # Custom Mestrio components
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── ConversationItem.tsx
│       ├── PageHeader.tsx
│       ├── ProviderCard.tsx
│       ├── StatCard.tsx
│       └── index.ts
│
├── lib/                           # Utilities & Helpers
│   ├── index.ts
│   ├── api/                       # API configuration
│   │   ├── axios.ts               # Axios instance
│   │   └── index.ts
│   ├── types/                     # Global types
│   │   ├── user.ts
│   │   └── index.ts
│   ├── hooks/                     # Global hooks
│   │   ├── useRequireAuth.ts
│   │   └── index.ts
│   ├── utils/                     # Utility functions
│   │   └── index.ts
│   ├── constants/                 # App constants (future)
│   │   └── index.ts
│   ├── validators/                # Shared validators (future)
│   │   └── index.ts
│   └── [deprecated]
│       ├── auth.ts                # DEPRECATED - use features/auth
│       ├── auth-schemas.ts        # DEPRECATED - use features/auth
│       ├── actions/auth.ts        # DEPRECATED - use features/auth
│       └── axios.ts               # DEPRECATED - use lib/api/axios
│
├── hooks/                         # LEGACY - Use lib/hooks/ or features/*/hooks/
│   └── useRequireAuth.ts
│
├── i18n/                          # Internationalization
│   └── request.ts
│
├── middleware.ts                  # Next.js middleware
└── i18n.ts                        # i18n configuration
```

## Import Patterns

### Good Imports (Use These)

```typescript
// Feature-level imports
import { useAuth, AuthLayout, SocialLoginButtons, loginSchema, type LoginFormInputs, authService } from "@/features/auth";

// Component imports
import { Button, Input, Card } from "@/components";
import { FormFieldError } from "@/components/auth";

// API & Utils
import axiosInstance from "@/lib/api/axios";
import { useRequireAuth } from "@/lib/hooks";
import type { User, UserRole } from "@/lib/types";
```

### Avoid These Patterns

```typescript
// ❌ Deep imports from features
import { useAuth } from "@/features/auth/context/AuthContext";
import { AuthLayout } from "@/features/auth/components/AuthLayout";

// ❌ Mixing barrel exports with specific paths
import { loginSchema } from "@/lib/auth-schemas"; // Use features/auth instead
import axiosInstance from "@/lib/axios"; // Use lib/api/axios instead
```

## Key Principles

### 1. Feature-Based Organization

- Each feature is self-contained: components, hooks, services, types, schemas
- Features can be developed independently
- Easy to move, remove, or replicate features

### 2. Barrel Exports

- Every directory with multiple exports has an `index.ts`
- Import from the folder, not specific files
- Makes refactoring easier

### 3. Layer Separation

```
Pages (app/)
    ↓ imports from
Features (features/)
    ↓ imports from
Shared Components (components/)
    ↓ imports from
Utilities & Types (lib/)
```

### 4. No Circular Dependencies

- Features should not import from other features
- Only pages/layouts can import multiple features

## Adding New Features

### 1. Create Feature Folder

```bash
mkdir -p src/features/[feature-name]/{components,hooks,services,schemas,types}
```

### 2. Create Barrel Exports

```
features/[feature-name]/
├── components/index.ts
├── hooks/index.ts
├── services/index.ts
├── schemas/index.ts
├── types/index.ts
└── index.ts (main barrel)
```

### 3. Create Pages

```
app/[locale]/(dashboard)/[feature-name]/
├── page.tsx
└── [dynamic]/page.tsx (if needed)
```

### 4. Export from Main Barrel

```typescript
// features/[feature-name]/index.ts
export * from "./components";
export * from "./hooks";
export * from "./services";
export * from "./types";
export * from "./schemas";
```

## File Organization Rules

### Components

- One component per file
- Colocate related files
- Use `index.ts` for exports
- Max 300 lines per component

### Services

- One domain per service file
- Pure API call functions
- No business logic
- 50-150 lines per service

### Hooks

- Feature-specific or global
- Encapsulate complex logic
- 30-100 lines per hook

### Types

- Grouped by feature
- Exported from feature `types/index.ts`
- No runtime code, only types

### Schemas

- Validation schemas (Zod)
- Located in feature folder
- Generated types exported alongside schemas

## Migration Status

✅ **Completed:**

- Barrel exports for components
- Reorganized auth feature module
- Reorganized lib utilities
- Created auth services layer
- Updated all imports

📋 **Planned:**

- Create client feature module
- Create provider feature module
- Create admin feature module
- Add shared utilities
- Add constants folder

## Benefits of This Structure

1. **Scalability** - Easy to add new features without impacting existing code
2. **Maintainability** - Clear separation of concerns, easy to locate code
3. **Reusability** - Shared components and utilities are clearly separated
4. **Testability** - Features are independent, easy to unit test
5. **Performance** - Clear dependency graph, easy to optimize with code splitting
6. **Developer Experience** - Predictable file organization, barrel exports for clean imports

## Next Steps

1. Apply same pattern to client, provider, and admin features
2. Add service layers for API calls in each feature
3. Create utility functions in lib/utils
4. Add constants in lib/constants
5. Implement shared hooks in lib/hooks
