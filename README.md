# Task Master

A small full-stack task board built as a [DevChallenges](https://devchallenges.io/) exercise. Users can create a board, manage tasks, edit board and task details, and persist changes in Supabase.

## Features

- Create a board with starter tasks.
- Create, edit, and delete tasks.
- Edit board name and description.
- Track task status: `to_do`, `in_progress`, `completed`, or `wont_do`.
- Keep the newest task at the top of the board.
- Persist the active board id in an HTTP-only `board_id` cookie.
- Use a responsive dialog on mobile and sheet layout on larger screens.

## Technology

- Next.js 16 App Router
- React 19 and TypeScript
- Supabase for persistence
- Tailwind CSS and shadcn-style UI primitives
- Bun for package management and scripts

## Prerequisites

- Bun `1.3.14` or a compatible version
- A Supabase project with `boards` and `tasks` tables

## Setup

Install dependencies:

```bash
bun install
```

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
BASE_URL=http://localhost:3000
```

`BASE_URL` is used by the server-rendered board page when it requests a board through the internal API.

Start the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000), then select **Create Board**.

## Data Model

The app expects the following Supabase tables and fields.

### `boards`

| Field         | Purpose            |
| ------------- | ------------------ |
| `id`          | Primary key        |
| `name`        | Board name         |
| `description` | Board description  |
| `created_at`  | Creation timestamp |

### `tasks`

| Field         | Purpose                            |
| ------------- | ---------------------------------- |
| `id`          | Primary key                        |
| `board_id`    | Foreign key to `boards.id`         |
| `name`        | Task name                          |
| `description` | Optional task description          |
| `icon`        | Task icon or emoji                 |
| `status`      | One of the supported task statuses |
| `created_at`  | Used for newest-first ordering     |

When a board is created, `app/utils/default-tasks.ts` provides the initial tasks.

## API

### Boards

| Method | Endpoint          | Behavior                                            |
| ------ | ----------------- | --------------------------------------------------- |
| `POST` | `/api/boards`     | Creates a board and default tasks; sets `board_id`. |
| `GET`  | `/api/boards/:id` | Returns a board with its tasks.                     |
| `PUT`  | `/api/boards/:id` | Updates board name and description.                 |

### Tasks

| Method   | Endpoint         | Behavior                                  |
| -------- | ---------------- | ----------------------------------------- |
| `POST`   | `/api/tasks`     | Creates a task and returns it with `201`. |
| `PUT`    | `/api/tasks/:id` | Updates task fields.                      |
| `DELETE` | `/api/tasks/:id` | Deletes a task and returns `204`.         |

Task creation expects JSON in this shape:

```json
{
  "name": "Review pull request",
  "description": "Check the latest changes",
  "icon": "🔎",
  "status": "to_do",
  "board_id": "your-board-id"
}
```

## Project Structure

```text
app/
	api/                  Board and task route handlers
	boards/[id]/          Server-rendered board page
	page.tsx              Cookie-aware entry point
components/
	page/                 Board and board workflow components
	ui/                   Reusable UI primitives
constraints/            Shared domain types
lib/supabase.ts         Supabase client
```

## Scripts

```bash
bun dev       # Start the development server
bun run lint  # Run ESLint
bun run build # Create a production build
bun start     # Start the production server
```

## Exercise Attribution

This project was created as a practice exercise from [DevChallenges](https://devchallenges.io/). The application logic and Supabase integration are implemented in this repository.
