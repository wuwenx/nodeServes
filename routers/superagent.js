var superagent = require('superagent')
var express = require('express');
var router = express.Router();
var cheerio = require('cheerio')
var eventproxy = require('eventproxy');
var url = require('url');
var ep = new eventproxy();

router.get('/', (res, req) => {
    superagent.get("https://cnodejs.org/")
        .end((err, sres) => {
            if (err) {
                return next(err);
            }
            var $ = cheerio.load(sres.text);
            var items = [];
            $('#topic_list .topic_title').each(function (idx, element) {
                var $element = $(element);
                items.push({
                    title: $element.attr('title'),
                    href: $element.attr('href')
                });
            });
            req.send(items);
        })
})

router.get('/pl', (res, req) => {
    superagent.get("https://cnodejs.org/")
        .end((err, sres) => {
            if (err) {
                return next(err);
            }
            var $ = cheerio.load(sres.text);
            var items = [];
            $('#topic_list .topic_title').each(function (idx, element) {
                var $element = $(element);
                var href = url.resolve("https://cnodejs.org/", $element.attr('href'))
                items.push(href);
            });
            ep.after('topic_html', items.length, (topic) => {
                topic = topic.map((topicPair) => {
                    var topicUrl = topicPair[0];
                    var topicHtml = topicPair[1];
                    var $ = cheerio.load(topicHtml);
                    return ({
                        title: $('.topic_full_title').text().trim(),
                        href: topicUrl,
                        comment1: $('.reply_content').eq(0).text().trim(),
                    });
                })
                console.log('final:');
                console.log(topic);
                req.send(topic);
            })
            // 等待列表页面请求接口全部完成返回
            items.forEach(function (topicUrl) {
                superagent.get(topicUrl)
                    .end(function (err, res) {
                        console.log('fetch ' + topicUrl + ' successful');
                        ep.emit('topic_html', [topicUrl, res.text]);
                    });
            });

            // req.send(items);
        })
})


module.exports = router;