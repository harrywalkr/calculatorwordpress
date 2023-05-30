const axios = require('axios');
const open = require('open');

const getTokenImage = async (symbol) => {
  try {
    const response = await axios.get(`https://coincodex.com/api/coincodex/get_coin/${symbol}`);
    const imageId = response.data.image_id;

    const imageUrl = `https://imagedelivery.net/4-5JC1r3VHAXpnrwWHBHRQ/${imageId}/coin64`;
    open(imageUrl); // Opens the image URL in the default browser
  } catch (error) {
    console.error('Error:', error.message);
  }
};

// Usage: Pass the symbol of the token (e.g., 'btc') as an argument
getTokenImage('btc');
