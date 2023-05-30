const axios = require('axios');

axios
  .get('https://coincodex.com/api/coincodex/get_coin/BTC')
  .then(response => {
    const data = response.data;
    const imageId = data.image_id;
    const coverImageId = data.cover_image_id;

    // Use the image IDs as needed to retrieve the images
    console.log(imageId);
    console.log(coverImageId);
  })
  .catch(error => {
    console.error('Error:', error);
  });
