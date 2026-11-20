# Plan: Real backend for the E-Commerce Platform

## Goal
Replace the fake API and demo login with a real database and real authentication.

## Features
- Products stored in a database (Supabase), shown to everyone
- Sign up and log in with email and password
- Two roles: customer and admin
- Only admins can add, edit and delete products (enforced by the database, not just hidden buttons)
- Loading and error states everywhere
- Tests for the store logic and key components

## Data
- products: id, title, price, description, category, image, stock
- profiles: id (linked to the user), role (customer or admin)

## Steps
1. Supabase project and products table
2. Read products from Supabase
3. Auth
4. Roles and security rules
5. Admin CRUD
6. Tests
7. README and deploy

## Risks
- Never put the service_role key in the frontend
- Test the rules by trying to write as a customer