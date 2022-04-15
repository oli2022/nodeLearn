const mongoose = require('mongoose');
// 建立Schema
const roomSchema = new mongoose.Schema(
    {
        name: String,
        price: {
            type: Number,
            required: [true, '價格必填'],
        },
        rating: Number,
        createdAt: {
            type: Date,
        },
    },
    // 第二個是放預設的設定
    {
        versionKey: false,
        timestamps: true,
    }
);
// Model要大寫
const Room = mongoose.model('Room', roomSchema);
//輸出，讓其他檔案可以使用
module.exports = Room;
