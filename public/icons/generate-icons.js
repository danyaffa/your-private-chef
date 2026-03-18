// Simple SVG-based icon generation
const fs = require('fs');

const svgIcon = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${size*0.15}" fill="#C8986E"/>
  <text x="50%" y="38%" text-anchor="middle" font-family="Georgia,serif" font-size="${size*0.18}" fill="#FFF8F0" font-weight="bold">YOUR</text>
  <text x="50%" y="55%" text-anchor="middle" font-family="Georgia,serif" font-size="${size*0.15}" fill="#FFF8F0">PRIVATE</text>
  <text x="50%" y="72%" text-anchor="middle" font-family="Georgia,serif" font-size="${size*0.22}" fill="#FFF8F0" font-weight="bold">CHEF</text>
  <line x1="${size*0.25}" y1="${size*0.80}" x2="${size*0.75}" y2="${size*0.80}" stroke="#FFF8F0" stroke-width="${size*0.01}"/>
</svg>`;

// Write SVG files as placeholder icons
fs.writeFileSync('/home/user/your-private-chef/public/icons/icon-192.svg', svgIcon(192));
fs.writeFileSync('/home/user/your-private-chef/public/icons/icon-512.svg', svgIcon(512));
console.log('SVG icons generated');
