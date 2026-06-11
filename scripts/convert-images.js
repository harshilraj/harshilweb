const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const publicDir = path.join(__dirname, '../public');

async function run() {
  console.log('Starting image conversion and optimization...');

  // 1. Convert harshil.jpg to WebP
  const sourceJpg = path.join(publicDir, 'harshil.jpg');
  const destWebp = path.join(publicDir, 'harshil.webp');
  
  if (fs.existsSync(sourceJpg)) {
    console.log(`Converting ${sourceJpg} to WebP...`);
    await sharp(sourceJpg)
      .webp({ quality: 80 })
      .toFile(destWebp);
    
    const origSize = fs.statSync(sourceJpg).size;
    const webpSize = fs.statSync(destWebp).size;
    console.log(`Successfully converted. Original: ${(origSize / 1024 / 1024).toFixed(2)}MB, WebP: ${(webpSize / 1024).toFixed(2)}KB`);
  } else {
    console.warn('harshil.jpg not found in public/');
  }

  // 2. Generate optimized PNGs from favicon.svg
  const sourceSvg = path.join(publicDir, 'favicon.svg');
  if (fs.existsSync(sourceSvg)) {
    console.log(`Generating optimized icon assets from ${sourceSvg}...`);

    const targets = [
      { name: 'favicon-16x16.png', size: 16 },
      { name: 'favicon-32x32.png', size: 32 },
      { name: 'apple-touch-icon.png', size: 180 },
      { name: 'android-chrome-192x192.png', size: 192 },
      { name: 'android-chrome-512x512.png', size: 512 },
      { name: 'favicon.png', size: 32 },
      { name: 'favicon.ico', size: 32 } // fallback ico
    ];

    for (const target of targets) {
      const destPath = path.join(publicDir, target.name);
      await sharp(sourceSvg)
        .resize(target.size, target.size)
        .png()
        .toFile(destPath);
      console.log(`Generated ${target.name} (${target.size}x${target.size})`);
    }
  } else {
    console.warn('favicon.svg not found in public/');
  }

  console.log('All image operations completed successfully.');
}

run().catch(err => {
  console.error('Error during image processing:', err);
  process.exit(1);
});
