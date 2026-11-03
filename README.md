# E-Commerce Platform

A responsive e-commerce web app built with React, TypeScript, Zustand and Tailwind CSS. Users can browse products, view product details and manage a cart. An admin dashboard lets you add, edit and delete products.

<img width="1897" height="905" alt="image" src="https://github.com/user-attachments/assets/62ce574c-ab15-4ef7-8e2c-c472ea06d3d7" />

**Live Demo:** [View Project Live](https://mostafaosman9439.github.io/E-Commerce-Platform/)

<img width="1917" height="905" alt="image" src="https://github.com/user-attachments/assets/5a447551-6e6a-4f79-bdc2-75f649ae7493" />

---

## Features
- Product grid loaded from the Fake Store API, with TypeScript interfaces for the data
- Filter products by category and maximum price
- Product detail pages (`/product/:id`)
- Cart: add products, increase or decrease quantities, remove items, clear the cart, and see the automatic total
- Demo login: enter any username and choose Customer or Admin
- Admin dashboard: add, edit and delete products, with a "Reset products" button to restore the originals
- Global state with Zustand. Products, cart and login are saved in the browser with localStorage

---

<img width="1897" height="897" alt="image" src="https://github.com/user-attachments/assets/1dd3c9bf-0401-47ef-82c8-6a7b29ef8250" />

## Tech stack
React, Vite, TypeScript, Zustand, React Router, Tailwind CSS

---

## Limitations
- The login is a front-end demo only: any username works and the role is picked on the page, so it is not real security.
- There is no backend. The Fake Store API does not save changes, so admin edits are stored in the browser (localStorage) and stay on this device only.
- The app uses HashRouter, so URLs contain `#` (for example `/#/cart`). This lets page refreshes work on GitHub Pages.
- There are no automated tests yet.

---

## Run Locally

```bash
git clone https://github.com/MostafaOsman9439/E-Commerce-Platform.git
cd E-Commerce-Platform
npm install
npm run dev
```

## What I learned and next steps
- Managing global state with Zustand and typing API data with TypeScript
- Next: add tests (Vitest and React Testing Library), user authentication, and a real backend

---

*Built with passion by Mostafa Osman ([GitHub](https://github.com/MostafaOsman9439) · [LinkedIn](https://www.linkedin.com/in/mostafa-osman-6ba36a43a/))*
