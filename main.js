const apiUrl = "https://coincodex.com/api/coincodex/get_coin/";

// Cache the results of the API call to avoid excessive network requests
let coinsCache = null;

function getCoins() {
  // If we have already cached the coins, return a resolved promise with the cached value
  if (coinsCache !== null) {
    return Promise.resolve(coinsCache);
  }

  // Otherwise, make the API call and cache the result for future use
  return fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      coinsCache = data;
      return coinsCache;
    });
}

function fetchPrice(symbol) {
  return getCoins().then(coins => {
    const coinData = coins[symbol.toUpperCase()];
    if (coinData) {
      const lastPriceUsd = coinData.last_price_usd;
      return lastPriceUsd;
    } else {
      throw new Error(`No data found for symbol ${symbol}`);
    }
  });
}

function convertAmount(amount, symbol1, symbol2) {
  return Promise.all([
    fetchPrice(symbol1),
    fetchPrice(symbol2)
  ]).then(([price1, price2]) => {
    const convertedAmount = (amount / price1) * price2;
    return convertedAmount;
  });
}

function displayResult(result) {
  const resultElement = document.getElementById("result");
  resultElement.textContent = `You would get ${convertedAmount.toFixed(2)} ${document.getElementById("symbol2").value.toUpperCase()}`;
}


function handleSubmit(event) {
  event.preventDefault();

  const amount = parseFloat(document.getElementById("amount").value);
  const symbol1 = document.getElementById("symbol1").value.toUpperCase();
  const symbol2 = document.getElementById("symbol2").value.toUpperCase();

  convertAmount(amount, symbol1, symbol2)
    .then(displayResult)
    .catch(error => {
      console.error(error);
      alert("An error occurred while converting the amount. Please try again.");
    });
}

document.getElementById("converter-form").addEventListener("submit", handleSubmit);
