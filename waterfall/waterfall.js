;(function($){
    var d = {
        cell: 'li',       //进行布局的列表元素
        spaceX: 0,        //水平方向的间距
        spaceY: 0,        //竖直方向的间距
        animation: false  //是否使用动画
    };
    function WaterFall($this, option) {
        this.$this = $this;
        var o = $.extend({}, d, option);
        this.o = o;
        this.blockW = this.$this.width();
        this.cell = this.$this.find(this.o.cell);
        this.cellW = this.cell.outerWidth();
        this.col = parseInt(this.blockW / this.cellW);
    }
    function min(arr) {
        var length = arr.length,
                minVal = arr[0],
                index = 0;
            for(var i = 1; i < length; i++) {
                if (minVal > arr[i]) {
                    minVal = arr[i];
                    index = i;
                }
            }
            return {
                minVal: minVal,
                index: index
            };
    }
    function max(arr) {
        var length = arr.length,
                maxVal = arr[0],
                index = 0;
            for(var i = 1; i< length; i++) {
                if (maxVal < arr[i]) {
                    maxVal = arr[i];
                    index = i;
                }
            }
            return {
                maxVal: maxVal,
                index: index
            };
    }
    $.extend(WaterFall.prototype, {
        init: function() {
            this.cell.addClass('waterfall-cell');
        }
        calculate: function() {
            var heightArr = [];
            heightArr.length = this.col;
            this.cell.each(function() {
            })
        },
        layout: function() {
        }
    });

    $.fn.waterfall = function(option) {
        new WaterFall($(this), option);
    };
})(jQuery);