# MultiBlog Platform - Redesigned

A modern, full-featured blog platform built with **Node.js**, **Express**, **Prisma**, and **SQLite/MySQL**. Redesigned with a premium UI/UX and enhanced security features.

## 🚀 Key Features

*   **Modern UI/UX**: Premium design system using Vanilla CSS with responsive layouts, "Inter" typography, and micro-interactions.
*   **MultiBlog System**:
    *   **Public Feed**: "MultiBlog" home view shows articles from all authors.
    *   **Personal Feed**: "My Articles" view to manage your own content.
*   **Article Images**: Upload cover images for your stories.
*   **User Profiles**: dedicated profile management (Name, Email, Bio).
*   **Admin Dashboard**:
    *   Manage all users (Change Roles, Delete Users).
    *   Full control over all articles.
*   **Security**:
    *   Role-based access control (Admin vs Member).
    *   Ownership verification for editing/deleting articles.

## 📸 Screenshots

### Home Page (MultiBlog Feed)
![Home Page](clean-app/screenshots/Slide1.JPG)

### Article Detail View
![Article Detail](clean-app/screenshots/Slide2.JPG)

### My Articles
![My Articles](clean-app/screenshots/Slide3.JPG)

### Admin Dashboard
![Admin Dashboard](clean-app/screenshots/Slide4.JPG)

### User Profile
![User Profile](clean-app/screenshots/Slide5.JPG)

### Editor with Image Upload
![Editor](clean-app/screenshots/Slide6.JPG)

## 🛠 Tech Stack

*   **Backend**: Node.js, Express.js
*   **Database**: SQLite (Dev) / MySQL (Prod), Prisma ORM
*   **Frontend**: EJS, Vanilla CSS (Custom Design System)
*   **Auth**: Sessions, Bcrypt
*   **Uploads**: Multer

## 📦 Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/drameibrahimati24-sketch/my-login-and-register.git
    ```
2.  Navigate to the app directory:
    ```bash
    cd clean-app
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Set up environment:
    Create a `.env` file with `DATABASE_URL` and `SESSION_SECRET`.
5.  Run migrations:
    ```bash
    npx prisma migrate dev
    ```
6.  Start the server:
    ```bash
    npm start
    ```

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

[MIT](https://choosealicense.com/licenses/mit/)
