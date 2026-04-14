const fs = require('fs');

const path = './index.html';
let html = fs.readFileSync(path, 'utf8');

// Generate the options 1 through 40
let newSelect = '<select id="calcTerm">\n';
for (let i = 1; i <= 40; i++) {
    const defaultSelection = (i === 20) ? ' selected' : '';
    const label = (i === 1) ? '1 year' : `${i} years`;
    newSelect += `                      <option value="${i}"${defaultSelection}>${label}</option>\n`;
}
newSelect += '                    </select>';

// Regex to replace the multiline select block
const regex = /<select id="calcTerm">[\s\S]*?<\/select>/i;
if (regex.test(html)) {
    html = html.replace(regex, newSelect);
    fs.writeFileSync(path, html, 'utf8');
    console.log('✅ index.html calcTerm updated with 1-40 years.');
} else {
    console.log('❌ Could not find calcTerm in index.html');
}
