const fs = require('fs');
const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
let count = 0;

files.forEach(f => {
  const filePath = require('path').join(dir, f);
  let c = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // 1. Remove entire disclaimer-bar div block
  const before = c;
  c = c.replace(/[ \t]*<div class="disclaimer-bar">[\s\S]*?<\/div>\s*<\/div>\s*\n?/g, '\n');
  if (c !== before) changed = true;

  // 2. Add 'Important' heading before the footer-disclaimer-list ul
  const before2 = c;
  c = c.replace(
    /(<ul class="footer-disclaimer-list">)/,
    '<p class="footer-legal-heading">Important</p>\n            $1'
  );
  if (c !== before2) changed = true;

  if (changed) {
    fs.writeFileSync(filePath, c, 'utf8');
    console.log('Updated: ' + f);
    count++;
  } else {
    console.log('No change: ' + f);
  }
});

console.log('\nDone. ' + count + ' file(s) updated.');
