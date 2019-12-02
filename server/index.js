/*******************************************************
 *      Server Starts From Here                        *
 *******************************************************/
'use strict';

const http = require('http');
const app = require('./app');
const port = process.env.PORT || 4039;
const app_name = process.env.APP_NAME || 'Test Project';
const server = http.createServer(app);

app.set('PORT_NUMBER', port);

//  Start the app on the specific interface (and port).
server.listen(port, () => {
  console.log(app_name);
  console.log('server started on port:', port);
});

process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0);
  });
});

module.exports = server;
