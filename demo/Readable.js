/**
 * @author qiqingfu
 * @date 2020-02-15 20:59
 */

const Stream = require("stream");
const readable = Stream.Readable();

const source = ['a', 'b', 'c'];
/**
 * 重写 readable 原型对象上的_read方法
 * 要异步读取的字节数
 * @private
 */
readable._read = function () {

  // 要推入读取队列的数据块, 向缓冲区中添加数据
  const data = source.shift() || null;
  console.log('data', data);
  this.push(data);
};

readable.on('data', chunk => {
  console.log(chunk.toString());
});

readable.on('end', () => {
  console.log('1. 资源已经读取完毕, push(null)');
  console.log('2. 缓存池中的数据已经被消费完');
});

/**
 * 可读流:
 *
 * 流动模式
 * resume(): 将被消费者暂停的可读流恢复触发 data 事件, 切换到 flowing 模式。
 *           消费者通过监听 data 事件获取缓存池中的数据
 *
 * 暂停模式
 *  在暂停模式下, 通过 readable.read 去获取数据
 */
