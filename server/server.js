const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

app.listen(8050, function () {
    console.log('booted express on 8050');
});

app.use(function(req, res, next) {
    console.log("received from "+req.get("X-Forwarded-For")+" : "+req.method+" "+req.originalUrl);
    next();
});
app.use('/extension/', express.static(path.join(
    __dirname,
    '..',
    'extension'
)));
