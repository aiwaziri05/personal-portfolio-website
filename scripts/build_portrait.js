const sharp = require('sharp');
const fs = require('fs');

const inputPath = 'C:/Users/Idiwa/.gemini/antigravity/brain/69bb4b43-dd98-4782-819d-ba53b8e63bae/.user_uploaded/media_1795102108849_92b769cf.jpg';

async function generateSharpenedPortrait() {
  const W = 380;
  const H = 410;
  const crop = { left: 40, top: 500, width: 380, height: 410 };

  const { data, info } = await sharp(inputPath)
    .extract(crop)
    .resize(W, H, { fit: 'fill' })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // 1. Create a clean segmentation mask for Abdullahi
  const mask = new Float32Array(W * H);
  const lum = new Float32Array(W * H);
  const isCap = new Uint8Array(W * H);
  const isLogo = new Uint8Array(W * H);

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const idx = y * W + x;
      const r = data[idx * 3];
      const g = data[idx * 3 + 1];
      const b = data[idx * 3 + 2];

      const l = 0.299 * r + 0.587 * g + 0.114 * b;
      lum[idx] = l;

      // Inside person envelope
      let inside = false;
      // Cap crown
      if (y >= 10 && y <= 85 && x >= 135 && x <= 255) {
        // Rounded cap crown top
        const cx = 195, cy = 60, rx = 58, ry = 50;
        if (((x - cx)**2) / (rx**2) + ((y - cy)**2) / (ry**2) <= 1.05) {
          inside = true;
        }
      }
      // Cap visor
      if (y >= 60 && y <= 95 && x >= 195 && x <= 278) {
        inside = true;
      }
      // Head, face, jaw, ear
      if (y > 85 && y <= 180 && x >= 125 && x <= 255) {
        inside = true;
      }
      // Neck
      if (y > 180 && y <= 215 && x >= 150 && x <= 245) {
        inside = true;
      }
      // Shoulders & Chest
      if (y > 215 && y <= 385) {
        const t = (y - 215) / (385 - 215);
        const minX = 150 - t * 140; // 150 -> 10
        const maxX = 245 + t * 125; // 245 -> 370
        if (x >= minX && x <= maxX) {
          // Exclude cap sitting on desk at bottom-right
          if (!(y > 310 && x > 280)) {
            inside = true;
          }
        }
      }

      // Check for bright whiteboard (r > 190 && g > 218 && b > 230)
      const isWhiteboard = (r > 188 && g > 215 && b > 225) || (l > 225);
      
      if (inside && !isWhiteboard) {
        // Bottom fade out (vignette)
        let fade = 1.0;
        if (y > 340) {
          fade = Math.max(0, 1 - (y - 340) / 45);
        }
        mask[idx] = fade;
      } else {
        mask[idx] = 0;
      }

      // Detect dark cap
      if (mask[idx] > 0 && y <= 100 && (b > r + 8 && r < 100 && g < 125 && l < 115)) {
        isCap[idx] = 1;
      }

      // Detect orange logos (on cap and chest)
      if (mask[idx] > 0 && r > 140 && g > 70 && b < 80 && (r - b > 60)) {
        isLogo[idx] = 1;
      }
    }
  }

  // 2. Compute local gradient (Sobel edge magnitude) for sharp facial contours
  const edges = new Float32Array(W * H);
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

      edges[idx] = Math.sqrt(gx * gx + gy * gy);
    }
  }

  // Save diagnostic preview
  const preview = Buffer.alloc(W * H * 3);
  for (let i = 0; i < W * H; i++) {
    if (mask[i] > 0) {
      preview[i * 3] = data[i * 3] * mask[i];
      preview[i * 3 + 1] = data[i * 3 + 1] * mask[i];
      preview[i * 3 + 2] = data[i * 3 + 2] * mask[i];
    }
  }
  await sharp(preview, { raw: { width: W, height: H, channels: 3 } })
    .png()
    .toFile('scripts/segmented_preview.png');
  console.log('Saved scripts/segmented_preview.png');
}

generateSharpenedPortrait().catch(console.error);

