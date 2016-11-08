(function($) {
    var d = {
        activeSize: 0,
        speed: 500,
        dir: 'h',
        css3Support: false,
        beforeAnimation: function() {},
        afterAnimation: function() {}
    };

    var acc = null;

    function Accordion($this, option) {
        this.$this = $this;
        this.o = $.extend({}, d, option);
        this.$list = this.$this.children();
        this.w = this.$list.width();
        this.curIndex = 0;
        this.prevIndex = 0;

        this.init();
    }

    Accordion.prototype = {
        init: function() {
            if (this.o.css3Support) {
                this.$list.first().addClass('on');
            } else {
                this.$list.first().width(this.o.activeSize);
            }
            this.initEvent();
        },
        initEvent: function() {
            var that = this;
            this.$list.on('mouseenter', function() {
                var index = $(this).index();
                if (index !== that.curIndex) {
                    that.prevIndex = that.curIndex;
                    that.curIndex = index;
                    that.accAnimation(index);
                }
            })
        },
        accAnimation: function(num) {
            this.o.beforeAnimation();
            var that = this;
            if (this.o.css3Support) {
                this.$list.eq(num).addClass('on').siblings().removeClass('on');
                setTimeout(function() {
                    that.o.afterAnimation();
                }, that.o.speed + 20);
            } else {
                this.$list.eq(num).stop(true).animate({
                    width: this.o.activeSize
                }, this.o.speed, 'linear');
                this.$list.eq(this.prevIndex).stop(true).animate({
                    width: this.w
                }, this.o.speed, 'linear', function() {
                    that.o.afterAnimation();
                });
            }
        }
    };

    $.fn.accordion = function(option) {
        acc = new Accordion($(this), option);
        return this;
    }

    //暴露方法
    $.each(['getIndex', 'getElement'], function(key, val) {
        $.fn.accordion[val] = function() {
            return acc[val].apply(acc, arguments);
        }
    })
})(jQuery);