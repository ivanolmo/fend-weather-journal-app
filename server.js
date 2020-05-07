// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');
const cors = require('cors');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const listening = () => {
    console.log(`The server is now running at localhost:${port}`);
};

// Routes
// get route to retrieve data from object
app.get('/', (request, response) => {
    response.status(200).send(projectData);
});

// post route to store the data for new entry in existing object
app.post('/', (request, response) => {
    const newEntry = {};
    newEntry.date = request.body.date;
    newEntry.temp = request.body.temp;
    newEntry.content = request.body.content;

    // add new data to existing object
    console.log(newEntry);
    console.log(`request body = ${request.body}`);
    projectData.push(newEntry);

    response.status(201).send(projectData);
});

app.listen(port, listening);