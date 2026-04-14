const fs = require('fs');
const path = require('path');

const dir = __dirname;

// Mortgage-only pages — remove the insurance bullet
const mortgagePages = [
  'mortgages.html',
  'buy-to-let.html',
  'let-to-buy.html',
  'limited-company-btl.html',
  'first-time-buyer.html',
  'home-mover.html',
  'remortgage.html',
];

const insuranceLine = /\s*<li>Insurance policies are subject to eligibility, underwriting, terms, conditions and exclusions\. Benefits may not be paid in all circumstances\.<\/li>/g;

let count = 0;

mortgagePages.forEach(f => {
  const filePath = path.join(dir, f);
  if (!fs.existsSync(filePath)) {
    console.log(`Not found: ${f}`);
    return;
  }
  let c = fs.readFileSync(filePath, 'utf8');
  const updated = c.replace(insuranceLine, '');
  if (updated !== c) {
    fs.writeFileSync(filePath, updated, 'utf8');
    console.log(`✅ Updated: ${f}`);
    count++;
  } else {
    console.log(`⚠️  No match: ${f}`);
  }
});

console.log(`\nDone. ${count} file(s) updated.`);
