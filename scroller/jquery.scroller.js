(function($) {
    "use strict";

    var pluginName = 'scroller';

    //参数默认值
    var defaults = {
        dir: 'v',
        scrollGap: 50,
        speed: 300,
        mousewheel: false,
        key: false
    };

    //keyCode
    var LEFT_KEY = 37;
    var UP_KEY = 38;
    var RIGHT_KEY = 39;
    var DOWN_KEY = 40;

    function Scroller($this, option) {
        this.$this = $this;
        this.o = $.extend({}, defaults, option);

        this.init();
    }

    //TODO: 1.显示区尺寸超过内容区尺寸时不生成滚动条*
    //2.点击滚动区时，滚动条滚至其的中点和点击区域重合
    //3.计算尺寸时考虑margin和padding*
    //4.滚动至特定位置
    Scroller.prototype = {
        init: function() {
            var that = this;
            if (this.$this.find('img').length) {
                $('img').on('load', function() {
                    that.$this.addClass('scroller-container');
                    that.$this.children().wrapAll('<div class="scroller-wrapper" />');
                    that.$sWrapper = that.$this.children('.scroller-wrapper');
                    that.createBar();
                });
            } else {
                that.$this.addClass('scroller-container');
                    that.$this.children().wrapAll('<div class="scroller-wrapper" />');
                    that.$sWrapper = that.$this.children('.scroller-wrapper');
                    that.createBar();
            }
            
        },
        createBar: function() {
            var scrollHtml = '<div class="scroller-bar"><div class="scroller-block" /></div>';
            this.$this.append(scrollHtml);

            this.$sBar =this.$this.children('.scroller-bar');
            this.$sBlock = this.$sBar.children('.scroller-block');
            if (this.o.dir === 'v') {
                this.maxMove = this.$sBar.height() - this.$sBlock.height();
                this.rate = (this.$sWrapper.height() - this.$this.height()) / this.maxMove + 0.1;
            } else {
                this.maxMove = this.$sBar.width() - this.$sBlock.width();
                this.rate = (this.$sWrapper.width() - this.$this.width()) / this.maxMove + 0.1;
            }

            this.eventsHandler();
        },
        eventsHandler: function() {
            var that = this;
            this.dragEvent();
            if (this.o.mousewheel) {
                this.mousewheelEvent();
            }
            if (this.o.key) {
                this.keyboardEvent();
            }
            this.$this.on('reset.scroller', function(e,
                useAnimate/* Boolean, 下同 */) {
                that.reset(useAnimate);
            });
        },
        reset: function(useAnimate) {
            this.doScrollAnimation(this.$sWrapper, 0, useAnimate);
            this.doScrollAnimation(this.$sBlock, 0, useAnimate);
        },
        dragEvent: function() {
            var that = this;
            this.$sBlock.on('mousedown', function(e) {
                var $this = $(this);
                var gap = that.o.dir === 'v' ?
                e.pageY - $(this).offset().top :
                e.pageX - $(this).offset().left;
                e.preventDefault();
                $(this).on('selectstart', function() {
                    return false;
                });
                $('body').on('mousemove.scroller', function(e) {
                    var curBlockPos = (that.o.dir === 'v' ? e.pageY : e.pageX) - gap;
                    curBlockPos = that.fixBlockPos(curBlockPos, that.maxMove);
                    that.doScrollAnimation($this, curBlockPos);
                    that.doScrollAnimation(that.$sWrapper, -that.rate * curBlockPos);
                });
                $('body').on('mouseup', function() {
                    $(this).off('mousemove.scroller');
                    $this.off('selectstart');
                });
            })
        },
        mousewheelEvent: function() {
            var that = this;
            this.$this.on('mousewheel DOMMouseScroll', function(e) {
                var wheelDirNum = (e.originalEvent.wheelDelta || e.originalEvent.detail) > 0 ? 1 : -1;
                var curBlockPos = that.$sBlock.offset().top - wheelDirNum * that.o.scrollGap / that.rate;
                curBlockPos = that.fixBlockPos(curBlockPos, that.maxMove);
                that.doScrollAnimation(that.$sBlock, curBlockPos, true);
                that.doScrollAnimation(that.$sWrapper, -that.rate * curBlockPos, true);
            });
        },
        keyboardEvent: function() {
            var that = this;
            var keyDirNum = 0;
            $('input').trigger('focus');
            this.$this.on('click', function() {
                $('input').trigger('focus');
            })
            $('input').on('keyup', function(e) {
                if (that.o.dir === 'h') {
                    if (e.keyCode === LEFT_KEY) {
                        keyDirNum = -1;
                    } else if (e.keyCode === RIGHT_KEY) {
                        keyDirNum = 1;
                    }
                } else {
                    if (e.keyCode === UP_KEY) {
                        keyDirNum = -1;
                    } else if (e.keyCode === DOWN_KEY) {
                        keyDirNum = 1;
                    }
                    var curBlockPos = that.$sBlock.offset().top + keyDirNum * that.o.scrollGap / that.rate;
                    curBlockPos = that.fixBlockPos(curBlockPos, that.maxMove);
                    that.doScrollAnimation(that.$sBlock, curBlockPos, true);
                    that.doScrollAnimation(that.$sWrapper, -that.rate * curBlockPos, true);
                }
            });
        },
        fixBlockPos: function(curPos, maxMove) {
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

    $.fn[pluginName] = function(option) {
        new Scroller(this, option);
        return this;
    };
})(jQuery);