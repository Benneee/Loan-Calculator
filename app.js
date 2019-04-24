// Capture the form
const form = document.getElementById('loan-form');

// Variables for the Loader To Be Functional
const loader = document.getElementById('loading');
const results = document.getElementById('results');

// Eventlistener for the form captured
form.addEventListener('submit', e => {
  // Set the loader to run once the submit button is clicked
  loader.style.display = 'block';

  // Here, we hide the results
  results.style.display = 'none';

  // Set a timeout for the loader
  setTimeout(calcResults, 1500);

  e.preventDefault();
});

// Calculate Results
function calcResults() {
  // UI Variables

  // Fields before Submit Button
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');

  // Fields after Submit Button
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  // Logic Variables

  // The principal amount is what us entered as 'Loan Amount'
  const principal = parseFloat(amount.value);

  const calculatedInterest = parseFloat(interest.value) / 100 / 12;

  const calculatedPayments = parseFloat(years.value) * 12;

  // Comput monthly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);

  const monthly = (principal * x * calculatedInterest) / (x - 1);

  // Check if the monthly variable is a finite number - the number can be measured
  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
    loader.style.display = 'none';
    results.style.display = 'block';
  } else {
    showError('Please check your numbers');
  }
}

// Show Error Function
function showError(error) {
  loader.style.display = 'none';
  results.style.display = 'none';

  // Create a div
  const errorDiv = document.createElement('div');

  // Add a class to the div element
  errorDiv.className = 'alert alert-danger';

  // Append a text node to the errorDiv element
  errorDiv.appendChild(document.createTextNode(error));
  // console.log(errorDiv);

  // Ideally, we need to display the error on the DOM
  // To do this, we need to get some parts of the DOM
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // Next, we want to call a method that inserts HTML elements in a particular position we want
  card.insertBefore(errorDiv, heading);

  // We cannot have the error card just saty on the DOM like that,
  // Hence, we use the set-timeout method to clear it
  setTimeout(clearError, 2500);
}

function clearError() {
  const alert = document.querySelector('.alert');
  alert.remove();
}
