# Study development

Repository for my studies. Anyone can clone and use this repository for studies.

## Environment setup

Use #file:installation.py to install project dependencies from `requirements.txt`.

### Why this script exists

The script centralizes dependency installation in one place, so setup instructions stay consistent.

### How to run

From the repository root:

```bash
python src/lib/installation.py
```

## Running on localhost (development)

This project now has a local HTTP server with the same server-side calculations used in Vercel.

From the repository root:

```bash
npm run dev
```

Open `http://localhost:3000`.

The local server provides:

- Static file hosting for the project
- API route `GET /api/site-context`
- Server-side calculation for relative paths, breadcrumb parts and favicon resolution

### Offline development alternative

If you need to test without server-side context calculation:

```bash
npm run dev:offline
```

In this mode, the server still hosts static files, but `GET /api/site-context` returns `503` on purpose so the frontend uses the local fallback context.

You can also force offline mode in the browser (without restarting the server):

- Add `?offline=1` to the page URL, or
 - Run `setOfflineContextMode(true)` in the browser console.

To disable the browser-level override, run `setOfflineContextMode(false)`.

## AI code assistant

The site includes a Portuguese chat assistant that searches relevant text/code files in the repository and returns code examples or links to matching files. It appears on the homepage and the 31 HTML pages that already load the shared `src/js/script.js`; independent activity pages are left unchanged. Its server-side route is `POST /api/assistant`; it does not send credentials to browser JavaScript.

The Manus-managed runtime provides `MANUS_API_URL` and the server-side `MANUS_API_KEY`. The local Desktop Host does not inject the server key into local previews, so the endpoint returns a recoverable configuration error there rather than using a browser-safe key. For deployments outside the Manus runtime, configure `MANUS_API_URL` and `MANUS_API_KEY` as server-side environment variables in the hosting provider. Never put these credentials in frontend code or commit them in an environment file.

## Running on Vercel

The route `api/site-context.js` runs as a Vercel Serverless Function.

The frontend requests `/api/site-context` during initialization, so path and favicon calculations are resolved on the server in production.
