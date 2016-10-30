(function($) {
    var d = {
        activeSize: 3,
        speed: 800,
        dir: 'h',
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

        this.init();
    }

    Accordion.prototype = {
        init: function() {
            this.$list.first().width(this.w * this.o.activeSize).addClass('on');
            this.initEvent();
        },
        initEvent: function() {
            var that = this;
            this.$list.on('mouseenter', function() {
                var index = $(this).index();
                if (index !== that.curIndex) {
                    that.accAnimation(index);
                }
            })
        },
        accAnimation: function(num) {
            this.o.beforeAnimation();
            var that = this;
            this.$list.eq(num).stop(true).animate({
                width: this.w * this.o.activeSize
            }, this.o.speed, 'linear');
            this.$list.eq(this.curIndex).stop(true).animate({
                width: this.w
            }, this.o.speed, 'linear', function() {
                that.o.afterAnimation();
            });
            this.curIndex = num;
        },

        getCurIndex: function() {
            return this.curIndex;
        },

        getCurElement: function() {
            return this.$list.eq(this.curIndex);
        }
    };

    $.fn.accordion = function(option) {
        acc = new Accordion($(this), option);
        return this;
    }

    $.each(['getCurIndex', 'getCurElement'], function(key, val) {
        $.fn.accordion[val] = function() {
            return acc[val].apply(acc, arguments);
        }
    })
})(jQuery);