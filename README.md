# fleetlineSITE

Modern portfolio website built with `Vite + React + TypeScript`.

## Stack

- React 18
- React Router
- Vite
- Tailwind CSS
- Motion

## Local development

```bash
npm install
npm run dev
```

For LAN access:

```bash
npm run dev:host
```

Production build:

```bash
npm run build
npm run preview
```

## Project structure

- `src/app/components` - UI and page components
- `src/app/data` - portfolio content
- `src/assets` - static assets and local media

## Notes

- Case pages are generated from shared data in `src/app/data/projects.ts`.
- Hero animation is loaded from local assets in `src/assets/back`.
