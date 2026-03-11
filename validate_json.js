const fs = require('fs');
try {
    const content = fs.readFileSync('c:/Users/subha/Desktop/personal/trayee portfolio/personal_portfolio/tsconfig.json', 'utf8');
    JSON.parse(content);
    console.log('Valid JSON');
} catch (e) {
    console.log('Invalid JSON:', e.message);
}
