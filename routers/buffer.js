//  Buffer 缓存区
var express = require('express');
var router = express.Router();

// Buffer.alloc(size[, fill[, encoding]])： 返回一个指定大小的 Buffer 实例，如果没有设置 fill，则默认填满 0
// Buffer.allocUnsafe(size)： 返回一个指定大小的 Buffer 实例，但是它不会被初始化，所以它可能包含敏感的数据
// Buffer.allocUnsafeSlow(size)
// Buffer.from(array)： 返回一个被 array 的值初始化的新的 Buffer 实例（传入的 array 的元素只能是数字，不然就会自动被 0 覆盖）
// Buffer.from(arrayBuffer[, byteOffset[, length]])： 返回一个新建的与给定的 ArrayBuffer 共享同一内存的 Buffer。
// Buffer.from(buffer)： 复制传入的 Buffer 实例的数据，并返回一个新的 Buffer 实例
// Buffer.from(string[, encoding])： 返回一个被 string 的值初始化的新的 Buffer 实例

var buff = Buffer.alloc(256);
var len = buff.write("www.runoob.com");
console.log("写入字节数 : " + len);
console.log(buff.toString('ascii'));

console.log("将流转换成字符串：" + JSON.stringify(buff))
const json = JSON.stringify(buff)

var copy = JSON.parse(json, (key, val) => {
    return val && val.type === 'Buffer' ?
        Buffer.from(val.data) :
        val;
})
console.log("将字符串转换成流：" + copy);


var buff2 = Buffer.from("武文祥的流")
// 合并缓存区
//Buffer.concat(list[, totalLength])
// list - 用于合并的 Buffer 对象数组列表。
// totalLength - 指定合并后Buffer对象的总长度。

var buff3 = Buffer.concat([buff, buff2])
console.log(buff3.toString())

var result = Buffer.compare(buff, buff2)

//返回一个数字，表示 buf 在 otherBuffer 之前，之后或相同。
console.log("比较buff和buff2：" + result)
/**
 * copy
 * targetBuffer - 要拷贝的 Buffer 对象。
 * targetStart - 数字, 可选, 默认: 0
 * sourceStart - 数字, 可选, 默认: 0
 * sourceEnd - 数字, 可选, 默认: buffer.length
 */
buff2.copy(buff, 2);
console.log("将 buff2 插入到 buff 指定位置上，会覆盖buff的内容：" + buff.toString())
/**
 * slice
 * start - 数字, 可选, 默认: 0
 * end - 数字, 可选, 默认: buffer.length
 */

var buffslice = buff.slice(0, 3)
console.log(buffslice.toString('utf-8'))
module.exports = router;