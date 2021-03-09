/**
 * @file Express application
 * @author Lucas Villarroel
 * @requires dotenv
 * @requires http-errors
 * @requires express
 * @requires path
 */
require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const User = require('./routes/api/user');
const Application = require('./routes/api/application');
const Admin = require('./routes/api/admin');
const { verifyApplicant, verifyRecruiter } = require('./middleware/verify');

/**
 * Express application
 * @const
 */
const app = express();

/**
 * JSON middleware
 */
app.use(express.json());

/**
 * use API endpoints
 */
app.use('/api/user', User);
app.use('/api/application', Application, verifyApplicant);
app.use('/api/admin', Admin);

/**
 * Use middleware for protected routes
 */
app.use('/applicant', verifyApplicant);
app.use('/recruiter', verifyRecruiter);

/**
 * Serve static files
 */
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../frontend/build'));
}
app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

/**
 * Catch 404 and forward to error handler
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
app.use((req, res, next) => {
  next(createError(404));
});

/**
 * Error handler
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
