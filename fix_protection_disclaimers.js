const fs = require('fs');
const path = require('path');

const dir = __dirname;

// Protection pages — remove mortgage specific bullets
const protectionPages = [
  'protection.html',
  'life-insurance.html',
  'critical-illness.html',
  'income-protection.html',
  'family-income-benefit.html',
  'private-medical.html',
  'home-landlord-insurance.html'
];

const mortgageLine = /\s*<li>Your home may be repossessed if you do not keep up repayments on your mortgage\.<\/li>/g;
const btlLine = /\s*<li>Buy to Let mortgages are not usually regulated by the Financial Conduct Authority\.<\/li>/g;

let count = 0;

protectionPages.forEach(f => {
  const filePath = path.join(dir, f);
  if (!fs.existsSync(filePath)) {
    console.log(`Not found: ${f}`);
    return;
  }
  let c = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  const updated1 = c.replace(mortgageLine, '');
  if (updated1 !== c) {
    c = updated1;
    changed = true;
  }
  
  const updated2 = c.replace(btlLine, '');
  if (updated2 !== c) {
    c = updated2;
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, c, 'utf8');
    console.log(`✅ Updated: ${f}`);
    count++;
  } else {
    console.log(`⚠️  No match: ${f}`);
  }
});

console.log(`\nDone. ${count} file(s) updated.`);
