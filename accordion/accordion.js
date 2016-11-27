/*
 * accordion.js
 * https://github.com/linzb93/js-training/tree/master/accordion
 * @license MIT licensed
 *
 * Copyright (C) 2016 linzb93
 */
(function($) {
    //默认变量
    var d = {
        activeSize: 0,
        speed: 500,
        dir: 'h',
        css3Support: false,
        easing: 'swing',
        beforeAnimation: function() {},
        afterAnimation: function() {}
    };

    function Accordion($this, option) {
        this.$this = $this;
        this.o = $.extend({}, d, option);  //合并后的option
        this.$child = this.$this.children();
        this.speed = this.o.speed;
        this.size = this.o.dir === 'h' ? this.$child.width() : this.$child.height();  //正常状态下的元素尺寸
        this.curIndex = 0;
        this.prevIndex = 0;

        this.init();
    }

    Accordion.prototype = {
        //样式初始化
        init: function() {
            if (this.o.css3Support) {
                this.$child.first().addClass('on');
            } else {
                this.o.dir === 'h' ?
                this.$child.first().width(this.o.activeSize) :
                this.$child.first.height(this.o.activeSize);
            }
            this.initEvent();
        },

        //绑定事件
        initEvent: function() {
            var that = this;
            this.$child.on('mouseenter', function() {
                var index = $(this).index();
                if (index !== that.curIndex) {
                    that.prevIndex = that.curIndex;
                    that.curIndex = index;
                    that.accAnimation(index);
                }
            })
        },

        doBeforeAnimation: function(num) {
            if (this.o.beforeAnimation) {
                this.o.beforeAnimation(num, this.$child.eq(num), this.prevIndex, this.$child.eq(this.prevIndex));
            }
        },

        //执行动画
        accAnimation: function(num) {
            var that = this;
            this.doBeforeAnimation(num);
            if (this.o.css3Support) {
                setTimeout(function() {
                    that.doAfterAnimation(num);
                }, this.speed + 10);
            } else {
                if (this.o.dir === 'h') {
                    this.$child.eq(num).stop(true).animate({
                        width: this.o.activeSize
                    }, this.speed, this.o.easing);
                    this.$child.eq(this.prevIndex).stop(true).animate({
                        width: this.size
                    }, this.speed, this.o.easing, function() {
                        that.doAfterAnimation();
                    });
                } else {
                    this.$child.eq(num).stop(true).animate({
                        height: this.o.activeSize
                    }, this.speed, this.o.easing);
                    this.$child.eq(this.prevIndex).stop(true).animate({
                        height: this.w
                    }, this.speed, this.o.easing, function() {
                        that.doAfterAnimation();
                    });
                }
            }
        },

        doAfterAnimation: function(num) {
            if (this.o.afterAnimation) {
                this.o.afterAnimation(num, this.$child.eq(num), this.prevIndex, this.$child.eq(this.prevIndex));
            }
        }
    };

    $.fn.accordion = function(option) {
        new Accordion(this, option);
        return this;
    };
})(jQuery);