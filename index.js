import express from 'express';

import cors from 'cors';
import bodyParser from 'body-parser';
import rest_api from  './apiFiles/rest'; // import external file for more routes

import db from './apiFiles/db';

let app = express();

app.use(cors()); //allow all cors
app.use(bodyParser.json()); //support for json encoded bodies
app.use(bodyParser.urlencoded({extend: true})); //support for url encoded bodies

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log('running on port: ' + port);
});

db.connect();


const router = express.Router();

app.use('/rest', router);

//middleware function (gets called before any route)
app.use(function (req, res, next) {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log('Time:', Date.now(), fullUrl);
    next()
});

rest_api(app, router); //pass app and router to external routes


//"npm run dev" in command line to start