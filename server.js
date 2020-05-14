// Require Express to run server and routes
const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const port = 8000;
app.listen(port, () => console.log('Listening on port: ${port}'));

/*Body-parser as middle-ware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Setup empty JS object to act as endpoint for all routes
projectData = {};

app.use(express.static('.website'));

// Callback function to complete GET '/all'
app.get('/all', (req, res) => {
  res.send(projectData);
});

// Post Route
app.post('/add', (req, res) => {
  projectData['date'] = req.body.date;
  projectData['temp'] = req.body.temp;
  projectData['content'] = req.body.content;
  res.send(projectData);
});