var express = require('express');
var router = express.Router();
var multer = require("multer");


var connection = require("../mysql/mysqlBase")

/**
 * 获取用户信息
 */
router.get("/", (req, res) => {
    connection.query('SELECT * FROM information WHERE isDelete=0', function (error, results, fields) {
        if (error) throw error;
        res.send({ code: 1, data: results, message: "请求成功" })
    });

})
/**
 * 添加用户信息
 */
router.post("/adduser", (req, res) => {
    console.log(req.body)
    if (!req.body.uName) {
        return res.send({ code: 0, message: "名称不能为空" })
    }
    if (!req.body.uAge) {
        return res.send({ code: 0, message: "年龄不能为空" })
    }
    if (!req.body.like) {
        return res.send({ code: 0, message: "爱好不能为空" })
    }
    if (!req.body.address) {
        return res.send({ code: 0, message: "居住地址不能为空" })
    }
    if (!req.body.remake) {
        return res.send({ code: 0, message: "备注不能为空" })
    }
    var addSql = 'INSERT INTO information(uName,uAge,uSex,`like`,address,remake,isDelete) VALUES(?,?,?,?,?,?,?)';
    var addSqlParams = [req.body.uName, req.body.uAge, req.body.uSex, req.body.like, req.body.address, req.body.remake, 0];
    connection.query(addSql, addSqlParams, (err, result) => {
        if (err) return;
        console.log(result)
        res.send({ code: 1, message: "添加成功" })
    })
})

/**
 * 删除用户信息
 */
router.get("/removeUserinfor", (req, res) => {
    console.log(req.query)
    if (!req.query.uId) {
        return res.send({ code: 0, message: "用户编号不能为空" })
    }
    connection.query('UPDATE information SET isDelete="1" WHERE uID=' + req.query.uId, function (error, results, fields) {
        if (error) throw error;
        res.send({ code: 1, message: "删除成功" })
    });

})

const storage = multer.diskStorage({
    //存储的位置
    destination(req, file, cb) {
        cb(null, 'upload/')
    },
    //文件名字的确定 multer默认帮我们取一个没有扩展名的文件名，因此需要我们自己定义
    filename(req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

var upload = multer({ storage: storage })
router.post('/profile', upload.single('file'), function (req, res) {
    // req.file 是 `avatar` 文件的信息
    // req.body 将具有文本域数据，如果存在的话
    var file = req.file;
    console.log('文件类型：%s', file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);
    //给客户端返回图片的访问地址 域名 + 文件名字 
    //因为在 app.js文件里面我们已经向外暴漏了存储图片的文件夹 uploa
    const url = req.file.filename
    res.json({ code: 1, url, message: "保存成功" })

})

module.exports = router;