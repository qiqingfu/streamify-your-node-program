/**
 * @author qiqingfu
 * @date 2020-02-16 22:42
 */

const Stream = require('stream');

const transform = Stream.Transform({
  /**
   *
   * @param buf 从上游调用 write 时传入的数据
   * @param _   数据的编码类型, 取决于 buf
   * @param next 将处理后的数据转交给下游, 下游再调用 push, 将转换后的数据放入可读缓存
   *
   */
  transform: function (buf, _, next) {
    next(null, buf.toString().toUpperCase());
  }
});

// process.stdout 下游的接受者
transform.pipe(process.stdout);

transform.write('a');
transform.write('b');
transform.write('c');
transform.end('d');
