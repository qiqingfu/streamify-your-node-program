/**
 * @author qiqingfu
 * @date 2020-02-17 11:42
 */

const through2 = require('through2');
const fs = require('fs');

// fs.createReadStream('./ex.txt')
//   .pipe(through2(function (buf, enc, callback) {
//     for (let i = 0; i < buf.length; i++) {
//       if (buf[i] === 97)
//         buf[i] = 122; // swap 'a' for 'z'
//     }
//
//     callback(null, buf);
// }))
//   .pipe(fs.createWriteStream('./out.txt'))
//   .on('finish', () => doSomethingSpecial());
//
// function doSomethingSpecial () {
//   console.log('finish');
// }

var FToC = through2.ctor({objectMode: true}, function (record, encoding, callback) {
  record = record.toString();

  this.push(record + 'hello');
  callback();
});

// Create instances of FToC like so:
var converter = new FToC();

process.stdin
  .pipe(converter)
  .pipe(process.stdout);
