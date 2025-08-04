# One For All Coaching – Frontend

This repository contains the React (Vite) frontend and serverless API routes for the One For All Coaching website.

## Local development

1. Install dependencies

```bash
npm install
```

2. Start the dev server

```bash
npm run dev
```

The site will be available at http://localhost:5173 (default Vite port).

## Deployment – Vercel

The project is pre-configured for zero-config deployment on [Vercel](https://vercel.com).

1. Push the repository to GitHub/GitLab/Bitbucket.
2. In your Vercel dashboard, click **New Project** and import the repository.
3. Vercel will automatically detect the Vite + React framework and apply the following settings (also defined in `vercel.json`):

   - **Install Command**: `npm install`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. Add any required environment variables in **Settings → Environment Variables**.
5. Click **Deploy** – your site will be live shortly on a `*.vercel.app` domain.

### Serverless functions

Any files placed in the `api/` directory are deployed as Vercel Serverless Functions. For example, `api/content-update.ts` is accessible at:

```
https://<your-domain>/api/content-update
```

## Project structure

- `client/` – React application source code
- `shared/` – Shared utilities and types
- `api/` – Vercel Serverless Functions
- `public/` – Static assets copied as-is to `dist`
- `vite.config.ts` – Vite configuration
- `vercel.json` – Vercel routing & build settings

## License

MIT