# Website 1.1 - Vite + React + Bun

This is the Vite + React version of the Guava Milk website, converted from Next.js to a pure client-side SPA.

## Tech Stack

- **Frontend**: Vite + React 18
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod validation
- **UI Components**: Radix UI primitives
- **Routing**: React Router DOM
- **Backend**: Express.js API server for email handling
- **Email**: Resend API

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed (

### Installation

1. Install frontend dependencies:
```bash
cd website-1.1
bun install
```

2. Install server dependencies:
```bash
cd server
bun install
```

### Environment Variables

Create a `.env` file in the `server` directory:
```
RESEND_API_KEY=your_resend_api_key_here
```

### Development

Run the frontend and backend together:
```bash
bun run dev:all
```

Or run them separately:

**Frontend only** (runs on http://localhost:5173):
```bash
bun run dev
```

**Backend API server** (runs on http://localhost:3001):
```bash
bun run server
```

### Build for Production

```bash
bun run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
bun run preview
```

## Project Structure

```
website-1.1/
├── public/              # Static assets
├── server/              # Express API server
│   ├── index.js         # API endpoints
│   └── package.json     # Server dependencies
├── src/
│   ├── components/
│   │   ├── form/        # Form step components
│   │   ├── globals/     # Header, Footer
│   │   └── ui/          # Reusable UI components
│   ├── context/         # React context providers
│   ├── emails/          # Email templates
│   ├── lib/             # Utilities
│   ├── pages/           # Route page components
│   ├── schema/          # Zod validation schemas
│   ├── App.jsx          # Main app with routing
│   ├── main.jsx         # Entry point
│   └── globals.css      # Global styles
├── index.html           # HTML template
├── package.json
├── tailwind.config.js
├── vite.config.js
└── postcss.config.js
```

## Key Differences from Next.js Version

1. **No Server Components**: All components are client-side only
2. **React Router**: Uses `react-router-dom` instead of Next.js file-based routing
3. **Separate API Server**: Express server handles form submissions instead of Next.js API routes
4. **No Image Optimization**: Uses standard `<img>` tags instead of `next/image`
5. **Google Fonts**: Loaded via `<link>` in index.html instead of `next/font`
6. **No "use client" Directives**: Not needed in pure React apps
7. **Vite Dev Server**: Proxies `/api` requests to the Express server in development

## Available Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start Vite dev server |
| `bun run build` | Build for production |
| `bun run preview` | Preview production build |
| `bun run server` | Start API server |
| `bun run dev:all` | Run frontend and backend together |

