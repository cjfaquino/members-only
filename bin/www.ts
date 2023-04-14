#!/usr/bin/env node

/**
 * Module dependencies.
 */

import debug, { Debugger } from 'debug';
import createHttpError, { HttpError } from 'http-errors';
import http from 'http';
import mongoose from 'mongoose';
import app from '../app';

const logger: Debugger = debug('members-only:server');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: any) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: HttpError) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr!.port;
  logger('Listening on ' + bind);
}

// setup mongoose connection
mongoose.set('strictQuery', false);
const mongoDB = process.env.MONGODB_URI;

const main = async () => {
  if (!mongoDB) {
    throw createHttpError(404, 'MongDB not found');
  }
  await mongoose.connect(mongoDB);
  logger('MongoDB connected');
};
main().catch((err) => console.log(err));
