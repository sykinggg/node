var request = require('request');
var cheerio = require('cheerio');
var path = require('path');
var fs = require('fs');
var async = require('async');
var phantom = require('phantom');

var options = [];  //用于存储网址链接的数组
var n=0;


//先生称图片地址链接的数组
for (var i = 1; i < 48; i++) {
    // 简单获取页面但是如果页面的js要执行就没有办法
    var obj = {
        url: 'http://www.5aav.com/xgmv/list_1_' + i + '.html',
        headers:{
            'Cache-Control': 'max-age=180',
            'Connection': 'keep-alive',
            'Content-Encoding': 'gzip',
            'Content-Type': 'text/html; charset=UTF-8',
            'Date': 'Tue, 03 Jul 2018 02:23:01 GMT',
            'EagleId': '76700dcf15305845818548034e',
            'Expires': 'Tue, 03 Jul 2018 02:26:01 GMT',
            'Link': '<http://jandan.net/wp-json/>; rel="https://api.w.org/"',
            'Link': '<http://jandan.net/?p=21183>; rel=shortlink',
            'Server': 'Tengine',
            'Timing-Allow-Origin': '*',
            'Transfer-Encoding': 'chunked',
            'Vary': 'Accept-Encoding',
            'Via': 'cache39.l2cm10-1[7,200-0,M], cache3.l2cm10-1[8,0], cache4.cn13[42,200-0,M], cache7.cn13[45,0]',
            'X-Cache': 'MISS TCP_REFRESH_MISS dirn:-2:-2 mlen:-1',
            'X-Powered-By': 'PHP/5.2.10',
            'X-Swift-CacheTime': 180,
            'X-Swift-SaveTime': 'Tue, 03 Jul 2018 02:23:01 GMT'
        }
    }
	options.push(obj);
    // console.log(options);
}



//用来处理这个调用逻辑的总函数
function all(err, res, body) {
    // console.log(body);
    var $ = cheerio.load(body);
    n=n+$(".postlist img").length;
	// console.log(n);
	// console.log($(".postlist img"));
    $(".postlist img").each(function (i, ele) {
        var imgsrc = 'http:' + $(this).attr('src');
		var fileName = FileName(imgsrc.toString());
		console.log(imgsrc);
        //下载文件操作
        // downloadImg(imgsrc, fileName, function () {
        //     console.log(fileName + 'upload 完成');
        // });
    })
}
//格式化图片名称
function FileName(url) {
    var fileName = path.basename(url);
    return fileName;
}
//利用fs模块download图片
function downloadImg(url, filename, callback) {
    var stream = fs.createWriteStream('images/' + filename);
    request(url).on('error',function(){
        console.log('done no');
    }).pipe(stream).on('close', callback);
}



//利用async的mapLimit方法实现限定并发数为3的调用
async.mapLimit(options, 3, function (option, callback) {
    request(option, all);
    callback(null);
}, function (err, result) {
    if (err) {
        console.log(err);
    } else {
        // console.log(result);
        console.log('全部检索完毕');
    }
})