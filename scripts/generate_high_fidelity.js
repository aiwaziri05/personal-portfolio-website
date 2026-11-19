const sharp = require('sharp');
const fs = require('fs');

const inputPath = 'C:/Users/Idiwa/.gemini/antigravity/brain/69bb4b43-dd98-4782-819d-ba53b8e63bae/.user_uploaded/media_1795102108849_92b769cf.jpg';

async function generateHighFidelityPoints() {
  // Crop around head, cap, face and shoulders
  const crop = {
    left: 45,
    top: 480,
    width: 390,
    height: 420
  };

  const sampleW = 100;
  const sampleH = 110;

  // 1. Get raw cropped & resized image
  const { data, info } = await sharp(inputPath)
    .extract(crop)
    .resize(sampleW, sampleH, { fit: 'fill' })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const points = [];

  for (let y = 0; y < sampleH; y++) {
    for (let x = 0; x < sampleW; x++) {
      const idx = (y * sampleW + x) * 3;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      // Segment person from whiteboard background:
      // Whiteboard is pale cyan/white (r > 175 && g > 200 && b > 215)
      // Table is at bottom right (x > 65 && y > 88 with high brightness)
      const isWhiteboard = (r > 175 && g > 200 && b > 215) || (r > 195 && g > 215);
      const isTable = (y > 96 && r > 160 && g > 210);

      if (!isWhiteboard && !isTable) {
        // Luminance
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;
        
        // Intensity mapping
        // Face skin highlights, cap details, shirt textures
        const normLum = Math.min(1, Math.max(0, (lum - 35) / 155));

        // Stipple probability / density:
        // Brighter areas get denser dots or larger dots
        // Include points with probability proportional to intensity
        const threshold = (Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1;
        const absThresh = Math.abs(threshold);

        // Cap is dark navy (r ~ 40..80, g ~ 60..100, b ~ 90..140)
        const isCap = (b > r + 15 && lum < 120);

        if (normLum > 0.15 || isCap) {
          const val = isCap ? 0.35 : normLum;
          // Add slight jitter for organic stipple feel
          const jitterX = (absThresh - 0.5) * 0.006;
          const jitterY = (((absThresh * 10) % 1) - 0.5) * 0.006;

          points.push({
            x: Number((x / sampleW + jitterX).toFixed(3)),
            y: Number((y / sampleH + jitterY).toFixed(3)),
            val: Number(val.toFixed(2)),
            isHighlight: normLum > 0.65,
          });
        }
      }
    }
  }

  console.log(`Generated ${points.length} high-fidelity stipple points.`);
  fs.writeFileSync('public/portrait_points.json', JSON.stringify(points));
  
  // Also create a pre-rendered static SVG fallback for instant paint
  const size = 500;
  const svgCircles = points.map(p => {
    const cx = (p.x * size).toFixed(1);
    const cy = (p.y * size).toFixed(1);
    const r = (p.val * 2.2 + 0.7).toFixed(1);
    const fill = p.isHighlight ? '#fff2db' : '#e8a95c';
    const opacity = (p.val * 0.8 + 0.2).toFixed(2);
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" opacity="${opacity}" />`;
  }).join('');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
    <rect width="${size}" height="${size}" fill="#09090b" />
    ${svgCircles}
  </svg>`;

  fs.writeFileSync('public/portrait_dotted.svg', svg);
  console.log('Saved high-fidelity public/portrait_points.json and public/portrait_dotted.svg');
}

generateHighFidelityPoints().catch(console.error);

