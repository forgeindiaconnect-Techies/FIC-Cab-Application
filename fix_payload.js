const fs = require('fs');
const path = 'd:/Movex-Cab-main/customer-app/App.tsx';
let content = fs.readFileSync(path, 'utf8');
content = content.replace(/paymentMethod: 'cash',\s*route: details\.route\._id/g, "paymentMethod: 'cash',\r\n                     routeId: details.route._id");
fs.writeFileSync(path, content);
console.log('Fixed route to routeId');
