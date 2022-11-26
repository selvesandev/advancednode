const parse = require('csv-parse');
const fs = require('fs');

// const http = require('http');

// const server = http.createServer().listen(8181);

// server.on('request', (req,res) => {
//     res.send({});
// })

const results = [];

fs.createReadStream('kepler_data.csv').pipe(parse.parse({comment:'#',columns:true})).on('data',function(data) {
    results.push(data);
}).on('end',function() {
    console.log('Finished reading the file...');
    console.log(results);
});

