const prisma = require('../services/mockDb');

exports.getPublicJobs = async (req, res) => {
  try {
    const { search, type } = req.query;

    // Construct query filters
    const query = {
      where: { status: 'ACTIVE' } // Keep the status filter
    };

    if (search) {
      query.where.OR = [
        { title: { contains: search, mode: 'insensitive' } }, // Added mode for case-insensitivity
        { company: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (type) {
      // Handle single or multiple types
      query.where.workType = { in: Array.isArray(type) ? type : [type] };
    }

    // Add orderBy and include from original function
    query.orderBy = { createdAt: 'desc' };
    query.include = {
      creator: {
        select: { name: true }
      }
    };

    const jobs = await prisma.jobVacancy.findMany(query); // Changed mockDb to prisma

    res.render('jobs/list', {
      title: 'Job Vacancies',
      jobs,
      user: res.locals.user, // Assuming res.locals.user is available
      filters: { search, type: Array.isArray(type) ? type : (type ? [type] : []) }
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    // Fallback if DB not set up (original fallback message)
    res.render('jobs/list', {
      title: 'Job Vacancies',
      jobs: [],
      error: 'Could not connect to database.'
    });
  }
};

exports.getJobDetail = async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);
    const job = await prisma.jobVacancy.findUnique({ where: { id: jobId } });

    if (!job) {
      return res.status(404).render('error', { message: 'Job not found', error: { status: 404 } });
    }

    let applied = false;
    if (res.locals.user) {
      const applications = await prisma.application.findMany({ where: { userId: res.locals.user.id } });
      applied = applications.some(app => app.jobId === jobId);
    }

    res.render('jobs/detail', {
      title: job.title,
      job,
      user: res.locals.user,
      applied
    });
  } catch (error) {
    console.error('Error fetching job detail:', error);
    res.status(500).render('error', { message: 'Internal Server Error', error: { status: 500 } });
  }
};