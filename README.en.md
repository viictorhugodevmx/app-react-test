# Notification Rules Builder

A full-stack application for creating, editing, and
managing configurable notification rules.

## Live Demo

**Application:**
https://notification-rules-demo.netlify.app

**API:**
https://notification-rules-backend.onrender.com/api

**Status:** Deployed and functionally verified.

## Architecture

| Layer | Technology | Hosting |
|---|---|---|
| Frontend | React 19, TypeScript 6, Vite 8, Tailwind CSS 4 | Netlify |
| Backend | Node.js 22.19.0, Express, TypeScript | Render |
| Database | PostgreSQL 18 | Neon |

Backend repository:
https://github.com/viictorhugodevmx/notification-rules-backend

## Features

- Persistent rule listing.
- Three-step rule creation wizard.
- Editing existing rules.
- Persistent activation and deactivation.
- Customer, payment, and unanswered-ticket triggers.
- Dynamic conditions with AND/OR logic.
- Configurable Email, SMS, and Webhook actions.
- Form validation.
- HTTP error handling, including duplicate names (409).
- Toast notifications and loading states.
- Responsive interface.

## Local Development

Requirements: Node.js 22.19.0, npm, and a configured backend.

```bash
npm install
cp .env.example .env.local
```

Configure `.env.local`:

```dotenv
VITE_API_BASE_URL=http://localhost:3001/api
```

Start:

```bash
npm run dev
```

Local frontend: http://localhost:5173

Do not commit `.env.local`.

## Deployment

The frontend is deployed from the `main` branch using Netlify.

Configuration:

- Build command: `npm run build`
- Publish directory: `dist`
- Variable: `VITE_API_BASE_URL`
- Value: `https://notification-rules-backend.onrender.com/api`

Vite embeds VITE_* variables at build time.
Changes to these values require a new build.

The backend runs on Render with CORS configured
to allow the Netlify application origin.

PostgreSQL is hosted on Neon and persists data
independently of browser sessions.

## REST API

| Method | Route | Operation |
|---|---|---|
| GET | /api/rules | List rules |
| GET | /api/rules/:ruleId | Fetch rule |
| POST | /api/rules | Create rule |
| PUT | /api/rules/:ruleId | Update rule |
| PATCH | /api/rules/:ruleId/status | Change status |

The backend generates rule UUIDs.

## Verification Performed

- Rule creation in the deployed application.
- Editing with persistence after browser refresh.
- Persistent activation and deactivation.
- Retrieval of conditions and actions.
- HTTP 409 rejection of duplicate names.
- React, Express, and PostgreSQL integration.
- HTTP response and CORS verification.
- Manual UI testing.
- TypeScript and Vite compilation.

## Commands

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

## Scope and Limitations

- Email, SMS, and Webhook actions are configured and
  stored, but are not actually dispatched.
- Authentication and authorization are not implemented.
- The public API permits write operations;
  use fictional demonstration data only.
- Automated frontend tests are not implemented.
- Render's free hosting may spin down after inactivity,
  delaying the first API request.

This project is a technical demonstration and is not
intended to process sensitive data.

## Main Structure

```text
src/
├── components/
├── config/
├── services/
│   └── rulesApi.ts
├── types/
├── utils/
└── App.tsx
```

## Documentation

Spanish version: [README.md](README.md).
