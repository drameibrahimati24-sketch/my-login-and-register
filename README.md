# Job Vacancies Portal

A full-stack job portal application built with Express.js, Prisma ORM, SQLite, and JWT authentication.

## Features

*   **Public**: Browse job vacancies, view details.
*   **Member**: Apply for jobs, view application status.
*   **Admin**: Manage users, vacancies, and applications.

## Technology Stack

*   **Backend**: Node.js, Express.js, Prisma, SQLite
*   **Frontend**: EJS, Tailwind CSS
*   **Auth**: JWT, bcryptjs

## Setup

1.  `npm install`
2.  `npx prisma generate`
3.  `npx prisma migrate dev`
4.  `npm run prisma:seed` (Optional)
5.  `npm start`

Access at `http://localhost:3000`