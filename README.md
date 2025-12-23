# MovieIBR

![MovieIBR](screenshots/sample.png)

MovieIBR is a premium movie discovery platform that mimics the YTS experience. It features a responsive grid layout, advanced filtering, and instant search capabilities powered by The Movie Database (TMDB).

## Features

-   **Browse Movies**: A beautiful grid layout displaying posters, ratings, and release years.
-   **Advanced Discovery**: Filter movies by Genre, Rating, Quality (Simulated), and Sort Order (Latest, Oldest, Rating, Alphabetical).
-   **Instant Search**: Real-time search with debounce functionality.
-   **Movie Details**: Click on any movie to view Cast, Overview, and watch the Trailer in a modal.
-   **Pagination**: Navigate through thousands of movies.
-   **Authentication UI**: Login and Register modals for user engagement.

## Technologies Used

-   **Frontend**: HTML5, CSS3, Vanilla JavaScript.
-   **Backend**: Node.js, Express.js.
-   **API**: TMDB (The Movie Database).
-   **Caching**: `node-cache` for performance.
-   **HTTP Client**: Axios.

## Setup Instructions

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/drameibrahimati24-sketch/my-login-and-register.git
    cd my-login-and-register
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Create a `.env` file in the root directory and add your TMDB API Token:
    ```env
    PORT=3000
    TMDB_BEARER=your_tmdb_read_access_token_here
    ```

4.  **Run the Application**:
    ```bash
    npm start
    ```
    The app will be available at `http://localhost:3000`.

## Project Structure

-   `app.js`: Main server entry point.
-   `controllers/`: Logic for fetching and processing movie data.
-   `routes/`: API route definitions.
-   `public/`: Static assets (HTML, CSS, JS).

## Screenshots

Slide1.PNG
Slide2.PNG
Slide3.PNG
Slide4.PNG
