const fs = require('fs');
const path = 'd:/Movex-Cab-main/customer-app/App.tsx';
let lines = fs.readFileSync(path, 'utf8').split('\n');

// Find the line that starts the bottom card
let startIdx = -1;
let endIdx = -1;

for(let i=0; i<lines.length; i++) {
    if(lines[i].includes('<View style={styles.homeBottomCard}>')) {
        startIdx = i;
        break;
    }
}

if(startIdx !== -1) {
    // find the matching closing tag
    let openCount = 0;
    for(let i=startIdx; i<lines.length; i++) {
        if(lines[i].includes('<View')) openCount++;
        if(lines[i].includes('</View>')) openCount--;
        
        if(openCount === 0) {
            endIdx = i;
            break;
        }
    }
}

if(startIdx !== -1 && endIdx !== -1) {
    lines[startIdx] = lines[startIdx].replace('<View style={styles.homeBottomCard}>', '{!bookingRide && (\n<View style={styles.homeBottomCard}>');
    lines[endIdx] = lines[endIdx].replace('</View>', '</View>\n)}');
    fs.writeFileSync(path, lines.join('\n'));
    console.log('Successfully wrapped homeBottomCard with {!bookingRide && (...)}');
} else {
    console.log('Could not find bounds of homeBottomCard: startIdx=' + startIdx + ' endIdx=' + endIdx);
}
