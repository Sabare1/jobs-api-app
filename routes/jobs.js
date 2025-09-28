const express = require('express');
const {getAll, getJob, createJob, updateJob, deleteJob,} = require('../controllers/jobs');
const jobsRoute = express.Router();

jobsRoute.route('/').get(getAll).post(createJob);
jobsRoute.route('/:id').get(getJob).patch(updateJob).delete(deleteJob);

module.exports = jobsRoute;