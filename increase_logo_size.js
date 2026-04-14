const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let updated = 0;

files.forEach(file => {
  const filePath = path.join(dir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // Regex to find the logo img tag and update its style height
  // Supports both 52px (subpages) and 70px (previously on index)
  const regex = /style="height:\s*\d+px;\s*width:\s*auto;\s*display:\s*block"/g;
  const logoMatch = html.match(regex);

  if (logoMatch) {
    // Update both the height to 72px and the container padding for better presence
    html = html.replace(regex, 'style="height: 82px; width: auto; display: block"');

    // Also optional: match the padding in index.html logo if it's there
    // <img ... style="..." /> looks like what we have.

    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✅ Updated logo size to 72px in: ${file}`);
    updated++;
  }
});

console.log(`\n✅ Done. ${updated} file(s) updated.`);
