# Notification Rules Builder

A web application for creating and managing notification rules using triggers, conditions, and actions.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4

## Getting Started

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Open the local URL provided by Vite.

## Available Commands

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

## Current Status

The frontend is currently being prepared.

Implemented features:
- Rule list with sample data.
- Rule status toggling using local React state.
- Initial React, TypeScript, and Tailwind configuration.

## Planned Features

- Create and edit rules.
- Select notification triggers.
- Configure dynamic conditions.
- Define Email, SMS, and Webhook actions.
- Validate form inputs.
- Integrate a REST API for data persistence.

## Technical Decisions

- React Hooks for UI state management.
- TypeScript for data models.
- Tailwind CSS as the primary styling solution.
- Components with clear responsibilities.
- Descriptive English names for functions and variables.

## Current Limitations

- Data is temporary and resets on page reload.
- Backend integration is not implemented yet.
- The rule editor is still pending.

## Documentation

The Spanish version is available in [README.md](README.md).
