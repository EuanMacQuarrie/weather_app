// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes

const port

const express = require('express');

const app = express();

// const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.


// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server