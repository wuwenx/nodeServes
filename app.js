var express = require("express")
var path = require("path");
var bodyParser = require('body-parser');
var index = require('./routers/index');
var superagent = require('./routers/superagent')
var event=require('./routers/event')
var buffer=require('./routers/buffer')
var stream=require('./routers/stream')
var util=require('./routers/util')
var app = express();
// 接收post请求需要添加
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'))
app.use('/', index);
// app.use('/sup', superagent)
// app.use('/event',event)
// app.use('/buffer',buffer)
// app.use('/stream',stream)
app.use('/util',util)
app.use('/upload',util)
module.exports = app;



