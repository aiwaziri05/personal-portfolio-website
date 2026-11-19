const sharp = require('sharp');
const fs = require('fs');

const inputPath = 'C:/Users/Idiwa/.gemini/antigravity/brain/69bb4b43-dd98-4782-819d-ba53b8e63bae/.user_uploaded/media_1795102108849_92b769cf.jpg';

async function scan() {
  const { data, info } = await sharp(inputPath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;

  // Let's print average brightness per 50 rows
  console.log('Row scan (y, avgR, avgG, avgB):');
  for (let y = 0; y < height; y += 40) {
    let r = 0, g = 0, b = 0, count = 0;
    for (let x = 0; x < width; x += 10) {
      const idx = (y * width + x) * 3;
      r += data[idx];
      g += data[idx + 1];
      b += data[idx + 2];
      count++;
    }
    console.log(`y=${y}: R=${Math.round(r/count)} G=${Math.round(g/count)} B=${Math.round(b/count)}`);
  }
}

scan().catch(console.error);

