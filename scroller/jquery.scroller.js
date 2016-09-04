(function($){
    var d = {
        scroollBar: null,  //滚动区域
        scrollArea: null,  //滚动条
        speed: 500,  //滑动速度
        mouseWheel: false,  //是否支持鼠标滚轮滚动
        perScrollGap: 50,  //每次滚轮滚动的距离
        resizeOnChange: false  //窗口缩放时是否重置
    };
    function init(option) {
        var o = $.extend({}, d, option);
        var that = this;
        this.block = this.$this,
        this.scroollBar = $(this.o.scroollBar),
        this.scrollArea = this.scroollBar.find(this.o.scrollBlock);
        this.speed = this.o.speed;
        this.mouseWheel = this.o.mouseWheel;
        this.perScrollGap = this.o.perScrollGap;
        this.rate = 0; //滚动区域与可视区域的比
        var $blockContent = this.block.html();
        $('<div class="scroller-wrapper"></div>').append($blockContent);
        this.block.find('img').on('load', function() {
            that.reset();

        });
        setStyle();
        createBar();
        bindEvent();
    }
    function Scroller($this, option) {
        this.$this = $this;
        init.call(this, option);
    }
    $.extend(Scroller.prototype, {
        setStyle: function(){},
        createBar: function(){},
        reset: function() {
            var $blockHeight = this.block.height() + this.block.css('padding-top') + this.block.css('padding-bottom'),
            this.scrollArea.height($blockHeight);
            var $areaHeight = this.scrollArea.height(),
            $barHeight = this.scroollBar.height();
        },
        scrollAnimation: function(nextPos) {
            var contentOffset = nextPos * rate,
            that = this;
            this.scrollArea.animate({top: nextPos + 'px'}, that.speed);
        },
        bindEvent: function(){
            var that = this;
            //监听滚动事件
            $(document).on("mousewheel DOMMouseScroll", function(e) {
                e.preventDefault();
                var value = e.originalEvent.wheelDelta || -e.originalEvent.detail;
            });
            //窗口缩放时重置
            $(window).on('resize', function() {
                that.reset();
            })
        }
    });
    $.fn.scroller = function(option) {
        new Scroller($(this), option);
    };
}(jQuery));