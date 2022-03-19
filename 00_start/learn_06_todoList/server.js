const http = require('http');
const requestListener = (req, res) => {
    const headers = {
        //下面兩行跨網域使用的
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
        'Content-Type': 'application/json',
    };
    console.log(req.url);
    console.log(req.method);
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, headers);
        res.write(
            JSON.stringify({
                //把json格式轉成字串傳出去
                status: '成功',
                data: [], //如果傳輸成功，要回傳什麼回去，如果沒有要回傳的資料就放個空陣列。
            })
        );
        res.end();
    } else {
        res.writeHead(404, headers);
        res.write(
            JSON.stringify({
                status: '失敗',
                message: '無此網站路由',
            })
        );
        res.end();
    }
};
const server = http.createServer(requestListener);
server.listen(3005);
