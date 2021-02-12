#!/usr/bin/env node

// module dependencies
const app = require('./app');

// get port from environment and store in Express.
const port = process.env.PORT || '5000';
app.set('port', port);

// listen on provided port, on all network interfaces.
app.listen(port, () => console.log(`Server started on port ${port}`));
