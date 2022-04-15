const http = require('http');
// 引用其他檔案
// Room大寫表示是Model
const Room = require('./models/room');
// 載入dotenv
const dotenv = require('dotenv');
// 載入mongoose
const mongoose = require('mongoose');

// 改寫
//mongodb+srv://learn_mongoDB:<password>@cluster0.crbep.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
dotenv.config({ path: './config.env' });
console.log(process.env.PORT);
const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);
console.log(DB);

//連接資料庫
mongoose
    .connect(DB)
    .then(() => {
        console.log('資料庫連線成功');
    })
    .catch((error) => console.log('連線錯誤'));

// 可以看到設定的環境變數
//console.log(process.env);

// 刪除單筆資料
// Room.findByIdAndDelete('6257f2671011769650b9067b').then(() => {
//     console.log('單筆更新成功');
// });

// 更新單筆資料 - 可以只更新一個屬性
// Room.findByIdAndUpdate('6257f2671011769650b9067b', { name: '海賊王雙人套房' }).then(() => {
//     console.log('單筆更新成功');
// });

// 設定Schema
// 這是比較簡化的寫法
// const roomSchema = {
//     name: String,
//     price: {
//         type: Number,
//         required: [true, '價格必填'],
//     },
//     rating: Number,
// };

// 新增資料
// Room.create({
//     name: '超級總統單人房',
//     price: 2000,
//     rating: 4.5,
// })
//     .then(() => {
//         console.log('新增資料成功');
//     })
//     .catch(() => {
//         console.log('新增資料失敗');
//     });

// 實體 instance
// const testRoom = new Room({
//     name: '總統單人房2',
//     price: 2000,
//     rating: 4.5,
// });
// testRoom
//     .save()
//     .then(() => {
//         console.log('新增資料成功');
//     })
//     .catch(() => {
//         console.log('新增資料失敗');
//     });

const requestListener = async (req, res) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    const headers = {
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
        'Content-Type': 'application/json',
    };
    if (req.url == '/room' && req.method == 'GET') {
        const rooms = await Room.find();
        res.writeHead(200, headers);
        res.write(
            JSON.stringify({
                status: 'success',
                rooms,
            })
        );
        res.end();
    } else if ((req.url = '/rooms' && req.method == 'DELETE')) {
        const rooms = await Room.deleteMany({});
        res.writeHead(200, headers);
        res.write(
            JSON.stringify({
                status: 'success',
                rooms,
            })
        );
        res.end();
    } else if ((req.url = '/rooms' && req.method == 'POST')) {
        req.on('end', async () => {
            try {
                const data = JSON.parse(body);
                // 實體 instance
                const newRoom = await Room.create({
                    name: data.name,
                    price: data.price,
                    rating: data.rating,
                });
                res.writeHead(200, headers);
                res.write(
                    JSON.stringify({
                        status: 'success',
                        rooms: newRoom,
                    })
                );
                res.end();
            } catch (error) {
                res.writeHead(400, headers);
                res.write(
                    JSON.stringify({
                        status: false,
                        message: '欄位不正確，或沒有此ID',
                        error: error,
                    })
                );
                res.end();
            }
        });
    }
};
const server = http.createServer(requestListener);
server.listen(process.env.PORT);

//mongodb+srv://learn_mongoDB:<password>@cluster0.crbep.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
