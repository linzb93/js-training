var http = require('http');
var cheerio = require('cheerio');
var fs = require('fs');
var iconv = require('iconv-lite');
var url = 'http://www.cnblogs.com/';


http.get(url, function(res) {
    var html = [];

    res.on('data', function(data) {
        html.push(data);
    });

    res.on('end', function() {
        // printHTML(html);
    })
}).on('error', function() {});

function printHTML(html) {
    // var html1 = iconv.decode(Buffer.concat(html), 'gbk');
    var html1 = html.toString();
    var $ = cheerio.load(html1, {decodeEntities: false});
    // printToFile($('body').html())
    // console.log($('.post_item').eq(4).find('.post_item_summary').text());
    HTMLFilter($, '#post_list');
}

function HTMLFilter($, selector) {
    /*
    * 1.题目：
    * 简介：
    * 作者：
    * 2.题目：。。。
    */
    var result = '';
    var $content = $(selector);
    $content.children('.post_item').each(function(index) {
        result += (index + 1) + '.题目：' + $(this).find('h3 a').text() + '\n' + '简介：' + $(this).find('.post_item_summary').text() + '作者：' + $(this).find('.lightblue').text() + '\n';
    });
    printToFile(result);
}

function printToFile(html) {
    fs.writeFile('101.html', html, function(err) {
        if (err) throw err;
      console.log('It\'s saved!');
  });
}

