async function convertCurrency() {
    const fromCurrency = document.getElementById('from').value.toUpperCase();
    const toCurrency = document.getElementById('to').value.toUpperCase();
    const amount = document.getElementById('amount').value;

    try {
        // POST to the Flask `/convert` route which handles the conversion server-side
        const response = await axios.post('/convert', {
            from_currency: fromCurrency,
            to_currency: toCurrency,
            amount: amount
        });
         // Handle the response from your Flask app
        if (response.data.result) {
            document.getElementById('result').innerHTML = `Converted Amount: ${response.data.result}`;
        } else {
            // If the Flask app returns an error key in the JSON response
            document.getElementById('result').innerHTML = 'Conversion failed. Please try again.';
        }
    } catch (error) {
        // Log the error and show it on the webpage
        console.error('Error during the conversion:', error);
        document.getElementById('result').innerHTML = 'An error occurred during conversion. ' + (error.response ? error.response.data.error : error.message);
    }
}

// Event listener for when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const convertButton = document.getElementById('convert-button');
    if (convertButton) {
        convertButton.addEventListener('click', convertCurrency);
    }
});