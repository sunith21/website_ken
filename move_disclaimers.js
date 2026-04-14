const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

// Pages that have no cta-band (index uses a different hero CTA)
const skipFiles = [];

let updated = 0;
let skipped = 0;

files.forEach(file => {
  const filePath = path.join(dir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // ── Step 1: Extract the footer-disclaimer-list ──────────────────────────────
  const disclaimerMatch = html.match(/<ul class="footer-disclaimer-list">([\s\S]*?)<\/ul>/);
  if (!disclaimerMatch) {
    console.log(`⏭️  No disclaimer list found: ${file}`);
    skipped++;
    return;
  }

  const disclaimerListHTML = disclaimerMatch[0]; // the full <ul>...</ul>

  // ── Step 2: Check there's a cta-band ───────────────────────────────────────
  if (!html.includes('class="cta-band"')) {
    console.log(`⏭️  No cta-band found: ${file}`);
    skipped++;
    return;
  }

  // ── Step 3: Inject disclaimer below btn-group in cta-band ──────────────────
  // Find the closing of the first btn-group inside cta-band
  const ctaBandInsertPattern = /(<div class="btn-group">[\s\S]*?<\/div>)/;

  if (!ctaBandInsertPattern.test(html)) {
    console.log(`⚠️  Could not find btn-group in cta-band: ${file}`);
    skipped++;
    return;
  }

  // Build the disclaimer block to inject
  const injectedBlock = `$1
        <div class="cta-disclaimer">
          <p class="cta-disclaimer-label">Important</p>
          ${disclaimerListHTML}
        </div>`;

  // Only replace the FIRST occurrence (the cta-band one)
  html = html.replace(ctaBandInsertPattern, injectedBlock);

  // ── Step 4: Remove the Important heading + disclaimer list from footer ──────
  // Remove the <p class="footer-legal-heading">Important</p> and its <ul>
  // The block to remove looks like:
  //   <p class="footer-legal-heading">Important</p>\n            <ul class="footer-disclaimer-list">...</ul>
  html = html.replace(/\s*<p class="footer-legal-heading">Important<\/p>\s*[\s\S]*?<\/ul>/m, (match) => {
    // Only remove if it's the footer-legal-heading Important block (not section-label)
    if (match.includes('footer-disclaimer-list')) return '';
    return match;
  });

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`✅ Updated: ${file}`);
  updated++;
});

console.log(`\n✅ Done. ${updated} file(s) updated, ${skipped} skipped.`);
