from flask import Flask, request, jsonify, render_template
import requests


app = Flask(__name__)
app.app_context().push()

API_KEY = 'a406db0aef80db099770666d6317b4fb'


@app.route('/')
def index():
    """Serve the index.html page."""
    return render_template('index.html')

@app.route('/convert', methods=['POST'])
def convert_currency():
    """Endpoint to perform currency conversion."""
    data = request.get_json()

    from_currency = data.get('from_currency')
    to_currency = data.get('to_currency')
    amount = data.get('amount')

    # Make sure you handle any exceptions that might occur and return appropriate error messages
    try:
        response = requests.get(
            'https://api.exchangerate.host/convert',
            params={
                'from': from_currency,
                'to': to_currency,
                'amount': amount,
                'apikey': API_KEY  # If the API requires the key as a query parameter
            }
        )
        response.raise_for_status()  # This will raise an HTTPError if the HTTP request returned an unsuccessful status code
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

    return jsonify(response.json())

if __name__ == '__main__':
    app.run(debug=True)