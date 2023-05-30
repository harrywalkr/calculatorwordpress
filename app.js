const express = require("express");
const https = require("https");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const url = "https://coincodex.com/api/coincodex/get_coin/";

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  const { amount, symbol1, symbol2 } = req.body;

  Promise.all([
    fetchPrice(symbol1),
    fetchPrice(symbol2)
  ]).then(([price1, price2]) => {
    const convertedAmount = (amount / price1) * price2;
    res.render("result", { amount, symbol1, symbol2, convertedAmount });
  }).catch((error) => {
    console.error("An error occurred:", error);
    res.render("error");
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

app.listen(3005, () => {
  console.log("Server started on port 3005");
});
