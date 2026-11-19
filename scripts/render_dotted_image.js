const sharp = require('sharp');
const fs = require('fs');

async function renderImage() {
  const points = JSON.parse(fs.readFileSync('public/portrait_points.json', 'utf8'));

  const size = 500;
  // Create an SVG with black background and all dots
  // Dots colored with warm amber #e8a95c and white highlights
  const svgCircles = points.map(p => {
    const cx = p.x * size;
    const cy = p.y * size;
    const r = (p.val * 2.2 + 0.6).toFixed(1);
    
    // Color mapping: warm amber #e8a95c with brightness variations
    let fill = '#e8a95c';
    let opacity = (p.val * 0.85 + 0.15).toFixed(2);
    if (p.val > 0.75) {
      fill = '#fff3db'; // Bright warm highlight
      opacity = '1';
    } else if (p.val < 0.35) {
      fill = '#d4974f';
      opacity = (p.val * 0.9 + 0.2).toFixed(2);
    }

    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" opacity="${opacity}" />`;
  }).join('\n');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <rect width="${size}" height="${size}" fill="#09090b" />
    ${svgCircles}
  </svg>`;

  fs.writeFileSync('public/portrait_dotted.svg', svg);
  await sharp(Buffer.from(svg)).png().toFile('public/portrait_dotted.png');
  console.log('Saved public/portrait_dotted.svg and public/portrait_dotted.png');
}

renderImage().catch(console.error);

