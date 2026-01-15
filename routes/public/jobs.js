const express = require('express');
const router = express.Router();
const VacancyController = require('../../controllers/VacancyController');

// GET / - List jobs (Home)
router.get('/', VacancyController.getPublicJobs);

// GET /jobs - Alias for list
router.get('/jobs', VacancyController.getPublicJobs);

// GET /jobs/:id - Job Detail
router.get('/jobs/:id', VacancyController.getJobDetail);

module.exports = router;