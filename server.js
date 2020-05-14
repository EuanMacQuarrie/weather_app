// Require Express to run server and routes
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//Body-parser as middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

//initialize the main project folder
app.use(express.static("./website"));

const port = process.env.PORT || 8000;

//defining projectData to act as the app API endpoint
const projectData = {};

// get endpoints
app.get('/', (req,res)=>{
  res.sendFile(`./website/index.html`)
});

app.get('/entries', (req,res)=>{
  res.send(projectData);
  console.log(`Entry has been sent to the UI: ${projectData}`);
});

//post endpoints
app.post('/newentry', addEntry);

//def function to add a new entry
function addEntry(req,res){
  let newEntry = {
    "temp": req.body.temp,
    "postContent": req.body.content,
    "date": req.body.date
  };

  projectData.unshift(newEntry);
  console.log(`New entry has been added to the server: ${projectData}`);
  res.send(projectData)
}

app.listen(port, () => console.log(`Running on port: ${port}`));

