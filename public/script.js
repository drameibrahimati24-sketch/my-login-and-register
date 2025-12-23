const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const IMG_ORIGINAL_URL = 'https://image.tmdb.org/t/p/original';

const moviesGrid = document.getElementById('movies-grid');
const pagination = document.getElementById('pagination');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const currPageSpan = document.getElementById('curr-page');

const genreSelect = document.getElementById('genre-select');
const sortSelect = document.getElementById('sort-select');
const searchInput = document.getElementById('search-input');

const movieModal = document.getElementById('movie-modal');
const closeBtn = document.querySelector('.close-btn');

// Auth elements
const loginLink = document.getElementById('login-link');
const registerLink = document.getElementById('register-link');
const loginModal = document.getElementById('login-modal');
const registerModal = document.getElementById('register-modal');
const closeAuthBtns = document.querySelectorAll('.close-auth');
const switchToRegister = document.getElementById('switch-to-register');
const switchToLogin = document.getElementById('switch-to-login');

let currentPage = 1;
let currentFilters = {
    sort_by: 'popularity.desc',
    genre: '',
    query: ''
};

// Init
document.addEventListener('DOMContentLoaded', () => {
    console.log('App Initialized');
    fetchGenres();

    // Initial fetch (ensure slight delay to allow Auth/UI setup?)
    fetchMovies();

    // Navigation
    prevBtn.onclick = () => changePage(-1);
    nextBtn.onclick = () => changePage(1);

    // Filters
    genreSelect.onchange = (e) => {
        currentFilters.genre = e.target.value;
        currentFilters.query = '';
        searchInput.value = '';
        resetAndFetch();
    };

    sortSelect.onchange = (e) => {
        currentFilters.sort_by = e.target.value;
        resetAndFetch();
    };

    let timeout = null;
    searchInput.onkeyup = (e) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            const val = e.target.value.trim();
            currentFilters.query = val;
            resetAndFetch();
        }, 600);
    };

    // Movie Modal
    closeBtn.onclick = () => closeModal();

    // Auth Modals
    setupAuthListeners();

    window.onclick = (e) => {
        if (e.target == movieModal) closeModal();
        if (e.target == loginModal) loginModal.style.display = 'none';
        if (e.target == registerModal) registerModal.style.display = 'none';
    };
});


function setupAuthListeners() {
    if (loginLink) loginLink.onclick = () => loginModal.style.display = 'flex';
    if (registerLink) registerLink.onclick = () => registerModal.style.display = 'flex';

    closeAuthBtns.forEach(btn => {
        btn.onclick = () => {
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
        }
    });

    if (switchToRegister) switchToRegister.onclick = (e) => {
        e.preventDefault();
        loginModal.style.display = 'none';
        registerModal.style.display = 'flex';
    }

    if (switchToLogin) switchToLogin.onclick = (e) => {
        e.preventDefault();
        registerModal.style.display = 'none';
        loginModal.style.display = 'flex';
    }
}

function resetAndFetch() {
    currentPage = 1;
    fetchMovies();
}

function changePage(delta) {
    currentPage += delta;
    if (currentPage < 1) currentPage = 1;
    fetchMovies();
}

async function fetchGenres() {
    try {
        const res = await fetch('/api/genres');
        const genres = await res.json();
        genres.forEach(g => {
            const opt = document.createElement('option');
            opt.value = g.id;
            opt.innerText = g.name;
            genreSelect.appendChild(opt);
        });
    } catch (e) {
        console.error('Error fetching genres:', e);
    }
}

async function fetchMovies() {
    moviesGrid.innerHTML = '<p style="color:white; text-align:center; grid-column:1/-1; padding:50px;">Loading Movies...</p>';

    const params = new URLSearchParams({
        page: currentPage,
        sort_by: currentFilters.sort_by,
        genre: currentFilters.genre,
        query: currentFilters.query
    });

    console.log('Fetching movies with params:', params.toString());

    try {
        const res = await fetch(`/api/movies/discover?${params}`);
        console.log('Fetch Response Status:', res.status);

        if (!res.ok) {
            throw new Error(`API Error: ${res.status}`);
        }

        const data = await res.json();
        console.log('Fetch Data:', data);

        renderGrid(data.results);
        updatePagination(data.page, data.total_pages);
    } catch (error) {
        console.error('Error fetching movies:', error);
        moviesGrid.innerHTML = `<p style="color:red; text-align:center; grid-column:1/-1;">Error loading movies: ${error.message}</p>`;
    }
}

function renderGrid(movies) {
    moviesGrid.innerHTML = '';

    if (!movies || movies.length === 0) {
        moviesGrid.innerHTML = '<p style="color:white; text-align:center; grid-column:1/-1; padding:50px;">No movies found.</p>';
        return;
    }

    movies.forEach(movie => {
        if (!movie.poster_path) return;

        const year = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';
        const rating = movie.vote_average ? movie.vote_average.toFixed(1) : '0';

        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
            <div class="movie-poster-container">
                <img class="movie-poster" src="${IMG_BASE_URL}${movie.poster_path}" alt="${movie.title}" loading="lazy">
                <div class="movie-overlay">
                    <i class="fas fa-star" style="color:#6ac045; font-size:24px; margin-bottom:10px;"></i>
                    <h3 style="color:white; font-size:24px; font-weight:bold; margin-bottom:20px;">${rating} / 10</h3>
                    <h4 style="color:white; font-size:16px; margin-bottom:30px;">${year}</h4>
                    <button class="view-details-btn">View Details</button>
                </div>
            </div>
            <div class="movie-info">
                <div class="movie-title">${movie.title}</div>
                <div class="movie-year">${year}</div>
            </div>
        `;

        card.querySelector('.view-details-btn').onclick = (e) => {
            e.stopPropagation();
            openModal(movie.id);
        };
        card.onclick = () => openModal(movie.id);

        moviesGrid.appendChild(card);
    });
}

function updatePagination(current, total) {
    currPageSpan.innerText = current;
    prevBtn.disabled = current <= 1;
}

async function openModal(movieId) {
    movieModal.style.display = 'flex';
    try {
        const res = await fetch(`/api/movie/${movieId}`);
        const movie = await res.json();

        document.getElementById('modal-poster').src = movie.poster_path ? `${IMG_BASE_URL}${movie.poster_path}` : '';
        document.getElementById('modal-title').innerText = movie.title;
        document.getElementById('modal-year').innerText = movie.release_date ? movie.release_date.split('-')[0] : '';
        document.getElementById('modal-rating').innerText = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
        document.getElementById('modal-overview').innerText = movie.overview;

        const trailerDiv = document.getElementById('modal-trailer');
        trailerDiv.innerHTML = '';
        if (movie.videos && movie.videos.results) {
            const trailer = movie.videos.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');
            if (trailer) {
                trailerDiv.innerHTML = `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${trailer.key}" frameborder="0" allowfullscreen></iframe>`;
            } else {
                trailerDiv.innerHTML = '<p style="color:#777;">No trailer available</p>';
            }
        }
    } catch (e) {
        console.error(e);
    }
}

function closeModal() {
    movieModal.style.display = 'none';
    document.getElementById('modal-trailer').innerHTML = '';
}
