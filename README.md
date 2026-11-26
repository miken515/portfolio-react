# Mike Nguyen · Portfolio

Personal portfolio built with **Next.js 16**, **React 19**, **Tailwind CSS**, **shadcn/ui**, **Motion**, and **Three.js** via **React Three Fiber**.

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Where things live

| Path | What it is |
| --- | --- |
| `lib/resume.ts` | All resume content (experience, projects, skills, education). Edit this when the resume changes. |
| `components/main-content/` | Page sections: hero, about, experience, projects, hobbies, contact |
| `components/three/` | Three.js scenes: hero wave, golf hole, runner, game controller |
| `components/three/scene-canvas.tsx` | Canvas wrapper that pauses rendering when a scene is off screen and respects reduced motion |
| `app/api/send-email/route.ts` | Contact form endpoint (Nodemailer + Gmail) |

## Environment variables

The contact form needs a `.env` (or `.env.local`) with:

```
EMAIL_USER=your-gmail-address
EMAIL_PASS=your-gmail-app-password
RECEIVER_EMAIL=where-messages-should-go
```

## Scripts

- `npm run dev` – start the dev server
- `npm run build` – production build
- `npm run start` – serve the production build
- `npm run lint` – ESLint (flat config in `eslint.config.mjs`)
