// const check = new Promise((resolve, reject) => {
//     console.log('正在批改中...');

//     setTimeout(() => {
//         const score = Math.round(Math.random() * 100);
//         if (score >= 60) {
//             resolve(score);
//         } else {
//             reject('不及格');
//         }
//     }, 2000);
// });
// check
//     .then((score) => {
//         console.log(score);
//     })
//     .catch((error) => console.log(error));

//帶參數的寫法

const checkScore = (score) => {
    return new Promise((resolve, reject) => {
        console.log('正在批改中...');

        setTimeout(() => {
            if (score >= 60) {
                resolve(score);
            } else {
                reject('不及格');
            }
        }, 2000);
    });
    checkScore(80).then((score) => {
        console.log(score);
    });
};
