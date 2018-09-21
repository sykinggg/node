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
    let url = 'http://jandan.net/ooxx/page-' + i;
    
    options.push(url);
}

//格式化图片名称
function FileName(url) {
    var fileName = path.basename(url);
    return fileName;
}
//利用fs模块download图片
function downloadImg(url, filename, callback) {
    var stream = fs.createWriteStream('jiandan/images/' + filename);
    request(url).on('error',function(){
        console.log('done no');
    }).pipe(stream).on('close', callback);
}

function mkdir(dirpath) {
    fs.exists(dirpath, (exists) => {
        if(!exists) {
            fs.mkdir(dirpath);
        }
    })
}

mkdir('jiandan/images');

async function asyncGet() {
    try {
        if(n > options.length-1) {
            console.log('完成');
            return false;   
        }
        const instance = await phantom.create();
        const page = await instance.createPage();
        await page.on('onResourceRequested', function(requestData) {
        //   console.info('Requesting', requestData.url);
        });
        const status = await page.open(options[n]);
        const content = await page.property('content');
        var $ = cheerio.load(content);
        let idx = n + 1;
        console.log('第' + idx + '个页面准备');
        $(".commentlist img").each(function(i, ele) {
            var imgsrc = $(this).attr('src');
            // n=n+$(".commentlist img").length;
            console.log(imgsrc);
            var fileName = FileName(imgsrc.toString());
            downloadImg(imgsrc, fileName, function () {
                console.log(fileName + ' upload 完成');
            });
        })
        console.log('第' + idx + '个页面完成');
        n++;
        await instance.exit();
        asyncGet();
    } catch (err) {console.log(err)};
}

asyncGet();


