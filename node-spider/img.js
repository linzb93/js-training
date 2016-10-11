//依赖模块
    var fs = require('fs');
    var request = require('request');
    var cheerio = require("cheerio");
    var mkdirp = require('mkdirp');
    //目标网址
    var url = 'http://www.baidu.com';
    //本地存储目录
    var dir = './bdimages';
    //创建目录
    mkdirp(dir, function(err) {
        if(err){
            console.log(err);
        }
    });
    //发送请求
    request(url, function(error, response, body) {
        if(response.statusCode == 200) {
            var $ = cheerio.load(body);
            $('img').each(function() {
                var src =$(this).attr('src');
                if (src.substr(0,5) === '//www') {
                    src = 'http:' + src;
                }
                console.log('正在下载' + src);
                var picName = $(this).attr('src').split('/').pop();
                download(src, dir, picName);
                console.log('下载完成');
            });
        }
    });
    //下载方法
    var download = function(url, dir, filename){
        request.head(url, function(err, res, body){
            request(url).pipe(fs.createWriteStream(dir + "/" + filename));
        });
    };