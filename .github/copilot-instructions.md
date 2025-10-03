# Copilot Instructions for nextjs-ecommerce-store

## Repository Overview

This is a full-stack **multi-tenant e-commerce platform** built with Next.js 15, PayloadCMS, and MongoDB. The application allows multiple tenants (sellers) to manage and sell digital products through a unified marketplace with integrated Stripe payments.

**Tech Stack:**
- Next.js 15.5.4 with App Router, React 19, Turbopack
- PayloadCMS 3.57.0 (Headless CMS with MongoDB)
- tRPC for type-safe API routes
- TailwindCSS 4 with shadcn/ui components
- TypeScript with strict mode
- Stripe for payments
- MongoDB (via Mongoose adapter)

**Project Size:** ~118 source files, ~600 lines total code

## Environment Setup

### Required Environment Variables
The following environment variables must be set for the application to function:
- `DATABASE_URI` - MongoDB connection string (required for PayloadCMS)
- `PAYLOAD_SECRET` - Secret for PayloadCMS encryption
- `STRIPE_SECRET_KEY` - Stripe API secret key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook signing secret
- `NEXT_PUBLIC_APP_URL` - Public URL of the application

Create a `.env.local` file in the root directory with these variables before running any commands.

### Runtime Versions
- **Node.js:** v20.19.5 (tested and confirmed working)
- **npm:** 10.8.2
- **Package Manager:** npm is used (not bun, despite bun.lock file presence)

## Build & Development Commands

### Installation
**ALWAYS run `npm install` first** after cloning or when package.json changes:
```bash
npm install
```
- Takes approximately 2 minutes to complete
- Installs 825+ packages
- May show 13 vulnerabilities (9 low, 4 moderate) - these are pre-existing and can be ignored

### Development Server
```bash
npm run dev
```
- Starts Next.js development server with Turbopack
- Listens on http://localhost:3000
- Ready in approximately 1 second
- Requires `.env.local` with valid DATABASE_URI and other env vars
- Uses `next dev --turbopack` for faster builds

### Build (Production)
```bash
npm run build
```
- **KNOWN ISSUE:** Build fails in network-restricted environments due to Google Fonts fetching
- Affected files that import from `next/font/google`:
  - `src/app/(app)/layout.tsx` (DM_Sans)
  - `src/modules/auth/ui/views/sign-in-view.tsx` (Poppins)
  - `src/modules/auth/ui/views/sign-up-view.tsx` (Poppins)
  - `src/modules/home/ui/components/Navbar.tsx` (Poppins)
  - `src/modules/tenants/ui/components/footer.tsx` (Poppins)
  - `src/components/star-rating.tsx` (Rationale)
- **Workaround:** If network access to fonts.googleapis.com is blocked, temporarily replace `next/font/google` imports with local fonts or use system fonts
- Requires valid environment variables to complete
- Uses Next.js experimental React Compiler

### Linting
```bash
npm run lint
```
- Uses ESLint with Next.js TypeScript config
- **Pre-existing issues:** 1 error, 11 warnings (can be ignored)
  - Error: `next.config.ts` uses `require()` style import (line 4)
  - Warnings: unused variables in various files
- Configuration: `eslint.config.mjs`
- Ignores: `node_modules`, `.next`, `out`, `build`, `next-env.d.ts`

### Type Generation
```bash
npm run generate:types
```
- Generates TypeScript types from PayloadCMS collections
- **ALWAYS run after modifying collection schemas** in `src/collections/`
- Outputs to `src/payload-types.ts`
- Takes ~1-2 seconds
- No database connection required

### Database Commands
```bash
npm run db:fresh    # Reset database and run migrations
npm run db:seed     # Seed database with demo data
```
- **Note:** `db:seed` uses `bun run src/seed.ts` - if bun is not available, use `node src/seed.ts` instead
- Requires valid DATABASE_URI in environment
- Seed creates:
  - Admin tenant (slug: 'admin')
  - Admin user (email: admin@demo.com, password: demo)
  - Categories and subcategories for products

### Production Start
```bash
npm run start
```
- Runs production build (requires `npm run build` first)
- Starts on port 3000

## Project Architecture

### Directory Structure

