# CF Lapa Web

A modern admin dashboard for managing CrossFit Lapa gym operations, built with Next.js 14.

## 🚀 Features

- **Admin Dashboard** - Central hub for gym management
- **Exercise Management** - Create, edit, and manage gym exercises (movimentos)
- **Workout Planning** - Build and manage workout programs (treinos)
- **Analytics** - Track gym metrics and insights
- **User Management** - Admin approval workflow for new members
- **Responsive Design** - Works seamlessly on desktop and mobile
- **JWT Authentication** - Secure token-based authentication

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cf-lapa-web
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your API URL and JWT secret
```

## 📦 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (http://localhost:3000) |
| `npm run build` | Build for production |
| `npm start` | Run production build locally |
| `npm run lint` | Run ESLint |
| `npx playwright test` | Run E2E tests |

## 🏗️ Project Structure

```
cf-lapa-web/
├── app/                    # Next.js App Router
│   ├── admin/             # Protected admin routes
│   │   ├── dashboard/     # Main dashboard
│   │   ├── movimentos/    # Exercise management
│   │   ├── treinos/       # Workout management
│   │   ├── analytics/     # Analytics
│   │   └── configuracoes/ # Settings
│   ├── login/             # Authentication pages
│   └── page.tsx           # Public landing page
├── components/            # Reusable React components
├── services/             # API client services
├── modules/              # Feature-specific types & constants
├── hooks/                # Custom React hooks
├── utils/                # Utility functions
└── types/                # Global TypeScript types
```

## 🔐 Authentication

The application uses JWT-based authentication:

1. Users log in via `/login`
2. JWT token is stored and automatically sent with API requests
3. Protected routes are managed via middleware
4. New users must wait for admin approval

**Environment Variable**: `JWT_SECRET` must match your backend's secret.

## 🎨 Styling

- **Tailwind CSS** for utility-first styling
- **Lucide React** for icons
- Dark-first design with custom color palette (primary: #E63946)
- Fully responsive mobile-first approach

## 📝 Form Validation

Forms use:
- **React Hook Form** - Efficient form state management
- **Zod** - TypeScript-first schema validation

Example:
```typescript
const schema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});
```

## 🧪 Testing

Run E2E tests with Playwright:
```bash
npx playwright test
npx playwright test --ui  # Interactive mode
```

## 📚 API Integration

All API calls go through typed service layer:

```typescript
// Example: Creating a movement
import { movimentsService } from '@/services/movements.service';

const newMovement = await movimentsService.create({
  name: "Barbell Squat",
  abbreviation: "BS",
  description: "Full body compound movement",
});
```

## 🌐 Environment Variables

Required variables (set in `.env.local`):

```env
NEXT_PUBLIC_API_URL=http://your-api-url
JWT_SECRET=your-jwt-secret-key
```

- Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser
- Other variables are private and only accessible on the server

## 🤝 Development Workflow

1. Create feature branch from `main`
2. Make changes following the project structure
3. Run tests: `npx playwright test`
4. Lint code: `npm run lint`
5. Build locally: `npm run build`
6. Create PR with description of changes

## 📖 For Developers

Detailed architecture and development guidelines are available in [CLAUDE.md](./CLAUDE.md).

## 🐛 Troubleshooting

**Port 3000 already in use:**
```bash
npm run dev -- -p 3001
```

**Node modules issues:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Build errors:**
```bash
npm run build -- --verbose
```

## 📄 License

© 2026 CF Lapa. All rights reserved.

## 📧 Support

For issues or questions, please contact the development team.
