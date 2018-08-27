require('./config/config');
const express = require('express');

const port = process.env.PORT || 3000;

var app = express();

app.listen(port, () => {
    console.log(`Started on port ${port}`);
})