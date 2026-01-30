# Authentication System Documentation

## Overview

Mestrio uses a Context API-based authentication system with the following components:

- **AuthContext** - Client-side state management for user authentication
- **API Routes** - Backend endpoints for auth operations
- **Route Protection** - Components and hooks for protecting routes
- **Middleware** - i18n support and basic cookie validation

## Architecture

### State Management (Context API)

The `AuthContext` manages:
- User state (id, email, name, role)
- Loading states
- Error handling
- Auth methods (login, register, logout, setRole)

Located in: `src/features/auth/context/AuthContext.tsx`

### API Endpoints

All endpoints are located in `src/app/api/auth/`:

| Endpoint | Method | Purpose | TODO |
|----------|--------|---------|------|
| `/api/auth/register` | POST | Create new user account | Implement DB integration, password hashing |
| `/api/auth/login` | POST | Authenticate user | Implement DB query, password verification |
| `/api/auth/logout` | POST | Clear session | Clear DB session |
| `/api/auth/set-role` | POST | Update user role | Persist role to database |

### Cookies

Authentication uses cookies to persist state between:
- Server (middleware/API routes)
- Client (browser/Context API)

**Cookie Structure:**
```json
{
  "id": "user_123",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "client",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

## Usage

### Using Auth Context

```tsx
import { useAuth } from "@/features/auth/context/AuthContext";

export function MyComponent() {
  const { 
    user,           // Current user or null
    isAuthenticated,  // boolean
    isLoading,      // boolean
    error,          // error message or null
    login,          // async (email, password) => Promise<void>
    register,       // async (email, password, name) => Promise<void>
    logout,         // async () => Promise<void>
    setRole,        // async (role) => Promise<void>
    clearError,     // () => void
  } = useAuth();

  // Use the auth state and methods
}
```

### Protecting Routes with useRequireAuth Hook

```tsx
import { useRequireAuth } from "@/hooks/useRequireAuth";

// Protect route - require authentication
export function ClientPage() {
  useRequireAuth();
  return <div>Client Dashboard</div>;
}

// Protect route with specific role
export function AdminPage() {
  useRequireAuth({ requiredRole: "admin" });
  return <div>Admin Dashboard</div>;
}

// Protect route with multiple roles
export function WorkerPage() {
  useRequireAuth({ requiredRole: ["provider", "admin"] });
  return <div>Worker Dashboard</div>;
}
```

### Protecting Routes with ProtectedRoute Component

```tsx
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";

export function App() {
  return (
    <ProtectedRoute requiredRole="client">
      <ClientDashboard />
    </ProtectedRoute>
  );
}
```

## Authentication Flow

### Registration Flow

```
User fills registration form
    ↓
User clicks "Sign Up"
    ↓
POST /api/auth/register
    ↓
Server creates user, sets cookie
    ↓
Client sets user in AuthContext
    ↓
Redirect to /auth/select-role
```

### Login Flow

```
User fills login form
    ↓
User clicks "Login"
    ↓
POST /api/auth/login
    ↓
Server verifies credentials, sets cookie
    ↓
Client sets user in AuthContext
    ↓
Middleware/useRequireAuth checks role
    ↓
If has role: Redirect to dashboard
If no role: Redirect to /auth/select-role
```

### Role Selection Flow

```
Authenticated user without role
    ↓
/auth/select-role page shown
    ↓
User selects role (client/provider)
    ↓
POST /api/auth/set-role
    ↓
Server updates user role
    ↓
Client updates AuthContext
    ↓
Redirect to appropriate dashboard (/client, /provider, or /admin)
```

### Protected Route Access

```
User navigates to protected route
    ↓
useRequireAuth/ProtectedRoute hook runs
    ↓
Check if authenticated
    ↓
  ✗ Not authenticated → Redirect to /auth/login
  ✓ Authenticated → Check role
    ↓
  ✗ No role → Redirect to /auth/select-role
  ✓ Has role → Check permissions
    ↓
  ✗ Wrong role → Redirect to correct dashboard
  ✓ Correct role → Render component
```

## Implementation Details

### Cookie Management

**Client-side (AuthContext):**
```typescript
// Set cookie
document.cookie = `user=${encodeURIComponent(JSON.stringify(user))}; path=/; max-age=${60*60*24*7}`;

// Read cookie
const userCookie = document.cookie
  .split("; ")
  .find((row) => row.startsWith("user="))
  ?.split("=")[1];
const user = JSON.parse(decodeURIComponent(userCookie));
```

**Server-side (API routes):**
```typescript
// Set cookie
response.cookies.set("user", JSON.stringify(user), {
  httpOnly: false,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 60 * 60 * 24 * 7,
  path: "/",
});
```

### Error Handling

```tsx
const { error, clearError } = useAuth();

useEffect(() => {
  if (error) {
    console.error(error);
    // Handle error in UI
  }
}, [error]);

// Clear error
clearError();
```

## Files Structure

```
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── register/route.ts
│   │       ├── login/route.ts
│   │       ├── logout/route.ts
│   │       └── set-role/route.ts
│   └── [locale]/
│       ├── layout.tsx (wrapped with AuthProvider)
│       └── (public)/
│           └── auth/
│               ├── register/page.tsx
│               ├── login/page.tsx
│               └── select-role/page.tsx
├── features/
│   └── auth/
│       ├── context/
│       │   └── AuthContext.tsx
│       └── components/
│           ├── ProtectedRoute.tsx
│           └── AuthLayout.tsx
├── hooks/
│   └── useRequireAuth.ts
└── lib/
    ├── auth.ts (utility functions)
    ├── types/
    │   └── user.ts
    └── actions/
        └── auth.ts
```

## Integration Checklist

When integrating with a real backend/auth provider:

### Database Integration
- [ ] Replace `/api/auth/register` with actual user creation
- [ ] Implement password hashing (bcrypt, argon2, etc.)
- [ ] Replace `/api/auth/login` with database query and password verification
- [ ] Implement `/api/auth/logout` with session cleanup
- [ ] Persist role changes in `/api/auth/set-role`

### Authentication Provider
- [ ] Replace cookie-based auth with actual provider (NextAuth, Supabase, etc.)
- [ ] Update AuthContext to use provider SDK
- [ ] Update API routes to use provider
- [ ] Implement session validation

### Security
- [ ] Set `httpOnly: true` for cookies (once backend is secure)
- [ ] Implement CSRF protection
- [ ] Add rate limiting to auth endpoints
- [ ] Use HTTPS in production
- [ ] Implement proper password validation

### Testing
- [ ] Test login flow
- [ ] Test registration flow
- [ ] Test role selection
- [ ] Test route protection
- [ ] Test logout
- [ ] Test error handling
- [ ] Test session persistence

## Types

### User Type
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  role?: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

type UserRole = "client" | "provider" | "admin";
```

### Auth Context Type
```typescript
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  register: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setRole: (role: UserRole) => Promise<void>;
  clearError: () => void;
}
```

## Troubleshooting

### User stays logged in but route is protected
- Check that `useRequireAuth` hook is called in the component
- Verify that AuthProvider is wrapping the app (in layout)
- Check browser console for errors

### Cookie not persisting
- Ensure `secure: false` for development (or use HTTPS)
- Check that `path: "/"` is set
- Check that domain is correct

### Role not updating
- Verify `/api/auth/set-role` endpoint is working (check network tab)
- Ensure user cookie is properly decoded/encoded
- Check that role is being persisted in database (once implemented)

### Infinite redirect loop
- Check middleware conditions
- Ensure AuthContext is initialized properly
- Verify redirect paths are correct
