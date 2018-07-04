let rp = require('request-promise');
var request = require('request');
let cheerio = require('cheerio');
let MongoClient = require('mongodb').MongoClient;
let assert = require('assert');
var fs = require('fs');
var path = require('path');
var dataUrl = 'youku/movie.json';

// 测试爬虫
let index = 1;

//格式化图片名称
function FileName(url) {
    var fileName = path.basename(url);
    return fileName;
}
//利用fs模块download图片
function downloadImg(url, filename, callback) {
    var stream = fs.createWriteStream('youku/images/' + filename);
    request(url).on('error',function(){
        console.log('done no');
    }).pipe(stream).on('close', callback);
}

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
            let video = {
                title:  $('.title a').eq(i).attr('title'),
                link:  'http:' + $('.title a').eq(i).attr('href'),
                img:  $('.p-thumb img').eq(i).attr('src'),
                state:  $('.status').eq(i).text()
            }
            // 文件写入
            let file = fs.readFileSync(dataUrl);
            try {
                file = JSON.parse(file);
            } catch(err) {
                file = [];
            }
            file.push(video);
            fs.writeFileSync(dataUrl, JSON.stringify(file));
            // 图片下载
            // var fileName = FileName(video.img.toString());
            // downloadImg(video.img, fileName, function () {
            //     console.log(fileName + ' upload 完成');
            // });
            // let url = 'mongodb://localhost:27017/test';
            // MongoClient.connect(url, function(err, db) {
            //     db.collection('video').insertMany([{videotitle:videotitle},{videolink:videolink},{videoimg:videoimg},{videostate:videostate}])
            //   });
            // console.log(videotitle + '--数据已插入')
        }
    })
    .catch(function (err) {
        // Crawling failed...
        console.log(err)
    });
    index++
}

var timer = setInterval(main, 3000);