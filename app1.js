const readline = require("readline");
const https = require("https");

const url = "https://coincodex.com/api/coincodex/get_coin/";

// Create a readline interface for getting user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Prompt the user for the amount to convert
rl.question("Enter amount: ", (amount) => {
  // Prompt the user for the first symbol
  rl.question("Enter recieved token symbol: ", (symbol1) => {
    // Prompt the user for the second symbol
    rl.question("Enter paying token symbol: ", (symbol2) => {
      // Make HTTP requests to get the last prices of both symbols
      Promise.all([
        fetchPrice(symbol1),
        fetchPrice(symbol2)
      ]).then(([price1, price2]) => {
        // Calculate how much of the second symbol the user would get based on the last price
        const convertedAmount = (amount / price1) * price2;
        console.log(`You would get ${convertedAmount} ${symbol2}`);
        rl.close();
      }).catch((error) => {
        console.error("An error occurred:", error);
        rl.close();
      });
    });
  });
});

function fetchPrice(symbol) {
  return new Promise((resolve, reject) => {
    https.get(`${url}${symbol}`, (response) => {
      let data = "";

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        try {
          const coinData = JSON.parse(data);
          const lastPriceUsd = coinData.last_price_usd;
          resolve(lastPriceUsd);
        } catch (error) {
          reject(error);
        }
      });
    }).on("error", (error) => {
      reject(error);
    });
  });
}
