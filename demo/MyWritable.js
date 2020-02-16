/**
 * @author qiqingfu
 * @date 2020-02-16 23:42
 */

'use strict';

const Writable = require('stream').Writable;

class PrintUpperCase extends Writable {
  constructor() {
    super();
  }
  _write(buf, enc, next) {
    process.stdout.write(buf.toString().toUpperCase());
    process.nextTick(next);
  }
}

process.stdin.pipe(new PrintUpperCase());
