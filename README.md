# E-Commerce Platform

A responsive e-commerce web app built with React, TypeScript, Zustand and Tailwind CSS. It is a frontend project that uses Supabase as a hosted backend (database and authentication). Users can browse products, sign up and log in, and manage a cart. Admins can add, edit and delete products from a dashboard.

<img width="1917" height="900" alt="image" src="https://github.com/user-attachments/assets/4664b89a-a61b-41ff-94d6-bc2013621720" />

**Live Demo:** [View Project Live](https://mostafaosman9439.github.io/E-Commerce-Platform/)

<img width="1917" height="900" alt="image" src="https://github.com/user-attachments/assets/39ab707b-cde5-4434-b008-40b3047280ef" />

---

## Features

- Products are loaded from a Supabase Postgres table, with TypeScript interfaces for the data
- Filter products by category and maximum price
- Product detail pages (`/product/:id`)
- Cart: add products, change quantities, remove items, clear the cart, and see the automatic total. The cart is saved in the browser (localStorage)
- Sign up, log in and log out with Supabase Auth (email and password)
- Two roles, customer and admin, stored in a `profiles` table
- Admin dashboard: add, edit and delete products in the database. Only admins can do this, and the rule is enforced by Row Level Security (RLS) policies in Postgres, not just by hiding buttons
- "Reload products" reloads the product list from the database
- Global state with Zustand

---

<img width="1917" height="907" alt="image" src="https://github.com/user-attachments/assets/fb06cb29-c57b-41d6-acbc-460219de56ca" />

<img width="1917" height="907" alt="image" src="https://github.com/user-attachments/assets/b152e00a-a4dc-4282-8cc5-e37ff6a10856" />

## Tech stack

React 19, TypeScript, Vite, Zustand, React Router (HashRouter), Tailwind CSS, Supabase (Postgres, Auth, RLS), Vitest and React Testing Library, GitHub Pages

---

## Limitations

- There is no checkout, payment or order system. The cart is saved only in the browser (localStorage), so it is not linked to an account and does not sync between devices.
- This is a frontend project. The backend is Supabase, a hosted service, and I did not write my own server.
- New users are always customers. The app has no way to make someone an admin, so an admin role has to be set directly in the Supabase database.
- Email confirmation is turned off for the demo, so sign-up does not verify email addresses and allows unverified or fake emails.
- The app uses HashRouter, so URLs contain `#` (for example `/#/cart`). This lets page refreshes work on GitHub Pages.
- Tests cover only the cart store, `ProductCard` and `ProtectedRoute`. The Supabase calls and the admin dashboard have no tests, and there is no CI.

---

## Technical decisions

- **Security lives in the database, not in the UI.** Hiding the admin buttons is not real protection, so the admin rules are Row Level Security (RLS) policies in Postgres. Even if someone calls the API directly, only admins can add, edit or delete products.
- **Roles are in a separate `profiles` table.** Users can only read their own profile, and there is no update permission, so nobody can promote themselves to admin from the app.
- **`ProtectedRoute` waits for the session check.** Without this, refreshing an admin page would briefly look "logged out" and redirect the admin away.
- **Zustand for state.** It is small and simple, and its `persist` middleware saves the cart in localStorage.
- **HashRouter** so page refreshes work on GitHub Pages.
- **SQL files are kept in `docs/sql/`** so the database setup can be recreated.
- **Tests focus on logic.** Vitest and React Testing Library cover the cart rules and the route protection first, because that is where bugs would hurt most.

## What I learned

- Moving from a fake API to a real backend: loading and error states, and handling failed requests
- The difference between authentication (who you are) and authorization (what you may do), and why authorization must be enforced in the database
- Writing SQL policies and testing them with real accounts
- Writing component tests, including testing redirects and loading states
- Next steps: tests for the Supabase calls and the admin dashboard, and CI that runs the checks automatically

---

## Run Locally

You need your own free Supabase project, because the app reads its products and users from a database.

```bash
git clone https://github.com/MostafaOsman9439/E-Commerce-Platform.git
cd E-Commerce-Platform
npm install
```

1. Create a project at [supabase.com](https://supabase.com).
2. In the Supabase SQL editor, run the files in `docs/sql/` in order: `001_products.sql`, `002_profiles.sql`, `003_admin_policies.sql`.
3. Create a file named `.env.local` in the project root with your project's URL and anon key:

```bash
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

4. Start the app:

```bash
npm run dev
```

The store starts empty. To add products, make an admin (sign up in the app, then change that user's `role` to `admin` in the `profiles` table) and use the admin dashboard.

Run the tests with `npm test`.

---

_Built with passion by Mostafa Osman ([GitHub](https://github.com/MostafaOsman9439) · [LinkedIn](https://www.linkedin.com/in/mostafa-osman-6ba36a43a/))_
