const http = require('http');
const requestListener = (req, res) => {
    const headers = {
        'Content-type': 'text/plain',
    };
    console.log(req.url);
    console.log(req.method);
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, headers);
        res.write('index');
        res.end();
    } else if (req.url === '/' && req.method === 'DELETE') {
        res.writeHead(200, headers);
        res.write('刪除成功');
        res.end();
    } else {
        res.writeHead(404, headers);
        res.write('not found 404');
        res.end();
    }
};
const server = http.createServer(requestListener);
server.listen(3005);
