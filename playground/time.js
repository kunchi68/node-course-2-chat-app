// 0     -> Jan 1st 1970 00:00:00 am
// 1000  -> Jan 1st 1970 00:00:01 am
// https://momentjs.com

 var moment = require('moment');

// var date = moment();
// date.add(1, 'year').subtract(9, 'months');
// console.log(date.format('MMM Do, YYYY'));

var soimTimestamp = moment().valueOf();
console.log(soimTimestamp);

var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format('h:mm a'));