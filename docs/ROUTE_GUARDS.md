# Route Guards Implementation

This document explains how route guards work in the Mestrio application.

## Overview

Route guards are implemented in the middleware (`src/middleware.ts`) to protect routes based on user authentication status and role.

## User Roles

The application supports three user roles:

- `client` - Users looking for construction workers
- `provider` - Construction workers offering services
- `admin` - Administrators managing the platform

User roles are defined in `src/lib/types/user.ts`.

## Protected Routes

- `/client/*` - Client dashboard and related pages
- `/provider/*` - Provider dashboard and related pages
- `/admin/*` - Admin dashboard and related pages
- `/auth/select-role` - Role selection page (only for authenticated users without a role)

## Route Guard Logic

The middleware enforces the following rules:

### 1. Unauthenticated Users

- Cannot access protected routes (`/client/*`, `/provider/*`, `/admin/*`)
- Will be redirected to `/auth/login`

### 2. Authenticated Users Without Role

- Must select a role on the `/auth/select-role` page
- Cannot access any dashboard until a role is selected
- Will be redirected to `/auth/select-role` if trying to access other routes

### 3. Authenticated Users With Role

- Cannot access the `/auth/select-role` page
- Will be redirected to their appropriate dashboard
- Can only access routes matching their role:
  - `client` → `/client/*`
  - `provider` → `/provider/*`
  - `admin` → `/admin/*`
- Attempting to access a different role's dashboard will redirect to the correct one

## Implementation Details

### Authentication

Currently using cookie-based authentication (placeholder implementation):

- User data is stored in a `user` cookie
- Cookie includes user ID, email, name, and role

**TODO**: Replace with actual authentication provider (e.g., NextAuth, Supabase Auth, etc.)

### Files

- `src/middleware.ts` - Main middleware with route guard logic
- `src/lib/auth.ts` - Authentication utility functions
- `src/lib/actions/auth.ts` - Server actions for role management
- `src/lib/types/user.ts` - User and role type definitions
- `src/app/[locale]/(public)/auth/select-role/page.tsx` - Role selection page

## Flow Diagram

```
User Signs Up
    ↓
Authenticated (no role)
    ↓
Redirected to /auth/select-role
    ↓
User Selects Role (client/provider)
    ↓
Role is saved
    ↓
Redirected to appropriate dashboard
```

## Testing Route Guards

To test the route guards:

1. **Unauthenticated Access**:
   - Try accessing `/client`, `/provider`, or `/admin` without being logged in
   - Should redirect to `/auth/login`

2. **Role Selection**:
   - Sign up/login (when auth is implemented)
   - Should be redirected to `/auth/select-role`
   - Select a role
   - Should be redirected to appropriate dashboard

3. **Wrong Dashboard Access**:
   - Login as a client
   - Try accessing `/provider` or `/admin`
   - Should be redirected back to `/client`

## Future Enhancements

- [ ] Implement actual authentication provider
- [ ] Add database integration for user/role persistence
- [ ] Add role-based permissions within dashboards
- [ ] Add loading states during authentication checks
- [ ] Add error handling for failed role updates
