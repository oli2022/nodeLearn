//下面這三行是檔案核心
const http = require('http');
const { v4: uuidv4 } = require('uuid');
const errHandle = require('./errorHandle'); //引入另一個檔案

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
                    errHandle(res);
                }
            } catch (error) {
                errHandle(res);
            }
        });
    } else if (req.url === '/todos' && req.method === 'DELETE') {
        todos.length = 0;
        res.writeHead(200, headers);
        res.write(
            JSON.stringify({
                status: '刪除成功',
                data: todos,
                delete: true,
            })
        );
        res.end();
        //======= 刪除單筆代辦 ========
    } else if (req.url.startsWith('/todos/') && req.method === 'DELETE') {
        const id = req.url.split('/').pop(); //抓出id
        const index = todos.findIndex((element) => element.id === id);
        //判斷是否有index
        if (index !== -1) {
            //刪除某單筆資料
            todos.splice(index, 1);
            res.writeHead(200, headers);
            res.write(
                JSON.stringify({
                    status: '單筆刪除成功',
                    data: todos,
                })
            );
            res.end();
        } else {
            errHandle(res);
        }
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
