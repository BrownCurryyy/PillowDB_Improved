# PillowDB 🌙

A smart sleep tracking application that helps you monitor your sleep debt, get daily tips, and predict your sleep needs.

## Features
- **Sleep Logging**: Track your daily sleep hours.
- **Sleep Debt Calculation**: Automatically calculates your sleep debt based on your goal.
- **Sleep Prediction**: Suggests how much you should sleep tonight to recover.
- **Daily Tips**: Get random sleep tips to improve your habits.
- **Visualizations**: Interactive charts to visualize your sleep trends.

## Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MySQL](https://www.mysql.com/)

## Setup Instructions

### 1. Database Setup
1.  Open your MySQL client (Workbench, Command Line, etc.).
2.  Run the script located at `backend/db/init.sql` to create the database and tables.
    ```bash
    source backend/db/init.sql
    ```

### 2. Backend Setup
1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  **IMPORTANT**: Open `src/db.js` and update the `password` field with your local MySQL password.
    ```javascript
    const db = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "YOUR_PASSWORD_HERE", // <--- Update this!
        database: "sleep_tracker"
    });
    ```
4.  Seed the tips database (run this once):
    ```bash
    node src/seed_tips.js
    ```
5.  Start the server:
    ```bash
    npm start
    ```
    The server should be running on `http://localhost:3000`.

### 3. Frontend Setup
1.  Open a new terminal and navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open the link shown in the terminal (usually `http://localhost:5173`) to view the app.

## Usage
- **Login**: Use one of the demo accounts (e.g., `ayaan@mail.com` / `hashed123`).
- **Dashboard**: View your stats, add new logs, and check your sleep prediction.

---
*Built with Caffeine & Poor Sleep ☕*
