const { v4: uuidv4 } = require('uuid');
uuidv4();

const a = uuidv4();

console.log('uuid:', a);

const obj = {
    title: 'uuid',
    id: a,
};
console.log(obj.id);
