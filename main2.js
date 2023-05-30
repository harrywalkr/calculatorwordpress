const apiUrl = 'https://coincodex.com/api/coincodex/get_coin/';
const input = document.getElementById('token-input');
const icon = document.getElementById('token-icon');
const price = document.getElementById('token-price');
let data;

fetch(apiUrl)
  .then(response => response.json())
  .then(coins => {
    data = coins;
    icon.style.display = 'inline-block';
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

function getCoinBySymbol(symbol) {
  return data.find(coin => coin.display_symbol === symbol.toUpperCase());
}

function showPrice() {
  const symbol = input.value.trim().toUpperCase();
  const coin = getCoinBySymbol(symbol);

  if (coin) {
    price.textContent = `$${coin.last_price_usd.toFixed(2)}`;
  } else {
    price.textContent = 'Symbol not found';
  }
}

input.addEventListener('input', showPrice);
icon.addEventListener('click', showPrice);
