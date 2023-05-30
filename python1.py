import requests

# Make a request to the CoinCodex API
response = requests.get("https://cors-anywhere.herokuapp.com/https://coincodex.com/api/coincodex/get_coin/btc/")

# Parse the JSON response
data = response.json()

# Extract the logo image URL
logo_url = data["logo"]

# Now you can use the `logo_url` to display or download the Bitcoin logo image
# For example, you can use a library like `Pillow` to load and display the image:
from PIL import Image
from io import BytesIO

response = requests.get(logo_url)
image = Image.open(BytesIO(response.content))
image.show()
