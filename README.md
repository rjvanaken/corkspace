# Corkspace

Corkspace is a Kanban-style task board built with React, TypeScript, and Supabase. Create tasks, drag them between **To Do**, **In Progress**, **In Review**, and **Done**, tag them with priorities and custom labels, and search across everything from one screen.

Live demo: https://corkspace-one.vercel.app

## Features

- **Drag-and-drop board** — move tasks between columns with [dnd-kit](https://dndkit.com/), with a live drag overlay
- **Task details** — title, description, priority (Low / Normal / High), and status, edited in a modal
- **Custom labels** — create your own labels on the fly and attach multiple to a task, each with its own color
- **Search** — filter the board instantly by task title or label name
- **Persistent, per-user data** — tasks and labels are stored in Supabase and scoped to the signed-in user, including anonymous guest sessions created automatically on first visit
- **UI kit** — shadcn/ui + Base UI components styled with Tailwind CSS

## Tech stack

| Layer | Tools |
|---|---|
| Frontend | React 19, TypeScript, Vite |
| Styling | Tailwind CSS, shadcn/ui, Base UI, lucide-react icons |
| Drag & drop | @dnd-kit/core, @dnd-kit/sortable |
| Backend | Supabase (Postgres + Auth) |
| Linting | Oxlint |

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
- npm (ships with Node)
- A [Supabase](https://supabase.com/) account (free tier is fine)

### 1. Clone the repo

```bash
git clone https://github.com/rjvanaken/corkspace.git
cd corkspace
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Supabase

Corkspace expects three tables in your Supabase project:

- `tasks` — columns include at least `id`, `title`, `description`, `status`, `priority`, `user_id`, `created_at`
- `labels` — `id`, `name`, `color`, `user_id`
- `task_labels` — join table with `task_id` and `label_id`

The app signs users in anonymously via Supabase Auth on first load (`supabase.auth.signInAnonymously()`), so make sure **Anonymous sign-ins** are enabled in your project's Auth settings, and that Row Level Security policies allow each user to read/write their own rows.


### 4. Configure environment variables

Create (or edit) `.env.local` in the project root:

```
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Both values are available in your Supabase project under **Project Settings → API**.

### 5. Run the dev server

```bash
npm run dev
```

Vite will print a local URL (typically `http://localhost:5173`) — open it in your browser.

### Other scripts

```bash
npm run build     # type-check and build for production
npm run preview   # preview the production build locally
npm run lint      # run Oxlint
```

## Project structure

```
src/
├── components/
│   ├── custom/
│   │   ├── Board.tsx           # DnD context, drag/drop handling
│   │   ├── Board/              # Column, TaskCard, TaskModal, LabelPicker, Priority
│   │   └── Header/MainHeader.tsx
│   └── ui/                     # shadcn/ui primitives
├── lib/
│   ├── supabaseClient.ts       # Supabase client init
│   ├── constants.ts            # columns, priorities, color helpers
│   └── theme-colors.js         # color palette definitions
└── App.tsx                     # data loading, task CRUD, top-level state
```