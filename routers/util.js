var express = require('express')
var router = express.Router();
var util = require('util');
// inherits(继承) begin
function Base() {
    this.name = "base";
    this.base = "1995";
    this.sayHello = function () {
        console.log("hello" + this.name)
    }
}
Base.prototype.showName = function () {
    console.log(this.name);
}
function Sub() {
    this.name = 'sub';
}
//Sub 仅仅继承了Base 在原型中定义的函数，
//而构造函数内部创造的 base 属 性和 sayHello 函数都没有被 Sub 继承。
util.inherits(Sub, Base);
var objectBase = new Base();
objectBase.showName();
objectBase.sayHello();
console.log(objectBase)
var objSub=new Sub();
objSub.showName();
console.log(objSub.name)
console.log(objSub)
// inherits end
function Person() { 
    this.name = 'byvoid'; 
    this.toString = function() { 
    return this.name; 
    }; 
} 
// util.inspect(object,[showHidden],[depth],[colors])
// object 需要输出的对象
// showHidden 展示更多信息
// depth 递归层数  默认两层 设置为NULL不限制层数
var objPerson=new Person();
console.log(util.inspect(objPerson))
console.log(util.inspect(objPerson,true))

module.exports = router;