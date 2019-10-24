var express = require('express')
var router = express.Router();
var path = require('path')
var fs = require('fs')
// 读取流
var readStream = fs.createReadStream(path.resolve('commone/1.txt'), { encoding: 'utf8' });
var data = "";

readStream.on('data', (chunk) => {
    data += chunk;
})

readStream.on('end', () => {
    console.log(data);
})
readStream.on('error', (err) => {
    console.log(err.stack);
})
console.log('程序执行完毕')
// 写入流
var writeStream = fs.createWriteStream(path.resolve('commone/1.txt'), { flags:'a',encoding: 'utf8' })

writeStream.write("你好啊",'UTF8');

writeStream.end();
writeStream.on('finish', () => {
    console.log('写入完成');
})
writeStream.on('error', (err) => {
    console.log(err.stack);
})
console.log("程序执行完毕");
module.exports = router;