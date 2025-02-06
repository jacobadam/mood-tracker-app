Mood Tracker App

Overview

The Mood Tracker App allows users to dynamically select and log their moods while experiencing animated transitions between different mood states. The app features a smooth SVG-based background that animates elements based on the selected mood. Mood data is connected to a backend service and updates in real-time using a WebSocket connection.

Running the Application

Prerequisites

Please ensure you have the following installed on your system:

Docker: To run the app's required services (PostgreSQL, backend API).

Node.js: To run the front-end React application.

pnpm (Optional, but recommended): A fast alternative to npm/yarn for managing dependencies.

Installation

Follow these steps to set up the project:

Clone the repository:

git clone https://github.com/jacobadam/mood-tracker-app
cd mood-tracker

Install dependencies: If you have pnpm installed, you can use it for faster installation of dependencies:

pnpm install

Otherwise, you can use npm or yarn:

npm install

# or

yarn install

Running the Application with Docker

If you'd like to run the app with Docker, follow these steps:

Start the services using Docker Compose:

This will start the necessary services (PostgreSQL database and backend API). From the root of your project, run:

docker-compose up -d

PostgreSQL Database: The database will be available at localhost:5432.

Backend API: The API will be available at localhost:3001.

Note: Docker Compose will automatically create the required network and set up all the services.

Access the frontend:

After running the services, the front-end application will be available at http://localhost:3000.

Running the Application Locally (Without Docker)

If you prefer not to use Docker, you can run the app with a local JSON server instead. This setup will simulate the backend using a local file (db.json).

Start the app and the JSON server:

In the project directory, run:

npm run start

This will:

Start the React app on http://localhost:3000.

Start the JSON server at http://localhost:3001, which will serve data from the db.json file.

Query Parameter Support

The app supports mood state switching through URL parameters. To change the mood:

Visit http://localhost:3000/?mood=PLEASANT to set the mood to PLEASANT.

Visit http://localhost:3000/?mood=SAD to set the mood to SAD.

Visit http://localhost:3000/?mood=EXCITED to set the mood to EXCITED.

How It Works

URL Changes Affect the Mood: The app updates the mood based on the mood query parameter in the URL.

Clicking a Mood Updates the URL: When a user selects a mood, the mood query parameter is dynamically updated in the URL without requiring a page reload.

Design Decisions & Assumptions

SVG Animations: The app uses SVG-based animations instead of CSS animations to provide precise control over element movements and transformations for smoother transitions.

WebSocket for Real-Time Updates: To keep the mood logs in sync with the backend, the app uses WebSockets instead of polling, allowing real-time updates without refreshing the page.

Modular Animation System: Each mood (e.g., Pleasant, Sad, Excited) has its own config file to manage animations, keeping the code modular and maintainable.

Consistent SVG Sizing: All SVG background images are designed to have the same dimensions, ensuring smooth transitions between different moods.

Third-Party Libraries

The following libraries are used to build the app:

Library

Purpose

React

Core framework used to build the user interface components.

Framer Motion

Handles animations and transitions between different mood states.

GSAP

Enables smooth and dynamic background transitions during mood changes.

@gsap/react

React integration for GSAP animations.

React Lottie

Used for Lottie animations to provide smooth vector-based animations.

React Router DOM

Used for managing routing within the app, including mood state handling.

React Slider

For creating interactive range sliders.

Swiper

Implements swipe-based UI interactions.

Socket.io-client

Enables real-time communication between the frontend and backend.

Tailwind CSS

Utility-based CSS framework for fast styling and responsive design.

@tailwindcss/cli

CLI tool for compiling Tailwind CSS.

PostCSS & Autoprefixer

Used for processing CSS files with Tailwind.

json-server

Simulates a REST API, used locally in development to serve db.json.

Concurrently

Runs multiple commands (React app and JSON server) simultaneously.
