/**
 * @author qiqingfu
 * @date 2020-02-16 21:28
 */

/**
 * highWaterMarkReadable 对可读流的影响
 * 控制底层读取的速度
 *
 * 每次执行 readable.read() 时, 如果 state.lenght 低于 highWaterMark, 便会执行
 * readable._read(highWaterMark) 从底层读取数据存入缓存中
 */

const Stream = require('stream');
const source = ['a', 'b', 'c'];

const readable = Stream.Readable({
  read: function () {
    const data = source.shift() || null;
    console.log('buffer before push', this._readableState.buffer);
    console.log('push', data);
    this.push(data);
    console.log('buffer after push', this._readableState.buffer);
    console.log('---------------------');
  }
});

readable.on('data', function (data) {
  console.log('consume', data);
});