```
/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (app)/             # Main application routes
│   │   │   ├── (auth)/        # Auth pages (sign-in, sign-up)
│   │   │   ├── (home)/        # Public homepage routes
│   │   │   ├── (library)/     # User's purchased products
│   │   │   ├── (tenants)/     # Multi-tenant product pages
│   │   │   ├── api/           # API routes (tRPC, Stripe webhooks)
│   │   │   ├── layout.tsx     # Root layout with TRPCReactProvider
│   │   │   └── globals.css    # TailwindCSS 4 styles
│   │   ├── (payload)/         # PayloadCMS admin UI routes
│   │   └── my-route/          # Example custom route
│   ├── collections/           # PayloadCMS collection schemas
│   │   ├── Users.ts           # User authentication & roles
│   │   ├── Tenants.ts         # Multi-tenant sellers
│   │   ├── Products.ts        # Digital products
│   │   ├── Categories.ts      # Product categories (hierarchical)
│   │   ├── Tags.ts            # Product tags
│   │   ├── Media.ts           # File uploads
│   │   ├── Orders.ts          # Purchase records
│   │   └── Reviews.ts         # Product reviews
│   ├── modules/               # Feature modules (server + UI)
│   │   ├── auth/              # Authentication logic
│   │   ├── categories/        # Category management
│   │   ├── checkout/          # Stripe checkout flow
│   │   ├── home/              # Homepage with search/filters
│   │   ├── library/           # User's product library
│   │   ├── products/          # Product listing/details
│   │   ├── reviews/           # Review system
│   │   ├── tags/              # Tag management
│   │   └── tenants/           # Tenant management
│   ├── components/            # Shared React components
│   │   └── ui/                # shadcn/ui components
│   ├── trpc/                  # tRPC setup
│   │   ├── init.ts            # tRPC context & procedures
│   │   ├── routers/           # API routers
│   │   ├── client.tsx         # Client-side provider
│   │   └── server.tsx         # Server-side caller
│   ├── lib/                   # Utility libraries
│   │   ├── utils.ts           # cn(), formatCurrency(), etc.
│   │   └── stripe.ts          # Stripe client initialization
│   ├── hooks/                 # Custom React hooks
│   ├── payload.config.ts      # PayloadCMS configuration
│   ├── payload-types.ts       # Auto-generated types (DO NOT EDIT)
│   ├── seed.ts                # Database seeding script
│   └── constants.ts           # App constants (DEFAULT_LIMIT, etc.)
├── public/                    # Static assets
├── media/                     # Uploaded media files
├── .prettierrc                # Prettier config (no semicolons, single quotes)
├── components.json            # shadcn/ui configuration
├── eslint.config.mjs          # ESLint configuration
├── next.config.ts             # Next.js configuration
├── postcss.config.mjs         # PostCSS (TailwindCSS)
├── tsconfig.json              # TypeScript config (strict mode)
└── package.json               # npm scripts & dependencies
```

### Module Pattern
Each feature module follows this structure:
```
modules/[feature]/
├── server/
│   └── procedures.ts          # tRPC procedures (API endpoints)
├── ui/
│   ├── views/                 # Page-level components
│   └── components/            # Feature-specific components
├── hooks/                     # Feature-specific React hooks
├── type.ts                    # TypeScript types
└── search-params.ts           # URL search param schemas
```

### Key Architectural Patterns

1. **Multi-tenant Architecture:**
   - Configured via `@payloadcms/plugin-multi-tenant`
   - Products belong to tenants
   - Super-admin users have access to all tenants
   - Tenant routes: `/tenants/[slug]/...`

2. **tRPC API Layer:**
   - All API routes use tRPC for type safety
   - Base procedure: provides Payload instance to all endpoints
   - Protected procedure: requires authentication (checks session)
   - Router location: `src/trpc/routers/_app.ts`
   - Endpoint: `/api/trpc/[trpc]`

3. **PayloadCMS Collections:**
   - Relationships: Products → Tenants, Categories, Tags, Media
   - Orders track purchases (user + product + Stripe session)
   - Reviews link to products and users
   - All collections auto-generate TypeScript types

4. **Authentication:**
   - Handled by PayloadCMS built-in auth
   - Session checked via `payload.auth({ headers })`
   - User roles: `super-admin` for full access
   - Auth pages: `/sign-in`, `/sign-up`

## Configuration Files

