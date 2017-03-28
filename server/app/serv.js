'use strict';

require('dotenv').config();
const winston = require('winston');
let app = require('./controller/express-server.js');

winston.level = process.env.LOG_LEVEL;

const server = app.listen(process.env.PORT, () => {
  const host = server.address().address;
  const port = server.address().port;

  winston.log('info', `Example app listening at http://${host}:${port}`);
});
