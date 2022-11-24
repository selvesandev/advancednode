const my_module = require('./my_module');
const {send, cool} = require('./my_module');

console.log(my_module.receive('some value'))
console.log(send())
console.log(cool())