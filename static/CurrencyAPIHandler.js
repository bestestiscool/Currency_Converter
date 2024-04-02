function convertCurrency() {
    const fromCurrency = document.getElementById('from').value.toUpperCase();
    const toCurrency = document.getElementById('to').value.toUpperCase();
    const amount = document.getElementById('amount').value;

    // Make a POST request to your Flask backend
    fetch('/convert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            from_currency: fromCurrency,
            to_currency: toCurrency,
            amount: amount
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.result) {
            document.getElementById('result').innerHTML = `Converted Amount: ${data.result}`;
        } else {
            document.getElementById('result').innerHTML = 'Conversion failed. Please try again.';
        }
    })
    .catch(error => {
        console.error('Error during conversion:', error);
        document.getElementById('result').innerHTML = 'An error occurred during conversion.';
    });
}

// Attach the event listener to the button
document.addEventListener('DOMContentLoaded', function() {
    const convertButton = document.getElementById('convert-button');
    if (convertButton) {
        convertButton.addEventListener('click', convertCurrency);
    }
});
