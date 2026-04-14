const fs = require('fs');
const path = require('path');

const dir = __dirname;

// New 3-bullet disclaimer block (to replace the old 2-line version)
const newBlock = `            <ul class="footer-disclaimer-list">
              <li>Your home may be repossessed if you do not keep up repayments on your mortgage.</li>
              <li>Buy to Let mortgages are not usually regulated by the Financial Conduct Authority.</li>
              <li>Insurance policies are subject to eligibility, underwriting, terms, conditions and exclusions. Benefits may not be paid in all circumstances.</li>
            </ul>`;

// Regex that matches the old repossession + insurance block (flexible on whitespace/newlines)
const oldPattern = /<p class="repossession">[\s\S]*?<\/p>\s*<p>\s*<strong>Insurance:<\/strong>[\s\S]*?<\/p>/g;

const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let updatedCount = 0;

htmlFiles.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (oldPattern.test(content)) {
    content = content.replace(oldPattern, newBlock);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated: ${file}`);
    updatedCount++;
  } else {
    console.log(`⚠️  No match: ${file}`);
  }
  
  // Reset regex lastIndex
  oldPattern.lastIndex = 0;
});

console.log(`\nDone. ${updatedCount} file(s) updated.`);
