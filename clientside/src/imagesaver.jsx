const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function downloadImage(imageUrl, filename) {
  const filePath = path.join(__dirname, 'public/images', filename);

  try {
    const response = await axios({
      url: imageUrl,
      responseType: 'stream',
    });

    response.data.pipe(fs.createWriteStream(filePath));

    return new Promise((resolve, reject) => {
      response.data.on('end', () => resolve(`/images/${filename}`));
      response.data.on('error', reject);
    });
  } catch (error) {
    console.error('Error downloading image:', error);
    return null;
  }
}

// Example Usage
const imageUrl = `http://info.aec.edu.in/ACET/StudentPhotos/${student.id}.jpg`;
downloadImage(imageUrl, 'student.jpg')
  .then(savedPath => console.log('Saved at:', savedPath))
  .catch(error => console.error(error));
