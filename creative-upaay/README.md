# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# Creative Upaay — Dashboard Assignment (Level 1)

## Overview
React-based dashboard with three task columns (To Do, In Progress, Done). Supports:
- Add task (title, description, category, priority)
- Move tasks between columns (drag & drop)
- Filtering by search / category / priority
- Redux Toolkit for state management
- LocalStorage persistence

## Tech stack
- React 18
- Redux Toolkit
- Tailwind CSS
- react-beautiful-dnd

## Run locally
1. `npm install`
2. `npm run dev`
3. Open `http://localhost:5173`

## Deployment
- Build: `npm run build`
- Deploy `dist/` to Netlify / Vercel / Render

## Notes & Assumptions
- Additional task metadata can be added easily.
- Drag-and-drop uses `react-beautiful-dnd`.
- State is persisted to `localStorage` under key `creative_upaay_state`.

## Demo
Record a short screen capture (e.g., Loom) showing:
- Add task to a column
- Move task via drag & drop
- Filter tasks
- Refresh page to show persistence

