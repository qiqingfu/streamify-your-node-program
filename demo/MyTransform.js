/**
 * @author qiqingfu
 * @date 2020-02-16 23:51
 */
const Stream = require('stream');
const morse = require('morse');

class Morsify extends Stream.Transform {
  constructor() {
    super();
  }
  _transform(buf, enc, next) {
    const word = buf.toString().toUpperCase();
    this.push(morse.encode(word) + '\n');
    next();
  }
}

process.stdin
  .pipe(Stream.Transform({
    objectMode: true,
    transform: function (buf, enc, next) {
      next(null, buf.toString().replace(/\n/g), '');
    }
  }))
  .pipe(new Morsify())
  .pipe(process.stdout);
