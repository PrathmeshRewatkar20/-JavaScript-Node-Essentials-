import { isLeapYear } from './dateUtil.js'; 

let a = isLeapYear(2048);
console.log('Leap year test (2048):',a);
let b = isLeapYear(2021);
console.log('Non-leap year test (2021):',b);