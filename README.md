# Mood Tracker App

## Overview

The Mood Tracker App allows users to dynamically select and log their moods while experiencing animated transitions between different mood states. The app features a smooth SVG-based background that animates elements based on the selected mood. Mood data is connected to a backend service and updates in real-time using a WebSocket connection.

### Running the Application

#### Prerequisites

Please ensure you have the following installed on your system:

Docker: To run the app's required services (PostgreSQL, backend API).

Node.js: To run the front-end React application.

pnpm: A fast, space-efficient package manager for JavaScript.

#### Installation

Follow these steps to set up the project:

Extract the ZIP file and navigate to the project folder:

`cd mood-tracker`

Install dependencies:

`pnpm install`

or

`npm install`

or

`yarn install`

If you encounter peer dependency issues, try:

`npm install --legacy-peer-deps`

### Running the Application with Docker

##### Start the services using Docker Compose:

This will start the necessary services (PostgreSQL database and backend API). From the root of your project, run:

`docker-compose up -d`

PostgreSQL Database: The database will be available at `localhost:5432`.

Backend API: The API will be available at `localhost:3001`.

#### Access the frontend:

After running the services, the front-end application will be available at http://localhost:3000.

### Running the Application Locally (Without Docker)

Since I am currently unable to connect to Metalab's backend, I have set up a mock database to simulate its functionality. The fetch and post API requests work as if they were connected to the Metalab backend. This setup uses a local db.json file to act as the backend. Initially, db.json is empty, but it can be updated by posting data using the Log Mood button.

#### Start the app and the JSON server:

In the project directory, run:

npm run start

This will:

Start the React app on http://localhost:3000.

Start the JSON server at http://localhost:3001, which will serve data from the db.json file.

#### Query Parameter Support

The app supports mood state switching through URL parameters. To change the mood:

Visit http://localhost:3000/?mood=PLEASANT to set the mood to PLEASANT.

Visit http://localhost:3000/?mood=SAD to set the mood to SAD.

Visit http://localhost:3000/?mood=EXCITED to set the mood to EXCITED.

#### How It Works

URL Changes Affect the Mood: The app updates the mood based on the mood query parameter in the URL.

Clicking a Mood Updates the URL: When a user selects a mood, the mood query parameter is dynamically updated in the URL without requiring a page reload.

### Design Decisions & Assumptions

I made the assumption that the default mood should be the most neutral mood—pleasant—rather than sad or excited, but another option for the default could be the most recently logged mood.

Given the time constraint and no mention of testing in the instructions, I made the assumption that unit testing is not required to complete this task.

In terms of design decisions, I chose to add a slider to display the mood log container on smaller devices so it remains responsive across all devices.

#### Third-Party Libraries

The following libraries are used to build the app:

| Library                                           | Purpose                                                                              |
| ------------------------------------------------- | ------------------------------------------------------------------------------------ |
| React                                             | Core framework used to build the user interface components.                          |
| Framer Motion                                     | Handles animations and transitions between different mood states.                    |
| GSAP                                              | Enables smooth and dynamic background transitions during mood changes.               |
| @gsap/react                                       | React integration for GSAP animations.                                               |
| React Lottie                                      | Used for Lottie animations to provide smooth vector-based animations.                |
| React Router DOM                                  | Used for managing query parameters within the app.                                   |
| Swiper                                            | Implements swipe-based UI interactions.                                              |
| Socket.io-client                                  | Enables real-time communication between the frontend and backend.                    |
| Tailwind CSS                                      | Utility-based CSS framework for fast styling and responsive design.                  |
| @tailwindcss/cli                                  | CLI tool for compiling Tailwind CSS.                                                 |
| @tailwindcss/postcss                              | Plugin for integrating Tailwind with PostCSS.                                        |
| PostCSS & Autoprefixer                            | Used for processing CSS files with Tailwind.                                         |
| postcss-loader                                    | Loader for using PostCSS in the build process.                                       |
| json-server                                       | Simulates a REST API, used locally in development to serve db.json.                  |
| Concurrently                                      | Runs multiple commands (React app and JSON server) simultaneously.                   |
| @babel/plugin-proposal-private-property-in-object | Added to resolve a Git-related error during setup. Not directly used in the project. |
| react-scripts                                     | Scripts for bootstrapping and running the React app.                                 |
| TypeScript                                        | Adds static typing support to the project.                                           |
| @types/react                                      | TypeScript definitions for React.                                                    |
| @types/react-dom                                  | TypeScript definitions for React DOM.                                                |
| cra-template-typescript                           | TypeScript template for Create React App.                                            |
