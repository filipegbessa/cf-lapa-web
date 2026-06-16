# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Start

```bash
npm install              # Install dependencies
npm run dev              # Start development server (http://localhost:3000)
npm run build            # Build for production
npm start                # Run production build
npm run lint             # Run ESLint
npx playwright test      # Run Playwright E2E tests
```

## Project Overview

**CF Lapa** is a Next.js 14 admin dashboard for managing a CrossFit gym. The project includes:
- Public landing page (under development)
- Admin panel with authentication (JWT-based)
- Management of exercises (movimentos) and workouts (treinos)
- Analytics dashboard
- User approval workflow

### Tech Stack
- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios (with interceptors for auth)
- **Rich Text**: TipTap editor
- **Testing**: Playwright
- **Icons**: Lucide React
- **JWT**: jose library for token verification

## Architecture

### Directory Structure

```
/app                  # Next.js app router pages and layouts
  /admin              # Protected admin section
    /dashboard        # Main admin dashboard
    /movimentos       # Exercise management (CRUD)
    /treinos          # Workout management (CRUD)
    /analytics        # Analytics dashboard
    /configuracoes    # Settings page
    /aguardando       # Pending approval page for new users
  /api                # API routes (if any server actions)
  /login              # Login page and auth components
  /page.tsx           # Public landing page

/services             # API client services
  /client.ts          # Axios instance with auth interceptor
  /auth.service.ts    # Authentication endpoints
  /movements.service.ts
  /workouts.service.ts
  /analytics.service.ts

/components/admin     # Shared admin UI components
  /Sidebar.tsx        # Navigation sidebar

/hooks                # Custom React hooks
  /useListPageState   # State management for list pages (pagination, filters)
  /usePagination      # Pagination logic hook

/modules              # Feature-specific types and constants
  /movements          # Exercise feature (types, constants)
  /workouts           # Workout feature (types, constants)
  /analytics          # Analytics feature (types, constants, utils)

/types                # Global TypeScript types
  /pagination.types   # Pagination interfaces

/utils                # Utility functions
/lib                  # Small libraries/helpers
```

## Authentication & Middleware

**Key Files**: `middleware.ts`, `services/auth.service.ts`

### How It Works
1. User logs in at `/login` → receives JWT token
2. Token is stored in **sessionStorage** (client-side) and **cookies** (server-side)
3. **Middleware** (`middleware.ts`) protects all `/admin/*` routes:
   - Redirects unauthenticated users to `/login`
   - Validates token expiry
   - Handles users without role assignment (redirects to `/admin/aguardando`)
   - Injects user data via headers (`x-user-role`, `x-user-email`, `x-user-id`)
4. **API interceptor** (`services/client.ts`) automatically attaches token to requests
5. On 401 response, token is cleared and user redirected to login

### Important Notes
- Token is required for all API requests
- Session timeout or token expiry forces re-login
- Middleware runs on every request to `/admin/*` routes

## API & Services Pattern

**Pattern**: Services as static objects with methods, using axios client

```typescript
// services/movements.service.ts
export const movimentsService = {
  async list(filters?: MovementFilters) {
    const response = await api.get<PaginatedResponse<Movement>>("/movements", {
      params: filters,
    });
    return response.data;
  },
  
  async getById(id: string) {
    const response = await api.get<Movement>(`/movements/${id}`);
    return response.data;
  },
  
  async create(data: CreateMovementDto) {
    const response = await api.post<Movement>("/movements", data);
    return response.data;
  },
  
  async update(id: string, data: Partial<CreateMovementDto>) {
    const response = await api.patch<Movement>(`/movements/${id}`, data);
    return response.data;
  },
  
  async remove(id: string) {
    await api.delete(`/movements/${id}`);
  },
};
```

### Adding New Services
1. Create `services/yourfeature.service.ts`
2. Import `api` from `services/client.ts`
3. Define DTOs in `modules/yourfeature/yourfeature.types.ts`
4. Export service as static object with methods

## Data Types & Modules

Types are organized by feature in `/modules`:
- Each feature has a `*.types.ts` file (interfaces) and `*.constants.ts` file
- Global types (pagination, etc.) go in `/types`

When adding a new feature:
1. Create `/modules/featurename/` folder
2. Define types: `featurename.types.ts` (interfaces for model, DTO, filters)
3. Add constants: `featurename.constants.ts` (enums, default values)
4. Create service: `/services/featurename.service.ts`

## Component Patterns

### Client vs Server Components
- **Most components are `'use client'`** because they use hooks, state, and event handlers
- Admin layout is a client component for state management (mobile menu toggle)
- Layout structure: shared header/sidebar + page-specific content

### Sidebar & Navigation
- `components/admin/Sidebar.tsx` handles admin navigation
- Links are based on user role (from middleware headers)
- Mobile-responsive with overlay

### List Pages Pattern
The `useListPageState` hook encapsulates pagination, filtering, and data fetching logic for list pages:
- Manages loading/error states
- Handles pagination (page, limit)
- Supports filtering via query parameters
- Integrates with service methods

## Styling

- **Tailwind CSS** for all styling
- Colors use custom classes (primary red: `#E63946`)
- Dark theme elements in use (check `globals.css` for custom styles)
- Mobile-first responsive design (use `lg:` breakpoint for layout shifts)

## Environment Variables

Required env vars (see `.env.example`):
- `NEXT_PUBLIC_API_URL` - Base URL for API requests
- `JWT_SECRET` - Used in middleware for token verification (should match backend)

Client-side accessible vars must be prefixed with `NEXT_PUBLIC_`.

## Form Patterns

Forms use **React Hook Form** + **Zod** validation:
- Define validation schema with Zod
- Use `useForm()` hook from react-hook-form
- Use `@hookform/resolvers/zod` for integration
- Typical pattern: schema → form setup → handle submit

## Testing

- **Playwright** for E2E tests
- Tests run with `npx playwright test`
- Test files should be placed in `/tests` or co-located as `.spec.ts`

## Key Decisions

1. **Axios over Fetch**: Interceptors for auth token injection and 401 handling
2. **Client Components for Admin**: Simpler state management for interactive UI
3. **Middleware for Auth**: Server-side security layer that validates tokens before rendering
4. **Session Storage for Token**: Client-side token storage (lost on refresh, which is acceptable)
5. **Static Service Objects**: Simpler than class-based or context-based approaches for small apps
6. **Modules Organization**: Feature-based organization for better scalability

## Common Workflows

### Creating a New Admin Page
1. Create page file in `/app/admin/yourfeature/page.tsx`
2. It's automatically a client component (add `'use client'` if needed)
3. Use service to fetch data: `const data = await yourService.list()`
4. Export the component as default
5. Sidebar automatically picks it up (if routes match)

### Adding a List Page with Pagination
1. Use `useListPageState` hook to manage pagination/filtering
2. Call service with filters from hook state
3. Render data in table/grid with pagination controls
4. Hook handles URL param syncing automatically

### Making API Calls
1. All calls go through services in `/services`
2. Services use axios `api` instance (auth interceptor applied automatically)
3. Handle errors in components (services throw on error)
4. 401 errors are handled globally by interceptor (redirects to login)

## Notes for Future Development

- Keep services simple — they're just API wrappers, not business logic containers
- Add new features in feature-specific directories under `/modules`
- Use TypeScript strictly — `noEmit: true` and `strict: true` are enforced
- Client-side sensitive data (passwords, tokens) should never be logged
- Mobile responsive: test on mobile before pushing (admin panel is responsive)
- Path alias `@/` maps to project root for clean imports
