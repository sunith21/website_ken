const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let updated = 0;

files.forEach(file => {
  const filePath = path.join(dir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // Insert "Company" heading directly above copyright to match Regulatory and Legal headings
  if (!html.includes('>Company</p>') && html.includes('<p class="footer-copyright">')) {
    html = html.replace(
      '<p class="footer-copyright">',
      '<p class="footer-legal-heading">Company</p>\n            <p class="footer-copyright">'
    );
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✅ Updated: ${file}`);
    updated++;
  }
});

console.log(`\n✅ Done. ${updated} file(s) updated.`);
