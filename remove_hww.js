const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let updated = 0;

files.forEach(file => {
  const filePath = path.join(dir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // We want to delete any list item containing 'how-we-work.html' accurately.
  // The regex matches <li><a href="how-we-work.html"...>How We Work</a></li> 
  // with possible whitespace before it.
  const regex = /\s*<li><a href="how-we-work\.html"[^>]*>How We Work<\/a><\/li>/gi;
  
  // also check if "How We work" or something similar exists to be safe
  const fallbackRegex = /\s*<li><a href="how-we-work\.html">How we work<\/a><\/li>/gi;

  if (regex.test(html) || fallbackRegex.test(html)) {
    html = html.replace(regex, '');
    html = html.replace(fallbackRegex, '');
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✅ Removed 'How We Work' from: ${file}`);
    updated++;
  }
});

console.log(`\n✅ Done. ${updated} file(s) updated.`);
