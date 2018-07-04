var request = require('request');
var cheerio = require('cheerio');
var path = require('path');
var fs = require('fs');
var async = require('async');
var phantom = require('phantom');

let options = ['http://xfyy185.com/Mulu/index12.html'];  //用于存储网址链接的数组
let optionPrefix = 'http://xfyy185.com';
let optionDeta = [];    //用于存储详情
var n=0;

//先生称图片地址链接的数组
for (var i = 1; i < 2; i++) {
    // let url = 'https://www.77kp.com/vod-type-id-5-pg-' + i + '.html';
    
    // options.push(url);
}

//格式化图片名称
function FileName(url) {
    var fileName = path.basename(url);
    return fileName;
}
//利用fs模块download图片
function downloadImg(url, filename, callback) {
    var stream = fs.createWriteStream('qiqi/images/' + filename);
    request(url).on('error',function(){
        console.log('done no');
    }).pipe(stream).on('close', callback);
}

// 获取列表页的所有跳转信息
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
        const status = await page.open(options[0]);
        const content = await page.property('content');
        var $ = cheerio.load(content);
        // console.log(content);
        $(".letter-page a").each(function() {
            // console.log($(this).attr('href'));
            let href = $(this).attr('href');
            if(href) {
                optionDeta.push(optionPrefix + $(this).attr('href'));
            }
        })
        asyncGetDeta();
    } catch (err) {console.log(err)};
}

// 获取详情页的信息
async function asyncGetDeta() {
    try{
        const instance = await phantom.create();
        const page = await instance.createPage();
        await page.on('onResourceRequested', function(requestData) {
        //   console.info('Requesting', requestData.url);
        });
        const status = await page.open(optionDeta[n]);
        const content = await page.property('content');
        var $ = cheerio.load(content);
        // console.log(content);
        // let idx = n + 1;
        // console.log('第' + idx + '个页面准备');
        // $('.content a').each(function() {
        //     let href = $(this).attr('href')
        //     if(href) {
        //         console.log(href);
        //     }
        // })
        
        $('#juqing img').each(function() {
            let src = $(this).attr('src');
            if(src) {
                var fileName = FileName(src.toString());
                downloadImg(src, fileName, function () {
                    console.log(fileName + ' upload 完成');
                });
            }
        })
        
        // console.log('第' + idx + '个页面完成');
        n++;
        await instance.exit();
        asyncGetDeta();
    }catch(err){
        console.log(err);
    }
}

asyncGet();