const createError = require('http-errors');
const express = require('express');
const path = require('path');
const Registration = require('./routes/api/registration');
const Login = require('./routes/api/login');


const app = express();

app.use(express.json());

app.use('/api/registration', Registration);
app.use('/api/login', Login);


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
}

app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
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
