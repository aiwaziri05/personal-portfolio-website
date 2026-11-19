const sharp = require('sharp');

const inputPath = 'C:/Users/Idiwa/.gemini/antigravity/brain/69bb4b43-dd98-4782-819d-ba53b8e63bae/.user_uploaded/media_1795102108849_92b769cf.jpg';

async function scanShoulders() {
  const { data, info } = await sharp(inputPath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;

  console.log('Column scan for shoulders (y=720..800):');
  for (let x = 0; x < width; x += 30) {
    let r = 0, g = 0, b = 0, count = 0;
    for (let y = 720; y <= 800; y += 10) {
      const idx = (y * width + x) * 3;
      r += data[idx];
      g += data[idx + 1];
      b += data[idx + 2];
      count++;
    }
    console.log(`x=${x}: R=${Math.round(r/count)} G=${Math.round(g/count)} B=${Math.round(b/count)}`);
  }
}

scanShoulders().catch(console.error);

