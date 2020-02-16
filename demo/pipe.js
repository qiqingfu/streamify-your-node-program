/**
 * @author qiqingfu
 * @date 2020-02-16 23:16
 */

/**
 * pipe
 *  可读流提供一个 pipe 方法, 用于连接另一个可写流。
 *  即 pipe 方法用于连通上游和下游, 使上游的数据能流到指定的下游
 *  readable.pipe(writable) 上游是必须可读的, 下游是必须可写的
 */

const Stream = require('stream');

const readable = createReadable();
const writable = createWritable();

readable.on('data', function (data) {
  writable.write(data);
});

readable.on('end', function () {
  // 可读流中没有数据可读了
  // 表示没有数据要被写入可写流了
  writable.end();
});

// 数据都已经写到底层系统之后触发
writable.on('finish', function () {
  console.log('finish');
});

function createWritable () {
  return Stream.Writable({
    write: function (data, _, next) {
      console.log('data', data);
      next();
    }
  })
}

function createReadable () {
  const source = ['a', 'b', 'c'];
  return Stream.Readable({
    read: function () {
      process.nextTick(this.push.bind(this, source.shift() || null));
    }
  })
}
