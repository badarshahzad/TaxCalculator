// server.js

const express = require('express');
const MongoClient = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

// require('./app/routes')(app, {}); //imports it for use

app.listen(port, () => {
	console.log('We are live on '+ port);
});

app.get('/', function(req, res){
	console.log(req);
	res.send('Hi!');
});

app.get('/:badar', function(req, res){
	var variable = req.params.badar;
	res.send('Hi! '+variable);
	res.end(); // end the request when we are done handling with it
});

/******************************
 * Salary Tax calculation START
 *****************************/

let monthlySalaryCal = (salary) =>{ //monthly salary
	let monthSalary = salary * 12;
	return yearlySalaryCal(monthSalary);
};

let yearlySalaryCal = (yearlySalary) =>{ //yearly salary
let	monthSalary = yearlySalary / 12;
var yearlyTax = 0;

if (yearlySalary <= 400000) {
  yearlyTax = 0;
  console.log("No, income tax!");
}
else if (yearlySalary > 400000 && yearlySalary <= 800000) {
  yearlyTax = 1000;
  console.log("working 1: ");
}
else if (yearlySalary > 800000 && yearlySalary <= 1200000) {
  yearlyTax = 2000;
  console.log("working 2: ");
}
else if (yearlySalary > 1200000 && yearlySalary <= 2400000) {
  const remainSalary12To24 = yearlySalary - 1200000;
  const value12To24 = 0.05 * remainSalary12To24; // 5 % tax above the 12,00,000 ruppes 
  value12To24 > 2000 ? yearlyTax = value12To24 : yearlyTax = 2000;
  console.log("working 3: ");
}
else if (yearlySalary > 2400000 && yearlySalary <= 4800000) {
  const remainSalary24To48 = yearlySalary - 2400000;
  const value24To28 = 0.10 * remainSalary24To48; // 10% tax above the 24,00,000 ruppes 
  yearlyTax = value24To28 + 60000;
  console.log("working! 4");
}
else if (yearlySalary > 4800000) {
  const remainAfter48 = yearlySalary - 4800000;
  var value = 0.15 * remainAfter48;
  yearlyTax = value + 300000;
  console.log("working 5: ");
}
else {
  yearlyTax = -1;
  console.log("Not in tax range!");
}

var monthlyTax = yearlyTax / 12;
var monthSalaryAfterTax = monthSalary - monthlyTax;
var yearlySalaryAfterTax = yearlySalary - yearlyTax;

console.log("*****************************");
console.log("Month Salary: "+monthSalary.toLocaleString('en-IN'));
console.log("Monthly Tax: "+ monthlyTax.toLocaleString('en-IN'));
console.log("Monthly Salary After Tax: "+monthSalaryAfterTax.toLocaleString('en-IN'));
console.log("Yearly Salary: " + yearlySalary.toLocaleString('en-IN'));
console.log("Yearly Tax: " + yearlyTax.toLocaleString('en-IN'));
console.log("Yearly Salary After Tax: " + yearlySalaryAfterTax.toLocaleString('en-IN'));

var object = {
	monthSalary : monthSalary,
	monthlyTax : monthlyTax,
	monthSalaryAfterTax : monthSalaryAfterTax,
	yearlySalary : yearlySalary,
	yearlyTax : yearlyTax,
	yearlySalaryAfterTax : yearlySalaryAfterTax
};
return object;

};
 /****************
  * Salary Tax Calculation END
  */

// Create express router object for monthly or yearly tax calculation
var salaryRouter = express.Router();	

// A GET to the root of a resource returns a list of that resource
salaryRouter.get('/', function(req, res){
	// console.log(req);
});

// I specify a param in our path for the GET of a specific object 
app.get('/:salary/:salaryType', function(req, res){

	let salaryType = req.params.salaryType;
	let salary = req.params.salary;

	if (salaryType === "month" || salaryType === "monthly"){
		return res.send(monthlySalaryCal(salary));
	}
	else if(salaryType === "year" || salaryType === "yearly"){
		return res.send(yearlySalaryCal(salary));
	}
	else if(salaryType === "" || salaryType == "null"){
		return res.send(monthlySalaryCal(salary));
	}
	res.end();
});

app.use(bodyParser.json());
app.post('/salary', function(req, res){
	
	var salary = 0;
	if( req.body.monthly != undefined){
		salary = req.body.monthly;
		return res.send(monthlySalaryCal(salary));
	}
	else if (req.body.yearly != undefined){
		salary = req.body.yearly;
		return res.send(yearlySalaryCal(salary));
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
		return res.send(monthlySalaryCal(salary));
	}
});

app.post('/yearly', function(req, res){
	var salary = 0;
	if( req.body.income != undefined){
		salary = req.body.income;
		return res.send(yearlySalaryCal(salary));
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