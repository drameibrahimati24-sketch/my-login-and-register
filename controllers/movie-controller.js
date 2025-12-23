const tmdbAPI = require('../config/tmdb')
const cache = require('../config/node-cache')
const parseMovie = require('../models/movie-model')

const fetchAndCache = async (url, key, res) => {
    if (cache.has(key)) {
        return res.status(200).json(cache.get(key));
    }

    try {
        const response = await tmdbAPI.get(url);
        const movies = response.data.results.map(parseMovie);
        cache.set(key, movies);
        res.status(200).json(movies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const searchMovie = async (req, res) => {
    const query = req.query.query;
    if (!query) {
        return res.status(400).json({ message: 'parameter is required' });
    }

    // Redirect search to discover logic if we want unified handling, 
    // but for now, keep search separate or integrate if desired.
    // The previous implementation had a specific search function.

    const key = `search_${query}`;
    if (cache.has(key)) return res.status(200).json(cache.get(key));

    try {
        const response = await tmdbAPI.get('/search/movie', { params: { query } });
        const movies = response.data.results.map(parseMovie);
        cache.set(key, movies);
        res.status(200).json(movies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const getPopularMovies = async (req, res) => fetchAndCache('/movie/popular', 'popular', res);
const getTopRatedMovies = async (req, res) => fetchAndCache('/movie/top_rated', 'top_rated', res);
const getUpcomingMovies = async (req, res) => fetchAndCache('/movie/upcoming', 'upcoming', res);

const getMovieDetails = async (req, res) => {
    const { id } = req.params;
    const key = `movie_${id}`;

    if (cache.has(key)) {
        return res.status(200).json(cache.get(key));
    }

    try {
        const response = await tmdbAPI.get(`/movie/${id}`, {
            params: { append_to_response: 'credits,videos' }
        });

        const data = response.data;
        cache.set(key, data);
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const discoverMovies = async (req, res) => {
    const { sort_by, genre, page = 1, query } = req.query;

    // Explicit CORS for local debugging if needed
    res.header("Access-Control-Allow-Origin", "*");

    console.log(`[Discover] Request: sort=${sort_by}, genre=${genre}, page=${page}, query='${query}'`);

    const key = `discover_${sort_by}_${genre}_${page}_${query}`;

    if (cache.has(key)) {
        console.log(`[Discover] Serving from cache: ${key}`);
        return res.status(200).json(cache.get(key));
    }

    try {
        let params = {
            page,
            include_adult: false,
            include_video: false
        };

        let endpoint = '/discover/movie';

        if (query && query.trim() !== '') {
            endpoint = '/search/movie';
            params.query = query;
        } else {
            params.sort_by = sort_by || 'popularity.desc';
            if (genre && genre !== 'all' && genre !== '') params.with_genres = genre;
        }

        console.log(`[Discover] Calling TMDB ${endpoint} with params:`, JSON.stringify(params));

        const response = await tmdbAPI.get(endpoint, { params });

        const data = {
            results: response.data.results.map(parseMovie),
            page: response.data.page,
            total_pages: response.data.total_pages
        };

        console.log(`[Discover] Success. Found ${data.results.length} movies.`);

        cache.set(key, data, 300); // 5 min cache
        res.status(200).json(data);
    } catch (error) {
        console.error('[Discover] Error:', error.message);
        if (error.response) console.error('[Discover] TMDB Response:', error.response.data);

        // Fallback to popular if discovery fails
        try {
            if (endpoint !== '/movie/popular') {
                console.log('[Discover] Falling back to popular movies');
                const fallback = await tmdbAPI.get('/movie/popular', { params: { page: 1 } });
                const fallbackData = {
                    results: fallback.data.results.map(parseMovie),
                    page: 1,
                    total_pages: fallback.data.total_pages
                };
                return res.status(200).json(fallbackData);
            }
        } catch (e) {
            console.error('Fallback Error:', e.message);
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getGenres = async (req, res) => {
    const key = 'genres_list';
    if (cache.has(key)) return res.status(200).json(cache.get(key));

    try {
        const response = await tmdbAPI.get('/genre/movie/list');
        cache.set(key, response.data.genres);
        res.status(200).json(response.data.genres);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    searchMovie,
    getPopularMovies,
    getTopRatedMovies,
    getUpcomingMovies,
    getMovieDetails,
    discoverMovies,
    getGenres
}