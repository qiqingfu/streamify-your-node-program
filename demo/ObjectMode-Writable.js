/**
 * @author qiqingfu
 * @date 2020-02-15 22:49
 */

const Stream = require('stream');
const writable = Stream.Writable({
  objectMode: true,
  write: function (data, _, next) {
    console.log(data);
    process.nextTick(next);
  }
});

writable.write('a');
writable.write('b');
writable.write('c');
writable.end('d');
