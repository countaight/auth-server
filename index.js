// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const router = require('./router');
const app = express();

// DB Setup
const mongoDB = mongoose.connect('mongodb://localhost/auth', {
	useMongoClient: true
});

mongoDB
	.then(function(db) {
		console.log('mongodb has been connected')
	})
	.catch(function(err) {
		console.log('error while trying to connect');
	})

// App Setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);

server.listen(port);
console.log('Server listening on: ', port);