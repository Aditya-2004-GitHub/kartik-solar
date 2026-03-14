const fs = require('fs');
const pdf = require('pdf-parse/lib/pdf-parse.js'); // check if this works

let dataBuffer = fs.readFileSync('public/KARTIK MULTI SOLUTIONS- website structure.pdf');

pdf(dataBuffer).then(function(data) {
    console.log(data.text);
}).catch(function(err) {
    console.error(err);
});
