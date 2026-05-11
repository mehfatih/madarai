# Madar AI — madarai.co

AI Growth Operating System for subscription mobile apps.
A product of [Zyrix Global Technologies](https://zyrix.com).

## Stack
- **Framework**: Astro 4 + React 19 islands
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL + Auth + Realtime)
- **Email**: Resend + React Email
- **Hosting**: Cloudflare Pages
- **Background Jobs**: Railway

## Getting Started

```bash
# Install dependencies
pnpm install

# Copy env file and fill in values
cp .env.example .env

# Start dev server
pnpm dev
```

## Environment Variables

See `.env.example` for all required variables.

## Supabase Setup

Run `src/lib/schema.sql` in your Supabase SQL editor to create all tables.

## Languages

- English: `madarai.co/`
- Turkish: `madarai.co/tr/`
- Arabic: `madarai.co/ar/`

## Deploy

Connected to Cloudflare Pages. Push to `main` branch triggers auto-deploy.
