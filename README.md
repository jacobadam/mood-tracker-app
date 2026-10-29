# Mood Tracker App

## Overview

Mood Tracker is an interactive application for logging, viewing, and deleting moods. I designed and developed custom SVG and Lottie animations for three mood states: Pleasant, Sad, and Excited. Users can switch between animations through the interface or URL query parameters.

Mood entries are stored in Supabase PostgreSQL, with Supabase Realtime synchronising additions and deletions across connected clients.

**Live site:** [mood-tracker-app.netlify.app](https://mood-tracker-app.netlify.app/)

## Technologies Used

- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Animations:** GSAP, Motion, SVG, DotLottie
- **Database:** Supabase PostgreSQL
- **Real-time updates:** Supabase Realtime
- **Hosting:** Netlify

## Features

- Original SVG and Lottie animations for Pleasant, Sad, and Excited mood states
- Add, view, and delete mood entries
- Real-time updates across open sessions and devices
- Mood history with dates and times
- Mood selection via the UI or URL query parameters
- Responsive layouts for desktop, tablet, and mobile

## Project Structure

The Vite frontend communicates directly with Supabase; no separate application server is required.

```text
mood-tracker-app/
├── frontend-vite/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   │   └── supabase.ts
│   │   └── services/
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## Getting Started

This project uses **pnpm** for package management.

### Prerequisites

- Node.js
- pnpm
- A Supabase project with a `moods` table and appropriate Row Level Security (RLS) policies

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jacobadam/mood-tracker-app.git
   ```

2. Navigate to the frontend:

   ```bash
   cd mood-tracker-app/frontend-vite
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

### Environment Variables

Create a `.env.local` file in `frontend-vite/`:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Use the project URL and publishable key from your Supabase dashboard. The publishable key is intended for client-side use; access is controlled using RLS. Never place a Supabase secret or service-role key in the frontend.

### Run Locally

```bash
pnpm dev
```

Vite typically serves the application at [http://localhost:5173](http://localhost:5173).

### Production Build

```bash
pnpm build
```

## Database and Realtime

### Mood Data

The `moods` table uses the following schema:

| Column      | Type        | Description                     |
| ----------- | ----------- | ------------------------------- |
| `id`        | integer     | Auto-generated primary key      |
| `createdAt` | timestamptz | Timestamp of the mood entry     |
| `type`      | text        | `PLEASANT`, `SAD`, or `EXCITED` |

The frontend uses `@supabase/supabase-js` for the database operations used by the app:

- **SELECT:** Fetch recorded moods
- **INSERT:** Add a mood
- **DELETE:** Remove a mood

The app uses a shared mood history without individual user accounts. Supabase RLS policies control public access to the table.

### Real-time Synchronisation

Supabase Realtime subscribes to PostgreSQL `INSERT` and `DELETE` events on the `moods` table. When a mood is created or deleted, connected clients update their local state without refreshing the page.

## Mood Selection

Select an existing mood in the history or add a new one to change the displayed animation. Mood state can also be controlled using the `mood` query parameter:

- [Pleasant](http://localhost:5173/?mood=PLEASANT): `?mood=PLEASANT`
- [Sad](http://localhost:5173/?mood=SAD): `?mood=SAD`
- [Excited](http://localhost:5173/?mood=EXCITED): `?mood=EXCITED`

## Deployment

The React frontend is deployed on **Netlify**. **Supabase** provides the PostgreSQL database and Realtime infrastructure.

Configure these variables in your Netlify site settings before building:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

## Contributing

Contributions are welcome:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make and test your changes.
4. Commit: `git commit -m "Describe your changes"`
5. Push: `git push origin feature/your-feature`
6. Open a pull request on GitHub.

## Contact

- **Email:** [jacobnevitt@gmail.com](mailto:jacobnevitt@gmail.com)
- **LinkedIn:** [linkedin.com/in/jacobnevitt](https://www.linkedin.com/in/jacobnevitt/)
- **GitHub:** [github.com/jacobadam](https://github.com/jacobadam)

## Live Site

[mood-tracker-app.netlify.app](https://mood-tracker-app.netlify.app/)
