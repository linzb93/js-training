;(function($){
    var d = {
        cell: 'li',       //进行布局的列表元素
        spaceX: 0,        //水平方向的间距
        spaceY: 0        //竖直方向的间距
    };
    function WaterFall($this, option) {
        this.$this = $this;
        var o = $.extend({}, d, option);
        this.o = o;
        this.blockW = this.$this.width();
        this.perCell = this.$this.find(this.o.cell);
        this.cellW = this.perCell.outerWidth();

        this.col = parseInt(this.blockW / this.cellW);
        this.heightArr = [];  //每一列的高度
        this.fallArr = [];    //每一列拥有的列表元素的数量
        initArr(this.heightArr, this.col);
        initArr(this.fallArr, this.col);
        this.init();
    }
    function initArr(arr, length) {
        for(var i = 0; i < length; i++) {
            arr[i] = 0;
        }
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
            for(var i = 1; i < length; i++) {
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
            this.perCell.addClass('waterfall-cell');
            this.calculate();
        },
        calculate: function() {
            var that = this,
            maxHeight = 0;
            this.perCell.each(function() {
                var minIndex = min(that.heightArr).index;
                that.fallArr[minIndex]++;
                that.layout($(this), minIndex);
                that.heightArr[minIndex] += ($(this).outerHeight() + that.o.spaceY);

            });
            maxHeight = max(this.heightArr).maxVal;
            this.$this.height(maxHeight);
        },
        layout: function(ele, num) {
            var that = this;
            if (this.heightArr[num] == 0) {
                ele.css({
                    'left': (that.cellW + that.o.spaceX) * num + 'px',
                    'top': 0
                });
            } else {
                ele.css({
                    'left': (that.cellW + that.o.spaceX) * num + 'px',
                    'top': that.heightArr[num] + that.o.spaceY + 'px'
                });
            }
        }
    });

    $.fn.waterfall = function(option) {
        new WaterFall($(this), option);
    };
})(jQuery);