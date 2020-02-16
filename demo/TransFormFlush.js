/**
 * @author qiqingfu
 * @date 2020-02-16 22:58
 */

const Stream = require('stream');

const transform = createTransform();
transform.pipe(process.stdout);

/**
 * 可写流缓冲数据都已传给底层系统之后触发
 */
transform.on('finish', function () {
  console.log('\nfinish');
});

/**
 * 可读流
 * 只有在数据被完全消费掉后才会触发
 */
transform.on('end', function () {
  console.log('\nend');
});

transform.write('a');
transform.write('b');
transform.end('c');

function createTransform () {
  const input = [];
  return Stream.Transform({
    objectMode: true,
    transform: function (buf, _, next) {
      console.log('transform', buf.toString());
      input.push(buf);
      next();
    },
    // 调用 end() 方法之立马触发flush方法
    flush: function (next) {
      console.log('flush');
      let buf;
      while (buf = input.pop()) {
        this.push(buf);
      }
      setTimeout(() => {
        this.push('extra');
        /**
         * 调用 flush next() 方法
         * 等同于执行了可读端的 push(null), 进而引起 end 事件触发
         */
        next();
      });
    }
  })
}
