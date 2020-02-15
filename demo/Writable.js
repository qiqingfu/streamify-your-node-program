/**
 * @author qiqingfu
 * @date 2020-02-15 21:45
 */

const Stream = require('stream');
const writable = Stream.Writable();

writable._write = function (data, _, next) {
  console.log('data', data);

  process.nextTick(next);
};

/**
 * write(data, encding, callback)
 *  写入数据到流, 并在数据被完全处理(队列池中的读取被写完了), 调用 callback
 */
writable.write('a');
writable.write('b');
writable.write('c');

/**
 * end(data, encding, callback)
 *  表明没有数据要被写入可写流了
 */
writable.end();
