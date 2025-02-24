# Mood Tracker App

## Overview

The Mood Tracker App allows users to select and log their moods with smooth animated transitions between different mood states. The app features an SVG-based background, where the movement of elements is based on the selected mood. Mood data is stored in a PostgreSQL database and updated in real-time using a Socket.IO.

This project consists of a frontend built with React, TypeScript, and Tailwind CSS, and a backend built with Node.js, TypeScript, Express, and PostgreSQL.

## Technologies Used

- **Frontend:** React, TypeScript, Tailwind CSS, GSAP, Motion, Socket.IO Client, React Router DOM, React Lottie
- **Backend:** Node.js, TypeScript, Express, PostgreSQL, Socket.IO

## Getting Started

This project uses npm for package management. Yarn can also be used.

### Installation

1. Clone the repository: `git clone https://github.com/jacobadam/mood-tracker-app`
2. Navigate to the project directory: `cd mood-tracker-app`

### Backend Setup

1. Navigate to the `backend` directory: `cd backend`
2. Install dependencies: `npm install` (or `yarn install`)
3. Ensure PostgreSQL is running. The backend uses environment variables for database configuration (these are included in the repository).
4. Start the backend: `npm run dev` (for development) or `npm run start` (for production).

### Frontend Setup

1. Navigate to the `frontend` directory: `cd frontend`
2. Install dependencies: `npm install` (or `yarn install`)
3. Start the frontend: `npm start`

### Accessing the Frontend

The frontend will typically be accessible at `http://localhost:3000` during development.

### Query Parameter Support

The app supports mood state switching through URL parameters. To change the mood:

- Visit `http://localhost:3000/?mood=PLEASANT` to set the mood to PLEASANT.
- Visit `http://localhost:3000/?mood=SAD` to set the mood to SAD.
- Visit `http://localhost:3000/?mood=EXCITED` to set the mood to EXCITED.

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
