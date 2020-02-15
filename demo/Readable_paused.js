/**
 * @author qiqingfu
 * @date 2020-02-15 21:28
 */

const Stream = require('stream');

const source = ['a', 'b', 'c'];

const readable = Stream.Readable({
  read: function () {
    this.push(source.shift() || null);
  }
});

// 暂停模式
// 监听 readable 事件, 手动进行读取 read
// 当有数据可以从缓存池中读取就会触发 readable 事件
// read(size) 要读取数据的字节数

readable.on('readable', () => {
  let data;
  while (null !== (data = readable.read())) {
    console.log(data);
  }
});
