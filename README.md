# Mood Tracker App

## Overview

The Mood Tracker App allows users to dynamically select and log their moods while experiencing animated transitions between different mood states. The app features a smooth SVG-based background that animates elements based on the selected mood. Mood data is connected to a backend service and updates in real-time using a WebSocket connection.

### Running the Application

#### Prerequisites

#### Installation

#### Access the frontend:

#### Query Parameter Support

The app supports mood state switching through URL parameters. To change the mood:

Visit http://localhost:3000/?mood=PLEASANT to set the mood to PLEASANT.

Visit http://localhost:3000/?mood=SAD to set the mood to SAD.

Visit http://localhost:3000/?mood=EXCITED to set the mood to EXCITED.

#### How It Works

URL Changes Affect the Mood: The app updates the mood based on the mood query parameter in the URL.

Clicking a Mood Updates the URL: When a user selects a mood, the mood query parameter is dynamically updated in the URL without requiring a page reload.
