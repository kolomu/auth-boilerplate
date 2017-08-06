// Main starting point of the application
// instead of using import because es6 not fully supported we need require
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

// DB Setup - Create a DB {auth} in mongodb
mongoose.connect('mongodb://localhost:auth/auth');

// App Setup

// Morgan is a logging framework, to see the requests in the terminal, used for debugging
app.use(morgan('combined'));
// bodyparser parse incoming request to json, any request is going to be parsed as json
app.use(bodyParser.json({type: '*/*'}));
// call the router
router(app);

// Server Setup
const port = process.env.PORT || 3090;

// http native node library, knows how to recieve request and pass it to express app
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);