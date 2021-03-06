"use-strict";

const salaryText = "50000 monthly salary"
salaryText.indexOf("monthly") || salaryText.indexOf("month")> 0 ? yearlySalary = monthSalary * 12 :
salaryText.indexOf("yearly") || salaryText.indexOf("year") ? yearlySalary = salaryText: message = "Please specify monthly or yearly salary!"

var monthSalary = 50000;
var yearlySalary = monthSalary * 12;
// const yearlySalary = 6000000;
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