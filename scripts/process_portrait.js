const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = 'C:/Users/Idiwa/.gemini/antigravity/brain/69bb4b43-dd98-4782-819d-ba53b8e63bae/.user_uploaded/media_1795102108849_92b769cf.jpg';

async function analyze() {
  const meta = await sharp(inputPath).metadata();
  console.log('Original dimensions:', meta.width, 'x', meta.height);

  // In the image (682x1024):
  // Let's crop to head, shoulders, and upper torso:
  // Top: ~480 to ~950, Left: ~50 to ~650
  // Let's create a cropped region around Abdullahi (head & upper body)
  // Let's inspect coordinates
  const cropRegion = {
    left: 40,
    top: 480,
    width: 480,
    height: 480
  };

  await sharp(inputPath)
    .extract(cropRegion)
    .toFile('public/portrait_raw_crop.jpg');

  console.log('Saved public/portrait_raw_crop.jpg');
}

analyze().catch(console.error);

