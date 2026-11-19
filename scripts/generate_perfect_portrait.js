const sharp = require('sharp');
const fs = require('fs');

const inputPath = 'C:/Users/Idiwa/.gemini/antigravity/brain/69bb4b43-dd98-4782-819d-ba53b8e63bae/.user_uploaded/media_1795102108849_92b769cf.jpg';

async function generatePerfectPortrait() {
  const W = 380;
  const H = 410;
  const crop = { left: 40, top: 498, width: 380, height: 410 };

  const { data: rgb } = await sharp(inputPath)
    .extract(crop)
    .resize(W, H, { fit: 'fill' })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const mask = new Float32Array(W * H);
  const tone = new Float32Array(W * H);
  const isGlint = new Uint8Array(W * H);
  const isCap = new Uint8Array(W * H);

  // 1. Natural anatomical envelope
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const idx = y * W + x;
      const r = rgb[idx * 3];
      const g = rgb[idx * 3 + 1];
      const b = rgb[idx * 3 + 2];

      const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

      let inside = false;

      // A. Cap crown
      if (y >= 10 && y <= 62 && x >= 135 && x <= 236) {
        const cx = 188, cy = 60, rx = 52, ry = 48;
        if (((x - cx)**2) / (rx**2) + ((y - cy)**2) / (ry**2) <= 1.0) {
          inside = true;
        }
      }
      // B. Cap visor
      if (y >= 60 && y <= 95 && x >= 130 && x <= 274) {
        const maxVisorX = y < 75 ? 235 + (y - 60) * 2.5 : 274;
        if (x <= maxVisorX) inside = true;
      }
      // C. Upper Face & Ear (y=90 to 125)
      if (y > 90 && y <= 125 && x >= 127 && x <= 258) {
        inside = true;
      }
      // D. Mid Face & Jawline (y=125 to 155)
      if (y > 125 && y <= 155) {
        const minX = 127 + (y - 125) * 0.7; // 127 -> 148
        if (x >= minX && x <= 256) inside = true;
      }
      // E. Lower Jaw & Chin (y=155 to 175)
      if (y > 155 && y <= 175) {
        const minX = 148 + (y - 155) * 0.8; // 148 -> 164
        if (x >= minX && x <= 248) inside = true;
      }
      // F. Neck (y=175 to 195)
      if (y > 175 && y <= 195) {
        if (x >= 165 && x <= 240) inside = true;
      }
      // G. Trapezius & Shoulders (y > 195 to 385)
      // Smooth continuous slope on both sides
      if (y > 195 && y <= 385) {
        // Left shoulder: slopes from (165, 195) -> (120, 215) -> (50, 260) -> (12, 350)
        let minX;
        if (y <= 215) {
          minX = 165 - ((y - 195) / 20) * 45; // 165 -> 120
        } else if (y <= 260) {
          minX = 120 - ((y - 215) / 45) * 70; // 120 -> 50
        } else {
          minX = 50 - ((y - 260) / 125) * 38; // 50 -> 12
        }

        // Right shoulder: slopes from (240, 195) -> (285, 215) -> (350, 260) -> (365, 300) -> (335, 350)
        let maxX;
        if (y <= 215) {
          maxX = 240 + ((y - 195) / 20) * 45; // 240 -> 285
        } else if (y <= 260) {
          maxX = 285 + ((y - 215) / 45) * 65; // 285 -> 350
        } else if (y <= 300) {
          maxX = 350 + ((y - 260) / 40) * 15; // 350 -> 365
        } else {
          maxX = 365 - ((y - 300) / 85) * 30; // 365 -> 335
        }

        if (x >= minX && x <= maxX) {
          inside = true;
        }
      }

      // Check whiteboard background
      const isWhiteboard = (r > 185 && g > 210 && b > 220) || (lum > 0.88);

      if (inside && !isWhiteboard) {
        let alpha = 1.0;
        if (y > 335) {
          alpha = Math.max(0, 1 - (y - 335) / 48);
        }
        mask[idx] = alpha;
      } else {
        mask[idx] = 0;
      }

      // Detect cap
      if (mask[idx] > 0 && y <= 95 && (b > r + 5 && r < 110 && g < 130 && lum < 0.48)) {
        isCap[idx] = 1;
      }

      // Smooth tonal mapping:
      let t = lum;
      if (y >= 85 && y <= 180 && mask[idx] > 0) {
        // Face region: smooth S-curve for rich, photographic depth
        if (t < 0.22) {
          t = t * 0.75; // deep shadows: pupils, nostrils, lip crevice
        } else if (t < 0.48) {
          t = 0.16 + (t - 0.22) * 1.15; // mid-shadows
        } else {
          t = 0.46 + (t - 0.48) * 1.05; // smooth highlights
        }
      }

      // Cap tones
      if (isCap[idx]) {
        // Orange logo on cap
        if (r > 130 && r > b + 30) {
          t = 0.90;
          isGlint[idx] = 1;
        } else {
          t = Math.max(0.20, t * 1.35);
        }
      }

      // Shirt tones: realistic cloth shading
      if (y > 195 && mask[idx] > 0) {
        // Orange logo on chest (Spider Tech)
        if (r > 140 && r > b + 40 && y >= 240 && y <= 270 && x >= 240 && x <= 280) {
          t = 0.90;
          isGlint[idx] = 1;
        } else {
          t = Math.min(0.85, Math.max(0.18, t * 0.92));
        }
      }

      // Specular crests: nose ridge, tip of nose, eye glint
      if (y >= 90 && y <= 175 && mask[idx] > 0 && t > 0.75) {
        isGlint[idx] = 1;
      }

      tone[idx] = Math.min(1.0, Math.max(0.05, t)) * mask[idx];
    }
  }

  // 2. Sobel Edge Detection for anatomical facial contours
  const edges = new Float32Array(W * H);
  for (let y = 1; y < H - 1; y++) {
    for (let x = 1; x < W - 1; x++) {
      const idx = y * W + x;
      if (mask[idx] < 0.25) continue;

      const gx =
        -tone[(y - 1) * W + (x - 1)] + tone[(y - 1) * W + (x + 1)] +
        -2 * tone[y * W + (x - 1)]   + 2 * tone[y * W + (x + 1)] +
        -tone[(y + 1) * W + (x - 1)] + tone[(y + 1) * W + (x + 1)];

      const gy =
        -tone[(y - 1) * W + (x - 1)] - 2 * tone[(y - 1) * W + x] - tone[(y - 1) * W + (x + 1)] +
        tone[(y + 1) * W + (x - 1)]  + 2 * tone[(y + 1) * W + x]  + tone[(y + 1) * W + (x + 1)];

      edges[idx] = Math.sqrt(gx * gx + gy * gy);
    }
  }

  // 3. Stipple Points Distribution
  const points = [];
  const pseudoRandom = (x, y, s) => {
    const v = Math.sin(x * 12.9898 + y * 78.233 + s) * 43758.5453;
    return v - Math.floor(v);
  };

  // A. Structural feature contour points (eyes, pupils, eyelids, nose profile, mouth, jaw, cap visor)
  for (let y = 10; y < H - 10; y += 2) {
    for (let x = 10; x < W - 10; x += 2) {
      const idx = y * W + x;
      if (mask[idx] < 0.25) continue;

      const edge = edges[idx];
      const isFace = y >= 80 && y <= 185 && x >= 125 && x <= 265;
      const thresh = isFace ? 0.25 : 0.40;

      if (edge > thresh) {
        const jx = (pseudoRandom(x, y, 11) - 0.5) * 0.7;
        const jy = (pseudoRandom(x, y, 22) - 0.5) * 0.7;
        const t = tone[idx];

        points.push({
          x: Number(((x + jx) / W).toFixed(3)),
          y: Number(((y + jy) / H).toFixed(3)),
          val: Number(Math.min(1, Math.max(0.18, t * 1.05)).toFixed(2)),
          isGlint: isGlint[idx] === 1,
        });
      }
    }
  }

  // B. Body & Shading Stipple Points
  for (let y = 10; y < H - 10; y++) {
    const isFaceRow = y >= 80 && y <= 195;
    const stepY = isFaceRow ? 2 : 3;
    if (y % stepY !== 0) continue;

    for (let x = 10; x < W - 10; x++) {
      const isFace = isFaceRow && x >= 125 && x <= 260;
      const stepX = isFace ? 2 : 3;
      if (x % stepX !== 0) continue;

      const idx = y * W + x;
      const m = mask[idx];
      if (m < 0.15) continue;

      const t = tone[idx];
      const rnd = pseudoRandom(x, y, 33);

      let prob = isFace ? (t * 0.78 + 0.15) : (t * 0.62 + 0.11);
      prob *= m;

      if (rnd < prob) {
        const jx = (pseudoRandom(x, y, 44) - 0.5) * (stepX * 0.55);
        const jy = (pseudoRandom(x, y, 55) - 0.5) * (stepY * 0.55);
        const val = Math.min(1, Math.max(0.12, t));

        points.push({
          x: Number(((x + jx) / W).toFixed(3)),
          y: Number(((y + jy) / H).toFixed(3)),
          val: Number(val.toFixed(2)),
          isGlint: isGlint[idx] === 1,
        });
      }
    }
  }

  console.log(`Total generated points: ${points.length}`);
  fs.writeFileSync('public/portrait_points.json', JSON.stringify(points));

  // Render SVG fallback with refined cohesive color grading
  // Dots use amber palette:
  // - Glint crests: #fff2db
  // - Bright highlights: #f3be7a
  // - Midtones: #e8a95c
  // - Shadows: #c97f32
  const size = 500;
  const svgCircles = points.map(p => {
    const cx = (p.x * size).toFixed(1);
    const cy = (p.y * size).toFixed(1);
    const r = (p.val * 1.9 + 0.7).toFixed(1);
    let fill = '#e8a95c';
    if (p.isGlint) {
      fill = '#fff2db';
    } else if (p.val > 0.65) {
      fill = '#f4c384';
    } else if (p.val < 0.25) {
      fill = '#c97f32';
    }
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

generatePerfectPortrait().catch(console.error);
