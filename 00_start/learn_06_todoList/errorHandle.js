function errorHandler(res) {
    const headers = {
        //下面兩行跨網域使用的
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
        'Content-Type': 'application/json',
    };
    res.writeHead(400, headers);
    res.write(
        JSON.stringify({
            status: 'false',
            message: '執行失敗',
        })
    );
    res.end();
}
module.exports = errorHandler;
