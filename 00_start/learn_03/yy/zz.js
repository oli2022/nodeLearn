var path = require('path');
//抓路徑
console.log(path.dirname('/learn_03 /yy/ zz.js'));
//合併路徑
console.log(path.join(__dirname, 'aa'));
//抓檔名
console.log(path.basename('/learn_03/yy/zz.js'));
//抓副檔名
console.log(path.extname('/learn_03/yy/zz.js'));
//分楀路徑
console.log(path.parse('/learn_03/yy/zz.js'));
