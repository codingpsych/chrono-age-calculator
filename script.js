'use strict';
// *******Global Variables

let dateOfBirth = document.getElementById('date-of-birth');
let calculationDate = document.getElementById('calculation-date');
const calculateBtn = document.getElementById('calculate-btn');
const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // Array for days in every month in the year 1-12

// Set current date as today's date
let newDate = new Date();
let currentDay = ('0' + newDate.getDate()).slice(-2);
let currentMonth = ('0' + (newDate.getMonth() + 1)).slice(-2);
let currentYear = newDate.getFullYear();
let currentDate = currentYear + '-' + currentMonth + '-' + currentDay;
document.querySelector('#calculation-date').value = currentDate;

// *******Functions

// Age calculation (calculated date - date of birth) logic
function calculateAge() {
  let inputtedDateofBirth = new Date(dateOfBirth.value); // new object
  let inputtedCalculationDate = new Date(calculationDate.value); // new object
  // Adding dates, month, year to object - date
  let birthDetail = {
    date: inputtedDateofBirth.getDate(),
    month: inputtedDateofBirth.getMonth() + 1,
    year: inputtedDateofBirth.getFullYear(),
  };
  let calculatedDateDetail = {
    date: inputtedCalculationDate.getDate(),
    month: inputtedCalculationDate.getMonth() + 1,
    year: inputtedCalculationDate.getFullYear(),
  };
  console.log(inputtedDateofBirth);
  console.log(inputtedCalculationDate);
  console.log(birthDetail);
  console.log(calculatedDateDetail);
  if (
    // checks if dates entered are a valid date
    inputtedDateofBirth == 'Invalid Date' ||
    inputtedCalculationDate == 'Invalid Date'
  ) {
    alert('Date error. Check your dates and press calculate again.');
    displayResult('-', '-', '-');
    return;
  }

  // local function variables
  let birthDate;
  let birthMonth;
  let birthYear;

  leapYearChecker(calculatedDateDetail.year); // leap year adjustment

  // Check if date of birth is greater than calculation date
  if (
    birthDetail.year > calculatedDateDetail.year ||
    (birthDetail.month > calculatedDateDetail.month &&
      birthDetail.year == calculatedDateDetail.year) ||
    (birthDetail.date > calculatedDateDetail.date &&
      birthDetail.month == calculatedDateDetail.month &&
      birthDetail.year == calculatedDateDetail.year)
  ) {
    alert('Date of Birth must be prior to Calculated Date');
    displayResult('-', '-', '-');
    return;
  }
  // Difference calculation
  birthYear = calculatedDateDetail.year - birthDetail.year;

  if (calculatedDateDetail.month >= birthDetail.month) {
    birthMonth = calculatedDateDetail.month - birthDetail.month;
  } else {
    birthYear--;
    birthMonth = 12 + calculatedDateDetail.month - birthDetail.month;
  }

  if (calculatedDateDetail.date >= birthDetail.date) {
    birthDate = calculatedDateDetail.date - birthDetail.date;
  } else {
    birthMonth--;
    let days = months[calculatedDateDetail.month - 2];
    birthDate = days + calculatedDateDetail.date - birthDetail.date;
    if (birthMonth < 0) {
      birthMonth = 11;
      birthYear--;
    }
  }
  displayResult(birthDate, birthMonth, birthYear); // Push to output wrapper
}

// Output wrapper function text content completion (year, month, date)
function displayResult(displayDate, displayMonth, displayYear) {
  document.getElementById('years').textContent = displayYear;
  document.getElementById('months').textContent = displayMonth;
  document.getElementById('days').textContent = displayDate;
}

// Leap year function, if true, February in months array is changed to 29
function leapYearChecker(year) {
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    months[1] = 29;
  } else {
    months[1] = 28;
  }
}

// *******Keyboard Event Listeners

// Enter from date of birth field
dateOfBirth.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    calculateAge();
  }
});

// Enter from date of calculation field
calculationDate.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    calculateAge();
  }
});

// Mouse click on claculate button
calculateBtn.addEventListener('click', event => {
  calculateAge();
});

// Onload automatic focus on date of birth field
window.onload = function () {
  var input = dateOfBirth.focus();
};
