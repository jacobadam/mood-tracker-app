# Mood Tracker App

## Overview

The Mood Tracker App allows users to select and log their moods with animated transitions between states. Each mood triggers corresponding SVG and Lottie animations in the UI. Mood data is persisted in a PostgreSQL database and synchronised in real time using Socket.IO.

The project is split into:

- Frontend: React (Vite), TypeScript, Tailwind CSS
- Backend: Node.js, TypeScript, Express, PostgreSQL, Socket.IO

The frontend is deployed on Netlify and the backend is hosted on Heroku with a PostgreSQL database attached.

## Technologies Used

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, GSAP, Motion, Socket.IO Client, React Router DOM, DotLottie
- **Backend:** Node.js, TypeScript, Express, PostgreSQL, Socket.IO
- **Deployment:** Netlify (frontend), Heroku (backend + database)

## Getting Started

This project uses pnpm for package management.

### Installation

1. Clone the repository: `git clone https://github.com/jacobadam/mood-tracker-app`
2. Navigate to the project directory: `cd mood-tracker-app`

### Backend Setup

1. Navigate to the `backend` directory: `cd backend`
2. Install dependencies: `pnpm install`
3. Ensure PostgreSQL is running. The backend uses environment variables for database configuration (these are included in the repository).
4. Start the backend: `pnpm run dev` (for development) or `pnpm run start` (for production).

### Frontend Setup

1. Navigate to the `frontend` directory: `cd frontend-vite`
2. Install dependencies: `pnpm install`
3. Start the frontend: `pnpm start`

### Accessing the Frontend

The frontend will typically be accessible at `http://localhost:5173` during development.

### Query Parameter Support

The app supports mood state switching through URL parameters. To change the mood:

- Visit `http://localhost:5173/?mood=PLEASANT` to set the mood to PLEASANT.
- Visit `http://localhost:5173/?mood=SAD` to set the mood to SAD.
- Visit `http://localhost:5173/?mood=EXCITED` to set the mood to EXCITED.

#### How It Works

- **Mood Selection:** Users can select a mood by clicking on a mood in the mood log container or by adding a new mood using the mood log button. The displayed mood can also be controlled via the `mood` query parameter in the URL.

* **Real-time Mood Updates:** The displayed mood updates in real-time when a new mood is added via the mood log button or when a mood is selected from the mood log container.

## Backend API

The frontend interacts with the backend API using the following endpoints:

- `GET /moods`: Fetches all moods.
- `POST /mood`: Adds a new mood.
- `DELETE /mood/:id`: Deletes a mood by ID.

## Real-time Communication (Socket.IO)

The frontend and backend communicate using Socket.IO for real-time updates. This connection is used to:

- Initially fetch mood data when the frontend loads.
- Notify the frontend when a new mood is added or an existing mood is deleted.

## Contributing

Contributions are welcome! We encourage you to fork this repository, create a new branch for your changes, and submit a pull request.

### How to Contribute

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes.
4. Commit your changes: `git commit -m "Add your commit message"`
5. Push to your branch: `git push origin feature/your-feature`
6. Submit a pull request through the GitHub website.

## Contact

For any inquiries related to the development of this project, feel free to reach out:

- **Email:** [jacobnevitt@gmail.com](mailto:jacobnevitt@gmail.com)
- **LinkedIn:** [linkedin.com/in/jacobnevitt](https://www.linkedin.com/in/jacobnevitt/)
- **GitHub:** [github.com/jacobadam](https://github.com/jacobadam)

## Live Site

The website is available at: **[mood-tracker-app.netlify.app](https://mood-tracker-app.netlify.app/)**
