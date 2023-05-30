const form = document.getElementById('conversion-form');
const amountInput = document.getElementById('amount');
const fromSymbolInput = document.getElementById('from-symbol');
const toSymbolInput = document.getElementById('to-symbol');
const resultContainer = document.getElementById('result');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const amount = Number(amountInput.value);
  const fromSymbol = fromSymbolInput.value.toUpperCase();
  const toSymbol = toSymbolInput.value.toUpperCase();

  const fromPrice = await getPrice(fromSymbol);
  const toPrice = await getPrice(toSymbol);

  if (!fromPrice || !toPrice) {
    resultContainer.textContent = 'Invalid symbol(s)';
    return;
  }

  const conversionRate = toPrice / fromPrice;
  const convertedAmount = conversionRate * amount;

  resultContainer.textContent = `You would get ${convertedAmount.toFixed(2)} ${toSymbol}`;
});

async function getPrice(symbol) {
  const response = await fetch(`/price?symbol=${symbol}`);
  const data = await response.json();
  return data.last_price_usd;
}
