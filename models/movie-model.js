const parseMovie = (MovieData) => {
    return {
        id: MovieData.id,
        title: MovieData.title,
        overview: MovieData.overview,
        backdrop_path: MovieData.backdrop_path,
        poster_path: MovieData.poster_path,       // Critical for UI
        release_date: MovieData.release_date,     // Critical for Year
        vote_average: MovieData.vote_average,     // Critical for Rating
        vote_count: MovieData.vote_count,
        popularity: MovieData.popularity,
        adult: MovieData.adult,
        video: MovieData.video
    }
}

module.exports = parseMovie