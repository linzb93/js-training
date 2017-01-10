(function($) {
    "use strict";

    var pluginName = 'scroller';

    //参数默认值
    var defaults = {
        dir: 'v',
        scrollGap: 50,
        speed: 300,
        mousewheel: false,
        key: false,
        resetAfterImgLoad: false
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

    Scroller.prototype = {
        init: function() {
            var that = this;
            this.$this.addClass('scroller-container');
            this.$this.wrapInner('<div class="scroller-wrapper" />');
            this.$sWrapper = this.$this.children('.scroller-wrapper');
            //计算内容高度或宽度，如果小于显示区域高度或宽度，则不生成滚动条。
            this.isSmallWrapper = (this.o.dir === 'v' && this.$sWrapper.height() <= this.$this.height()) ||
            (this.o.dir === 'h' && this.$sWrapper.width() <= this.$this.width());

            if (!this.isSmallWrapper) {
                this.createBar();
            }
            if (this.o.resetAfterImgLoad) {
                this.$this.find('img').on('load', function() {
                    that.reset();
                });
            }
        },

        //创建滚动条
        createBar: function() {
            var scrollHtml = '<div class="scroller-bar"><div class="scroller-block" /></div>';
            this.$this.append(scrollHtml);

            this.$sBar = this.$this.children('.scroller-bar');
            this.$sBlock = this.$sBar.children('.scroller-block');

            this.initCalculate();

            if (!this.isSmallWrapper) {
                this.initEvent();
            }
        },

        initCalculate: function() {
            if (this.o.dir === 'v') {
                this.maxMove = this.$sBar.height() - this.$sBlock.height();
                this.rate = (this.$sWrapper.height() - this.$this.height()) / this.maxMove + 0.01;
            } else {
                this.maxMove = this.$sBar.width() - this.$sBlock.width();
                this.rate = (this.$sWrapper.width() - this.$this.width()) / this.maxMove + 0.01;
            }
        },

        //事件初始化
        initEvent: function() {
            var that = this;
            this.dragEvent();
            this.barClickEvent();
            if (this.o.mousewheel) {
                this.mousewheelEvent();
            }
            if (this.o.key) {
                this.keyboardEvent();
            }
            //窗口发生变化时执行滚动条部分参数重置
            $(window).on('resize', function() {
                that.reset();
            });

            //自定义事件
            this.$this.on('scroller.scrollTo', function(e, pos, useAnimate/* Boolean, 下同 */) {
                that.doScroll(pos, useAnimate);
            });
            this.$this.on('scroller.reset', function() {
                that.reset();
            });
        },

        //重置滚动条
        reset: function() {
            this.doScroll(0);
            this.initCalculate();
        },

        //处理拖拽事件
        dragEvent: function() {
            var that = this;
            this.$sBlock.on('mousedown', function(e) {
                var $this = $(this);
                var gap = that.o.dir === 'v' ?
                e.pageY - $(this).offset().top + that.$sBar.offset().top :
                e.pageX - $(this).offset().left + that.$sBar.offset().left;
                e.preventDefault();
                $(this).on('selectstart', function() {
                    return false;
                });
                $('body').on('mousemove.scroller', function(e) {
                    var curBlockPos = (that.o.dir === 'v' ? e.pageY : e.pageX) - gap;
                    curBlockPos = that.fixBlockPos(curBlockPos);
                    that.doScroll(curBlockPos);
                });
                $('body').on('mouseup', function() {
                    $(this).off('mousemove.scroller');
                    $this.off('selectstart');
                });
            });

            //ie8下的兼容问题
            $('body').on('mouseup', function(){
                that.$sBlock.off('mousemove');
                $(this).off('selectstart');
            });
        },

        //处理滚轮滚动事件，不支持水平方向滚动时的使用
        mousewheelEvent: function() {
            var that = this;
            this.$this.on('mousewheel DOMMouseScroll', function(e) {
                e.preventDefault();
                var wheelDirNum = (e.originalEvent.wheelDelta || -e.originalEvent.detail) > 0 ? 1 : -1;
                var curBlockPos = that.$sBlock.offset().top - that.$sBar.offset().top - wheelDirNum * that.o.scrollGap / that.rate;
                curBlockPos = that.fixBlockPos(curBlockPos);
                that.doScroll(curBlockPos, true);
            });
        },

        // 处理键盘滚动事件
        keyboardEvent: function() {
            var that = this;
            var keyDirNum = 0;
            var $input = $('<input class="scroller-input" type="text">');
            $input.appendTo(this.$this).trigger('focus');
            this.$this.on('click', function() {
                $input.trigger('focus');
            })
            $input.on('keyup', function(e) {
                e.preventDefault();
                if (that.o.dir === 'h') {
                    if (e.keyCode === LEFT_KEY) {
                        keyDirNum = -1;
                    } else if (e.keyCode === RIGHT_KEY) {
                        keyDirNum = 1;
                    }  else {
                        return;
                    }
                    var curBlockPos = that.$sBlock.offset().left - that.$sBar.offset().left + keyDirNum * that.o.scrollGap / that.rate;
                } else {
                    if (e.keyCode === UP_KEY) {
                        keyDirNum = -1;
                    } else if (e.keyCode === DOWN_KEY) {
                        keyDirNum = 1;
                    }  else {
                        return;
                    }
                    var curBlockPos = that.$sBlock.offset().top - that.$sBar.offset().top + keyDirNum * that.o.scrollGap / that.rate;
                }
                curBlockPos = that.fixBlockPos(curBlockPos);
                that.doScroll(curBlockPos, true);
            });
        },

        // 处理点击滚动区域滚动事件
        barClickEvent: function() {
            var that = this;
            this.$sBlock.on('click', function(e) {
                e.stopPropagation();
            });
            this.$sBar.on('click', function(e) {
                if (that.o.dir === 'v') {
                   var curBlockPos =  e.pageY - $(this).offset().top - that.$sBlock.height() / 2;
                } else {
                    var curBlockPos =  e.pageX - $(this).offset().left - that.$sBlock.height() / 2;
                }
                curBlockPos = that.fixBlockPos(curBlockPos);
               that.doScroll(curBlockPos, true);
            });
        },

        // 修正滚动条的目标位置，不能超出滚动区域
        fixBlockPos: function(curPos) {
            curPos = Math.min(curPos, this.maxMove);
            curPos = Math.max(curPos, 0);
            return curPos;
        },

        // 执行滚动
        doScroll: function(pos, useAnimate) {
            var blockCssObj = this.o.dir === 'v' ? {top: pos} : {left: pos};
            var wrapperCssObj = this.o.dir === 'v' ? {top: pos * -this.rate} : {left: pos * -this.rate};
            var speed = useAnimate ? this.o.speed : 0;
            this.$sBlock.stop(true).animate(blockCssObj, speed);
            this.$sWrapper.stop(true).animate(wrapperCssObj, speed);
        }
    };

    $.fn[pluginName] = function(option) {
        this.each(function() {
            new Scroller($(this), option);
        });
        return this;
    };
})(jQuery);