- **TypeScript:** `tsconfig.json` - strict mode, path aliases (`@/*` → `src/*`, `@payload-config`)
- **ESLint:** `eslint.config.mjs` - Next.js + TypeScript rules
- **Prettier:** `.prettierrc` - no semicolons, single quotes
- **Tailwind:** Configured via `postcss.config.mjs` and `@tailwindcss/postcss` (v4)
- **shadcn/ui:** `components.json` - New York style, RSC enabled, prefix: none
- **Next.js:** `next.config.ts` - uses `withPayload()` wrapper, experimental React Compiler

## Validation & CI/CD

**No GitHub Actions workflows** are currently configured. To validate changes:

1. **Type Check:** `npm run generate:types` (after collection changes)
2. **Lint:** `npm run lint` (will show pre-existing issues)
3. **Build:** `npm run build` (may fail due to Google Fonts in network-restricted environments)
4. **Manual Testing:** `npm run dev` and test functionality

## Common Tasks

### Adding a New Collection
1. Create `src/collections/YourCollection.ts` with CollectionConfig
2. Import and add to `src/payload.config.ts` collections array
3. Run `npm run generate:types` to generate TypeScript types
4. Restart dev server if running

### Adding a New tRPC Router
1. Create `src/modules/[feature]/server/procedures.ts`
2. Export router using `createTRPCRouter`
3. Import and add to `src/trpc/routers/_app.ts`
4. Types are automatically inferred on client

### Adding a New UI Component
1. Use `npx shadcn@latest add [component]` for shadcn/ui components
2. Custom components go in `src/components/` or within feature modules
3. Use `cn()` utility from `@/lib/utils` for className merging

### Modifying Environment Variables
1. Update code references to `process.env.VAR_NAME`
2. Document new variables in `.env.local` (not committed)
3. Update this file with new required variables

## Important Notes

- **DO NOT edit `src/payload-types.ts`** - auto-generated by PayloadCMS
- **DO NOT remove `node_modules` or `.next`** from .gitignore
- **ALWAYS run `npm run generate:types`** after changing collection schemas
- **Pre-existing lint warnings/errors exist** - only fix new issues you introduce
- **Google Fonts network issue** in restricted environments - use workaround
- **No test framework** is currently configured
- **Database required** for most operations - ensure DATABASE_URI is set
- **Stripe keys required** for checkout functionality
- **Path aliases:** Use `@/` for `src/` imports (configured in tsconfig.json)
- **Server vs Client:** Modules follow server/ui separation for RSC compatibility

## Dependencies to Know

**Key Production Dependencies:**
- `payload` ^3.57.0 - Headless CMS
- `@payloadcms/db-mongodb` - MongoDB adapter
- `@payloadcms/plugin-multi-tenant` - Multi-tenancy
- `next` 15.5.4 - React framework
- `react` 19.1.1 - UI library
- `@trpc/server` & `@trpc/client` ^11.6.0 - Type-safe APIs
- `stripe` ^19.0.0 - Payment processing
- `zod` ^4.1.11 - Schema validation
- `sharp` ^0.34.4 - Image optimization (required by Payload)
- `zustand` ^5.0.8 - Client state management

**Key Dev Dependencies:**
- `typescript` ^5 - Type checking
- `eslint` ^9 - Linting
- `tailwindcss` ^4 - Styling
- `@tailwindcss/postcss` ^4 - TailwindCSS v4 integration

## Files to Check First

When making changes, these files are most commonly affected:

1. **Collections:** `src/collections/*.ts` - data schema changes
2. **API Routes:** `src/modules/*/server/procedures.ts` - backend logic
3. **UI Views:** `src/modules/*/ui/views/*.tsx` - page components
4. **Config:** `src/payload.config.ts` - PayloadCMS setup
5. **Types:** `src/payload-types.ts` (auto-generated, read-only)
6. **Routing:** `src/app/(app)/**/page.tsx` - Next.js pages
7. **Utils:** `src/lib/utils.ts` - shared utilities

## Trust These Instructions

The information in this document has been validated through testing. Only search for additional information if:
- You encounter behavior that contradicts these instructions
- You need details about specific implementation not covered here
- These instructions are incomplete for your task

When in doubt, refer to the official docs:
- Next.js: https://nextjs.org/docs
- PayloadCMS: https://payloadcms.com/docs
- tRPC: https://trpc.io/docs
