# AI-assisted Task Manager

An AI-enhanced task and project management application focused on turning rough thoughts into structured, actionable workflows.

Built with a strong emphasis on:

- AI-assisted productivity
- inline editing experience
- data consistency
- scalable frontend architecture
- backend integrity
- token-efficient AI workflows

## ✨ Overview

Most productivity tools assume users already know how to structure their work.

This project aims to help users:

- break vague ideas into actionable steps
- refine project plans with AI assistance
- edit generated content before persistence
- manage tasks with a fast inline-editing workflow

The application combines:

- AI-generated project planning
- structured task management
- real-time validation
- stable ordering systems
- rollback-safe database operations

## 🚀 Key Features

### 🤖 AI-generated Project Planning

- Generate actionable task breakdowns from rough user prompts
- AI-generated tasks are editable before persistence
- Supports refine/regenerate workflow
- Structured JSON validation using Zod

### 📝 Inline Editable Task System

- Fast inline-editable task UI
- Real-time schema validation
- Keyboard shortcut support
- Optimized for low-friction task management

### ♻️ AI Result Reuse System

- Stores AI results as grouped variants
- Reuses historical results to reduce token cost
- Supports future refinement workflows

### 🧠 Data Consistency & Backend Safety

- Transaction rollback support
- Batch insert for projects/tasks
- Stable task ordering system
- Soft delete + restore lifecycle

### 🎨 UX-focused Architecture

- Skeleton fallback rendering
- Toast feedback for async actions
- Reusable component system
- Linear-inspired interaction design

## 🏗️ Architecture

### AI Flow

```txt
User Input
   ↓
Prompt Builder
   ↓
Check AI History Results
   ↓
(If no reusable result found)
   ↓
OpenAI API
   ↓
Inline Editable Preview
   ↓
Zod Validation
   ↓
Project + Task Persistence
```

---

### Project Structure

```txt
app/
├─ (main)/                # Main application routes
├─ api/                   # Backend route handlers
│  └─ ai/
├─ components/
│  └─ ui/                 # shadcn/ui components
├─ lib/
│  ├─ openAI/             # AI prompts & generation logic
│  ├─ schemas.ts          # Zod schemas
│  ├─ definitions.ts      # Interface & Enum
│  ├─ utils.ts            # global methods
│  └─ actionXXX/          # db fetching logic
├─ seed/                  # SQL initialization & placeholder data
├─ ui/
│  ├─ components/         # custom components
│  │  ├─ core/
│  │  ├─ shared/
│  │  └─ skeletons/
│  ├─ fonts.ts
│  └─ globals.css
└─ public/
```

## 🧩 Engineering Decisions

### 1. AI Variant Persistence

AI-generated results are stored as:

- grouped history entries
- reusable variants

Benefits:

- reduced token cost
- future refinement support
- reusable AI planning memory

### 2. Transaction Rollback Safety

Project/task creation uses SQL transactions to ensure:

- atomic writes
- rollback on failure
- data consistency during batch operations

### 3. Zod as Single Source of Truth

Zod schemas are shared across:

- AI response validation
- frontend forms
- server actions
- database payload validation

This reduces schema drift and improves consistency across layers.

### 4. Stable Task Ordering System

Tasks are assigned a project-scoped `order_idx`
to guarantee stable rendering and predictable UX.

Implemented with:

- grouped SQL ordering queries
- transaction-safe insertion
- ordering conflict prevention
- soft-delete-aware indexing

## 🛠️ Tech Stack

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- TipTap

### Backend

- PostgreSQL
- postgres.js
- Neon

### Validation & Tooling

- Zod
- React Hook Form
- ESLint
- Prettier

### AI

- OpenAI API

### Deployment

- Vercel

## 📸 Screenshots

### Projects View

- project list

  > ![project list view](/public/markdown/project-list-view.png)

- project list (mobile)

  > ![project list view (mobile)](/public/markdown/project-list-view-mob.png)

- project view
  > ![project view](/public/markdown/project-view.png)

### Tasks View

- task list

  > ![task list view](/public/markdown/task-list-view.png)

- task list (mobile)

  > ![task list view (mobile)](/public/markdown/task-list-view-mob.png)

- task

  > ![task view](/public/markdown/task-view.png)

- task (mobile)
  > ![task view (mobile)](/public/markdown/task-view-mob.png)

### AI Prompt Workflow

- ai prompt
  > ![ai prompt view](/public/markdown/ai-prompt-view.png)

## 🔮 Future Plans

- Authentication & user-based AI quota control
- Drag-and-drop task ordering
- AI refinement for existing projects
- AI memory system
- Team collaboration workflow

## 🧪 Local Development

### 1. Clone repository

```bash
git clone <your-repo-url>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

```env
OPENAI_API_KEY=
DATABASE_URL=
```

### 4. Run development server

```bash
npm run dev
```

## 📌 Current Focus

This project is currently focused on:

- AI-assisted productivity workflows
- frontend/backend architecture quality
- scalable task management UX
- token-efficient AI integration

## 👨‍💻 Author

Built and designed by Jui Yang HSU

Focused on:

- frontend architecture
- AI-assisted UX
- scalable product engineering
- modern React ecosystem
