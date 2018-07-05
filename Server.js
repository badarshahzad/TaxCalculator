const express = require('express');
const MongoClient = require('mongodb');
const bodyParser = require('body-parser');

const taxCal = require('./TaxCalculate');
const app = express();
const port = 8000;

// require('./app/routes')(app, {}); //imports it for use

app.listen(port, () => {
	console.log('We are live on '+ port);
});

/**
 * body-parser extract the entire body portion of an 
 * incoming request stream and exposes it on req.body 
 */

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

 /**
  * Query of monthly, yearly, quarterly handling START
  */

 app.post('/calculatetax', function(req, res){
	var salary = 0;
	
	if(req.query.income === "monthly" ){
		// console.log("*************************Monthly query");
		salary = req.body.income;
		return res.send(taxCal.monthlySalaryCal(salary));
	}
	else if(req.query.income === "yearly" ){
		// console.log("*************************Yearly query");
		salary = req.body.income;
		return res.send(taxCal.yearlySalaryCal(salary));
	}
	else if (req.query.income === "quarterly"){ 
		// console.log("*************************Quarterly query");
		salary = req.body.income;
		return res.send(taxCal.quarterlySalaryCal(salary));
	}
});

  /**
  * Query of monthly, yearly, quarterly handling END
  */

app.get('/', function(req, res){
	console.log(req);
	res.send('Hi!');
});

app.get('/:badar', function(req, res){
	var variable = req.params.badar;
	res.send('Hi! '+variable);
	res.end(); // end the request when we are done handling with it
});

// I specify a param in our path for the GET of a specific object 
app.get('/:salary/:salaryType', function(req, res){

	let salaryType = req.params.salaryType;
	let salary = req.params.salary;

	if (salaryType === "month" || salaryType === "monthly"){
		return res.send(taxCal.monthlySalaryCal(salary));
	}
	else if(salaryType === "year" || salaryType === "yearly"){
		return res.send(taxCal.yearlySalaryCal(salary));
	}
	else if(salaryType === "" || salaryType == "null"){
		return res.send(taxCal.monthlySalaryCal(salary));
	}
	res.end();
});

app.post('/salary', function(req, res){
	
	var salary = 0;
	if( req.body.monthly != undefined){
		salary = req.body.monthly;
		return res.send(taxCal.monthlySalaryCal(salary));
	}
	else if (req.body.yearly != undefined){
		salary = req.body.yearly;
		return res.send(taxCal.yearlySalaryCal(salary));
	}else{
		res.send("Salary Key is not correct!");
	}
	 	
});

/******************************************************************
 *  Yearly Salary Calculation Start with /monthly or /yearly  START
 */

app.post('/monthly', function(req, res){
	var salary = 0;
	if( req.body.income != undefined){
		salary = req.body.income;
		return res.send(taxCal.monthlySalaryCal(salary));
	}
});

app.post('/yearly', function(req, res){
	var salary = 0;
	if( req.body.income != undefined){
		salary = req.body.income;
		return res.send(taxCal.yearlySalaryCal(salary));
	}
});

/******************************************************************
 *  Yearly Salary Calculation Start with /monthly or /yearly  END
 */
 
// Attach router for the specific path
// app.use('/salary', salaryRouter);

/**
[1] Some notes on GET requests:

GET requests can be cached
GET requests remain in the browser history
GET requests can be bookmarked
GET requests should never be used when dealing with sensitive data
GET requests have length restrictions
GET requests should be used only to retrieve data
Some notes on POST requests:

POST requests are never cached
POST requests do not remain in the browser history
POST requests cannot be bookmarked
POST requests have no restrictions on data length */

module.exports = app;

// Tip #1 :
/**
 * If you stop the server from the terminal and when you run the server again if you found an 
 * 
 * error like Error: listen EADDRINUSE :::8000
 * 
 * sudo kill `sudo lsof -t -i:8000`
 */

/**
 * [1] https://stackoverflow.com/questions/2080863/what-is-the-difference-between-a-http-get-and-http-post-and-why-is-http-post-wea
 */