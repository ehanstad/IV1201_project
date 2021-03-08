#!/usr/bin/env node
/**
 * @file Server
 * @author Lucas Villarroel
 */
const app = require('./app');

/**
 * Port is 5000 if not stated otherwise in env
 * @const
 */
const port = process.env.PORT || '5000';
app.set('port', port);

/**
 * Start server on specified port
 */
app.listen(port, () => console.log(`Server started on port ${port}`));
