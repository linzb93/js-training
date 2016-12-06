(function($) {
    "use strict";

    var pluginName = 'scroller';

    //参数默认值
    var defaults = {
        dir: 'v',
        scrollGap: 50,
        speed: 300,
        ns: pluginName,
        mousewheel: false,
        key: false
    };

    //keyCode
    var LEFT_KEY = 37;
    var UP_KEY = 38;
    var RIGHT_KEY = 39;
    var DOWN_KEY = 40;

    function Scroller($this, o) {
        this.$this = $this;
        this.o = $.extend({}, defaults, o);

        this.init();
    }

    Scroller.prototype = {
        init: function() {
            this.$this.addClass(this.o.ns + '-container');
            this.$this.children().wrapAll('<div class="' + this.o.ns + '-wrapper"></div>');

            this.$scrollerWrapper = $('.' + this.o.ns + '-wrapper');

            this.createBar();

        },
        createBar: function() {
            var scrollHtml = '\
            <div class="' + this.o.ns + '-bar">\
            <div class="' + this.o.ns + '-block">\
            </div>\
            </div>';
            this.$this.append(scrollHtml);

            this.$scrollerBar = $('.' + this.o.ns + '-bar');
            this.$scrollerBlock = $('.' + this.o.ns + '-block');
            if (this.o.dir === 'v') {
                this.maxMove = this.$scrollerBar.height() - this.$scrollerBlock.height();
                this.rate = (this.$scrollerWrapper.height() - this.$this.height()) / this.maxMove + 0.1;
            } else {
                this.maxMove = this.$scrollerBar.width() - this.$scrollerBlock.width();
                this.rate = (this.$scrollerWrapper.width() - this.$this.width()) / this.maxMove + 0.1;
            }


            this.eventsHandler();
        },
        eventsHandler: function() {
            this.dragEvent();
            this.mousewheelEvent();
            this.keyboardEvent();
        },
        reset: function() {},
        dragEvent: function() {
            var that = this;

            this.$scrollerBlock.on('mousedown', function(e) {
                var $this = $(this);
                var gap = that.getBlockCurPos(e, $(this));

                e.preventDefault();
                $(this).on('selectstart', function() {
                    return false;
                });
                $('body').on('mousemove.scroller', function(e) {
                    var curBlockPos = (that.o.dir === 'v' ? e.pageY : e.pageX) - gap;
                    curBlockPos = that.changeBlockPos(curBlockPos, that.maxMove);
                    that.doScrollAnimation($this, curBlockPos);
                    that.doScrollAnimation(that.$scrollerWrapper, -that.rate * curBlockPos);
                });
                $('body').on('mouseup', function() {
                    $(this).off('mousemove.scroller');
                    $this.off('selectstart');
                });
            })
        },
        mousewheelEvent: function() {

            if (this.o.mousewheel) {
                var that = this;
                var curBlockPos;
                this.$this.on('mousewheel DOMMouseScroll', function(e) {
                    if (e.originalEvent.wheelDelta || e.originalEvent.detail) {
                        curBlockPos = that.getBlockCurPos(e, $(this)) + that.o.scrollGap / that.rate;

                    } else {
                        curBlockPos = that.getBlockCurPos(e, $(this)) - that.o.scrollGap;
                    }
                    that.doScrollAnimation(that.$scrollerBlock, curBlockPos, true);
                    that.doScrollAnimation(that.$scrollerWrapper, -that.rate * curBlockPos, true);
                });
            }
        },
        keyboardEvent: function() {

        },
        getBlockCurPos: function(e, $ele) {
            return this.o.dir === 'v' ?
            e.pageY - $ele.offset().top :
            e.pageX - $ele.offset().left;
        },
        changeBlockPos: function(curPos, maxMove) {
            curPos = Math.min(curPos, maxMove);
            curPos = Math.max(curPos, 0);
            return curPos;
        },
        doScrollAnimation: function($ele, curPos, useAnimate) {
            if (this.o.dir === 'v') {
                if (useAnimate) {
                    $ele.stop(true).animate({top: curPos}, this.o.speed);
                } else {
                    $ele.css('top', curPos);
                }
            } else {
                if (useAnimate) {
                    $ele.stop(true).animate({left: curPos}, this.o.speed);
                } else {
                    $ele.css('left', curPos);
                }
            }
        }
    };

    $.fn[pluginName] = function(o) {
        new Scroller(this, o);
        return this;
    };
})(jQuery);