# Shopsy - Multi-Vendor E-commerce Platform

A modern marketplace where independent vendors can create their own online stores, manage products, and sell to customers - all under one platform with complete data isolation.

Built with **Next.js 15**, **Payload CMS**, **tRPC**, and **Stripe**.

## What It Does

**For Vendors:**

- Instant store setup with your own subdomain
- Product management with rich descriptions and images
- Secure payments directly to your Stripe account
- Track orders and sales analytics
- No monthly fees - just 10% per sale

**For Customers:**

- Browse products from multiple independent stores
- Secure checkout with Stripe
- Persistent shopping cart
- Order history and reviews
- Advanced search and filtering

## Tech Stack

**Frontend:**

- Next.js 15 (App Router, React 19, Server Components)
- TypeScript
- Tailwind CSS 4 (Neobrutalism design)
- TanStack Query (data fetching & caching)
- Zustand (cart state)

**Backend:**

- tRPC 11 (type-safe API)
- Payload CMS 3 (headless CMS with admin panel)
- MongoDB (database)
- Stripe (payments)

**Key Features:**

- Multi-tenant architecture with data isolation
- Server-side rendering with prefetching
- N+1 query optimization
- Role-based access control

## How It Works

### Multi-Tenancy

Each vendor gets their own isolated space:

- Separate product catalog
- Private media library
- Independent customer base
- Individual Stripe account

### Payment Flow

1. Customer purchases product → Stripe checkout
2. Platform automatically takes 10% fee
3. Vendor receives 90% in their Stripe account
4. Stripe processing fees (~2.9% + $0.30) also apply

### Architecture

```
Customer → Store → Products → Cart → Checkout → Orders
                                                    ↓
                                              Stripe Payment
                                                    ↓
                                              90% → Vendor Account
                                              10% → Platform
```

## Getting Started

### Prerequisites

- Node.js 18+ or Bun 1.0+
- MongoDB (local or Atlas)
- Stripe account

### Quick Start

```bash
# Clone and install
git clone <repository-url>
cd nextjs-ecommerce-store
bun install

# Set up environment
cp .env.example .env.local
# Add your MongoDB URI, Stripe keys, and other credentials

# Initialize database
bun run generate:types
bun run db:fresh

# Start development server
bun run dev
```

Visit `http://localhost:3000` for the storefront and `http://localhost:3000/admin` for the CMS panel.

### Environment Variables

```env
DATABASE_URI=mongodb://localhost:27017/ecommerce
PAYLOAD_SECRET=your-secret-key-min-32-chars
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Project Structure

```
src/
├── app/              # Next.js routes
│   ├── (app)/       # Public pages (home, about, features, pricing, contact)
│   └── (payload)/   # Payload CMS admin
├── collections/      # Database schemas (Products, Users, Orders, etc.)
├── modules/          # Feature modules with tRPC routers
│   ├── auth/        # Authentication
│   ├── products/    # Product management
│   ├── checkout/    # Shopping cart & orders
│   └── ...
└── trpc/            # API configuration
```

## Deployment

Deploy to Vercel:

1. Connect your repository
2. Add environment variables
3. Deploy

Set up Stripe webhooks pointing to: `https://your-app.vercel.app/api/webhooks/stripe`

---

**License:** MIT

**Built with:** Next.js, Payload CMS, tRPC, Stripe, MongoDB
