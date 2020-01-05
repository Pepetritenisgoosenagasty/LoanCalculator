// Listen for submit
const form = document.getElementById('loan-form');

form.addEventListener('submit', (e) => {


// Hide results
const results = document.getElementById('results');
results.style.display = 'none';

// Show loader
const loader = document.getElementById('loader');
loader.style.display = 'block';

setTimeout(calculateResults, 4000);

e.preventDefault();
});

function calculateResults() {
    // UI vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    // Calculations
    const principle = parseFloat(amount.value);
    const claculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayment = parseFloat(years.value) * 12;

    // Compute Monthly Payment
    const x = Math.pow(1 + claculatedInterest, calculatedPayment);
    const monthly = (principle * x * claculatedInterest)/(x-1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value  = (monthly * calculatedPayment).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayment) - principle).toFixed(2);

        // Show results
        const results = document.getElementById('results');
        results.style.display = 'block';

        // Hide loader
        const loader = document.getElementById('loader');
        loader.style.display = 'none';
        
    }else {
        showError('Please check your numbers');
    }

}

// Show error function
function showError(error) {

    // Hide results
    const results = document.getElementById('results');
    results.style.display = 'none';

    // Show loader
    const loader = document.getElementById('loader');
    loader.style.display = 'none';

    // Create a div
    const div = document.createElement('div');

    // Get Elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Add class name   
    div.className = 'alert alert-danger';

    // Create a text node and append to div
    div.appendChild(document.createTextNode(error));

    // Insert error above heading
    card.insertBefore(div, heading);

    // clear error after 3 seconds
    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, 3000);
}