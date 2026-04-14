const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
let count = 0;

files.forEach(f => {
  const filePath = path.join(dir, f);
  let c = fs.readFileSync(filePath, 'utf8');

  // Add overlay div after the img tag inside page-hero-img-wrap, if not already present
  if (c.includes('page-hero-img-wrap') && !c.includes('page-hero-img-overlay')) {
    // Match the closing </div> of page-hero-img-wrap (after the img tag)
    const updated = c.replace(
      /(<div class="page-hero-img-wrap">[\s\S]*?<img[^>]*\/>)\s*\n(\s*<\/div>)/,
      '$1\n        <div class="page-hero-img-overlay"></div>\n$2'
    );
    if (updated !== c) {
      fs.writeFileSync(filePath, updated, 'utf8');
      console.log(`✅ Updated: ${f}`);
      count++;
    } else {
      console.log(`⚠️  Pattern not matched: ${f}`);
    }
  } else if (c.includes('page-hero-img-overlay')) {
    console.log(`⏭️  Already has overlay: ${f}`);
  } else {
    console.log(`➖ No page-hero: ${f}`);
  }
});

console.log(`\nDone. ${count} file(s) updated.`);
