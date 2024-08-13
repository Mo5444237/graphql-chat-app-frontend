# graphql-chat-app-frontend

This project is the frontend for a chat application, built using React, Vite, Redux Toolkit, Apollo Client, and Socket.IO-client. The application interacts with a GraphQL backend and provides real-time communication features.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Contact](#contact)
- [Backend Repository](#backend-repository)

## Features

- **Real-time Chat**: Uses Socket.IO-client to enable real-time communication.
- **GraphQL Integration**: Apollo Client is used to manage GraphQL queries and mutations.
- **State Management**: Redux Toolkit is used for managing global state.
- **Dark and Light Mode**: Supports both dark and light themes, allowing users to switch between modes.
- **Pending Messages Handling**: Manages pending messages that are not yet sent, ensuring a smooth user experience even with network issues.
- **User Status Management**: Tracks user online/offline status and displays last seen information.
- **Typing Indicator**: Tracks and displays when a user is typing in the chat.
- **Responsive UI**: Built with reusable React components for a responsive and user-friendly interface.

## Project Structure

This project is organized as follows:

- **public**: Contains static assets like images, fonts, etc.

- **src**: Main source code folder.
  - **assets**: Stores images, fonts, and other static assets.
  - **components**: Reusable React components.
    - **Auth**: Components related to user authentication (e.g., login, signup).
    - **Chat**: Components for the chat interface and related functionality.
    - **hooks**: Custom hooks used across the application.
    - **layout**: Layout components for structuring pages.
    - **UI**: UI components such as buttons, modals, etc.
  - **pages**: Contains the main pages of the application.
  - **services**: Handles API calls and interaction with the backend.
    - `auth.js`: API calls related to authentication.
    - `chat.js`: API calls related to chat functionalities.
    - `contact.js`: API calls related to contacts.
    - `graphql.js`: Setup for Apollo Client and GraphQL operations.
    - `socket.js`: Configuration for Socket.IO-client.
  - **store**: Redux store configuration and slices.
    - `chats-actions.js`: Actions related to chat functionality.
    - `chats-slice.js`: Slice for managing chat state, including pending messages and typing indicators.
    - `contacts-slice.js`: Slice for managing contacts state.
    - `index.js`: Setup for Redux store.
    - `theme-slice.js`: Slice for managing theme-related state (dark/light mode).
    - `ui-slice.js`: Slice for managing UI-related state.
    - `user-actions.js`: Actions related to user functionality.
    - `user-slice.js`: Slice for managing user state, including online/offline status and last seen.
  - **utils**: Utility functions used throughout the project.
    - `debounce.js`: Debouncing utility.
    - `getLastSeen.js`: Utility for calculating last seen time.
    - `getTime.js`: Utility for formatting time.

- **App.jsx**: The main App component.
- **BrowserRouter.jsx**: Handles routing within the application.
- **index.css**: Global CSS styles.
- **main.jsx**: Entry point for the React application.

## Getting Started

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/graphql-chat-app-frontend.git
    cd graphql-chat-app-frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

### Running the Application

1. Start the development server:
    ```bash
    npm run dev
    ```

2. The application should now be running at `http://localhost:5173`.

## Backend Repository

The backend for this project is available at: [graphql-chat-app-backend](https://github.com/Mo5444237/graphql-chat-app-backend).

## Contact

Have questions or feedback? Reach out to us at:

- Email: [mo5444237@gmail.com](mailto:mo5444237@gmail.com)
- GitHub Issues: [Open an Issue](https://github.com/Mo5444237/graphql-chat-app-frontend/issues)
