var http = require('http');
http.createServer(function (request, response) {
    console.log(request.url);
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write('<h1>hello!!</h1>');
    response.end();
}).listen(8080);
//啟動server
//並傳入字串
