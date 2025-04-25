# Todo App

## Overview

This repository contains the source code for a Todo App, built with Node.js for the back end and React for the front end. The project uses technologies such as React Hook Form, React Query, Tailwind CSS, Axios, and more.

## Prerequisites

Before running the application, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) - JavaScript runtime
- [Git](https://git-scm.com/) - Version control system (for cloning the repository)

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/0xOmarAdel/todo-app.git
   cd todo-app
   ```

2. **Frontend Setup:**

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

   The application will be running at `http://localhost:3000`.

3. **Backend Setup:**

   Create a `.env` file in the `backend` directory with the following content:

   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@<your-mongodb-cluster-url>/db?retryWrites=true&w=majority&appName=todo-app
   JWT_SECRET=YourSecretKeyHere
   JWT_LIFETIME=30d
   ```

   Replace `<username>`, `<password>`, and `<your-mongodb-cluster-url>` with your MongoDB credentials.

   Then, run the backend server:

   ```bash
   cd backend
   npm install
   npm start
   ```

   The backend server will be running at `http://localhost:5000`.

## Features

- **Add Todo:**
  - Implement a form using React Hook Form to add new todos.
  - Utilize Axios for sending requests to the backend to store new todos.

- **Delete Todo:**
  - Allow users to delete a specific todo.
  - Utilize React Query to send mutation requests to the server for deleting the corresponding todo.

- **List Todos:**
  - Display a list of todos on the frontend.
  - Fetch todos from the server using React Query.

- **Edit Todo:**
  - Enable users to edit the details of an existing todo.
  - Utilize React Query to send mutation requests to the server for updating the todo.

- **Change Todo Status:**
  - Implement functionality to mark a todo as completed or change its status.
  - Utilize React Query to send mutation requests to the server for updating the todo status.