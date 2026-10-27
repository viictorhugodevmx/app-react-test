# UX Design — Notification Rules Builder

## 1. Goal

Build a simple and accessible interface for creating, editing, and managing notification rules.

The application includes a rule list and a three-step editor.

## 2. Main User Flow

1. View existing rules.
2. Create a new rule or edit an existing one.
3. Select a trigger.
4. Add optional conditions.
5. Configure one or more actions.
6. Validate and save the rule through the API.
7. Return to the updated rule list.

Users can move between editor steps without losing their input.

## 3. Rule List

The list displays:
- Rule name.
- Selected trigger.
- Active or inactive status.
- Edit action.
- New rule button.

Users can toggle rule status directly from the list.

Desktop uses a table. Mobile uses cards.

## 4. Rule Editor

### Step 1 — Trigger

Users enter a rule name and select:
- Customer created.
- Payment received.
- Ticket without response.

Changing the trigger requires confirmation if existing conditions would be removed.

### Step 2 — Conditions

Each condition includes a field, operator, and value.

Users can:
- Add conditions.
- Remove conditions.
- Reorder conditions.
- Combine conditions using AND or OR.
- Continue without conditions.

Available fields depend on the selected trigger. Operators depend on the field type.

### Step 3 — Actions

At least one action is required.

Email:
- Valid recipient.
- Subject.
- Body.

SMS:
- Phone number.
- Message with a maximum of 160 characters.

Webhook:
- HTTP or HTTPS URL.
- POST or PUT method.

Users can add and remove actions.

## 5. UI States

Empty state:
Show a message and an option to create a rule.

Loading:
Show progress while waiting for the API.

Server error:
Display a clear message and allow retry when appropriate.

Save success:
Return to the updated list.

Save error:
Keep all editor data.

Status update error:
Keep or restore the last confirmed server state.

## 6. Validation

- Rule name is required.
- Rule names must be unique.
- A valid trigger is required.
- Conditions are optional.
- Existing conditions must be valid.
- At least one valid action is required.
- Email addresses must be valid.
- SMS requires a phone number and a valid message.
- Webhook requires an HTTP/HTTPS URL and a supported method.

Validation messages appear near the related fields.

## 7. Responsive Design

Desktop (768 px and above):
- Table layout.
- Horizontal header.
- Conditions arranged in rows.
- Horizontal editor navigation.

Mobile (below 768 px):
- Rule cards.
- Stacked form fields.
- Compact step indicators.
- Controls adapted to screen width.

The design follows a mobile-first approach.

## 8. Technical Decisions

- React and TypeScript.
- Tailwind CSS for primary styling.
- BEM only for necessary custom CSS.
- Semantic HTML and accessible controls.
- One reusable editor for create and edit.
- Local draft state inside the editor.
- No unnecessary dependencies.

## 9. Scope

The application does not execute notifications or implement authentication.

This document records the approved UX decisions before frontend implementation.
