const bodyParser = require('body-parser');
const express = require('express');
const app = express();


//working API Routes 
const undeliveredRoute = require('./api/routes/undelivered');
const subListRoute=require('./api/routes/sublist');
const logRoute = require('./api/routes/log');
const offlineRoute = require('./api/routes/offline');
const clientStatusRoute = require('./api/routes/clientStatus');

// API without controllers defination
const publishRoute = require('./api/routes/publish');
const subscribeRoute = require('./api/routes/subscribe');
const uuidRoute=require('./api/routes/uuid');
const getuuidRoute=require('./api/routes/getuuid');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use((req,res,next) =>{
	res.header("Access-Control-Allow-Origin","*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With", "Content-Type", "Accept", "Authorization"
		);
	if (req.method === 'OPTIONS'){
		//FOLLOWING HEADER CONTAIN ALL THE HTTP VERBES YOU WANT TO ALLOW WITH YOUR API
		res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
		return res.status(200).json();
	}
	next();
});


//working API
app.use('/undelivered',undeliveredRoute);
app.use('/sublist',subListRoute);
app.use('/log',logRoute);
app.use('/offline',offlineRoute);
app.use('/clientStatus',clientStatusRoute);


app.use('/publish',publishRoute);
app.use('/subscribe',subscribeRoute);
app.use('/uuid',uuidRoute);
app.use('/getuuid',getuuidRoute);

app.use((req, res, next) =>{
	const error = new Error('Not Foundd');
	error.status = 404;
	next(error); 
});

app.use((error,req, res, next) =>{
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message,
			Usman: "app.js application errorr"
		}
	});
});
module.exports = app;
