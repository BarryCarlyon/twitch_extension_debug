require('dotenv').config();

const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

app.listen(8050, function () {
    console.log('booted express on 8050');
});

const twitchextensioncsp = require('twitchextensioncsp');
app.use(twitchextensioncsp({
    clientID: process.env.CLIENT_ID,
    reportUri: process.env.REPORTURI
}));

app.use(function(req, res, next) {
    console.log("received from "+req.get("X-Forwarded-For")+" : "+req.method+" "+req.originalUrl);
    next();
});

/*
This will capture any CSP Report and dump log it to console
*/
app.post('/csp/', express.json({
    type: 'application/csp-report'
}), (req,res) => {
    res.send('Ok');

    console.log(req.body);
});

// static route
app.use('/extension/', express.static(path.join(
    __dirname,
    '..',
    'extension'
)));
