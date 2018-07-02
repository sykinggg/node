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