/**
 * @author qiqingfu
 * @date 2020-02-17 13:22
 */

'use strict';

const { Transform } = require('stream');

Object.setPrototypeOf(PassThrough.prototype, Transform.prototype);
Object.setPrototypeOf(PassThrough, Transform);

function PassThrough (options) {
  if (!(this instanceof PassThrough))
    return new PassThrough(options);

  Transform.call(this, options);
}

// rewrite
PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};

module.exports = PassThrough;
