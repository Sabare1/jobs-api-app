const CustomAPIError = require('./customError');
const UnauthError = require('./unauthenticated');
const BadRequest = require('./bad-request');
const NotFoundErr = require('./not-found');

module.exports = {CustomAPIError, UnauthError, BadRequest, NotFoundErr};