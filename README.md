# HabitHive - A Full-Stack Habit Tracker

A web application built for users to create, track, and manage their personal habits, with social features to follow friends and monitor their progress for accountability.

## Live Demo

**You can access the live, deployed application here:**
[https://habit-hive-neon.vercel.app/](https://habit-hive-neon.vercel.app/)

## Features

- **User Authentication:** Secure user registration and login using JWT (JSON Web Tokens).
- **Habit Management:** Users can create, read, and delete their personal habits.
- **Progress Tracking:** Daily/weekly check-ins to mark habits as complete. Streak counts are automatically calculated and updated on the backend.
- **Habit Categories:** Users can assign categories to their habits (e.g., "Health", "Work") and filter their dashboard view. (Bonus Feature)
- **Welcome Emails:** New users automatically receive a welcome email upon registration using Nodemailer. (Bonus Feature)
- **Social Accountability:** Users can search for and follow other users.
- **Friends' Activity Feed:** A live feed showing the recent accomplishments of friends the user is following.

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose)
- **Authentication:** JWT (JSON Web Tokens)
- **Deployment:**
  - Backend deployed on **Render**.
  - Frontend deployed on **Vercel**.

## How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/](https://github.com/)[your-username]/[your-repo-name].git
    cd [your-repo-name]
    ```
2.  **Setup Backend:**
    ```bash
    cd server
    yarn install
    # Create a .env file and add your MONGO_URI, JWT_SECRET, and PORT
    yarn dev
    ```
3.  **Setup Frontend:**
    ```bash
    cd client
    yarn install
    # Create a .env file and add VITE_API_URL=http://localhost:5001
    npm run dev
    ```
