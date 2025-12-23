const express = require('express')
const movieController = require('../controllers/movie-controller')
const router = express.Router()

// Search
router.get('/api/movies', movieController.searchMovie)

// New Categories
router.get('/api/movies/popular', movieController.getPopularMovies)
router.get('/api/movies/top_rated', movieController.getTopRatedMovies)
router.get('/api/movies/upcoming', movieController.getUpcomingMovies)

// Details
router.get('/api/movie/:id', movieController.getMovieDetails)

// Discovery & Utils
router.get('/api/movies/discover', movieController.discoverMovies)
router.get('/api/genres', movieController.getGenres)

module.exports = router
