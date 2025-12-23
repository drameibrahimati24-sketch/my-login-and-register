require('dotenv').config()
const express = require('express')
const cors = require('cors')
const movieRouter = require('./routes/movie-router')

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

// Router already defines /api/movies, so mount at /
app.use('/', movieRouter)

app.listen(port, () => {
    console.log(`Server Run at http://localhost:${port}/`);
    console.log(`API at http://localhost:${port}/api/movies`);
})