const fs = require('fs');
const path = 'd:/Movex-Cab-main/customer-app/App.tsx';
let lines = fs.readFileSync(path, 'utf8').split('\n');

let startIdx = -1;
let endIdx = -1;
let openCount = 0;

for(let i=0; i<lines.length; i++) {
    if(startIdx === -1 && lines[i].includes('<View style={styles.homeBottomCard}>')) {
        startIdx = i;
    }
    if (startIdx !== -1 && i >= startIdx) {
        // Simple count of <View and </View> for this block
        const opens = (lines[i].match(/<View/g) || []).length;
        const closes = (lines[i].match(/<\/View/g) || []).length;
        openCount += opens;
        openCount -= closes;
        
        if (openCount === 0) {
            endIdx = i;
            break;
        }
    }
}

if(startIdx !== -1 && endIdx !== -1) {
    console.log('Replacing start at line ' + startIdx + ' and end at line ' + endIdx);
    lines[startIdx] = lines[startIdx].replace('<View style={styles.homeBottomCard}>', '{!bookingRide && (\n<View style={styles.homeBottomCard}>');
    lines[endIdx] = lines[endIdx].replace('</View>', '</View>\n)}');
    fs.writeFileSync(path, lines.join('\n'));
    console.log('Done');
} else {
    console.log('Could not find bounds of homeBottomCard: startIdx=' + startIdx + ' endIdx=' + endIdx);
}
