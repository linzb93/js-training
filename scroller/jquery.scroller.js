(function($){
    var d = {
        scroollBar: '',  //滚动区域
        scrollSlider: '',  //滚动条
        speed: 500,  //滑动速度
        fullScreen: false, //是否是全屏
        perScrollGap: 50,  //每次滚轮滚动的距离
        resizeOnChange: false,  //窗口缩放时是否重置
        resetAfterLoad: false,  //图片加载完成后是否重置
    };

    function Scroll($this, option) {
        this.$this = $this;
        this.o = $.extend({}, d, option);
        this.scroollBar = $(this.o.scroollBar);
        this.scrollSlider = $(this.o.scrollSlider);
    }

    //TODO:懒加载下的滚动条重载（不是回到顶部）

    $.extend(Scroller.prototype, {
        init: function() {
            var that = this,
                tempHtml = '<div class="scroller-cont-wrapper"></div>',
                scrollCont = this.$this.html();
            this.$this.html(tempHtml);
            this.wrapper = this.$this.children('scroller-cont-wrapper');
            this.wrapper.html(tempHtml);
            if (this.o.fullScreen) {
                this.$this.innerHeight($(window).height());
            }
            this.rate = Math.floor(this.scroollBar.innerHeight() / this.wrapper.innerHeight());
            if (this.rate <= 1) {
                this.scroollBar.hide();
            }
            if (this.o.resetAfterLoad) {
                $('img').on('load', function() {
                    that.init();
                });
            }
        },

        initEvent: function() {
            //滑块拖拽
            this.scrollSlider.on('mousedown', function() {
                $(this).on('mousemove', function() {});
            });
            //鼠标滚轮滚动
            $(document).on('mousewheel DOMMouseScroll', function(e) {
                e.preventDefault();
                (e.originalEvent.wheelDelta || -e.originalEvent.detail) > 0 ?
            });
        },
        scrollTo: function() {
            var that = this;
            this.wrapper.stop().animate({top:}, that.o.speed);
        },
        cal: function() {}
    });

    $.fn.scroller = function(option) {
        new Scroller($(this), option);
    };
}(jQuery));