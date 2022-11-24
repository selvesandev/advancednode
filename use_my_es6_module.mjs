import * as my_module from './es6_modules.mjs';
import {send, cool} from './es6_modules.mjs';

console.log(my_module.receive('some value'))
console.log(send())
console.log(cool())