const http = require('http');

const server = http.createServer((req,res) => {
    if(req.url==='/x'){
        res.writeHead(200,{'Content-Type': 'application/json'});
        res.end(JSON.stringify({ a: 10 }));    
    }else if (req.url ==='/y') {
        res.setHeader('Content-Type', 'text/html');
        res.statusCode=200;
        res.write('<h1>Hello</h1>');
        res.write('<p>world!!..</p>');
        res.end();
    }else{
        res.statusCode=404;
        res.end();
    }
});
console.log(server);
server.listen(3332,() => {
    console.log("listenining on port 3332")
});


