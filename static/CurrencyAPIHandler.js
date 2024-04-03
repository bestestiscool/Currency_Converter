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
            const resultElement = document.getElementById('result');
            resultElement.style.display = 'block';  // Make the result element visible
            resultElement.textContent = '';  // Clear any previous content

            // Create a new label element for the converted amount
            const convertedLabel = document.createElement('label');
            convertedLabel.textContent = 'Converted:';
            convertedLabel.setAttribute('for', 'converted-amount');
            
            // Create a span that will hold the converted amount
            const convertedAmountSpan = document.createElement('span');
            convertedAmountSpan.id = 'converted-amount';
            convertedAmountSpan.textContent = `${response.data.result}`;

            // Append the label and the amount span to the result div
            resultElement.appendChild(convertedLabel);
            resultElement.appendChild(convertedAmountSpan);
        } else {
            // If the Flask app returns an error key in the JSON response
            document.getElementById('result').textContent = 'Conversion failed. Please try again.';
        }
    } catch (error) {
        // Log the error and show it on the webpage
        console.error('Error during the conversion:', error);
        document.getElementById('result').textContent = 'An error occurred during conversion. ' + (error.response ? error.response.data.error : error.message);
    }
}

// Event listener for when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const convertButton = document.getElementById('convert-button');
    if (convertButton) {
        convertButton.addEventListener('click', convertCurrency);
    }
});
