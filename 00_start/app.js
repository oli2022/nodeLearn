var http = require('http');
http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write('hello!!');
    response.end();
}).listen(8080);
//啟動server
//並傳入字串
