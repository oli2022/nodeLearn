const http = require('http');
const { v4: uuidv4 } = require('uuid');
//uuidv4();
const todos = [
    {
        title: '今天要刷牙',
        id: uuidv4(),
    },
];
const requestListener = (req, res) => {
    const headers = {
        //下面兩行跨網域使用的
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
        'Content-Type': 'application/json',
    };
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    console.log(req.url);
    console.log(req.method);
    if (req.url === '/todos' && req.method === 'GET') {
        res.writeHead(200, headers);
        res.write(
            JSON.stringify({
                //把json格式轉成字串傳出去
                status: '成功',
                data: todos, //如果傳輸成功，要回傳什麼回去，如果沒有要回傳的資料就放個空陣列。
            })
        );
        res.end();
    } else if (req.url === '/todos' && req.method === 'POST') {
        req.on('end', () => {
            //新增 POST API 異常行為
            try {
                const title = JSON.parse(body).title;
                if (title !== undefined) {
                    const todo = {
                        title: title,
                        id: uuidv4(),
                    };
                    todos.push(todo);
                    res.writeHead(200, headers);
                    res.write(
                        JSON.stringify({
                            status: 'OK',
                            data: todos,
                        })
                    );
                    res.end();
                } else {
                    res.writeHead(400, headers);
                    res.write(
                        JSON.stringify({
                            status: 'false',
                            message: '執行失敗，沒有title值',
                        })
                    );
                    res.end();
                }
            } catch (error) {
                res.writeHead(400, headers);
                res.write(
                    JSON.stringify({
                        status: 'false',
                        message: '執行失敗',
                    })
                );
                res.end();
            }
        });
    } else if (req.method == 'OPTIONS') {
        res.writeHead(200, headers);
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
