const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let updated = 0;

files.forEach(file => {
  const filePath = path.join(dir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // Replace the <p> Important label with a list item <li><strong>IMPORTANT</strong></li>
  const pattern = /<p class="cta-disclaimer-label">\s*Important\s*<\/p>\s*<ul class="footer-disclaimer-list">/i;

  if (pattern.test(html)) {
    html = html.replace(pattern, `<ul class="footer-disclaimer-list">\n              <li style="list-style: none; font-weight: bold; font-size: 11px; letter-spacing: 1.5px; margin-left: -18px; margin-bottom: 8px;">IMPORTANT</li>`);
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✅ Updated: ${file}`);
    updated++;
  }
});

console.log(`\n✅ Done. ${updated} file(s) updated.`);
