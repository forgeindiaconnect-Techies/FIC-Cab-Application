const fs = require('fs');
const path = 'd:/Movex-Cab-main/customer-app/App.tsx';
let content = fs.readFileSync(path, 'utf8');

// The lines we want to remove start at `if (rideStatus === 'arrived') {` 
// and end right before `  // Î“Ã¶Ã‡Î“Ã¶Ã‡ Completed state: show payment collection screen Î“Ã¶Ã‡Î“Ã¶Ã‡`

const searchStr = "  if (rideStatus === 'arrived') {";
const endStr = "  // Î“Ã¶Ã‡Î“Ã¶Ã‡ Completed state:";

const startIndex = content.indexOf(searchStr);
if (startIndex !== -1) {
    const endIndex = content.indexOf(endStr, startIndex);
    if (endIndex !== -1) {
        content = content.substring(0, startIndex) + content.substring(endIndex);
        fs.writeFileSync(path, content);
        console.log('Removed legacy arrived return block successfully');
    } else {
        console.log('End string not found');
    }
} else {
    console.log('Start string not found');
}
