// module dependencies
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const User = require('./routes/api/user');
const Application = require('./routes/api/application');
const Admin = require('./routes/api/admin');

// create exrpess application
const app = express();

// use JSON middleware parser
app.use(express.json());

// API routes
app.use('/api/user', User);
app.use('/api/application', Application);
app.use('/api/admin', Admin);

// serve static files
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../frontend/build'));
}
app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
