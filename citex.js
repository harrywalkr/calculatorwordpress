window.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://cors-anywhere.herokuapp.com/https://coincodex.com/api/coincodex/get_coin/';
    const currencyFromSelect = document.getElementById('currencyFrom');
    const currencyToSelect = document.getElementById('currencyTo');
    const amountInput = document.getElementById('amount');
    const convertBtn = document.getElementById('convertBtn');
    const resultDiv = document.getElementById('result');
  
    // Handle the convert button click event
    convertBtn.addEventListener('click', () => {
      const currencyFrom = currencyFromSelect.value;
      const currencyTo = currencyToSelect.value;
      const amount = amountInput.value;
  
      // Fetch the CoinCodex API to get the conversion rates for both currencies
      Promise.all([
        fetch(`${apiUrl}/${currencyFrom}`).then(response => response.json()),
        fetch(`${apiUrl}/${currencyTo}`).then(response => response.json())
      ])
        .then(([dataFrom, dataTo]) => {
          const conversionRateFrom = dataFrom.price;
          const conversionRateTo = dataTo.price;
          const result = (amount * conversionRateTo) / conversionRateFrom;
          resultDiv.textContent = `Converted Amount: ${result.toFixed(2)} ${currencyTo.toUpperCase()}`;
        })
        .catch(error => {
          console.error('Error:', error);
        });
    });
  });
  