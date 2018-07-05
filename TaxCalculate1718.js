/******************************
 * Salary Tax calculation START
 *****************************/

let monthlySalaryCal = (salary) => { //monthly salary tax
    let monthSalary = salary * 12;
    return yearlySalaryCal(monthSalary);
};

let quarterlySalaryCal = (salary) => { //quarterly salary tax
    let quarterly = yearlySalaryCal(salary * 4);
    return quarterly;
}

let yearlySalaryCal = (yearlySalary) => { //yearly salary tax
    let monthSalary = yearlySalary / 12;
    var yearlyTax = 0;

    if (yearlySalary <= 400000) {
        yearlyTax = 0;
    }
    else if (yearlySalary > 400000 && yearlySalary <= 500000) { // increase 4 lakh but not 5 lakh
        const remainSalary = yearlySalary - 400000;
        yearlyTax = 0.02 * remainSalary; // 2 % tax above the 4,00,000 ruppes  
    }
    else if (yearlySalary > 500000 && yearlySalary <= 750000) {
        const remainSalary = yearlySalary - 500000;
        yearlyTax = 0.05 * remainSalary; // 5 % tax above the 5,00,000 ruppes   
        yearlyTax = yearlyTax + 2000 ; // 2000 added to the yearly tax due to exceeding 5 lakh
    }
    else if (yearlySalary > 750000 && yearlySalary <= 1400000) {
        const remainSalary = yearlySalary - 750000;
        yearlyTax = 0.10 * remainSalary; // 10 % tax above the 750,000 ruppes 
        yearlyTax = yearlyTax + 14500 ; // 14500 added as exceeding the 7 lakh 50 thousands
    }
    else if (yearlySalary > 1400000 && yearlySalary <= 1500000) {
        const remainSalary = yearlySalary - 1400000;
        yearlyTax = 0.125 * remainSalary; // 12.5 % tax above the 14 lakh rupees 
        yearlyTax = yearlyTax + 79500 ; // 79500 added as exceeding the 14 lakh rupees
    }
    else if (yearlySalary > 1500000 && yearlySalary <= 1800000) {
        const remainSalary = yearlySalary - 1800000;
        yearlyTax = 0.15 * remainSalary; // 15 % tax above the 15 lakh rupees 
        yearlyTax = yearlyTax + 92000 ; // 92000 added as exceeding the 15 lakh rupees
    }
    else if (yearlySalary > 1800000 && yearlySalary <= 2500000) {
        const remainSalary = yearlySalary - 1800000;
        yearlyTax = 0.175 * remainSalary; // 20 % tax above the 18 lakh rupees 
        yearlyTax = yearlyTax + 137000 ; // 137000 added as exceeding the 18 lakh rupees
    }
    else if (yearlySalary > 2500000 && yearlySalary <= 3000000) {
        const remainSalary = yearlySalary - 2500000;
        yearlyTax = 0.20 * remainSalary; // 20 % tax above the 25 lakh rupees 
        yearlyTax = yearlyTax + 259500 ; // 259500 added as exceeding the 25 lakh rupees
    }
    else if (yearlySalary > 3000000 && yearlySalary <= 3500000) {
        const remainSalary = yearlySalary - 3000000;
        yearlyTax = 0.225 * remainSalary; // 22.5 % tax above the 30 lakh rupees 
        yearlyTax = yearlyTax + 359500 ; // 359500 added as exceeding the 30 lakh rupees
    }
    else if (yearlySalary > 3500000 && yearlySalary <= 4000000) {
        const remainSalary = yearlySalary - 3500000;
        yearlyTax = 0.25 * remainSalary; // 25 % tax above the 35 lakh rupees 
        yearlyTax = yearlyTax + 472000 ; // 597000 added as exceeding the 35 lakh rupees
    }
    else if (yearlySalary > 4000000 && yearlySalary <= 7000000) {
        const remainSalary = yearlySalary - 4000000;
        yearlyTax = 0.275 * remainSalary; // 27.5 % tax above the 40 lakh rupees 
        yearlyTax = yearlyTax + 597000 ; // 597000 added as exceeding the 40 lakh rupees
    }
    else if (yearlySalary > 7000000) {
        const remainSalary = yearlySalary - 7000000;
        yearlyTax = 0.3 * remainSalary; // 30 % tax above the 70 lakh rupees
        yearlyTax = yearlyTax + 1422000; // 1422000 added as exceeding 70 lakh rupees
        
        console.log("Working for the 70 lakh! ");
    }
    else {
        yearlyTax = -1;
        console.log("Not in tax range!");
    }

    var monthlyTax = yearlyTax / 12;
    var monthSalaryAfterTax = monthSalary - monthlyTax;
    var yearlySalaryAfterTax = yearlySalary - yearlyTax;

    console.log("*****************************");
    console.log("Month Salary: " + monthSalary.toLocaleString('en-IN'));
    console.log("Monthly Tax: " + monthlyTax.toLocaleString('en-IN'));
    console.log("Monthly Salary After Tax: " + monthSalaryAfterTax.toLocaleString('en-IN'));
    console.log("Yearly Salary: " + yearlySalary.toLocaleString('en-IN'));
    console.log("Yearly Tax: " + yearlyTax.toLocaleString('en-IN'));
    console.log("Yearly Salary After Tax: " + yearlySalaryAfterTax.toLocaleString('en-IN'));

    var object = {
        monthSalary: monthSalary,
        monthlyTax: monthlyTax,
        monthSalaryAfterTax: monthSalaryAfterTax,
        yearlySalary: yearlySalary,
        yearlyTax: yearlyTax,
        yearlySalaryAfterTax: yearlySalaryAfterTax
    };
    return object;

};
/****************
 * Salary Tax Calculation END
 */

/**
 * Exports the functions
 */
module.exports = {
    yearlySalaryCal,
    monthlySalaryCal,
    quarterlySalaryCal
};