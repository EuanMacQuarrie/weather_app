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

app.use(express.static('./website'));
//get routes for previous entries
app.get('/', (req, res)=>{
    res.sendFile(`./website/index.html`);
  });
  app.get('/entries', (req,res)=>{
    res.send(projectData);
    console.log(`A new entry has been sent: ${projectData}`);
  });
  
app.post('/add', addPost);

function addPost(req, res){
  let newEntry = {
    "temperature": req.body.temperature,
    "feelings": req.body.feelings,
    "date": req.body.date
  };

  projectData.unshift(newEntry);
  console.log(`A new entry added on the server: ${projectData}`);
  res.send(projectData);
};