// 电梯式导航
var winW = $(window).width();
var winH = $(window).height();
var bodyH = $('body').height();

function nav(modules) {
    var tops = [];
    var $nav = $('.nav');
    var $htmlBody = $('html, body');
    var len = modules.length;
    $.each(modules, function(index, item) {
        var top = item.offset().top;
        if (top > bodyH - winH) {
            top = bodyH - winH;
        }
        tops.push(top);
    });
    $(window).on('scroll', util.throttle(function() {
        var top = $(this).scrollTop();
        $.each(tops, function(index, item) {
            if (item > top) {
                $nav.children('a').removeClass('on').eq(index - 1).addClass('on');
                return false;
            }
            if (index === len - 1) {
                $nav.children('a').removeClass('on').last().addClass('on');
            }
        });

        $nav.on('click', 'a', function() {
            var index = $(this).index();
            $htmlBody.animate({
                scrollTop: tops[index]
            }, 500);
        });
    }));
}