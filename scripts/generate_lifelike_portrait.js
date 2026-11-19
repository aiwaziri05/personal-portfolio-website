const sharp = require('sharp');
const fs = require('fs');

const inputPath = 'C:/Users/Idiwa/.gemini/antigravity/brain/69bb4b43-dd98-4782-819d-ba53b8e63bae/.user_uploaded/media_1795102108849_92b769cf.jpg';

async function generateLifelikePortrait() {
  const W = 380;
  const H = 410;
  // Center crop tightly framing Abdullahi's head, face, and torso
  const crop = { left: 40, top: 498, width: 380, height: 410 };

  // Get raw RGB
  const { data: rgbData } = await sharp(inputPath)
    .extract(crop)
    .resize(W, H, { fit: 'fill' })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Apply CLAHE / local contrast enhancement to face area
  // Let's create an enhanced luminance buffer
  const lum = new Float32Array(W * H);
  const mask = new Float32Array(W * H);
  const isFaceRegion = new Uint8Array(W * H);

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const idx = y * W + x;
      const r = rgbData[idx * 3];
      const g = rgbData[idx * 3 + 1];
      const b = rgbData[idx * 3 + 2];

      // Base luminance
      let l = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

      // Segmentation mask
      let inside = false;
      // 1. Cap crown
      if (y >= 10 && y <= 90 && x >= 135 && x <= 265) {
        const cx = 195, cy = 60, rx = 60, ry = 52;
        if (((x - cx)**2) / (rx**2) + ((y - cy)**2) / (ry**2) <= 1.05) {
          inside = true;
        }
      }
      // 2. Visor
      if (y >= 60 && y <= 98 && x >= 195 && x <= 282) {
        inside = true;
      }
      // 3. Head & Face
      if (y > 85 && y <= 180 && x >= 125 && x <= 262) {
        inside = true;
        isFaceRegion[idx] = 1;
      }
      // 4. Neck
      if (y > 180 && y <= 218 && x >= 148 && x <= 250) {
        inside = true;
        isFaceRegion[idx] = 1;
      }
      // 5. Shoulders & Chest
      if (y > 218 && y <= 385) {
        const t = (y - 218) / (385 - 218);
        const minX = 148 - t * 138; // 148 -> 10
        const maxX = 250 + t * 90;  // 250 -> 340
        if (x >= minX && x <= maxX) {
          inside = true;
        }
      }

      // Filter out bright whiteboard (and doodle lines outside person envelope)
      const isWhiteboard = (r > 188 && g > 215 && b > 225) || (l > 0.88);

      if (inside && !isWhiteboard) {
        let alpha = 1.0;
        // Soft vignette at bottom
        if (y > 330) {
          alpha = Math.max(0, 1 - (y - 330) / 50);
        }
        mask[idx] = alpha;
      } else {
        mask[idx] = 0;
      }

      // Facial contrast enhancement:
      // The face is shaded under the cap visor. Boost shadow detail so eyes, nostrils, and lips stand out clearly.
      if (isFaceRegion[idx] && mask[idx] > 0) {
        // Boost facial contrast with S-curve centered around skin tone
        // Skin tone is typically l ~ 0.45..0.65
        let faceL = l;
        // Un-crush eye shadows (l < 0.35) while preserving pupil darkness
        if (faceL < 0.25) {
          faceL = faceL * 0.7; // Dark pupils and eyelashes
        } else if (faceL < 0.50) {
          // Mid-shadows: boost slightly to show facial contour
          faceL = 0.20 + (faceL - 0.25) * 1.35;
        } else {
          // Highlights: nose bridge, forehead, cheekbones
          faceL = 0.53 + (faceL - 0.50) * 1.5;
        }
        l = Math.min(1.0, Math.max(0.05, faceL));
      }

      lum[idx] = l;
    }
  }

  // Sobel Edge Detection for crisp facial contours (eyes, nose, lips, jawline, cap visor)
  const edgeMag = new Float32Array(W * H);
  for (let y = 1; y < H - 1; y++) {
    for (let x = 1; x < W - 1; x++) {
      const idx = y * W + x;
      if (mask[idx] <= 0) continue;

      const gx =
        -lum[(y - 1) * W + (x - 1)] + lum[(y - 1) * W + (x + 1)] +
        -2 * lum[y * W + (x - 1)]   + 2 * lum[y * W + (x + 1)] +
        -lum[(y + 1) * W + (x - 1)] + lum[(y + 1) * W + (x + 1)];

      const gy =
        -lum[(y - 1) * W + (x - 1)] - 2 * lum[(y - 1) * W + x] - lum[(y - 1) * W + (x + 1)] +
        lum[(y + 1) * W + (x - 1)]  + 2 * lum[(y + 1) * W + x]  + lum[(y + 1) * W + (x + 1)];

      edgeMag[idx] = Math.sqrt(gx * gx + gy * gy);
    }
  }

  // Point generation:
  // Variable density stippling
  // High density in face (step 2.5), medium density in torso (step 4.0)
  const points = [];
  const pseudoRandom = (x, y, seed) => {
    const val = Math.sin(x * 12.9898 + y * 78.233 + seed) * 43758.5453;
    return val - Math.floor(val);
  };

  // 1. Structural Edge Points (guarantees eyes, nose, lips, jawline, cap contour)
  for (let y = 10; y < H - 10; y += 2) {
    for (let x = 10; x < W - 10; x += 2) {
      const idx = y * W + x;
      if (mask[idx] < 0.2) continue;

      const edge = edgeMag[idx];
      const isFace = isFaceRegion[idx];

      // Strong edge threshold
      const thresh = isFace ? 0.28 : 0.45;
      if (edge > thresh) {
        const jx = (pseudoRandom(x, y, 1) - 0.5) * 0.8;
        const jy = (pseudoRandom(x, y, 2) - 0.5) * 0.8;
        const l = lum[idx];
        const val = Math.min(1, Math.max(0.15, l * 1.1));
        const isHighlight = isFace && l > 0.68;

        points.push({
          x: Number(((x + jx) / W).toFixed(3)),
          y: Number(((y + jy) / H).toFixed(3)),
          val: Number(val.toFixed(2)),
          isHighlight,
          isEdge: true,
        });
      }
    }
  }

  console.log(`Placed ${points.length} edge contour points.`);

  // 2. Shading Stipple Points
  for (let y = 10; y < H - 10; y++) {
    const isFaceRow = y >= 85 && y <= 218;
    const stepY = isFaceRow ? 2 : 4;
    if (y % stepY !== 0) continue;

    for (let x = 10; x < W - 10; x++) {
      const isFace = isFaceRow && x >= 125 && x <= 265;
      const stepX = isFace ? 2 : 4;
      if (x % stepX !== 0) continue;

      const idx = y * W + x;
      const m = mask[idx];
      if (m < 0.15) continue;

      const l = lum[idx];
      const rnd = pseudoRandom(x, y, 3);

      // Probability based on luminance & mask
      let prob = isFace ? (l * 0.85 + 0.12) : (l * 0.65 + 0.10);
      prob *= m;

      if (rnd < prob) {
        const jx = (pseudoRandom(x, y, 4) - 0.5) * (stepX * 0.6);
        const jy = (pseudoRandom(x, y, 5) - 0.5) * (stepY * 0.6);
        const val = Math.min(1, Math.max(0.12, l * m));
        const isHighlight = (isFace && l > 0.66) || (!isFace && l > 0.80);

        points.push({
          x: Number(((x + jx) / W).toFixed(3)),
          y: Number(((y + jy) / H).toFixed(3)),
          val: Number(val.toFixed(2)),
          isHighlight,
        });
      }
    }
  }

  console.log(`Total generated stipple points: ${points.length}`);
  fs.writeFileSync('public/portrait_points.json', JSON.stringify(points));

  // Render high-res SVG preview
  const size = 500;
  const svgCircles = points.map(p => {
    const cx = (p.x * size).toFixed(1);
    const cy = (p.y * size).toFixed(1);
    const r = (p.val * 2.0 + 0.6).toFixed(1);
    const fill = p.isHighlight ? '#fff4de' : '#e8a95c';
    const opacity = (p.val * 0.75 + 0.25).toFixed(2);
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" opacity="${opacity}" />`;
  }).join('');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
    <rect width="${size}" height="${size}" fill="#09090b" />
    ${svgCircles}
  </svg>`;

  fs.writeFileSync('public/portrait_dotted.svg', svg);
  console.log('Saved public/portrait_points.json and public/portrait_dotted.svg');
}

generateLifelikePortrait().catch(console.error);

