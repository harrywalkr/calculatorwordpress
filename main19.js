const axios = require('axios');
const fs = require('fs');

const imageId = 'b9469e27-476b-4fc8-0d5e-9a9e51581400';
const coverImageId = '62feb7ac-d229-460e-7f65-a8488431a800';

// Function to download the image
const downloadImage = async (imageId, imageUrl) => {
  const response = await axios.get(imageUrl, { responseType: 'stream' });
  response.data.pipe(fs.createWriteStream(`${imageId}.png`));
};

// Fetch the images
downloadImage(imageId, `https://images.coincodex.com/${imageId}.png`);
downloadImage(coverImageId, `https://images.coincodex.com/${coverImageId}.png`);

// Open the images (assuming you have a default image viewer set up)
const openImage = (imageId) => {
  const imagePath = `${imageId}.png`;
  const { exec } = require('child_process');

  // Modify this command based on your operating system and image viewer
  let command = '';
  if (process.platform === 'win32') {
    command = `start ${imagePath}`;
  } else if (process.platform === 'darwin') {
    command = `open ${imagePath}`;
  } else {
    command = `xdg-open ${imagePath}`;
  }

  exec(command, (error) => {
    if (error) {
      console.error(`Error opening image: ${error}`);
    }
  });
};

// Open the images once they are downloaded
openImage(imageId);
openImage(coverImageId);

