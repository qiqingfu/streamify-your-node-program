/**
 * @author qiqingfu
 * @date 2020-02-15 22:13
 */

const Stream = require('stream');
const writable = Stream.Writable();

writable._write = function (data, _, next) {
  console.log(data);
  next();
};

/**
 * 队列池中数据都已经传给底层系统, 在所有的 write(data, encding, cb) 时传入的cb均已执行完触发
 */
writable.on('finish', () => {
  console.log('finish');
});

/**
 * 表示所有数据均已写入缓冲区, 最后一次调用 _write的时候, 其 next已被执行
 * 此时不会再有新的数据写入缓冲区时调用 prefinish
 */
writable.on('prefinish', () => {
  console.log('prefinish');
});

writable.write('a', () => {
  console.log('a');
});

writable.write('b', () => {
  console.log('b');
});

writable.write('c', () => {
  console.log('c');
});

writable.end();
