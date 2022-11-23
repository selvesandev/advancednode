const http = require('http');

const req = http.request('http://www.google.com',(res) => {
    res.on('data',(chunk) => {
        console.log(chunk.toString());
    })
    res.on('end', ()=>{
        console.log('no more data');
    })
});

req.end();