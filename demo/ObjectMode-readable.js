/**
 * @author qiqingfu
 * @date 2020-02-15 22:30
 */

const Stream = require('stream');

const source = ['a', '', 'c'];

const readable = Stream.Readable({
  objectMode: true,
  read: function () {
    let data = source.shift();
    data = data == null ? null : data;
    this.push(data);
  }
});

readable.on('end', function () {
  console.log('end');
});

readable.on('data', function (chunk) {
  console.log('data', chunk);
});
