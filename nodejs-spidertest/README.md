# nodejs-spidertest
本人的node.js爬虫练习，大神无视，一直更新，爬虫爬到数据存储到数据库中。数据库为mongodb。

## youkumovie(优酷电影目录)
总共30页，每3秒爬一次，到目前为止亲测没有被封ip，本人第一次写爬虫，大家多多包涵！
### 用到的库：
```
    "cheerio": "^1.0.0-rc.2",
    "mongodb": "^2.2.33",
    "request": "^2.83.0",
    "request-promise": "^4.2.2"
```
### 代码：
```
let rp = require('request-promise');
let cheerio = require('cheerio');
let MongoClient = require('mongodb').MongoClient
, assert = require('assert');

// 测试爬虫
let index = 1;
function main(){
    if (index > 30){
        clearInterval(timer);
        console.log("恭喜你，数据已经全部爬取完毕！")
        return;
    }
    rp('http://list.youku.com/category/show/c_96_s_1_d_1_p_' + index + '.html')
    .then(function (res) {
        // Process html...
        let $ = cheerio.load(res)
        let data = $('.title a').toArray()
        for (let i = 0; i < data.length; i++) {
            let videotitle =  $('.title a').eq(i).attr('title');
            let videolink =  'http:' + $('.title a').eq(i).attr('href');
            let videoimg =  $('.p-thumb img').eq(i).attr('src');
            let videostate =  $('.status').eq(i).text();
            let url = 'mongodb://localhost:27017/test';
            MongoClient.connect(url, function(err, db) {
                db.collection('video').insertMany([{videotitle:videotitle},{videolink:videolink},{videoimg:videoimg},{videostate:videostate}])
              });
            console.log(videotitle + '--数据已插入')
        }
    })
    .catch(function (err) {
        // Crawling failed...
        console.log(err)
    });
    index++
}

var timer = setInterval(main, 3000);
```

----

## girlspic(多玩美女)
爬取多玩美女图片
### 用到的库：
```
    "cheerio": "^1.0.0-rc.2",
    "mkdirp": "^0.5.1",
    "request": "^2.83.0"
    fs模块
```
### 相关代码：
```
	request(url, function(error, response, body) {
		if(!error && response.statusCode == 200) {
            var datas = JSON.parse(body).html;
            var $ = cheerio.load(datas);
            $('img').each(function () {
                var src = $(this).attr('src');
                console.log('正在下载' + src);
                download(src, dir, Math.floor(Math.random()*100000) + src.substr(-4,4));
                console.log('下载完成');
            })
		}
	});
```

----


