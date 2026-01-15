# React E-commerce Project

A modern, full-stack capable E-commerce application built with React, Vite, TailwindCSS, and Zustand.

## Features

- **Storefront**: Home page, Product Catalog with filters, Product Details, Cart, Checkout.
- **User Account**: Login, Register, Profile with Order History.
- **Admin Panel**: Dashboard, Product Management (CRUD).
- **Tech Stack**:
  - React 18 + Vite
  - TailwindCSS for styling
  - Zustand for state management
  - React Router v6 for routing
  - React Hook Form + Zod for forms
  - Axios for API requests
  - JSON-Server for mock backend

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository (if applicable) or navigate to the project folder.
2. Install dependencies:

```bash
npm install
```

### Running the Project

You need to run both the frontend development server and the mock backend server.

1. **Start the Mock Backend** (in a separate terminal):

```bash
npm run server
```

This will start JSON-Server on port 3000, serving data from `server/db.json`.

2. **Start the Frontend** (in another terminal):

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Project Structure

```
src/
  components/       # Shared UI components
    ui/             # Atomic components (Button, Input, Card)
    layout/         # Layout components (Navbar, Footer)
  features/         # Feature-based modules
    admin/          # Admin dashboard & CRUD
    auth/           # Authentication logic
    cart/           # Cart logic
    products/       # Product catalog logic
  hooks/            # Custom hooks
  lib/              # Utilities (axios, cn)
  pages/            # Page components
  store/            # Zustand global stores
```

## Configuration
Create a `.env` file in the root directory to configure the API URL:
```env
VITE_API_URL=http://localhost:3000
```

## Admin Access
To access the admin panel, use the pre-configured admin account:
- **Email**: `admin@example.com`
- **Password**: `password123` (or any string)

The login logic now verifies users against the database in `server/db.json`.

## Customization

- **Tailwind**: Edit `tailwind.config.js` to change the theme.
- **Mock Data**: Edit `server/db.json` to modify initial products.
