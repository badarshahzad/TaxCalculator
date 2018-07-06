const express = require('express');
const MongoClient = require('mongodb');
const bodyParser = require('body-parser');

const MESSAGE_YEAR = {
	message: "Sorry, your request is not correct. Year 2018 and 2019 is only supported."
};
const MESSAGE_INCOME = {
	message: "Sorry, your request is not correct. Please, mentioned the income to get results."
};
const MESSAGE_GIVE_VALID_INPUT = {
	message: "Sorry, your request is not correct. Please, Correct your query to get results."
};

const taxCal = require('./TaxCalculate'); // function imports from utility of 2018-2019
const taxCal2017 = require('./TaxCalculate1718'); // function imports from utility of 2017-2018

const app = express();
const port = 8000;

// require('./app/routes')(app, {}); //imports it for use

app.listen(port, () => {
	console.log('We are live on ' + port);
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

app.post('/calculatetax', function (req, res) {
	var salary = 0;
	salary = req.body.income;

	/**
	 *  QUERY with two arguments 
	 * 	{Salary type = month, yearly, quarterly }
	 *  {Year =  2017, 2018}
	 */

	 console.log(req.query.year);

	if (req.query.income == undefined && req.query.year == undefined) {
		res.send(MESSAGE_GIVE_VALID_INPUT);
		res.end();
	} else if ( (!(req.query.year == 2018 || req.query.year == 2019))
			&& req.query.year != undefined ) {
		res.send(MESSAGE_YEAR);
		res.end();
	} else if (req.query.income == undefined) {
		res.send(MESSAGE_INCOME);
		res.end();
	} else {
		
		//monthly + year
		req.query.income === "monthly" && req.query.year == "2018" ?
			res.send(taxCal2017.monthlySalaryCal(salary)) : // 2018 tax calculation process
			req.query.income === "monthly" && req.query.year == "2019" ?
				res.send(taxCal.monthlySalaryCal(salary)) : // 2019 tax calculation process

				//yearly + year
				req.query.income === "yearly" && req.query.year == "2018" ?
					res.send(taxCal2017.yearlySalaryCal(salary)) : // 2018 tax calculation process
					req.query.income === "yearly" && req.query.year == "2019" ?
						res.send(taxCal.yearlySalaryCal(salary)) : // 2019 tax calculation process

						//quarterly + year
						req.query.income === "quarterly" && req.query.year == "2018" ?
							res.send(taxCal2017.quarterlySalaryCal(salary)) : // 2018 tax calculation process
							req.query.income === "quarterly" && req.query.year == "2019" ?
								res.send(taxCal.quarterlySalaryCal(salary)) : // 2019 tax calculation process

								//REQUEST handle of single argument 

								//monthly
								req.query.income === "monthly" ?
									res.send(taxCal.monthlySalaryCal(salary)) :

									//yearly
									req.query.income === "yearly" ?
										res.send(taxCal.yearlySalaryCal(salary)) :

										//quarterly
										req.query.income === "quarterly" ?
											res.send(taxCal.quarterlySalaryCal(salary)) :
											console.log("**************************yes");
		res.send(MESSAGE_GIVE_VALID_INPUT); // Message response incase of query incorrect
		res.end();
	
	}



	//REQUEST handle of single argument 

	// //montly
	// if (req.query.income === "monthly") {
	// 	// console.log("*************************Monthly query");
	// 	res.send(taxCal.monthlySalaryCal(salary));
	// }
	// //yearly
	// else if (req.query.income === "yearly") {
	// 	// console.log("*************************Yearly query");
	// 	return res.send(taxCal.yearlySalaryCal(salary));
	// }
	// //quarterly
	// else if (req.query.income === "quarterly") {
	// 	// console.log("*************************Quarterly query");
	// 	return res.send(taxCal.quarterlySalaryCal(salary));
	// }
	// else {
	// 	res.send(MESSAGE); //send a message query is not correct
	// }



});



/**
* Query of monthly, yearly, quarterly handling END
*/

app.get('/', function (req, res) {
	console.log(req);
	res.send('Hi!');
});

app.get('/:badar', function (req, res) {
	var variable = req.params.badar;
	res.send('Hi! ' + variable);
	res.end(); // end the request when we are done handling with it
});

// I specify a param in our path for the GET of a specific object 
app.get('/:salary/:salaryType', function (req, res) {

	let salaryType = req.params.salaryType;
	let salary = req.params.salary;

	if (salaryType === "month" || salaryType === "monthly") {
		return res.send(taxCal.monthlySalaryCal(salary));
	}
	else if (salaryType === "year" || salaryType === "yearly") {
		return res.send(taxCal.yearlySalaryCal(salary));
	}
	else if (salaryType === "" || salaryType === "null") {
		return res.send(taxCal.monthlySalaryCal(salary));
	} else {
		return res.send(MESSAGE);
	}
	res.end();
});

app.post('/salary', function (req, res) {

	var salary = 0;
	if (req.body.monthly != undefined) {
		salary = req.body.monthly;
		return res.send(taxCal.monthlySalaryCal(salary));
	}
	else if (req.body.yearly != undefined) {
		salary = req.body.yearly;
		return res.send(taxCal.yearlySalaryCal(salary));
	} else {
		res.send("Salary Key is not correct!");
	}

});

/******************************************************************
 *  Yearly Salary Calculation Start with /monthly or /yearly  START
 */

app.post('/monthly', function (req, res) {
	var salary = 0;
	if (req.body.income != undefined) {
		salary = req.body.income;
		return res.send(taxCal.monthlySalaryCal(salary));
	}
});

app.post('/yearly', function (req, res) {
	var salary = 0;
	if (req.body.income != undefined) {
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