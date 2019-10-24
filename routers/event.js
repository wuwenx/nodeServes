var express = require('express');
var router = express.Router();

var events=require('events')
var eventsEmitter=new events.EventEmitter();


var listener1=()=>{
    console.log("listener1 启动")
}

var listener2=()=>{
    console.log("listener2 启动")
}
// 绑定 connection 事件，处理函数为 listener1 
eventsEmitter.addListener("connection",listener1)

// 绑定 connection 事件，处理函数为 listener2
eventsEmitter.on("connection",listener2)

var eventListeners=eventsEmitter.listenerCount("connection")
console.log(eventListeners + " 个监听器监听连接事件。");

// 处理 connection 事件 
eventsEmitter.emit("connection")

eventsEmitter.removeListener("connection",listener1)
console.log("listener1 不再受监听。");

// 触发连接事件
eventsEmitter.emit("connection")
eventListeners = eventsEmitter.listenerCount('connection');

console.log(eventListeners + " 个监听器监听连接事件。");

console.log("程序执行完毕。");


module.exports=router;