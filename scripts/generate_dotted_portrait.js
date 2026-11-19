const sharp = require('sharp');
const fs = require('fs');

const inputPath = 'C:/Users/Idiwa/.gemini/antigravity/brain/69bb4b43-dd98-4782-819d-ba53b8e63bae/.user_uploaded/media_1795102108849_92b769cf.jpg';

async function generateDottedPortrait() {
  // Crop head & shoulders
  // Face & cap: x: 60..420, y: 500..880
  const crop = {
    left: 45,
    top: 500,
    width: 380,
    height: 380
  };

  // Resize to a sampling grid, e.g., 90x90
  const sampleWidth = 90;
  const sampleHeight = 90;

  const { data, info } = await sharp(inputPath)
    .extract(crop)
    .resize(sampleWidth, sampleHeight, { fit: 'fill' })
    .raw()
    .toBuffer({ resolveWithObject: true });

  console.log('Sampled info:', info);

  // Background is light blue/whiteboard (high R, G, B, usually R>180, G>210, B>220).
  // Also table at bottom right has white surface.
  // Let's analyze pixels
  const points = [];

  for (let y = 0; y < sampleHeight; y++) {
    for (let x = 0; x < sampleWidth; x++) {
      const idx = (y * sampleWidth + x) * 3;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      // Detect background:
      // Background whiteboard is pale cyan/white: high G and B, high R
      const isWhiteboard = (r > 175 && g > 200 && b > 215) || (r > 190 && g > 210);
      
      // If it's the person:
      if (!isWhiteboard) {
        // Calculate grayscale luminance:
        // Person's skin is darker, shirt is mid-tone, cap is dark navy with orange 'Spider' logo
        // To make it look like Image 1:
        // In Image 1, brighter parts of the person have more dots / larger dots.
        // Let's compute lighting on the subject:
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;
        
        // Normalize luminance from 0 to 1
        // Skin and shirt highlights will have higher intensity
        // Invert if needed or contrast boost
        const intensity = Math.min(1, Math.max(0, (lum - 30) / 160));

        if (intensity > 0.12) {
          // Normalize x, y to 0..1
          points.push({
            x: Number((x / sampleWidth).toFixed(3)),
            y: Number((y / sampleHeight).toFixed(3)),
            val: Number(intensity.toFixed(2)),
            // Tag if it has warmer orange/red tones (like cap logo / skin highlight)
            isWarm: (r > g && r > 110)
          });
        }
      }
    }
  }

  console.log(`Generated ${points.length} points.`);
  fs.writeFileSync('public/portrait_points.json', JSON.stringify(points));
  console.log('Saved public/portrait_points.json');
}

generateDottedPortrait().catch(console.error);

