# Notification Rules Builder

A web application for creating, editing, and managing
configurable notification rules, integrated with a REST API
and PostgreSQL persistence.

## Tech Stack

### Frontend
- React 19
- TypeScript 6
- Vite 8
- Tailwind CSS 4
- Fetch API

### Backend
- Node.js 22.19.0
- Express
- TypeScript
- PostgreSQL 17
- node-postgres (pg)

The backend is maintained in a separate repository.

## Implemented Features

- Rule listing backed by PostgreSQL.
- Three-step rule creation wizard.
- Editing existing rules.
- Persistent rule activation and deactivation.
- Three triggers:
  - Customer created.
  - Payment received.
  - Ticket unanswered.
- Dynamic conditions with compatible operators.
- AND/OR condition logic.
- Configurable Email, SMS, and Webhook actions.
- Form and business-rule validation.
- Duplicate-name handling (HTTP 409).
- API and network error handling.
- Loading indicators and toast notifications.
- Responsive interface.

## Requirements

- Node.js 22.19.0 and npm.
- A running Notification Rules backend.
- PostgreSQL configured for the backend.

## Frontend Setup

Install dependencies and create a local configuration:

```bash
npm install
cp .env.example .env.local
```

Configure `.env.local`:

```dotenv
VITE_API_BASE_URL=http://localhost:3001/api
```

Start the development server:

```bash
npm run dev
```

Open:

http://localhost:5173

The `.env.local` file must remain outside version control.

## Backend Setup

The backend has its own project and `.env` file.

Refer to its README and documentation:

- `docs/API_CONTRACT.md`
- `docs/DATABASE.md`

PostgreSQL must be configured and the database schema must
be applied before starting the API.

From the backend directory:

```bash
npm run dev
```

Local API:

http://localhost:3001/api

## Application Flow

1. React sends HTTP requests to Express.
2. Express validates and processes the requests.
3. PostgreSQL stores rules, conditions, and actions.
4. The API returns the confirmed result.
5. React updates the interface.

Data persists across browser refreshes and backend restarts.

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | /api/rules | List rules |
| GET | /api/rules/:ruleId | Fetch a complete rule |
| POST | /api/rules | Create a rule |
| PUT | /api/rules/:ruleId | Update a rule |
| PATCH | /api/rules/:ruleId/status | Change rule status |

The backend generates each rule's primary UUID.

## Validation and Error Handling

The frontend validates form fields before submission.

The backend independently enforces business rules and
returns structured HTTP errors.

Examples:

- 409: duplicate rule name.
- 422: invalid rule data.
- 404: rule not found.
- Network errors: unavailable connection.

Failed requests must not appear as successful saves.

## Notifications

- Success: floating toast dismissed after 4 seconds.
- Error: dismissible notification.
- Loading: indicator during pending operations.
- Validation: field-level wizard messages.

## Frontend Commands

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

## Verification

Frontend:

```bash
npm run lint
npm run build
git diff --check
```

Backend, from its own directory:

```bash
npm run typecheck
npm run build
npm test
```

Automated backend tests use a separate test database.

Frontend functional testing is currently performed manually
in the browser.

## Current Limitations

- Email, SMS, and Webhook actions are configured and stored,
  but no actual notifications are dispatched.
- Authentication is not implemented.
- Automated frontend tests are not yet available.
- Production deployment is outside this stage.

## Main Project Structure

```text
src/
├── components/
│   ├── RulesTable.tsx
│   ├── RuleEditor.tsx
│   └── NotificationToast.tsx
├── config/
├── services/
│   └── rulesApi.ts
├── types/
├── utils/
└── App.tsx
```

## Documentation

The Spanish version is available in
[README.md](README.md).
