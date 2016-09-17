(function($) {
    $.fn.pagePile = function(option) {
        var d = {
            dir: 'v',
            speed: 500,
            pagination: '',
            effect: 'in'
        };
        d = $.extend(d, option);
        var $children = $(this).children(),
            length = $children.length,
            winW = $('body').width(),
            winH = $('body').height(),
            me = $(this),
            curIndex = 0,
            canScroll = true;

        if (d.pagination) {
            var $pageChild = $(d.pagination).children();
        }
        init();

        function init() {
            $children.width(winW).height(winH)
                     .css('top', -winH)
                     .first().css({
                        'zIndex': 1,
                        'top': 0
                     });
            if (d.pagination) {
                $pageChild.first().addClass('on');
            }
            bindEvent();
        }

        function bindEvent() {
            if (d.pagination) {
                $pageChild.on('click', function() {
                    if (!canScroll) {
                        return;
                    }
                    canScroll = false;
                    var index = $(this).index();
                    if (index === curIndex) {
                        return;
                    }
                    slideTo(index);
                });
            }

            $(document).on('mousewheel DOMMouseScroll', function(e) {
                    if (!canScroll) {
                        return;
                    }
                    canScroll = false;
                    e.preventDefault();
                    (e.originalEvent.wheelDelta || -e.originalEvent.detail) > 0 ?
                        slideTo(curIndex - 1) :
                        slideTo(curIndex + 1);
                });
        }

        function slideTo(num) {
            if (num < 0 || num === length) {
                canScroll = true;
                return;
            }
            $children.eq(curIndex).css({
                    'zIndex': 1
                });

            $children.eq(num).css({
                'zIndex': 2,
                'top': curIndex < num ? winH : -winH
            }).animate({top: 0}, d.speed, function() {
                $children.eq(curIndex).css({
                'zIndex': 0,
                'top': -winH
            });
            if (d.pagination) {
                $pageChild.eq(num).addClass('on').siblings().removeClass('on');
            }
            curIndex = num;
            canScroll = true;
            });
        }
    };
})(jQuery);