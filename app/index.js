const express = require('express');
const path = require('path');

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Handles any requests
app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname+'/build/index.html'));
});

const http_port = 3000;
app.listen(http_port);

console.log('App is listening on port ' + http_port);